import Array "mo:core/Array";
import List "mo:core/List";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Nat32 "mo:core/Nat32";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  type Personality = {
    #encouraging;
    #witty;
    #calm;
    #playful;
  };

  module Personality {
    public func toText(personality : Personality) : Text {
      switch (personality) {
        case (#encouraging) { "encouraging" };
        case (#witty) { "witty" };
        case (#calm) { "calm" };
        case (#playful) { "playful" };
      };
    };
  };

  type UserProfile = {
    username : Text;
    xp : Nat;
    streakDays : Nat;
    level : Nat;
    lastActive : Int;
    companionName : Text;
    personality : Personality;
    completedTopics : [Text];
    badges : [Text];
    messagesSent : Nat;
    burnoutScore : Nat;
  };

  module UserProfile {
    public func compare(a : UserProfile, b : UserProfile) : Order.Order {
      Text.compare(a.username, b.username);
    };
  };

  type Question = {
    text : Text;
    answers : [Text];
    correctIndex : Nat;
    difficulty : Nat;
    xpReward : Nat;
    topic : Text;
  };

  module Question {
    public func compare(a : Question, b : Question) : Order.Order {
      Text.compare(a.topic, b.topic);
    };
  };

  type Message = {
    role : Text; // "user" or "companion"
    text : Text;
    timestamp : Int;
  };

  module Message {
    public func compare(a : Message, b : Message) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let allQuestions = List.empty<Question>();
  let convoHistory = Map.empty<Principal, List.List<Message>>();

  // Create or get user profile
  public shared ({ caller }) func getOrCreateProfile(username : Text) : async UserProfile {
    switch (userProfiles.get(caller)) {
      case (?profile) { profile };
      case (null) {
        let newProfile : UserProfile = {
          username;
          xp = 0;
          streakDays = 0;
          level = 1;
          lastActive = Time.now();
          companionName = "AI Buddy";
          personality = #encouraging;
          completedTopics = [];
          badges = [];
          messagesSent = 0;
          burnoutScore = 0;
        };
        userProfiles.add(caller, newProfile);
        newProfile;
      };
    };
  };

  // Add message to conversation history (keep last 20)
  public shared ({ caller }) func addMessage(role : Text, text : Text) : async () {
    let newMessage : Message = {
      role;
      text;
      timestamp = Time.now();
    };

    let currentHistory = switch (convoHistory.get(caller)) {
      case (?history) { history };
      case (null) { List.empty<Message>() };
    };

    currentHistory.add(newMessage);

    while (currentHistory.size() > 20) {
      ignore currentHistory.removeLast();
    };

    convoHistory.add(caller, currentHistory);
  };

  // Get conversation history
  public query ({ caller }) func getHistory() : async [Message] {
    switch (convoHistory.get(caller)) {
      case (?history) {
        history.toArray().sort();
      };
      case (null) { [] };
    };
  };

  // Get quiz questions by topic
  public query ({ caller }) func getQuestionsByTopic(topic : Text) : async [Question] {
    allQuestions.toArray().filter(
      func(q) { q.topic == topic }
    );
  };

  // Mark topic as completed
  public shared ({ caller }) func completeTopic(topicId : Text) : async () {
    switch (userProfiles.get(caller)) {
      case (?profile) {
        let updatedTopics = profile.completedTopics.concat([topicId]);
        let updatedProfile = {
          profile with completedTopics = updatedTopics
        };
        userProfiles.add(caller, updatedProfile);
      };
      case (null) {};
    };
  };

  // Award badge
  public shared ({ caller }) func awardBadge(badgeId : Text) : async () {
    switch (userProfiles.get(caller)) {
      case (?profile) {
        let updatedBadges = profile.badges.concat([badgeId]);
        let updatedProfile = {
          profile with badges = updatedBadges
        };
        userProfiles.add(caller, updatedProfile);
      };
      case (null) {};
    };
  };

  // Get all user stats
  public query ({ caller }) func getAllStats() : async UserProfile {
    switch (userProfiles.get(caller)) {
      case (?profile) { profile };
      case (null) { Runtime.trap("No profile found.") };
    };
  };

  // Update companion configuration
  public shared ({ caller }) func updateCompanion(name : Text, personality : Personality) : async () {
    switch (userProfiles.get(caller)) {
      case (?profile) {
        let updatedProfile = {
          profile with companionName = name; personality
        };
        userProfiles.add(caller, updatedProfile);
      };
      case (null) {};
    };
  };

  // Add sample questions (for testing)
  public shared ({ caller }) func addSampleQuestions() : async () {
    let sampleQuestions = [
      {
        text = "What does CPU stand for?";
        answers = ["Central Processing Unit", "Computer Personal Unit", "Central Power Unit", "Control Processing Unit"];
        correctIndex = 0;
        difficulty = 1;
        xpReward = 10;
        topic = "Hardware";
      },
      {
        text = "Which language is primarily used for web development?";
        answers = ["Python", "Java", "HTML", "C++"];
        correctIndex = 2;
        difficulty = 1;
        xpReward = 10;
        topic = "Web Development";
      },
    ];

    for (q in sampleQuestions.values()) {
      allQuestions.add(q);
    };
  };
};
