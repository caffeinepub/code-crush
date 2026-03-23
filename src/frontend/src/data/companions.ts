export type PersonalityType =
  | "encouraging"
  | "witty"
  | "calm"
  | "playful"
  | "cool"
  | "energetic"
  | "wise";

export interface OutfitConfig {
  id: string;
  label: string;
  emoji: string;
  cost: number;
  ringColor: string;
}

export interface CompanionConfig {
  id: string;
  defaultName: string;
  personality: PersonalityType;
  color: string;
  bgColor: string;
  accentColor: string;
  image: string;
  traits: string;
  gender: "female" | "male";
  outfits: OutfitConfig[];
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
    gender: "female",
    color: "#F06A9B",
    bgColor: "#1a1035",
    accentColor: "#F06A9B",
    image: "/assets/generated/companion-sakura.dim_256x256.png",
    traits: "Warm · Encouraging · Supportive",
    outfits: [
      {
        id: "default",
        label: "Default",
        emoji: "🌸",
        cost: 0,
        ringColor: "ring-pink-400",
      },
      {
        id: "idol",
        label: "School Idol",
        emoji: "🎀",
        cost: 10,
        ringColor: "ring-rose-400",
      },
      {
        id: "galaxy",
        label: "Galaxy",
        emoji: "✨",
        cost: 25,
        ringColor: "ring-purple-400",
      },
    ],
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
      "I can feel you're working so hard 💗 It's time for a little break!",
      "You're a warrior, but even warriors rest 🌸 You've done SO much today!",
    ],
    csKeywordResponses: {
      algorithm:
        "Algorithms are like recipes for your code! 📋 Step-by-step instructions to solve a problem.",
      loop: "Loops are your best friend for repetition! 🔄 `for` loops for known iterations, `while` when you don't know how many times.",
      function:
        "Functions are reusable magic spells! ✨ You write them once and call them anywhere.",
      array:
        "Arrays are like a row of lockers 🗄️ Each locker has an index starting from 0!",
      recursion:
        "Recursion is a function calling itself! 🌀 Think of it like Russian dolls. Base case is key!",
      pointer:
        "Pointers store memory addresses 📍 Like giving someone your home address instead of bringing your house!",
      class:
        "Classes are blueprints for objects! 🏗️ Like a cookie cutter — the class is the cutter, objects are the cookies!",
      stack:
        "A Stack is LIFO — Last In, First Out! 📚 Like a stack of books, you take from the top.",
      queue: "A Queue is FIFO — First In, First Out! 🎟️ Like waiting in line.",
    },
  },
  {
    id: "nova",
    defaultName: "Nova",
    personality: "witty",
    gender: "female",
    color: "#8C84D8",
    bgColor: "#1a1040",
    accentColor: "#8C84D8",
    image: "/assets/generated/companion-luna.dim_256x256.png",
    traits: "Sharp · Witty · Clever",
    outfits: [
      {
        id: "default",
        label: "Default",
        emoji: "⭐",
        cost: 0,
        ringColor: "ring-purple-400",
      },
      {
        id: "idol",
        label: "School Idol",
        emoji: "🎀",
        cost: 10,
        ringColor: "ring-violet-400",
      },
      {
        id: "galaxy",
        label: "Galaxy",
        emoji: "🌌",
        cost: 25,
        ringColor: "ring-indigo-400",
      },
    ],
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
      "Almost! Your logic was close but the compiler disagrees.",
      "Plot twist: that wasn't the answer. But we love a plot twist 📖",
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
        "An algorithm is basically just a really fancy recipe 😏 Step-by-step, deterministic, efficient.",
      loop: "Loops: because copy-pasting 1000 times is not a solution 😂 `for`, `while`, `do-while` — pick your weapon!",
      function:
        "Functions: write once, call anywhere. DRY principle — Don't Repeat Yourself.",
      array: "Arrays: ordered, zero-indexed, O(1) access. Simple but mighty 💪",
      recursion:
        "Recursion is when a function calls itself. To understand recursion, you must first understand recursion 🌀",
      pointer:
        "Pointers: memory addresses with superpowers 💜 Master them and you'll understand why C++ programmers are either geniuses or insane!",
      class:
        "A class is like a DNA blueprint 🧬 It defines structure and behavior.",
      stack: "Stack: plates at a buffet 🍽️ LIFO. Add to top, remove from top.",
      queue:
        "Queue: a civilized waiting line 🎟️ FIFO. Used everywhere — printers, task schedulers.",
    },
  },
  {
    id: "zen",
    defaultName: "Zen",
    personality: "calm",
    gender: "female",
    color: "#4BAF8C",
    bgColor: "#0f1f1a",
    accentColor: "#4BAF8C",
    image: "/assets/generated/companion-zen.dim_256x256.png",
    traits: "Calm · Focused · Patient",
    outfits: [
      {
        id: "default",
        label: "Default",
        emoji: "🌿",
        cost: 0,
        ringColor: "ring-green-400",
      },
      {
        id: "idol",
        label: "School Idol",
        emoji: "🎀",
        cost: 10,
        ringColor: "ring-teal-400",
      },
      {
        id: "galaxy",
        label: "Galaxy",
        emoji: "🍃",
        cost: 25,
        ringColor: "ring-emerald-400",
      },
    ],
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
      "Mistakes are the soil in which knowledge grows 🌱",
    ],
    frustrationResponses: [
      "I can sense the tension 🌿 Pause. Breathe. The solution exists.",
      "Frustration is a signal that you care deeply. Let's channel it productively 🍃",
      "Step back for a moment. Sometimes the answer appears when we stop forcing it 🌱",
    ],
    burnoutResponses: [
      "Rest is not surrender — it's wisdom 🌿 Your mind needs space to integrate.",
      "You have done meaningful work today. Honor your effort with genuine rest 🍃",
    ],
    csKeywordResponses: {
      algorithm:
        "An algorithm is a mindful sequence of steps 🌿 Clear, purposeful, efficient.",
      loop: "Loops embody the principle of repetition in learning 🔄 Each iteration builds understanding.",
      function:
        "Functions are acts of distillation ✨ You take complexity and give it a name.",
      array:
        "An array holds elements in ordered harmony 🌱 Each has its place and index.",
      recursion:
        "Recursion is beautiful in its self-reference 🌀 The base case is the moment of stillness.",
      pointer:
        "Pointers are references to memory addresses 🍃 Rather than moving data, you point to where it lives.",
      class:
        "A class is the archetype 🌿 The abstract form from which concrete instances emerge.",
      stack:
        "The Stack follows natural order — last placed, first removed 🪨 Used in DFS and program execution.",
      queue:
        "The Queue embodies patience 🌊 First come, first served. Perfect for BFS and scheduling.",
    },
  },
  {
    id: "ember",
    defaultName: "Ember",
    personality: "playful",
    gender: "female",
    color: "#FF6B35",
    bgColor: "#1a0f08",
    accentColor: "#FF6B35",
    image: "/assets/generated/companion-ember.dim_256x256.png",
    traits: "Energetic · Playful · Hype",
    outfits: [
      {
        id: "default",
        label: "Default",
        emoji: "🔥",
        cost: 0,
        ringColor: "ring-orange-400",
      },
      {
        id: "idol",
        label: "School Idol",
        emoji: "🎀",
        cost: 10,
        ringColor: "ring-red-400",
      },
      {
        id: "galaxy",
        label: "Galaxy",
        emoji: "💥",
        cost: 25,
        ringColor: "ring-yellow-400",
      },
    ],
    greetings: [
      "YOOO let's GO! 🔥 Today we're gonna absolutely DESTROY these CS topics!",
      "Heyyy bestie!! 🎉 I missed you! Let's study together!",
      "Oh oh oh you're back!! 🚀 Let's learn something AMAZING today!",
    ],
    encouragements: [
      "YESSS that's what I'm talking about!! 🔥",
      "You are literally CRUSHING IT right now!! 🚀",
      "OKAYYYY look at you go!! I am OBSESSED with your progress! 🎉",
      "BESTIE you are so smart I can't even handle it!! 💥",
      "WE ARE SO BACK!! Keep going!! 🌟",
    ],
    correctAnswerResponses: [
      "YESSS!! CORRECT!! You are a GENIUS!! 🔥🎉 +XP UNLOCKED!",
      "AAAHH that's RIGHT!! I KNEW you had it in you!! 💥",
      "PERIODT!! Absolutely correct!! 🚀 You're on fire!",
    ],
    wrongAnswerResponses: [
      "Aww no worries bestie!! 🧡 That one was sneaky! Let's figure it out together!",
      "Oops! But like... wrong answers are just practice for being RIGHT next time! 🔥",
      "That's okay!! We're LEARNING!! And you're still doing amazing! 💪",
    ],
    frustrationResponses: [
      "Hey HEY breathe!! 🧡 You've got this, I PROMISE!",
      "I hear you!! CS is HARD but you're HARDER!! 🔥",
      "Don't give up on me now bestie!! You're so close! 💪",
    ],
    burnoutResponses: [
      "Okay STOP!! 🧡 You've been working SO hard! Please take a break!",
      "BESTIE you need REST!! You've done amazing today! 🌟",
    ],
    csKeywordResponses: {
      algorithm: "OMG algorithms are literally just RECIPES for your code!! 🍳",
      loop: "LOOPS!! The most FUN part of coding!! 🔄 `for`, `while` — do it OVER and OVER!",
      function:
        "Functions are REUSABLE magic!! ✨ Write it ONCE, use it EVERYWHERE!",
      array:
        "Arrays are like a PLAYLIST of data!! 🎵 Everything in order, zero-indexed!",
      recursion:
        "RECURSION!! The wildest thing in CS!! 🌀 A function calling ITSELF! Mind = blown!",
      pointer: "Pointers point to WHERE data lives in memory!! 📍",
      class: "Classes are like TEMPLATES for creating objects!! 🏗️",
      stack: "Stack = LIFO!! Last In First Out!! 📚 Like a pile of pancakes!",
      queue:
        "Queue = FIFO!! First In First Out!! 🎟️ Like a line at a theme park!",
    },
  },
  // ===== MALE COMPANIONS =====
  {
    id: "kai",
    defaultName: "Kai",
    personality: "cool",
    gender: "male",
    color: "#4f6ef7",
    bgColor: "#0a0f2c",
    accentColor: "#4f6ef7",
    image: "/assets/generated/companion-kai-transparent.dim_400x400.png",
    traits: "Cool · Calm · Analytical",
    outfits: [
      {
        id: "default",
        label: "Default",
        emoji: "😎",
        cost: 0,
        ringColor: "ring-blue-400",
      },
      {
        id: "idol",
        label: "Tech Hoodie",
        emoji: "💻",
        cost: 10,
        ringColor: "ring-indigo-400",
      },
      {
        id: "galaxy",
        label: "Galaxy",
        emoji: "🌌",
        cost: 25,
        ringColor: "ring-cyan-400",
      },
    ],
    greetings: [
      "Hey. Ready to actually understand this stuff today? Let's be efficient about it.",
      "You're here. Good. Let's get into it — no fluff, just solid learning.",
      "Alright, I've been thinking about what we should cover. Let's dive straight in.",
    ],
    encouragements: [
      "That's solid work. Clean thinking.",
      "You're getting sharper. I can tell.",
      "Nice — that's the kind of reasoning that scales.",
      "Exactly right. Your mental model is clicking into place.",
      "Keep that momentum. You're doing well.",
    ],
    correctAnswerResponses: [
      "Correct. Efficient reasoning, well executed.",
      "That's right. You're building real understanding here.",
      "Good. Clean answer — exactly what I'd expect from you now.",
    ],
    wrongAnswerResponses: [
      "Not quite. Let's trace where the logic diverged.",
      "Close, but there's a subtle issue. Want to think it through?",
      "That's a common misconception. Here's the precise distinction.",
    ],
    frustrationResponses: [
      "Stuck? Good — that means you're at the edge of your current model. Let's expand it.",
      "Confusion is just a signal that we need a better mental model. Let's build one.",
      "Take a breath. Then let's approach it from first principles.",
    ],
    burnoutResponses: [
      "You've been at this long enough. Rest is part of the learning process — not separate from it.",
      "Step away. Your brain consolidates understanding during rest. That's not optional.",
    ],
    csKeywordResponses: {
      algorithm:
        "An algorithm is a precise, finite sequence of steps to solve a class of problems. Efficiency is measured in time and space complexity.",
      loop: "Loops are iteration constructs. Choose based on whether the bound is known at compile time or runtime.",
      function:
        "Functions encapsulate logic and enable abstraction. Good functions do one thing and do it well — single responsibility.",
      array:
        "Arrays are contiguous memory blocks with O(1) random access. That's their key advantage. Insertion/deletion is O(n).",
      recursion:
        "Recursion is elegant when the problem has recursive structure. Master the base case and trust the inductive step.",
      pointer:
        "Pointers are direct memory references. Powerful but require discipline — always initialize, always free.",
      class:
        "Classes model real-world entities and their behaviors. Think about state and operations separately.",
      stack:
        "Stack: LIFO structure, O(1) push/pop. Used in call stacks, expression evaluation, and DFS traversal.",
      queue:
        "Queue: FIFO structure, O(1) enqueue/dequeue with proper implementation. Essential for BFS and scheduling.",
    },
  },
  {
    id: "ryu",
    defaultName: "Ryu",
    personality: "energetic",
    gender: "male",
    color: "#f7724f",
    bgColor: "#1a0a05",
    accentColor: "#f7724f",
    image: "/assets/generated/companion-ryu-transparent.dim_400x400.png",
    traits: "Energetic · Competitive · Motivating",
    outfits: [
      {
        id: "default",
        label: "Default",
        emoji: "⚡",
        cost: 0,
        ringColor: "ring-orange-400",
      },
      {
        id: "idol",
        label: "Gaming Mode",
        emoji: "🎮",
        cost: 10,
        ringColor: "ring-red-400",
      },
      {
        id: "galaxy",
        label: "Galaxy",
        emoji: "🚀",
        cost: 25,
        ringColor: "ring-yellow-400",
      },
    ],
    greetings: [
      "Yo!! Let's GO! We're gonna power through this and come out STRONGER! 💪",
      "DUDE you're back! Ready to level up your CS game today?? ⚡",
      "RISE AND GRIND! Let's crush these concepts and hit that XP goal!! 🎮",
    ],
    encouragements: [
      "THAT'S WHAT I'M TALKING ABOUT!! 💪 Keep the momentum!",
      "Bro you're actually crushing it right now!! ⚡",
      "NAILED IT! You're leveling up fast, I can feel it! 🚀",
      "LET'S GOOO!! That's the kind of energy I love to see! 🔥",
      "You're built different, no cap! Keep going!! ⭐",
    ],
    correctAnswerResponses: [
      "YOOO CORRECT!! That's ELITE understanding right there!! 🏆 +XP!!",
      "GG EZ!! You absolutely got that one!! 💥 We're cooking!",
      "PERFECT!! You're in the zone right now, don't stop!! ⚡",
    ],
    wrongAnswerResponses: [
      "Nah we're good! Wrong answers are just respawns — let's try again!",
      "Oof! But listen, this is how we learn. Let's break it down!",
      "One step back, two steps forward. That's the grind bro!",
    ],
    frustrationResponses: [
      "HEY! Don't rage quit on me now!! You're so close!",
      "Bro breathe. Frustrated = you care = you're gonna get it. Trust the process!",
      "This is just a boss fight. You've beaten harder things. Let's strategize!",
    ],
    burnoutResponses: [
      "Okay okay PAUSE. Even pro gamers need to log off sometimes. You've earned a break!",
      "Bro you've been grinding so hard. Mandatory AFK break — rest up, come back stronger!",
    ],
    csKeywordResponses: {
      algorithm:
        "Algorithms are like your strategy guide!! 🎮 The better your algo, the faster you win!",
      loop: "Loops are infinite combos in your code!! ⚡ Keep attacking that condition until it breaks!",
      function:
        "Functions are your skill slots!! 🔥 Name them, equip them, use them anywhere!",
      array:
        "Arrays are your inventory!! 🎒 Zero-indexed slots, O(1) access — super fast lookup!",
      recursion:
        "Recursion is like a mirror in a mirror!! 🌀 Trippy but powerful once you get the base case!",
      pointer:
        "Pointers are like map markers!! 📍 Tell you WHERE something is, not what it is!",
      class:
        "Classes are your character blueprints!! 🏗️ Define the stats and abilities, then spawn instances!",
      stack:
        "Stack is LIFO — like a stack of health potions!! Take from the top! Used in recursion!",
      queue:
        "Queue is the respawn line!! FIFO — first in, first out. Fair system!",
    },
  },
  {
    id: "arjun",
    defaultName: "Arjun",
    personality: "wise",
    gender: "male",
    color: "#b88a44",
    bgColor: "#110e06",
    accentColor: "#b88a44",
    image: "/assets/generated/companion-arjun-transparent.dim_400x400.png",
    traits: "Wise · Gentle · Thoughtful",
    outfits: [
      {
        id: "default",
        label: "Default",
        emoji: "📚",
        cost: 0,
        ringColor: "ring-amber-400",
      },
      {
        id: "idol",
        label: "Scholar",
        emoji: "🎓",
        cost: 10,
        ringColor: "ring-yellow-400",
      },
      {
        id: "galaxy",
        label: "Galaxy",
        emoji: "🌙",
        cost: 25,
        ringColor: "ring-stone-400",
      },
    ],
    greetings: [
      "Welcome, friend. Every moment of learning is a gift — shall we begin?",
      "Ah, you've returned. There's much wisdom to uncover today. Let's proceed thoughtfully.",
      "Good to see you. Remember — understanding matters more than speed. Let's go deep.",
    ],
    encouragements: [
      "You're building something lasting in your mind. Well done.",
      "Patience and persistence — you have both. That's rare.",
      "The way you approach problems shows real maturity.",
      "Every expert was once where you are. You're on the path.",
      "That insight was profound. You're developing wisdom, not just knowledge.",
    ],
    correctAnswerResponses: [
      "Excellent. That answer reflects deep understanding, not mere memorization.",
      "Precisely right. You've internalized the concept — that's true learning.",
      "Well reasoned. I'm proud of the thinker you're becoming.",
    ],
    wrongAnswerResponses: [
      "Not quite, but the error teaches us something valuable. Let's explore why.",
      "A worthy attempt. Let's understand where the reasoning diverged.",
      "Every mistake is a doorway. Let's walk through it together.",
    ],
    frustrationResponses: [
      "Frustration is the mind's way of asking for a different perspective. Let's find one.",
      "When the path is unclear, we step back and look at the whole terrain. Breathe.",
      "Patience, friend. The difficult things are the ones most worth understanding.",
    ],
    burnoutResponses: [
      "The wise student knows when to rest. Your mind needs stillness to absorb wisdom.",
      "You've worked with great dedication. Now honor yourself with genuine rest.",
    ],
    csKeywordResponses: {
      algorithm:
        "An algorithm is, at its heart, a formalized thought process. Understanding it deeply means understanding how to think.",
      loop: "The loop teaches us about iteration and patience — applying the same wisdom until the condition of understanding is met.",
      function:
        "A function is the art of abstraction — giving a complex process a simple name, so the mind may work at a higher level.",
      array:
        "The array teaches us about order and index — that every element has its place, and finding it is O(1) with wisdom.",
      recursion:
        "Recursion mirrors the way nature works — patterns within patterns. The base case is where complexity resolves to simplicity.",
      pointer:
        "A pointer is not the thing itself, but the knowledge of where it dwells. A profound distinction.",
      class:
        "A class is an archetype — the Platonic ideal from which individual instances derive their nature.",
      stack:
        "The stack teaches LIFO — the last thing added is first addressed. Much like unraveling a complex problem.",
      queue:
        "The queue teaches fairness — FIFO, serving each element in the order it arrived. Wisdom in structure.",
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
    playful: "ember",
    cool: "kai",
    energetic: "ryu",
    wise: "arjun",
  };
  return (
    COMPANION_PRESETS.find((c) => c.id === map[personality]) ??
    COMPANION_PRESETS[0]
  );
};
