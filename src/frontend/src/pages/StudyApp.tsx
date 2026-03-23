import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Award,
  BookOpen,
  Calendar,
  Code,
  ExternalLink,
  FileText,
  Flame,
  Home,
  LayoutDashboard,
  LogOut,
  Phone,
  Play,
  Send,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import { COMPANION_PRESETS } from "../data/companions";
import { useAddMessage } from "../hooks/useQueries";
import { useResponseQueue } from "../hooks/useResponseQueue";
import EventsPage from "./EventsPage";

const XP_PER_LEVEL = 100;

const FRUSTRATION_KEYWORDS = [
  "stuck",
  "confused",
  "help",
  "frustrated",
  "don't understand",
  "dont understand",
  "hard",
  "difficult",
  "lost",
  "idk",
  "no idea",
];
const CS_KEYWORDS = [
  "algorithm",
  "loop",
  "function",
  "array",
  "recursion",
  "pointer",
  "class",
  "stack",
  "queue",
  "tree",
  "graph",
  "sort",
  "search",
];

const BREAK_TIPS = [
  "💧 Drink some water! Hydration boosts focus.",
  "🚶 Take a 5-min walk — your brain will thank you!",
  "👁️ Look 20 feet away for 20 seconds. Eye care matters!",
  "🧘 Take 3 deep breaths. Stress less, learn more.",
  "🍎 Grab a healthy snack to fuel your brain!",
  "✋ Stretch your hands and wrists — programmer self-care!",
  "😴 A short power nap (10 min) can reset your focus.",
  "🎵 Listen to lo-fi beats for a calm study session.",
];

