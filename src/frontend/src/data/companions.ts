export type PersonalityType = "encouraging" | "witty" | "calm" | "playful";

export interface CompanionConfig {
  id: string;
  defaultName: string;
  personality: PersonalityType;
  color: string;
  bgColor: string;
  accentColor: string;
  image: string;
  traits: string;
  greetings: string[];
  encouragements: string[];
  wrongAnswerResponses: string[];
  correctAnswerResponses: string[];
  frustrationResponses: string[];
  burnoutResponses: string[];
  csKeywordResponses: Record<string, string>;
}

export const COMPANION_PRESETS: CompanionConfig[] = [
  {
    id: "sakura",
    defaultName: "Sakura",
    personality: "encouraging",
    color: "#F06A9B",
    bgColor: "#FFF0F5",
    accentColor: "#F06A9B",
    image: "/assets/generated/companion-sakura.dim_200x200.png",
    traits: "Warm · Encouraging · Supportive",
    greetings: [
      "Hey there! 💕 I'm so excited to study with you today!",
      "Good to see you! Let's make today's session amazing together! ✨",
      "You showed up — that already makes you a winner! 💖 Let's dive in!",
    ],
    encouragements: [
      "You're doing amazing! 💕",
      "I believe in you! Every line of code brings you closer! 🌸",
      "That was a tough one but you handled it so well!",
      "You're making incredible progress! Keep it up! 💪",
      "I'm so proud of you! 🥰",
    ],
    correctAnswerResponses: [
      "Yes!! You got it!! 🎉 See, I knew you could do it!",
      "That's my smart study buddy! 💕 +XP earned!",
      "Absolutely correct! You're on fire today! 🌟",
    ],
    wrongAnswerResponses: [
      "Oh, so close! 🌸 Let's look at that together — you've totally got this!",
      "That one's tricky! Don't worry, every mistake is a learning moment! 💕",
      "Not quite, but I love how you're trying! Let's review it! 📚",
    ],
    frustrationResponses: [
      "Hey, hey, it's okay! 🌸 Take a deep breath. I'm right here with you!",
      "You're not alone in this! Let's tackle it together, one step at a time 💕",
      "It's totally normal to feel stuck sometimes. You're actually doing great! 🥰",
    ],
    burnoutResponses: [
      "I can feel you're working so hard 💗 It's time for a little break! Even 5 minutes can refresh your mind!",
      "You're a warrior, but even warriors rest 🌸 You've done SO much today. Be proud of yourself!",
    ],
    csKeywordResponses: {
      algorithm:
        "Algorithms are like recipes for your code! 📋 They're step-by-step instructions to solve a problem. Want to practice one together?",
      loop: "Loops are your best friend for repetition! 🔄 `for` loops for known iterations, `while` loops when you don't know how many times. You've got this!",
      function:
        "Functions are reusable magic spells! ✨ You write them once and call them anywhere. They keep your code clean and DRY!",
      array:
        "Arrays are like a row of lockers 🗄️ Each locker has an index starting from 0! They're great for storing ordered collections.",
      recursion:
        "Recursion is a function calling itself! 🌀 Think of it like Russian dolls — each doll contains a smaller version. Base case is key!",
      pointer:
        "Pointers store memory addresses 📍 They're like giving someone your home address instead of bringing your house to them!",
      class:
        "Classes are blueprints for objects! 🏗️ Like a cookie cutter — the class is the cutter, objects are the cookies you make!",
      stack:
        "A Stack is LIFO — Last In, First Out! 📚 Like a stack of books, you take from the top. Used in undo operations and recursion!",
      queue:
        "A Queue is FIFO — First In, First Out! 🎟️ Like waiting in line. Used in BFS, task scheduling, and more!",
    },
  },
  {
    id: "nova",
    defaultName: "Nova",
    personality: "witty",
    color: "#8C84D8",
    bgColor: "#F3F0FF",
    accentColor: "#8C84D8",
    image: "/assets/generated/companion-nova.dim_200x200.png",
    traits: "Sharp · Witty · Clever",
    greetings: [
      "Oh look who decided to show up to class 😏 Ready to outsmart some algorithms?",
      "Error 404: Excuses not found. Let's code! 🌟",
      "Your brain just booted up. Let's install some knowledge, shall we? 💜",
    ],
    encouragements: [
      "Well, that algorithm just got outsmarted by you 😏",
      "Error 404: Excuses not found. You've got this!",
      "Look who's becoming a coding legend 🌟",
      "Compiler approved. Your logic is clean! ✅",
      "Honestly? That was pretty impressive 😤",
    ],
    correctAnswerResponses: [
      "Boom. Correct. Obviously. You're basically a genius 😎 +XP!",
      "Wait... you actually got that? I'm impressed. Don't let it go to your head 😏",
      "Perfectly executed. I'd expect nothing less from you 🌟",
    ],
    wrongAnswerResponses: [
      "Hmm, not quite. But honestly? Wrong answers teach more than correct ones 🧠",
      "Almost! Your logic was close but the compiler disagrees. Let's debug it!",
      "Plot twist: that wasn't the answer. But we love a plot twist 📖 Let's review!",
    ],
    frustrationResponses: [
      "Frustration detected 🔍 Even the best coders hit walls. Yours is about to come down!",
      "Being stuck means you're at the edge of your knowledge — that's where growth happens 💡",
      "Debug mode activated: breathe, re-read, then outsmart the problem 😏",
    ],
    burnoutResponses: [
      "System overload detected 🚨 Even supercomputers need cooling. Step away for 10 mins!",
      "You've been crushing it hard today. Mandatory rest protocol initiated 💜",
    ],
    csKeywordResponses: {
      algorithm:
        "An algorithm is basically just a really fancy recipe 😏 Step-by-step, deterministic, efficient. Your brain runs algorithms all the time!",
      loop: "Loops: because copy-pasting 1000 times is not a solution 😂 `for`, `while`, `do-while` — pick your weapon!",
      function:
        "Functions: write once, call anywhere. DRY principle — Don't Repeat Yourself. Your code will thank you 🌟",
      array:
        "Arrays: ordered, zero-indexed, O(1) access. Simple but mighty 💪 The MVP of data structures!",
      recursion:
        "Recursion is when a function calls itself. To understand recursion, you must first understand recursion 🌀 Base case or infinite loop — your choice!",
      pointer:
        "Pointers: memory addresses with superpowers 💜 Master them and you'll understand why C++ programmers are either geniuses or insane!",
      class:
        "A class is like a DNA blueprint 🧬 It defines structure and behavior. Objects are the living creatures spawned from it!",
      stack:
        "Stack: plates at a buffet 🍽️ LIFO. Add to top, remove from top. The call stack in your program works exactly this way!",
      queue:
        "Queue: a civilized waiting line 🎟️ FIFO. Used everywhere — printers, task schedulers, your social anxiety at parties!",
    },
  },
  {
    id: "zen",
    defaultName: "Zen",
    personality: "calm",
    color: "#4BAF8C",
    bgColor: "#F0FFF8",
    accentColor: "#4BAF8C",
    image: "/assets/generated/companion-zen.dim_200x200.png",
    traits: "Calm · Focused · Patient",
    greetings: [
      "Welcome back. Let's create a peaceful learning space together 🌿",
      "Take a breath. You're here, you're ready. That's all you need 🍃",
      "Every session is a step forward. I'm honored to walk this path with you 🌱",
    ],
    encouragements: [
      "Take a breath. You understand this more than you think.",
      "Progress is progress, no matter how small. 🌿",
      "Let's work through this together, step by step.",
      "You are more capable than your doubts suggest 🍃",
      "Steady and mindful — that's the way forward.",
    ],
    correctAnswerResponses: [
      "Well done. Your understanding grows deeper with each answer 🌱",
      "That's correct. Notice how understanding feels — hold onto that feeling 🍃",
      "Excellent. Clarity leads to mastery. You're on the right path 🌿",
    ],
    wrongAnswerResponses: [
      "That wasn't quite right, and that's perfectly okay 🌿 Every error is a teacher.",
      "Let's revisit that together with fresh eyes. The answer will come 🍃",
      "Mistakes are the soil in which knowledge grows 🌱 Let's explore why.",
    ],
    frustrationResponses: [
      "I can sense the tension 🌿 Pause. Breathe. The solution exists — we just need to find it calmly.",
      "Frustration is a signal that you care deeply. That's beautiful. Now let's channel it productively 🍃",
      "Step back for a moment. Sometimes the answer appears when we stop forcing it 🌱",
    ],
    burnoutResponses: [
      "Rest is not surrender — it's wisdom 🌿 Your mind needs space to integrate what it has learned.",
      "You have done meaningful work today. Honor your effort with genuine rest 🍃",
    ],
    csKeywordResponses: {
      algorithm:
        "An algorithm is a mindful sequence of steps 🌿 Clear, purposeful, efficient. Like a meditation practice — each step has intention.",
      loop: "Loops embody the principle of repetition in learning 🔄 Each iteration builds understanding. `for` loops when the count is known, `while` for open-ended processes.",
      function:
        "Functions are acts of distillation ✨ You take complexity and give it a name. Then you can call upon that wisdom anywhere.",
      array:
        "An array holds elements in ordered harmony 🌱 Like stones in a Zen garden, each has its place and index.",
      recursion:
        "Recursion is beautiful in its self-reference 🌀 A function that contains itself. The base case is the moment of stillness that ends the recursion.",
      pointer:
        "Pointers are references to memory addresses 🍃 Rather than moving the data, you point to where it lives. Elegant and efficient.",
      class:
        "A class is the archetype 🌿 The abstract form from which concrete instances emerge. Blueprint and reality, intertwined.",
      stack:
        "The Stack follows natural order — last placed, first removed 🪨 Like removing layers of sediment. Used in DFS and program execution.",
      queue:
        "The Queue embodies patience 🌊 First come, first served. Orderly, fair, systematic. Perfect for BFS and scheduling.",
    },
  },
];

export const getPersonalityConfig = (
  personality: PersonalityType,
): CompanionConfig => {
  const map: Record<PersonalityType, string> = {
    encouraging: "sakura",
    witty: "nova",
    calm: "zen",
    playful: "sakura",
  };
  return (
    COMPANION_PRESETS.find((c) => c.id === map[personality]) ??
    COMPANION_PRESETS[0]
  );
};
