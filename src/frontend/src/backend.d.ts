import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Message {
    role: string;
    text: string;
    timestamp: bigint;
}
export interface Question {
    topic: string;
    correctIndex: bigint;
    xpReward: bigint;
    answers: Array<string>;
    difficulty: bigint;
    text: string;
}
export interface UserProfile {
    xp: bigint;
    personality: Personality;
    username: string;
    messagesSent: bigint;
    badges: Array<string>;
    streakDays: bigint;
    level: bigint;
    burnoutScore: bigint;
    lastActive: bigint;
    completedTopics: Array<string>;
    companionName: string;
}
export enum Personality {
    calm = "calm",
    playful = "playful",
    encouraging = "encouraging",
    witty = "witty"
}
export interface backendInterface {
    addMessage(role: string, text: string): Promise<void>;
    addSampleQuestions(): Promise<void>;
    awardBadge(badgeId: string): Promise<void>;
    completeTopic(topicId: string): Promise<void>;
    getAllStats(): Promise<UserProfile>;
    getHistory(): Promise<Array<Message>>;
    getOrCreateProfile(username: string): Promise<UserProfile>;
    getQuestionsByTopic(topic: string): Promise<Array<Question>>;
    updateCompanion(name: string, personality: Personality): Promise<void>;
}