const STUDY_MODULES = [
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    icon: "🗄️",
    description: "Arrays, Linked Lists, Trees, Graphs, Sorting",
    difficulty: "Advanced",
    diffColor: "text-red-400 bg-red-500/10",
    topics: [
      "Arrays",
      "Linked Lists",
      "Trees",
      "Graphs",
      "Sorting",
      "Searching",
    ],
    resources: [
      {
        type: "pdf",
        label: "DS Visualization",
        url: "https://www.cs.usfca.edu/~galles/visualization/Algorithms.html",
      },
      {
        type: "pdf",
        label: "Big-O Reference",
        url: "https://bigocheatsheet.com",
      },
      {
        type: "video",
        label: "Arrays & Linked Lists",
        url: "https://www.youtube.com/watch?v=RBSGKlAvoiM",
      },
      {
        type: "video",
        label: "Trees & Graphs",
        url: "https://www.youtube.com/watch?v=JeznW_7DlB0",
      },
    ],
    quiz: [
      {
        q: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        correct: 1,
      },
      {
        q: "Which data structure uses LIFO ordering?",
        options: ["Queue", "Array", "Stack", "Graph"],
        correct: 2,
      },
      {
        q: "What is the worst-case time complexity of quicksort?",
        options: ["O(n log n)", "O(n\u00b2)", "O(log n)", "O(n)"],
        correct: 1,
      },
      {
        q: "A binary tree has a maximum of how many children per node?",
        options: ["1", "2", "3", "4"],
        correct: 1,
      },
      {
        q: "Which sorting algorithm has O(n log n) average case?",
        options: [
          "Bubble Sort",
          "Insertion Sort",
          "Merge Sort",
          "Selection Sort",
        ],
        correct: 2,
      },
    ],
  },
  {
    id: "web",
    title: "Web Development",
    icon: "🌐",
    description: "HTML, CSS, JavaScript, React, APIs",
    difficulty: "Intermediate",
    diffColor: "text-amber-400 bg-amber-500/10",
    topics: ["HTML5", "CSS3", "JavaScript ES6+", "React", "REST APIs"],
    resources: [
      {
        type: "pdf",
        label: "JS Cheat Sheet",
        url: "https://htmlcheatsheet.com/js/",
      },
      {
        type: "video",
        label: "JavaScript Full Course",
        url: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
      },
      {
        type: "video",
        label: "React Crash Course",
        url: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
      },
    ],
    quiz: [
      {
        q: "Which HTML tag is used for the largest heading?",
        options: ["<h6>", "<h1>", "<heading>", "<header>"],
        correct: 1,
      },
      {
        q: "What does CSS stand for?",
        options: [
          "Computer Style Sheets",
          "Cascading Style Sheets",
          "Creative Style System",
          "Colorful Style Sheets",
        ],
        correct: 1,
      },
      {
        q: "Which method adds an element to the end of an array in JS?",
        options: ["push()", "pop()", "shift()", "append()"],
        correct: 0,
      },
      {
        q: "What is JSX in React?",
        options: [
          "A JS library",
          "A database query language",
          "A syntax extension for JS",
          "A CSS preprocessor",
        ],
        correct: 2,
      },
      {
        q: "What HTTP method is used to fetch data from a server?",
        options: ["POST", "DELETE", "PUT", "GET"],
        correct: 3,
      },
    ],
  },
  {
    id: "python",
    title: "Python Programming",
    icon: "🐍",
    description: "Basics, OOP, Data Science, Flask",
    difficulty: "Beginner",
    diffColor: "text-green-400 bg-green-500/10",
    topics: ["Python Basics", "OOP", "NumPy/Pandas", "Flask", "Data Science"],
    resources: [
      {
        type: "pdf",
        label: "Python Cheat Sheet",
        url: "https://www.pythoncheatsheet.org/",
      },
      {
        type: "video",
        label: "Python for Beginners",
        url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
      },
      {
        type: "video",
        label: "Python OOP Tutorial",
        url: "https://www.youtube.com/watch?v=ZDa-Z5JzLYM",
      },
    ],
    quiz: [
      {
        q: "Which keyword is used to define a function in Python?",
        options: ["function", "def", "func", "define"],
        correct: 1,
      },
      {
        q: "What is the output of print(type([]))?",
        options: ["<class 'list'>", "<class 'array'>", "list", "array"],
        correct: 0,
      },
      {
        q: "Which of these is a mutable data type in Python?",
        options: ["tuple", "string", "list", "int"],
        correct: 2,
      },
      {
        q: "What does 'self' refer to in a Python class?",
        options: [
          "The parent class",
          "The class itself",
          "The current instance",
          "A global variable",
        ],
        correct: 2,
      },
      {
        q: "Which library is used for data manipulation in Python?",
        options: ["NumPy", "Pandas", "Matplotlib", "Requests"],
        correct: 1,
      },
    ],
  },
  {
    id: "java",
    title: "Java Programming",
    icon: "☕",
    description: "OOP, Collections, Multithreading",
    difficulty: "Intermediate",
    diffColor: "text-amber-400 bg-amber-500/10",
    topics: [
      "Java Basics",
      "OOP Principles",
      "Collections",
      "Multithreading",
      "Generics",
    ],
    resources: [
      {
        type: "pdf",
        label: "Java Cheat Sheet",
        url: "https://introcs.cs.princeton.edu/java/11cheatsheet/",
      },
      {
        type: "video",
        label: "Java Full Course",
        url: "https://www.youtube.com/watch?v=eIrMbAQSU34",
      },
    ],
    quiz: [
      {
        q: "Which keyword makes a variable constant in Java?",
        options: ["static", "const", "final", "immutable"],
        correct: 2,
      },
      {
        q: "What is the default value of an int in Java?",
        options: ["null", "undefined", "0", "-1"],
        correct: 2,
      },
      {
        q: "Which collection maintains insertion order in Java?",
        options: ["HashSet", "TreeSet", "LinkedList", "HashMap"],
        correct: 2,
      },
      {
        q: "What is method overloading?",
        options: [
          "Same name, different parameters",
          "Same name, same parameters",
          "Different class, same method",
          "Overriding parent method",
        ],
        correct: 0,
      },
      {
        q: "Which Java keyword is used for inheritance?",
        options: ["inherits", "extends", "implements", "super"],
        correct: 1,
      },
    ],
  },
  {
    id: "os",
    title: "Operating Systems",
    icon: "💻",
    description: "Processes, Memory, File Systems",
    difficulty: "Advanced",
    diffColor: "text-red-400 bg-red-500/10",
    topics: [
      "Processes & Threads",
      "Memory Management",
      "File Systems",
      "Deadlocks",
      "Scheduling",
    ],
    resources: [
      {
        type: "pdf",
        label: "OS Concepts PDF",
        url: "https://www.os-book.com/OS10/",
      },
      {
        type: "video",
        label: "OS by Neso Academy",
        url: "https://www.youtube.com/watch?v=vBURTt97EkA",
      },
    ],
    quiz: [
      {
        q: "What is a deadlock in OS?",
        options: [
          "A crashed process",
          "Circular wait between processes",
          "Memory overflow",
          "CPU overload",
        ],
        correct: 1,
      },
      {
        q: "Which scheduling algorithm gives priority to shortest job?",
        options: ["FCFS", "Round Robin", "SJF", "Priority"],
        correct: 2,
      },
      {
        q: "Virtual memory allows programs to use more memory than?",
        options: ["Hard disk space", "Physical RAM", "CPU cache", "GPU memory"],
        correct: 1,
      },
      {
        q: "What is a semaphore used for?",
        options: [
          "Memory allocation",
          "Process synchronization",
          "File management",
          "CPU scheduling",
        ],
        correct: 1,
      },
      {
        q: "Thrashing occurs when?",
        options: [
          "Too many files open",
          "CPU is idle",
          "Excessive page swapping",
          "Network is overloaded",
        ],
        correct: 2,
      },
    ],
  },
  {
    id: "networks",
    title: "Computer Networks",
    icon: "🌐",
    description: "OSI Model, TCP/IP, HTTP, Security",
    difficulty: "Intermediate",
    diffColor: "text-amber-400 bg-amber-500/10",
    topics: ["OSI Model", "TCP/IP", "HTTP/HTTPS", "DNS", "Network Security"],
    resources: [
      {
        type: "pdf",
        label: "Networking Basics",
        url: "https://www.cisco.com/c/en/us/solutions/small-business/resource-center/networking/networking-basics.html",
      },
      {
        type: "video",
        label: "Computer Networks",
        url: "https://www.youtube.com/watch?v=qiQR5rTSshw",
      },
    ],
    quiz: [
      {
        q: "How many layers does the OSI model have?",
        options: ["4", "5", "6", "7"],
        correct: 3,
      },
      {
        q: "Which protocol is used for reliable data transmission?",
        options: ["UDP", "IP", "TCP", "HTTP"],
        correct: 2,
      },
      {
        q: "What does DNS stand for?",
        options: [
          "Dynamic Network Service",
          "Domain Name System",
          "Data Network Server",
          "Distributed Name Service",
        ],
        correct: 1,
      },
      {
        q: "Which port does HTTPS use by default?",
        options: ["80", "443", "8080", "22"],
        correct: 1,
      },
      {
        q: "What is the purpose of ARP?",
        options: [
          "Resolve IP to MAC address",
          "Encrypt data",
          "Route packets",
          "Assign IP addresses",
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "dbms",
    title: "Database Management",
    icon: "🗃️",
    description: "SQL, NoSQL, Normalization, Transactions",
    difficulty: "Intermediate",
    diffColor: "text-amber-400 bg-amber-500/10",
    topics: ["SQL Basics", "Joins", "Normalization", "Transactions", "NoSQL"],
    resources: [
      {
        type: "pdf",
        label: "SQL Cheat Sheet",
        url: "https://www.sqltutorial.org/sql-cheat-sheet/",
      },
      {
        type: "video",
        label: "SQL Full Course",
        url: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
      },
    ],
    quiz: [
      {
        q: "Which SQL clause filters records?",
        options: ["ORDER BY", "GROUP BY", "WHERE", "HAVING"],
        correct: 2,
      },
      {
        q: "What does ACID stand for in databases?",
        options: [
          "Atomicity, Consistency, Isolation, Durability",
          "Array, Class, Index, Data",
          "Access, Control, Integrity, Distribution",
          "Algorithm, Compute, Input, Delete",
        ],
        correct: 0,
      },
      {
        q: "Which normal form eliminates partial dependency?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correct: 1,
      },
      {
        q: "Which SQL join returns all records from both tables?",
        options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
        correct: 3,
      },
      {
        q: "MongoDB is what type of database?",
        options: ["Relational", "Graph", "NoSQL Document", "Time-series"],
        correct: 2,
      },
    ],
  },
  {
    id: "ml",
    title: "Machine Learning",
    icon: "🧠",
    description: "Supervised, Unsupervised, Neural Networks",
    difficulty: "Advanced",
    diffColor: "text-red-400 bg-red-500/10",
    topics: [
      "Supervised Learning",
      "Unsupervised Learning",
      "Neural Networks",
      "Evaluation Metrics",
      "Feature Engineering",
    ],
    resources: [
      {
        type: "pdf",
        label: "ML Cheat Sheet",
        url: "https://ml-cheatsheet.readthedocs.io/",
      },
      {
        type: "video",
        label: "ML by Andrew Ng",
        url: "https://www.youtube.com/watch?v=jGwO_UgTS7I",
      },
    ],
    quiz: [
      {
        q: "Which algorithm is used for classification?",
        options: ["Linear Regression", "K-Means", "Logistic Regression", "PCA"],
        correct: 2,
      },
      {
        q: "What is overfitting?",
        options: [
          "Model performs well on test data only",
          "Model too complex, memorizes training data",
          "Model is too simple",
          "Training takes too long",
        ],
        correct: 1,
      },
      {
        q: "Which metric is used for classification performance?",
        options: ["RMSE", "MAE", "F1 Score", "R-Squared"],
        correct: 2,
      },
      {
        q: "Unsupervised learning involves?",
        options: [
          "Labeled data",
          "Unlabeled data",
          "Reinforcement signals",
          "Supervised feedback",
        ],
        correct: 1,
      },
      {
        q: "What is a neuron in neural networks?",
        options: [
          "A data point",
          "A weighted computation unit",
          "A loss function",
          "A training algorithm",
        ],
        correct: 1,
      },
    ],
  },
];

interface ModuleQuizState {
  moduleId: string;
  currentQ: number;
  selected: number | null;
  answered: boolean;
  score: number;
  finished: boolean;
}

const TypingIndicator = ({ companionImg }: { companionImg: string }) => (
  <div className="flex items-end gap-3 slide-in-up">
    <img
      src={companionImg}
      alt="companion"
      className="w-8 h-8 rounded-full object-cover shrink-0"
    />
    <div className="bg-card border border-border rounded-2xl px-4 py-3">
      <div className="flex gap-1.5 items-center">
        <span className="typing-dot w-2 h-2 rounded-full bg-primary/60" />
        <span className="typing-dot w-2 h-2 rounded-full bg-primary/60" />
        <span className="typing-dot w-2 h-2 rounded-full bg-primary/60" />
        <span className="text-xs text-muted-foreground ml-1">thinking...</span>
      </div>
    </div>
  </div>
);

type BottomTab = "chat" | "modules" | "events" | "problems" | "dashboard";

async function callAI(
  userMessage: string,
  companionName: string,
  personality: string,
  claudeKey: string,
  openaiKey: string,
): Promise<string> {
  const systemPrompt = `You are ${companionName}, an AI study companion with a ${personality} personality. Help students study Computer Science. Keep responses concise (2-3 sentences), warm, and educational. Use occasional relevant emojis.`;

  if (claudeKey) {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": claudeKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 150,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      }),
    });
    const data = await res.json();
    return data.content?.[0]?.text ?? "Hmm, let me think about that! 💭";
  }

  if (openaiKey) {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        max_tokens: 150,
      }),
    });
    const data = await res.json();
    return (
      data.choices?.[0]?.message?.content ?? "Hmm, let me think about that! 💭"
    );
  }

  throw new Error("No API key");
}

export default function StudyApp() {
  const {
    user,
    setUser,
    setPage,
    setCurrentProblemId,
    messages,
    addMessage,
    setShowLoveCall,
    frustrationCount,
    setFrustrationCount,
    xpFlash,
    setXpFlash,
    openaiKey,
    claudeKey,
    focusModeEnabled,
  } = useApp();
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [burnoutMode, setBurnoutMode] = useState(false);
  const [activeTab, setActiveTab] = useState<BottomTab>("chat");
  const [breakTipIdx, setBreakTipIdx] = useState(0);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [moduleQuiz, setModuleQuiz] = useState<ModuleQuizState | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const addMessageMutation = useAddMessage();
  const pick = useResponseQueue();

  const preset =
    COMPANION_PRESETS.find((p) => p.personality === user.personality) ??
    COMPANION_PRESETS[0];
  const companionImage = user.companionCustomPhoto || preset.image;
  const xpProgress = ((user.xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;
  const level = Math.floor(user.xp / XP_PER_LEVEL) + 1;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setBreakTipIdx((prev) => (prev + 1) % BREAK_TIPS.length);
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  const awayStartRef = useRef<number | null>(null);
  useEffect(() => {
    if (!focusModeEnabled) return;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        awayStartRef.current = Date.now();
      } else {
        const away = awayStartRef.current;
        if (away && Date.now() - away > 30000) {
          addMessage({
            role: "companion",
            text: `Hey! 👀 I noticed you were away for a bit~ Come back, let's focus! 💪`,
          });
        }
        awayStartRef.current = null;
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [focusModeEnabled, addMessage]);

  const generateResponse = useCallback(
    (text: string): string => {
      const lower = text.toLowerCase();
      for (const kw of CS_KEYWORDS) {
        if (lower.includes(kw) && preset.csKeywordResponses[kw]) {
          return preset.csKeywordResponses[kw];
        }
      }
      const isFrustrated = FRUSTRATION_KEYWORDS.some((kw) =>
        lower.includes(kw),
      );
      if (isFrustrated) {
        const newCount = frustrationCount + 1;
        setFrustrationCount(newCount);
        if (newCount >= 5) {
          setBurnoutMode(true);
          return pick(preset.burnoutResponses, `${preset.id}_burnout`);
        }
        return pick(preset.frustrationResponses, `${preset.id}_frustration`);
      }
      return pick(preset.encouragements, `${preset.id}_encouragement`);
    },
    [frustrationCount, preset, setFrustrationCount, pick],
  );

  const sendMessage = useCallback(async () => {
    const text = inputText.trim();
    if (!text) return;
    setInputText("");
    addMessage({ role: "user", text });
    setIsTyping(true);
    addMessageMutation.mutate({ role: "user", text });

    if (claudeKey || openaiKey) {
      try {
        const response = await callAI(
          text,
          user.companionName,
          user.personality,
          claudeKey,
          openaiKey,
        );
        setIsTyping(false);
        addMessage({ role: "companion", text: response });
        addMessageMutation.mutate({ role: "companion", text: response });
        setUser({ xp: user.xp + 2 });
        setXpFlash(2);
        setTimeout(() => setXpFlash(null), 1500);
      } catch {
        setIsTyping(false);
        const fallback = generateResponse(text);
        addMessage({ role: "companion", text: fallback });
        addMessageMutation.mutate({ role: "companion", text: fallback });
        setUser({ xp: user.xp + 2 });
        setXpFlash(2);
        setTimeout(() => setXpFlash(null), 1500);
      }
    } else {
      setTimeout(
        () => {
          const response = generateResponse(text);
          setIsTyping(false);
          addMessage({ role: "companion", text: response });
          addMessageMutation.mutate({ role: "companion", text: response });
          setUser({ xp: user.xp + 2 });
          setXpFlash(2);
          setTimeout(() => setXpFlash(null), 1500);
        },
        600 + Math.random() * 400,
      );
    }
  }, [
    inputText,
    addMessage,
    addMessageMutation,
    generateResponse,
    setUser,
    setXpFlash,
    user.xp,
    user.companionName,
    user.personality,
    claudeKey,
    openaiKey,
  ]);

  const greetingRef = useRef<{
    preset: typeof preset;
    addMsg: typeof addMessage;
  }>({
    preset,
    addMsg: addMessage,
  });
  greetingRef.current = { preset, addMsg: addMessage };
  const didGreet = useRef(false);
  useEffect(() => {
    if (!didGreet.current) {
      didGreet.current = true;
      const { preset: p, addMsg } = greetingRef.current;
      const greeting =
        p.greetings[Math.floor(Math.random() * p.greetings.length)];
      addMsg({ role: "companion", text: greeting });
    }
  }, []);

  // Module Quiz handlers
  const startModuleQuiz = (moduleId: string) => {
    setModuleQuiz({
      moduleId,
      currentQ: 0,
      selected: null,
      answered: false,
      score: 0,
      finished: false,
    });
  };

  const handleQuizAnswer = (idx: number) => {
    if (!moduleQuiz || moduleQuiz.answered) return;
    const mod = STUDY_MODULES.find((m) => m.id === moduleQuiz.moduleId);
    if (!mod) return;
    const correct = mod.quiz[moduleQuiz.currentQ].correct;
    const isCorrect = idx === correct;
    const newScore = isCorrect ? moduleQuiz.score + 1 : moduleQuiz.score;
    setModuleQuiz((prev) =>
      prev ? { ...prev, selected: idx, answered: true, score: newScore } : prev,
    );
  };

  const handleQuizNext = () => {
    if (!moduleQuiz) return;
    const mod = STUDY_MODULES.find((m) => m.id === moduleQuiz.moduleId);
    if (!mod) return;
    if (moduleQuiz.currentQ + 1 >= mod.quiz.length) {
      // Finished
      const xpEarned = moduleQuiz.score * 15;
      setUser({ xp: user.xp + xpEarned });
      setXpFlash(xpEarned);
      setTimeout(() => setXpFlash(null), 1500);
      setModuleQuiz((prev) => (prev ? { ...prev, finished: true } : prev));
    } else {
      setModuleQuiz((prev) =>
        prev
          ? {
              ...prev,
              currentQ: prev.currentQ + 1,
              selected: null,
              answered: false,
            }
          : prev,
      );
    }
  };

  const bottomNavItems: {
    tab: BottomTab;
    icon: React.ReactNode;
    label: string;
  }[] = [
    { tab: "chat", icon: <Home className="w-5 h-5" />, label: "Chat" },
    { tab: "modules", icon: <BookOpen className="w-5 h-5" />, label: "Study" },
    { tab: "events", icon: <Calendar className="w-5 h-5" />, label: "Events" },
    { tab: "problems", icon: <Code className="w-5 h-5" />, label: "Problems" },
    {
      tab: "dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Dashboard",
    },
  ];

  const handleTabClick = (tab: BottomTab) => {
    if (tab === "problems") {
      setCurrentProblemId(null);
      setPage("problems");
      return;
    }
    if (tab === "dashboard") {
      setPage("dashboard");
      return;
    }
    setActiveTab(tab);
  };

  const activeAILabel = claudeKey
    ? "🤖 Claude Active"
    : openaiKey
      ? "⚡ OpenAI Active"
      : "💬 Local Mode";

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
            <span className="text-primary text-xs font-bold">C&amp;C</span>
          </div>
          <span className="font-bold text-foreground">Code &amp; Crush</span>
          <span className="text-xs text-muted-foreground hidden sm:block bg-muted px-2 py-0.5 rounded-full">
            {activeAILabel}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden sm:block">
            Hi, <strong className="text-foreground">{user.username}</strong>!
          </span>
          <Button
            data-ocid="study.call.button"
            variant="ghost"
            size="sm"
            title="Love Call"
            onClick={() => setShowLoveCall(true)}
            className="rounded-full text-primary hover:text-primary/80"
          >
            <Phone className="w-4 h-4" />
          </Button>
          <Button
            data-ocid="study.logout.button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setUser({ isOnboarded: false });
              setPage("landing");
            }}
            className="rounded-full text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 bg-card border-r border-border flex flex-col p-4 gap-4 shrink-0 hidden md:flex">
          <div className="text-center py-4">
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              className={`w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 ring-4 shadow-glow ${
                burnoutMode ? "ring-red-500" : "ring-primary"
              }`}
            >
              <img
                src={companionImage}
                alt={user.companionName}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <h3 className="font-bold text-foreground">{user.companionName}</h3>
            <p className="text-xs text-muted-foreground">
              {preset.traits.split(" · ")[0]}
            </p>
          </div>

          <div className="bg-muted rounded-2xl p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                <Zap className="w-3 h-3 text-yellow-400" /> Level {level}
              </span>
              <span className="text-xs text-muted-foreground">
                {user.xp} XP
              </span>
            </div>
            <Progress value={xpProgress} className="h-2 rounded-full" />
            <p className="text-xs text-muted-foreground mt-1 text-right">
              {XP_PER_LEVEL - (user.xp % XP_PER_LEVEL)} XP to next level
            </p>
          </div>

          <div className="bg-muted rounded-2xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="font-bold text-foreground text-sm">
                {user.streak} Day Streak
              </p>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </div>
          </div>

          <div className="bg-muted rounded-2xl p-3">
            <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1">
              <Award className="w-3 h-3" /> Badges
            </p>
            {user.badges.length === 0 ? (
              <p
                className="text-xs text-muted-foreground"
                data-ocid="badges.empty_state"
              >
                Complete quizzes to earn badges! 🏆
              </p>
            ) : (
              <div className="flex flex-wrap gap-1">
                {user.badges.map((b) => (
                  <span
                    key={b}
                    className="text-xs bg-primary/20 text-primary border border-primary/30 rounded-full px-2 py-0.5"
                  >
                    {b}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-3 mt-auto">
            <p className="text-xs font-bold text-primary mb-1.5">
              💡 Break Tip
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={breakTipIdx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="text-xs text-foreground leading-relaxed"
              >
                {BREAK_TIPS[breakTipIdx]}
              </motion.p>
            </AnimatePresence>
          </div>
        </aside>

        {/* Center: Main Panel */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Study Modules */}
          {activeTab === "modules" && (
            <div className="flex-1 overflow-y-auto p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Study Modules
              </p>
              <div className="space-y-3 max-w-2xl mx-auto pb-20">
                {STUDY_MODULES.map((mod) => (
                  <div
                    key={mod.id}
                    data-ocid={`modules.${mod.id}.panel`}
                    className="rounded-2xl border border-border bg-card overflow-hidden"
                  >
                    <button
                      type="button"
                      data-ocid={`modules.${mod.id}.toggle`}
                      className="w-full flex items-center justify-between p-4 text-left"
                      onClick={() =>
                        setExpandedModule(
                          expandedModule === mod.id ? null : mod.id,
                        )
                      }
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{mod.icon}</span>
                        <div>
                          <div className="font-bold text-foreground text-sm">
                            {mod.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {mod.description}
                          </div>
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${mod.diffColor}`}
                          >
                            {mod.difficulty}
                          </span>
                        </div>
                      </div>
                      <motion.span
                        animate={{
                          rotate: expandedModule === mod.id ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                        className="text-muted-foreground text-lg shrink-0"
                      >
                        ▾
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {expandedModule === mod.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 space-y-3">
                            {/* Topics */}
                            <div className="flex flex-wrap gap-1.5">
                              {mod.topics.map((t) => (
                                <span
                                  key={t}
                                  className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                            {/* Resources */}
                            <div className="space-y-2">
                              {mod.resources.map((r) => (
                                <a
                                  key={r.url}
                                  href={r.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 bg-muted rounded-xl px-3 py-2.5 hover:bg-accent transition-colors border border-border"
                                >
                                  {r.type === "pdf" ? (
                                    <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                                  ) : (
                                    <Play className="w-4 h-4 text-red-400 shrink-0" />
                                  )}
                                  <span className="text-sm font-medium text-foreground flex-1">
                                    {r.label}
                                  </span>
                                  <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0" />
                                </a>
                              ))}
                            </div>
                            {/* Quiz Button */}
                            <Button
                              data-ocid={`modules.${mod.id}.quiz.button`}
                              onClick={() => startModuleQuiz(mod.id)}
                              className="w-full rounded-xl h-10 bg-primary text-primary-foreground font-semibold"
                            >
                              📝 Take Quiz ({mod.quiz.length} questions)
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === "events" && <EventsPage />}

          {/* Gemini-Style Chat */}
          {activeTab === "chat" && (
            <>
              <ScrollArea className="flex-1 px-4 py-6">
                <div className="space-y-6 max-w-[700px] mx-auto">
                  {messages.length === 0 && (
                    <div
                      className="text-center py-16"
                      data-ocid="chat.empty_state"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-primary/30"
                      >
                        <img
                          src={companionImage}
                          alt={user.companionName}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <h3 className="text-lg font-bold text-foreground mb-1">
                        {user.companionName}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Start a conversation! Ask me anything about CS 💻
                      </p>
                    </div>
                  )}
                  <AnimatePresence initial={false}>
                    {messages.map((msg, i) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        data-ocid={`chat.message.${i + 1}`}
                      >
                        {msg.role === "companion" ? (
                          <div className="flex items-start gap-3">
                            <img
                              src={companionImage}
                              alt="companion"
                              className="w-8 h-8 rounded-full object-cover shrink-0 mt-1"
                            />
                            <div className="flex-1">
                              <p className="text-xs font-semibold text-primary mb-1.5">
                                {user.companionName}
                              </p>
                              <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed text-foreground">
                                {msg.text}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-end">
                            <div className="max-w-[75%]">
                              <p className="text-xs text-muted-foreground text-right mb-1.5">
                                You
                              </p>
                              <div className="bg-primary/15 border border-primary/20 rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed text-foreground">
                                {msg.text}
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {isTyping && (
                    <TypingIndicator companionImg={companionImage} />
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* XP Flash */}
              <AnimatePresence>
                {xpFlash !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 0, scale: 0.5 }}
                    animate={{ opacity: 1, y: -40, scale: 1.2 }}
                    exit={{ opacity: 0, y: -80, scale: 0.8 }}
                    className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground font-extrabold text-xl px-5 py-2 rounded-full shadow-lg pointer-events-none z-40 flex items-center gap-1"
                  >
                    ⚡ +{xpFlash} XP!
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Gemini-style Input */}
              <div className="bg-background border-t border-border p-4 pb-2">
                <div className="max-w-[700px] mx-auto">
                  <div className="flex items-end gap-2 bg-card border border-border rounded-2xl px-4 py-3 focus-within:border-primary/50 transition-colors">
                    <textarea
                      data-ocid="chat.message.input"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      placeholder={`Ask ${user.companionName} anything...`}
                      rows={1}
                      className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground resize-none outline-none text-sm leading-relaxed min-h-[24px] max-h-32"
                      style={{ scrollbarWidth: "none" }}
                    />
                    <Button
                      data-ocid="chat.send.button"
                      onClick={sendMessage}
                      disabled={!inputText.trim() || isTyping}
                      size="sm"
                      className="rounded-full w-9 h-9 p-0 bg-primary text-primary-foreground shrink-0 shadow-glow-sm"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    {user.companionName} can make mistakes. Verify important
                    info.
                  </p>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="bg-card border-t border-border shrink-0">
        <div className="flex items-stretch">
          {bottomNavItems.map((item) => (
            <button
              type="button"
              key={item.tab}
              data-ocid={`bottomnav.${item.tab}.button`}
              onClick={() => handleTabClick(item.tab)}
              className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 text-xs font-medium transition-colors ${
                activeTab === item.tab &&
                item.tab !== "problems" &&
                item.tab !== "dashboard"
                  ? "text-primary border-t-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Module Quiz Modal */}
      <AnimatePresence>
        {moduleQuiz &&
          (() => {
            const mod = STUDY_MODULES.find((m) => m.id === moduleQuiz.moduleId);
            if (!mod) return null;
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4"
                data-ocid="modules.quiz.modal"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-card-hover"
                >
                  {moduleQuiz.finished ? (
                    <div className="text-center">
                      <div className="text-5xl mb-3">
                        {moduleQuiz.score >= 4
                          ? "🎉"
                          : moduleQuiz.score >= 3
                            ? "👍"
                            : "💪"}
                      </div>
                      <h3 className="text-xl font-extrabold text-foreground mb-2">
                        Quiz Complete!
                      </h3>
                      <p className="text-muted-foreground mb-1">You scored</p>
                      <p className="text-4xl font-extrabold text-primary mb-4">
                        {moduleQuiz.score}/{mod.quiz.length}
                      </p>
                      <p className="text-sm text-foreground mb-6">
                        +{moduleQuiz.score * 15} XP earned!
                      </p>
                      <Button
                        data-ocid="modules.quiz.close.button"
                        onClick={() => setModuleQuiz(null)}
                        className="w-full rounded-full bg-primary text-primary-foreground font-semibold"
                      >
                        Done!
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-widest">
                            {mod.title}
                          </p>
                          <p className="text-sm font-semibold text-foreground">
                            Question {moduleQuiz.currentQ + 1} of{" "}
                            {mod.quiz.length}
                          </p>
                        </div>
                        <button
                          type="button"
                          data-ocid="modules.quiz.cancel.button"
                          onClick={() => setModuleQuiz(null)}
                          className="text-muted-foreground hover:text-foreground text-lg"
                        >
                          ×
                        </button>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5 mb-5">
                        <div
                          className="bg-primary h-1.5 rounded-full transition-all"
                          style={{
                            width: `${(moduleQuiz.currentQ / mod.quiz.length) * 100}%`,
                          }}
                        />
                      </div>
                      <p className="text-foreground font-semibold text-sm leading-relaxed mb-5">
                        {mod.quiz[moduleQuiz.currentQ].q}
                      </p>
                      <div className="space-y-2 mb-4">
                        {mod.quiz[moduleQuiz.currentQ].options.map(
                          (opt, idx) => {
                            let style =
                              "border-border bg-muted text-foreground";
                            if (moduleQuiz.answered) {
                              if (
                                idx === mod.quiz[moduleQuiz.currentQ].correct
                              ) {
                                style =
                                  "border-green-500 bg-green-500/10 text-green-300";
                              } else if (idx === moduleQuiz.selected) {
                                style =
                                  "border-red-500 bg-red-500/10 text-red-300";
                              }
                            } else if (moduleQuiz.selected === idx) {
                              style =
                                "border-primary bg-primary/10 text-primary";
                            }
                            return (
                              <button
                                type="button"
                                key={opt}
                                onClick={() => handleQuizAnswer(idx)}
                                disabled={moduleQuiz.answered}
                                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${style}`}
                              >
                                {opt}
                              </button>
                            );
                          },
                        )}
                      </div>
                      {moduleQuiz.answered && (
                        <Button
                          data-ocid="modules.quiz.next.button"
                          onClick={handleQuizNext}
                          className="w-full rounded-full bg-primary text-primary-foreground font-semibold"
                        >
                          {moduleQuiz.currentQ + 1 >= mod.quiz.length
                            ? "See Results"
                            : "Next Question"}
                        </Button>
                      )}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })()}
      </AnimatePresence>
    </div>
  );
}
