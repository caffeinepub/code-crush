import {
  BookOpen,
  ChevronDown,
  ExternalLink,
  Lock,
  Play,
  StickyNote,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  type CModule,
  type CPart,
  type CQuizQuestion,
  type CTestProblem,
  C_PROGRAMMING_COURSE,
} from "../data/cProgrammingCourse";
import { ROADMAPS, type Roadmap } from "../data/roadmaps";
import VideoPlayerPage from "./VideoPlayerPage";

// ─── Types ────────────────────────────────────────────────────────────────────

type View = "list" | "roadmap";

interface ActiveVideo {
  url: string;
  label: string;
  topicTitle: string;
  topicNotes: string;
}

interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
}

// ─── Generic Quiz Data ────────────────────────────────────────────────────────

const GENERIC_QUESTIONS: QuizQuestion[] = [
  {
    q: "What does 'API' stand for?",
    options: [
      "Application Programming Interface",
      "Automated Process Integration",
      "Application Process Instance",
      "Advanced Programming Input",
    ],
    correct: 0,
  },
  {
    q: "Which data structure follows LIFO (Last In, First Out)?",
    options: ["Queue", "Stack", "Linked List", "Tree"],
    correct: 1,
  },
  {
    q: "What is the time complexity of binary search?",
    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    correct: 2,
  },
  {
    q: "What does 'DRY' stand for in programming?",
    options: [
      "Do Repeat Yourself",
      "Don't Repeat Yourself",
      "Dynamic Resource Yielding",
      "Data Retrieval Yield",
    ],
    correct: 1,
  },
  {
    q: "Which HTTP method is used to send data to a server to create a resource?",
    options: ["GET", "DELETE", "PUT", "POST"],
    correct: 3,
  },
];

const TOPIC_QUIZZES: Record<string, QuizQuestion[]> = {
  "html-css": [
    {
      q: "Which HTML tag is used to define the most important heading?",
      options: ["<h6>", "<heading>", "<h1>", "<header>"],
      correct: 2,
    },
    {
      q: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Cascading Style Sheets",
        "Creative Style System",
        "Colorful Style Scripts",
      ],
      correct: 1,
    },
    {
      q: "Which CSS property controls the text size?",
      options: ["text-style", "font-size", "text-size", "font-style"],
      correct: 1,
    },
    {
      q: "What is the correct CSS syntax for making all <p> elements bold?",
      options: [
        "p {text-size: bold}",
        "<p style='font-size:bold'>",
        "p {font-weight: bold}",
        "p.all {font-weight: bold}",
      ],
      correct: 2,
    },
    {
      q: "Which HTML attribute specifies an alternate text for an image?",
      options: ["title", "src", "alt", "longdesc"],
      correct: 2,
    },
  ],
  "javascript-basics": [
    {
      q: "Which keyword declares a block-scoped variable in JavaScript?",
      options: ["var", "let", "const", "Both let and const"],
      correct: 3,
    },
    {
      q: "What does '===' check in JavaScript?",
      options: [
        "Value only",
        "Type only",
        "Value and type",
        "Reference equality",
      ],
      correct: 2,
    },
    {
      q: "What will 'typeof null' return in JavaScript?",
      options: ["null", "undefined", "object", "string"],
      correct: 2,
    },
    {
      q: "Which method removes the last element from an array and returns it?",
      options: ["shift()", "unshift()", "splice()", "pop()"],
      correct: 3,
    },
    {
      q: "What is a closure in JavaScript?",
      options: [
        "A way to close the browser tab",
        "A function with access to its outer scope's variables",
        "A method to end a loop",
        "An error handling technique",
      ],
      correct: 1,
    },
  ],
  "react-fundamentals": [
    {
      q: "What hook is used to manage state in a React functional component?",
      options: ["useEffect", "useContext", "useState", "useRef"],
      correct: 2,
    },
    {
      q: "What is JSX?",
      options: [
        "A JavaScript compiler",
        "A syntax extension for JavaScript that looks like HTML",
        "A new programming language",
        "A state management library",
      ],
      correct: 1,
    },
    {
      q: "Which hook is used for side effects in React?",
      options: ["useState", "useCallback", "useEffect", "useMemo"],
      correct: 2,
    },
    {
      q: "What is the correct way to update state when the new state depends on the previous state?",
      options: [
        "setState(newValue)",
        "setState((prev) => prev + 1)",
        "state = state + 1",
        "forceUpdate()",
      ],
      correct: 1,
    },
    {
      q: "What does the key prop do in React lists?",
      options: [
        "Encrypts list items",
        "Styles the list",
        "Helps React identify which items changed",
        "Prevents re-renders",
      ],
      correct: 2,
    },
  ],
  typescript: [
    {
      q: "What is the TypeScript type for a value that can be any type?",
      options: ["unknown", "any", "void", "never"],
      correct: 1,
    },
    {
      q: "How do you define an interface in TypeScript?",
      options: [
        "type MyInterface = {}",
        "interface MyInterface {}",
        "class MyInterface {}",
        "struct MyInterface {}",
      ],
      correct: 1,
    },
    {
      q: "What does the '?' symbol mean in a TypeScript interface property?",
      options: [
        "The property is required",
        "The property is private",
        "The property is optional",
        "The property is readonly",
      ],
      correct: 2,
    },
    {
      q: "What TypeScript utility type makes all properties optional?",
      options: ["Required<T>", "Partial<T>", "Readonly<T>", "Pick<T, K>"],
      correct: 1,
    },
    {
      q: "What is a TypeScript enum?",
      options: [
        "A class with only static methods",
        "A way to define named numeric/string constants",
        "An anonymous function type",
        "A type alias",
      ],
      correct: 1,
    },
  ],
  "python-basics": [
    {
      q: "How do you create a list in Python?",
      options: ["{1, 2, 3}", "(1, 2, 3)", "[1, 2, 3]", "<1, 2, 3>"],
      correct: 2,
    },
    {
      q: "What is the output of len('Hello')?",
      options: ["4", "5", "6", "Error"],
      correct: 1,
    },
    {
      q: "Which keyword is used to define a function in Python?",
      options: ["function", "fun", "def", "func"],
      correct: 2,
    },
    {
      q: "What does the 'self' parameter refer to in a Python class method?",
      options: [
        "The class itself",
        "The parent class",
        "The current instance of the class",
        "A static variable",
      ],
      correct: 2,
    },
    {
      q: "Which Python data structure is immutable?",
      options: ["list", "dict", "set", "tuple"],
      correct: 3,
    },
  ],
  "nodejs-express": [
    {
      q: "What is Node.js primarily used for?",
      options: [
        "Front-end development",
        "Server-side JavaScript execution",
        "Database management",
        "Mobile development",
      ],
      correct: 1,
    },
    {
      q: "Which command initializes a new Node.js project?",
      options: ["node start", "npm run", "npm init", "node init"],
      correct: 2,
    },
    {
      q: "In Express.js, which method handles GET requests?",
      options: ["app.post()", "app.get()", "app.fetch()", "app.request()"],
      correct: 1,
    },
    {
      q: "What is middleware in Express.js?",
      options: [
        "A database connector",
        "Functions that have access to req, res, and next",
        "A templating engine",
        "A routing system",
      ],
      correct: 1,
    },
    {
      q: "What does 'npm' stand for?",
      options: [
        "Node Package Manager",
        "New Program Module",
        "Next Process Method",
        "Node Process Monitor",
      ],
      correct: 0,
    },
  ],
  databases: [
    {
      q: "What does SQL stand for?",
      options: [
        "Simple Query Language",
        "Structured Query Language",
        "Sequential Query Logic",
        "Standard Query List",
      ],
      correct: 1,
    },
    {
      q: "Which SQL command is used to retrieve data from a database?",
      options: ["FETCH", "PULL", "SELECT", "RETRIEVE"],
      correct: 2,
    },
    {
      q: "What is a primary key in a database?",
      options: [
        "A key used to sort data",
        "A unique identifier for each record in a table",
        "The first column of a table",
        "A foreign key reference",
      ],
      correct: 1,
    },
    {
      q: "What does ACID stand for in database transactions?",
      options: [
        "Atomic, Consistent, Isolated, Durable",
        "Automated, Controlled, Indexed, Detailed",
        "Async, Cached, Indexed, Distributed",
        "Active, Connected, Integrated, Dynamic",
      ],
      correct: 0,
    },
    {
      q: "Which type of JOIN returns all rows from both tables when there is a match?",
      options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL OUTER JOIN"],
      correct: 2,
    },
  ],
  "git-github": [
    {
      q: "What command initializes a new Git repository?",
      options: ["git start", "git create", "git init", "git new"],
      correct: 2,
    },
    {
      q: "Which command stages all changed files for commit?",
      options: [
        "git commit -a",
        "git stage --all",
        "git add .",
        "git push --all",
      ],
      correct: 2,
    },
    {
      q: "What is a Git branch?",
      options: [
        "A copy of the entire repository",
        "A separate line of development",
        "A backup of a commit",
        "A remote repository",
      ],
      correct: 1,
    },
    {
      q: "What does 'git pull' do?",
      options: [
        "Uploads local commits to remote",
        "Fetches and merges changes from the remote repository",
        "Deletes a remote branch",
        "Creates a new local branch",
      ],
      correct: 1,
    },
    {
      q: "What is the purpose of a .gitignore file?",
      options: [
        "To store commit messages",
        "To list files Git should not track",
        "To configure Git settings",
        "To define merge strategies",
      ],
      correct: 1,
    },
  ],
  algorithms: [
    {
      q: "What is the time complexity of a linear search algorithm?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correct: 2,
    },
    {
      q: "Which sorting algorithm has the best average-case time complexity?",
      options: [
        "Bubble Sort",
        "Insertion Sort",
        "Quick Sort",
        "Selection Sort",
      ],
      correct: 2,
    },
    {
      q: "What does Big O notation describe?",
      options: [
        "The exact running time of an algorithm",
        "The upper bound of an algorithm's growth rate",
        "The memory usage of a program",
        "The number of lines of code",
      ],
      correct: 1,
    },
    {
      q: "What is a divide-and-conquer algorithm?",
      options: [
        "An algorithm that uses multiple threads",
        "An algorithm that breaks a problem into smaller subproblems",
        "An algorithm that always uses recursion",
        "An algorithm that uses greedy choices",
      ],
      correct: 1,
    },
    {
      q: "What is the space complexity of Merge Sort?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correct: 2,
    },
  ],
  "data-structures": [
    {
      q: "Which data structure uses FIFO (First In, First Out)?",
      options: ["Stack", "Queue", "Heap", "Tree"],
      correct: 1,
    },
    {
      q: "What is the time complexity for accessing an element in an array by index?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correct: 3,
    },
    {
      q: "What is a binary search tree?",
      options: [
        "A tree with exactly two children always",
        "A tree where left child < parent < right child",
        "A tree used only for binary data",
        "A sorted array represented as a tree",
      ],
      correct: 1,
    },
    {
      q: "What is the main advantage of a hash table?",
      options: [
        "Sorted data access",
        "O(1) average lookup time",
        "Memory efficiency",
        "Ordered insertion",
      ],
      correct: 1,
    },
    {
      q: "What is a graph in data structures?",
      options: [
        "A visual chart of data",
        "A collection of nodes connected by edges",
        "A sorted list of values",
        "A type of binary tree",
      ],
      correct: 1,
    },
  ],
};

// ─── C Course module unlock order ─────────────────────────────────────────────
const C_MODULE_ORDER = [
  "c-intro",
  "c-operators",
  "c-arrays",
  "c-functions",
  "c-pointers",
];

// ─── C Course localStorage helpers ────────────────────────────────────────────
function getCModuleUnlocked(moduleId: string): boolean {
  if (moduleId === "c-intro") return true;
  return localStorage.getItem(`c_module_unlock::${moduleId}`) === "true";
}
function setCModuleUnlocked(moduleId: string) {
  localStorage.setItem(`c_module_unlock::${moduleId}`, "true");
}
function getCPartDone(partId: string): boolean {
  return localStorage.getItem(`c_part_done::${partId}`) === "true";
}
function setCPartDone(partId: string) {
  localStorage.setItem(`c_part_done::${partId}`, "true");
}
function getCModuleQuizDone(moduleId: string): boolean {
  return localStorage.getItem(`c_module_quiz_done::${moduleId}`) === "true";
}
function setCModuleQuizDone(moduleId: string) {
  localStorage.setItem(`c_module_quiz_done::${moduleId}`, "true");
}
function getCModuleDone(moduleId: string): boolean {
  return localStorage.getItem(`c_module_done::${moduleId}`) === "true";
}
function setCModuleDone(moduleId: string) {
  localStorage.setItem(`c_module_done::${moduleId}`, "true");
}

// ─── C Quiz Modal ─────────────────────────────────────────────────────────────
interface CQuizModalProps {
  title: string;
  questions: CQuizQuestion[];
  onClose: () => void;
  onComplete: (score: number, total: number, xpEarned: number) => void;
  minPassPct?: number; // 0-100, default 0 (always passes)
}

function CQuizModal({
  title,
  questions,
  onClose,
  onComplete,
  minPassPct = 0,
}: CQuizModalProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null),
  );
  const [finished, setFinished] = useState(false);

  const handleSelect = (i: number) => {
    if (selectedOption !== null || finished) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = i;
    setAnswers(newAnswers);
    setSelectedOption(i);
  };

  const handleNext = () => {
    const nextQ = currentQ + 1;
    if (nextQ >= questions.length) {
      setFinished(true);
    } else {
      setCurrentQ(nextQ);
      setSelectedOption(null);
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setSelectedOption(null);
    setAnswers(new Array(questions.length).fill(null));
    setFinished(false);
  };

  const score = answers.filter((a, i) => a === questions[i]?.correct).length;
  const xpEarned = answers.reduce(
    (acc, a, i) =>
      (acc ?? 0) + (a === questions[i]?.correct ? (questions[i]?.xp ?? 10) : 0),
    0,
  );
  const passed =
    minPassPct === 0 || (score / questions.length) * 100 >= minPassPct;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      data-ocid="c-course.quiz_modal"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="w-full max-w-lg bg-card rounded-3xl shadow-2xl overflow-hidden border border-border"
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <h3 className="font-bold text-foreground text-base truncate flex-1 min-w-0">
            {title} 🧠
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="ml-3 p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {finished ? (
          <div className="px-6 pb-6">
            <div className="text-center py-6">
              <div className="text-5xl mb-3">
                {score >= Math.ceil(questions.length * 0.8)
                  ? "🏆"
                  : score >= Math.ceil(questions.length * 0.5)
                    ? "⭐"
                    : "💪"}
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {score}/{questions.length}
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                {passed
                  ? score >= Math.ceil(questions.length * 0.8)
                    ? "Excellent! You've mastered this topic! ✨"
                    : "Good effort! You passed. Keep reviewing."
                  : `Score below ${minPassPct}% — try again to pass.`}
              </div>
              <div className="inline-flex items-center gap-1.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full px-3 py-1 text-sm font-semibold">
                ⚡ +{xpEarned} XP earned
              </div>
            </div>
            <div className="space-y-2 mb-5">
              {questions.map((q, i) => {
                const isRight = answers[i] === q.correct;
                return (
                  <div
                    key={q.question.slice(0, 30)}
                    className={`rounded-xl px-3 py-2 border text-xs ${isRight ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}
                  >
                    <span className="font-semibold">{isRight ? "✓" : "✗"}</span>{" "}
                    {q.question.slice(0, 70)}
                    {q.question.length > 70 ? "..." : ""}
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleRetry}
                data-ocid="c-course.quiz_retry"
                className="flex-1 rounded-xl py-2.5 text-sm font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
              >
                🔄 Try Again
              </button>
              {passed && (
                <button
                  type="button"
                  onClick={() =>
                    onComplete(score, questions.length, xpEarned ?? 0)
                  }
                  data-ocid="c-course.quiz_done"
                  className="flex-1 rounded-xl py-2.5 text-sm font-semibold bg-cyan-500 text-white hover:bg-cyan-600 transition-colors"
                >
                  Continue ✓
                </button>
              )}
              {!passed && (
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-xl py-2.5 text-sm font-semibold bg-muted text-muted-foreground border border-border hover:bg-muted/70 transition-colors"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="px-6 pb-6">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-muted-foreground font-medium">
                  Question {currentQ + 1} of {questions.length}
                </span>
                <span className="text-xs text-cyan-400 font-semibold">
                  {Math.round((currentQ / questions.length) * 100)}% done
                </span>
              </div>
              <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${(currentQ / questions.length) * 100}%` }}
                  className="h-full bg-cyan-500 rounded-full"
                />
              </div>
            </div>
            <p className="font-bold text-foreground text-sm mb-4 leading-snug">
              {questions[currentQ].question}
            </p>
            <div className="space-y-2 mb-5">
              {questions[currentQ].options.map((opt, i) => {
                const isSelected = selectedOption === i;
                const isCorrect = questions[currentQ].correct === i;
                const answered = selectedOption !== null;
                let cls =
                  "w-full text-left rounded-xl px-4 py-3 text-sm font-medium border transition-all ";
                if (!answered)
                  cls +=
                    "bg-muted text-foreground border-border hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-300";
                else if (isCorrect)
                  cls +=
                    "bg-green-500/15 text-green-400 border-green-500/40 font-semibold";
                else if (isSelected && !isCorrect)
                  cls += "bg-red-500/15 text-red-400 border-red-500/40";
                else
                  cls +=
                    "bg-muted/50 text-muted-foreground border-border opacity-50";
                return (
                  <motion.button
                    key={`${i}-${opt.slice(0, 10)}`}
                    type="button"
                    whileTap={!answered ? { scale: 0.98 } : {}}
                    onClick={() => handleSelect(i)}
                    disabled={answered}
                    className={cls}
                  >
                    <span className="font-bold mr-2 text-xs opacity-60">
                      {["A", "B", "C", "D"][i]}.
                    </span>
                    {opt}
                    {answered && isCorrect && (
                      <span className="ml-2 text-green-400">✓</span>
                    )}
                    {answered && isSelected && !isCorrect && (
                      <span className="ml-2 text-red-400">✗</span>
                    )}
                  </motion.button>
                );
              })}
            </div>
            <AnimatePresence>
              {selectedOption !== null && (
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  type="button"
                  onClick={handleNext}
                  data-ocid="c-course.quiz_next"
                  className="w-full rounded-xl py-3 text-sm font-bold bg-cyan-500 text-white hover:bg-cyan-600 transition-colors"
                >
                  {currentQ + 1 >= questions.length
                    ? "See Results 🏆"
                    : "Next Question →"}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── C Part View ──────────────────────────────────────────────────────────────
interface CPartViewProps {
  part: CPart;
  moduleId: string;
  companionName: string;
  onBack: () => void;
  onPartComplete: (partId: string, xp: number) => void;
}

function CPartView({
  part,
  companionName,
  onBack,
  onPartComplete,
}: CPartViewProps) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([
    {
      role: "ai",
      text: `Hi! I'm ${companionName} 💙 Ask me anything about "${part.title}". I'm here to help!`,
    },
  ]);
  const [isAlreadyDone] = useState(() => getCPartDone(part.id));

  const ytId = part.videoUrl.includes("v=")
    ? part.videoUrl.split("v=")[1]?.split("&")[0]
    : part.videoUrl.split("/").pop();
  const embedUrl = `https://www.youtube-nocookie.com/embed/${ytId}?rel=0&modestbranding=1`;

  const handleGetSummary = () => {
    const lines = part.notes.split("\n").filter(Boolean).slice(0, 8);
    const bullets = lines.map((l) => `• ${l.trim()}`).join("\n");
    setSummary(bullets);
  };

  const handleChatSend = () => {
    const q = chatInput.trim();
    if (!q) return;
    setChatMessages((prev) => [...prev, { role: "user", text: q }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: `Great question about "${part.title}"! 🔵 Here's a hint: review the notes section above carefully — the answer is explained there. Try to connect it with what you just watched in the video. You've got this! 💡`,
        },
      ]);
    }, 600);
  };

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <button
            type="button"
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-foreground text-sm truncate">
              {part.title}
            </div>
            <div className="text-xs text-cyan-400">Programming in C</div>
          </div>
          {isAlreadyDone && (
            <span className="text-xs bg-green-500/15 text-green-400 border border-green-500/30 rounded-full px-2.5 py-0.5 font-semibold shrink-0">
              ✓ Done
            </span>
          )}
        </div>
      </div>

      <div className="px-4 pt-4 max-w-2xl mx-auto space-y-4">
        {/* Video */}
        <div className="rounded-2xl overflow-hidden border border-border bg-card">
          <div className="aspect-video w-full">
            <iframe
              src={embedUrl}
              title={part.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <div className="px-4 py-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {part.description}
            </span>
            <a
              href={part.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" /> YouTube
            </a>
          </div>
        </div>

        {/* Get Summary */}
        <button
          type="button"
          onClick={handleGetSummary}
          data-ocid="c-course.get_summary"
          className="w-full rounded-xl py-2.5 text-sm font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors flex items-center justify-center gap-2"
        >
          ✨ Get Summary
        </button>
        {summary && (
          <div className="rounded-xl bg-cyan-500/5 border border-cyan-500/20 px-4 py-3">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wide mb-2">
              📋 Topic Summary
            </div>
            <p className="text-xs text-foreground/80 leading-relaxed whitespace-pre-line">
              {summary}
            </p>
          </div>
        )}

        {/* Study Notes */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400 uppercase tracking-wide mb-1.5">
            <StickyNote className="w-3.5 h-3.5" /> Study Notes
          </div>
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl px-3 py-2.5">
            <p className="text-xs text-foreground/80 leading-relaxed whitespace-pre-line">
              {part.notes}
            </p>
          </div>
        </div>

        {/* Docs & References */}
        {part.docs.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wide mb-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Docs & References
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {part.docs.map((doc) => (
                <a
                  key={doc.url}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-emerald-500/5 border border-emerald-500/20 px-3 py-2 hover:bg-emerald-500/10 transition-colors group"
                >
                  <ExternalLink className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="text-xs font-medium text-foreground flex-1 group-hover:text-emerald-300 transition-colors">
                    {doc.label}
                  </span>
                  <span className="text-xs text-emerald-400/60">↗</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Companion Chat */}
        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-cyan-500/20 bg-cyan-500/10">
            <span className="text-base">💙</span>
            <span className="text-xs font-bold text-cyan-400">
              Ask {companionName}
            </span>
            <span className="text-xs text-muted-foreground">
              (guidance only, no direct answers)
            </span>
          </div>
          <div
            className="h-44 overflow-y-auto px-3 py-3 space-y-2"
            data-ocid="c-course.chat_panel"
          >
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground"}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 px-3 pb-3">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
              placeholder="Ask about this topic…"
              data-ocid="c-course.chat_input"
              className="flex-1 rounded-xl bg-background border border-border px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/60"
            />
            <button
              type="button"
              onClick={handleChatSend}
              className="rounded-xl bg-cyan-500 text-white px-3 py-2 text-xs font-semibold hover:bg-cyan-600 transition-colors"
              data-ocid="c-course.chat_send"
            >
              Send
            </button>
          </div>
        </div>

        {/* Take Part Quiz */}
        <button
          type="button"
          onClick={() => setShowQuiz(true)}
          data-ocid="c-course.part_quiz_btn"
          className="w-full rounded-xl py-2.5 text-sm font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-colors flex items-center justify-center gap-2"
        >
          🧠 Take Part Quiz
        </button>
      </div>

      {/* Part Quiz Modal */}
      <AnimatePresence>
        {showQuiz && (
          <CQuizModal
            title={`${part.title} — Quiz`}
            questions={part.partQuiz}
            onClose={() => setShowQuiz(false)}
            onComplete={(_score, _total, xp) => {
              setShowQuiz(false);
              onPartComplete(part.id, xp);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── C Module Test View ───────────────────────────────────────────────────────
interface CModuleTestViewProps {
  module: CModule;
  onBack: () => void;
  onTestComplete: (moduleId: string, xp: number) => void;
}

function CModuleTestView({
  module,
  onBack,
  onTestComplete,
}: CModuleTestViewProps) {
  const problems = module.moduleTest;
  const [codes, setCodes] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const p of problems) {
      init[p.id] = p.starterCode;
    }
    return init;
  });
  const [hintsRevealed, setHintsRevealed] = useState<Record<string, number>>(
    () => {
      const init: Record<string, number> = {};
      for (const p of problems) {
        init[p.id] = 0;
      }
      return init;
    },
  );
  const [attempted, setAttempted] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleRevealHint = (pid: string) => {
    setHintsRevealed((prev) => ({
      ...prev,
      [pid]: Math.min(
        (prev[pid] ?? 0) + 1,
        problems.find((p) => p.id === pid)?.hints.length ?? 3,
      ),
    }));
  };

  const handleSubmit = () => {
    const all: Record<string, boolean> = {};
    for (const p of problems) {
      all[p.id] = true;
    }
    setAttempted(all);
    setSubmitted(true);
    setShowCelebration(true);
    const xp = problems.length * 50;
    setTimeout(() => {
      setShowCelebration(false);
      onTestComplete(module.id, xp);
    }, 2800);
  };

  const attemptedCount = Object.values(attempted).filter(Boolean).length;

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <button
            type="button"
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-foreground text-sm truncate">
              {module.title} — Final Test
            </div>
            <div className="text-xs text-muted-foreground">
              {problems.length} programming problems • No hints chat
            </div>
          </div>
        </div>
      </div>

      {showCelebration && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
          <div className="text-center px-8">
            <div className="text-6xl mb-4">🎓</div>
            <div className="text-2xl font-bold text-foreground mb-2">
              Module Complete!
            </div>
            <div className="text-lg text-cyan-400 font-semibold mb-3">
              {attemptedCount}/{problems.length} problems attempted
            </div>
            <div className="inline-flex items-center gap-1.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full px-4 py-1.5 text-sm font-semibold">
              ⚡ +{problems.length * 50} XP earned
            </div>
          </div>
        </motion.div>
      )}

      <div className="px-4 pt-4 max-w-2xl mx-auto space-y-5">
        <div className="rounded-xl bg-cyan-500/5 border border-cyan-500/20 px-4 py-3">
          <p className="text-xs text-cyan-300 font-medium">
            📝 Final Module Test: Solve all problems by writing C code. No
            companion chat — use your knowledge and hints.
          </p>
        </div>

        {problems.map((problem, idx) => {
          const revealed = hintsRevealed[problem.id] ?? 0;
          const isDone = submitted || attempted[problem.id];
          return (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="rounded-2xl border border-border bg-card overflow-hidden"
              data-ocid="c-course.test_problem"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
                <span className="text-sm font-bold text-foreground">
                  {idx + 1}. {problem.title}
                </span>
                {isDone && (
                  <span className="text-xs bg-green-500/15 text-green-400 border border-green-500/30 rounded-full px-2 py-0.5 font-semibold">
                    Attempted
                  </span>
                )}
              </div>
              <div className="px-4 py-3 space-y-3">
                <p className="text-xs text-foreground/80 leading-relaxed">
                  {problem.description}
                </p>
                {problem.expectedOutput && (
                  <div className="rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground font-mono">
                    <span className="text-cyan-400 font-semibold">
                      Expected:{" "}
                    </span>
                    {problem.expectedOutput}
                  </div>
                )}
                {/* Code Editor */}
                <div className="rounded-xl overflow-hidden border border-border">
                  <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900 border-b border-border">
                    <span className="text-xs text-muted-foreground font-mono">
                      C Program
                    </span>
                    <span className="text-xs text-cyan-400">main.c</span>
                  </div>
                  <textarea
                    value={codes[problem.id]}
                    onChange={(e) =>
                      setCodes((prev) => ({
                        ...prev,
                        [problem.id]: e.target.value,
                      }))
                    }
                    spellCheck={false}
                    data-ocid="c-course.code_editor"
                    className="w-full h-48 bg-zinc-900 text-green-300 font-mono text-xs p-3 resize-none focus:outline-none focus:ring-1 focus:ring-cyan-500/50 leading-relaxed"
                    style={{ tabSize: 4 }}
                    onKeyDown={(e) => {
                      if (e.key === "Tab") {
                        e.preventDefault();
                        const ta = e.currentTarget;
                        const start = ta.selectionStart;
                        const end = ta.selectionEnd;
                        const val = ta.value;
                        ta.value = `${val.substring(0, start)}    ${val.substring(end)}`;
                        ta.selectionStart = ta.selectionEnd = start + 4;
                        setCodes((prev) => ({
                          ...prev,
                          [problem.id]: ta.value,
                        }));
                      }
                    }}
                  />
                </div>
                {/* Hints */}
                <div className="space-y-1.5">
                  {Array.from({ length: revealed }).map((_, hi) => (
                    <div
                      key={hi}
                      className="rounded-lg bg-amber-500/5 border border-amber-500/20 px-3 py-2 text-xs text-amber-300"
                    >
                      💡 <span className="font-semibold">Hint {hi + 1}:</span>{" "}
                      {problem.hints[hi]}
                    </div>
                  ))}
                  {revealed < problem.hints.length && (
                    <button
                      type="button"
                      onClick={() => handleRevealHint(problem.id)}
                      data-ocid="c-course.reveal_hint"
                      className="w-full rounded-lg py-2 text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
                    >
                      💡 Reveal Hint {revealed + 1} of {problem.hints.length}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}

        {!submitted && (
          <button
            type="button"
            onClick={handleSubmit}
            data-ocid="c-course.test_submit"
            className="w-full rounded-xl py-3 text-sm font-bold bg-cyan-500 text-white hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2"
          >
            🚀 Submit All Solutions
          </button>
        )}
        {submitted && (
          <div className="rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3 text-center">
            <div className="text-base font-bold text-green-400">
              ✅ Test Submitted
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {problems.length}/{problems.length} problems attempted • +
              {problems.length * 50} XP earned
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── C Programming Course View ────────────────────────────────────────────────
interface CProgrammingCourseViewProps {
  onBack: () => void;
}

function CProgrammingCourseView({ onBack }: CProgrammingCourseViewProps) {
  const { user, setUser, setXpFlash } = useApp();
  const [, forceUpdate] = useState(0);
  const refresh = () => forceUpdate((n) => n + 1);

  // Sub-views
  type SubView =
    | { type: "modules" }
    | { type: "module"; module: CModule }
    | { type: "part"; module: CModule; part: CPart }
    | { type: "moduleQuiz"; module: CModule }
    | { type: "moduleTest"; module: CModule };

  const [subView, setSubView] = useState<SubView>({ type: "modules" });
  const [activeModuleQuiz, setActiveModuleQuiz] = useState<CModule | null>(
    null,
  );

  const allDone = C_PROGRAMMING_COURSE.every((m) => getCModuleDone(m.id));

  const getModuleProgress = (module: CModule) => {
    const total = module.parts.length;
    const done = module.parts.filter((p) => getCPartDone(p.id)).length;
    return {
      done,
      total,
      pct: total > 0 ? Math.round((done / total) * 100) : 0,
    };
  };

  const allPartsComplete = (module: CModule) =>
    module.parts.every((p) => getCPartDone(p.id));

  const handlePartComplete = (partId: string, xp: number) => {
    setCPartDone(partId);
    setUser({ xp: user.xp + xp });
    setXpFlash(xp);
    setTimeout(() => setXpFlash(null), 1500);
    refresh();
    setSubView((prev) =>
      prev.type === "part" ? { type: "module", module: prev.module } : prev,
    );
  };

  const handleModuleQuizComplete = (
    moduleId: string,
    score: number,
    total: number,
    xp: number,
  ) => {
    setUser({ xp: user.xp + xp });
    setXpFlash(xp);
    setTimeout(() => setXpFlash(null), 1500);
    const passed = (score / total) * 100 >= 70;
    if (passed) {
      setCModuleQuizDone(moduleId);
    }
    refresh();
    setActiveModuleQuiz(null);
  };

  const handleTestComplete = (moduleId: string, xp: number) => {
    setCModuleDone(moduleId);
    setUser({ xp: user.xp + xp });
    setXpFlash(xp);
    setTimeout(() => setXpFlash(null), 1500);
    // Unlock next module
    const idx = C_MODULE_ORDER.indexOf(moduleId);
    if (idx !== -1 && idx < C_MODULE_ORDER.length - 1) {
      setCModuleUnlocked(C_MODULE_ORDER[idx + 1]);
    }
    refresh();
    // Return to modules list
    setSubView({ type: "modules" });
  };

  // ── Render sub-views ──
  if (subView.type === "part") {
    return (
      <CPartView
        part={subView.part}
        moduleId={subView.module.id}
        companionName={user.companionName || "Sakura"}
        onBack={() => setSubView({ type: "module", module: subView.module })}
        onPartComplete={handlePartComplete}
      />
    );
  }

  if (subView.type === "moduleTest") {
    return (
      <CModuleTestView
        module={subView.module}
        onBack={() => setSubView({ type: "module", module: subView.module })}
        onTestComplete={handleTestComplete}
      />
    );
  }

  // ── Module detail view ──
  if (subView.type === "module") {
    const mod = subView.module;
    const { done, total } = getModuleProgress(mod);
    const partsAllDone = allPartsComplete(mod);
    const quizDone = getCModuleQuizDone(mod.id);
    const modDone = getCModuleDone(mod.id);
    return (
      <>
        <div className="flex-1 overflow-y-auto pb-32">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
            <div className="flex items-center gap-3 max-w-2xl mx-auto">
              <button
                type="button"
                onClick={() => setSubView({ type: "modules" })}
                className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-foreground text-sm truncate">
                  {mod.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {done}/{total} parts complete
                </div>
              </div>
              {modDone && (
                <span className="text-xs bg-green-500/15 text-green-400 border border-green-500/30 rounded-full px-2.5 py-0.5 font-semibold shrink-0">
                  ✓ Done
                </span>
              )}
            </div>
            <div className="max-w-2xl mx-auto mt-2">
              <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                <motion.div
                  animate={{
                    width: `${total > 0 ? Math.round((done / total) * 100) : 0}%`,
                  }}
                  className="h-full bg-cyan-500 rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="px-4 pt-4 max-w-2xl mx-auto space-y-4">
            {/* Outcome */}
            <div className="rounded-xl bg-cyan-500/5 border border-cyan-500/20 px-4 py-3">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wide mb-1">
                🎯 Learning Outcome
              </div>
              <p className="text-xs text-foreground/80 leading-relaxed">
                {mod.outcome}
              </p>
            </div>

            {/* Parts */}
            <div className="space-y-2">
              {mod.parts.map((part, idx) => {
                const isDone = getCPartDone(part.id);
                return (
                  <motion.button
                    key={part.id}
                    type="button"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    onClick={() =>
                      setSubView({ type: "part", module: mod, part })
                    }
                    data-ocid="c-course.part_card"
                    className={`w-full text-left rounded-2xl border p-4 transition-all hover:border-cyan-500/40 ${isDone ? "border-green-500/30 bg-green-500/5" : "border-border bg-card"}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div
                          className={`mt-0.5 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold shrink-0 transition-all ${isDone ? "bg-green-500 border-green-500 text-white" : "bg-background border-cyan-500/40 text-cyan-400"}`}
                        >
                          {isDone ? "✓" : idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-foreground text-sm">
                            {part.title}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                            {part.description}
                          </div>
                          <div className="flex gap-2 mt-2 flex-wrap">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                              ▶ Video
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              📝 Notes
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                              🧠 Quiz
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronDown className="w-4 h-4 text-muted-foreground -rotate-90 shrink-0 mt-1" />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Module Quiz — unlocked after all parts done */}
            {partsAllDone && !modDone && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-4"
              >
                <div className="text-sm font-bold text-purple-300 mb-1">
                  🎓 Module Quiz Unlocked!
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  You've completed all parts. Test your module knowledge — score
                  70%+ to unlock the Final Test.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveModuleQuiz(mod)}
                  data-ocid="c-course.module_quiz_btn"
                  className={`w-full rounded-xl py-2.5 text-sm font-semibold transition-colors ${quizDone ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-purple-500 text-white hover:bg-purple-600"}`}
                >
                  {quizDone
                    ? "✓ Quiz Passed — Take Final Test"
                    : "🧠 Take Module Quiz"}
                </button>
              </motion.div>
            )}

            {/* Module Test — unlocked after quiz passed */}
            {quizDone && !modDone && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-4"
              >
                <div className="text-sm font-bold text-cyan-300 mb-1">
                  🚀 Final Module Test!
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Write C programs to solve {mod.moduleTest.length} problems.
                  Complete all to unlock the next module.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setSubView({ type: "moduleTest", module: mod })
                  }
                  data-ocid="c-course.module_test_btn"
                  className="w-full rounded-xl py-2.5 text-sm font-semibold bg-cyan-500 text-white hover:bg-cyan-600 transition-colors"
                >
                  💻 Start Final Test
                </button>
              </motion.div>
            )}

            {modDone && (
              <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-4 text-center">
                <div className="text-2xl mb-1">🏆</div>
                <div className="text-sm font-bold text-green-400">
                  Module Complete!
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Next module is now unlocked.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Module Quiz Modal */}
        <AnimatePresence>
          {activeModuleQuiz && (
            <CQuizModal
              title={`${activeModuleQuiz.title} — Module Quiz`}
              questions={activeModuleQuiz.moduleQuiz}
              onClose={() => setActiveModuleQuiz(null)}
              minPassPct={70}
              onComplete={(score, total, xp) =>
                handleModuleQuizComplete(activeModuleQuiz.id, score, total, xp)
              }
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  // ── Module list view ──
  return (
    <>
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
          <div className="flex items-center gap-3 max-w-2xl mx-auto">
            <button
              type="button"
              onClick={onBack}
              className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-2xl">🔵</span>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-foreground text-sm">
                Programming in C
              </div>
              <div className="text-xs text-muted-foreground">
                5 modules • Sequential unlock
              </div>
            </div>
          </div>
        </div>

        {allDone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-4 mt-4 max-w-2xl mx-auto rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-cyan-500/20 to-blue-500/10 p-5 text-center"
          >
            <div className="text-4xl mb-2">🎓</div>
            <div className="text-lg font-bold text-foreground">
              Course Complete!
            </div>
            <div className="text-sm text-cyan-400 mt-1">
              You've mastered all 5 modules of Programming in C
            </div>
          </motion.div>
        )}

        <div className="px-4 pt-4 max-w-2xl mx-auto space-y-3">
          {C_PROGRAMMING_COURSE.map((module, idx) => {
            const unlocked = getCModuleUnlocked(module.id);
            const done = getCModuleDone(module.id);
            const {
              done: partsDone,
              total: partsTotal,
              pct,
            } = getModuleProgress(module);
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                data-ocid="c-course.module_card"
              >
                <button
                  type="button"
                  onClick={() => {
                    if (!unlocked) {
                      const prevMod = C_MODULE_ORDER[idx - 1];
                      const prevTitle =
                        C_PROGRAMMING_COURSE.find((m) => m.id === prevMod)
                          ?.title ?? `Module ${idx}`;
                      alert(
                        `🔒 Complete "${prevTitle}" first to unlock this module.`,
                      );
                      return;
                    }
                    setSubView({ type: "module", module });
                  }}
                  className={`w-full text-left rounded-2xl border overflow-hidden transition-all ${
                    done
                      ? "border-green-500/40 bg-gradient-to-r from-green-500/10 to-green-500/5"
                      : unlocked
                        ? "border-cyan-500/30 bg-gradient-to-r from-cyan-500/15 to-blue-500/10 hover:border-cyan-500/50"
                        : "border-border bg-card opacity-70 cursor-not-allowed"
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div
                          className={`mt-0.5 w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm shrink-0 ${done ? "bg-green-500 border-green-400 text-white" : unlocked ? "bg-cyan-500/20 border-cyan-500 text-cyan-400" : "bg-muted border-border text-muted-foreground"}`}
                        >
                          {done ? (
                            "✓"
                          ) : unlocked ? (
                            idx + 1
                          ) : (
                            <Lock className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-foreground text-sm">
                            {module.title}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                            {module.outcome}
                          </div>
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <span
                              className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${unlocked ? "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" : "text-muted-foreground bg-muted border-border"}`}
                            >
                              {module.parts.length} parts
                            </span>
                            {unlocked && partsDone > 0 && (
                              <span className="text-xs text-cyan-400 font-semibold">
                                {pct}% parts done
                              </span>
                            )}
                            {!unlocked && (
                              <span className="text-xs text-muted-foreground">
                                Complete Module {idx} to unlock
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {unlocked ? (
                        <ChevronDown className="w-5 h-5 text-muted-foreground -rotate-90 shrink-0 mt-1" />
                      ) : (
                        <Lock className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
                      )}
                    </div>
                    {/* Progress bar */}
                    {unlocked && (
                      <div className="mt-3">
                        <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            className={`h-full rounded-full ${done ? "bg-green-400" : "bg-cyan-500"}`}
                          />
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-muted-foreground">
                            {partsDone}/{partsTotal} parts
                          </span>
                          {done && (
                            <span className="text-xs text-green-400 font-semibold">
                              ✓ Complete
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ─── Main Roadmap Page ─────────────────────────────────────────────────────────

interface RoadmapQuizState {
  topicId: string;
  topicTitle: string;
  questions: QuizQuestion[];
  currentQ: number;
  selectedOption: number | null;
  answers: (number | null)[];
  finished: boolean;
}

export default function RoadmapPage() {
  const { user, setUser, setXpFlash } = useApp();
  const [view, setView] = useState<View>("list");
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<ActiveVideo | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<RoadmapQuizState | null>(null);
  const [showCCourse, setShowCCourse] = useState(false);
  const [completedTopics, setCompletedTopics] = useState<
    Record<string, boolean>
  >(() => {
    try {
      return JSON.parse(localStorage.getItem("roadmap_completed") || "{}");
    } catch {
      return {};
    }
  });

  const toggleComplete = (roadmapId: string, topicId: string) => {
    const key = `${roadmapId}::${topicId}`;
    setCompletedTopics((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem("roadmap_completed", JSON.stringify(updated));
      return updated;
    });
  };

  const isCompleted = (roadmapId: string, topicId: string) =>
    !!completedTopics[`${roadmapId}::${topicId}`];

  const getProgress = (roadmap: Roadmap) => {
    const total = roadmap.topics.length;
    const done = roadmap.topics.filter((t) =>
      isCompleted(roadmap.id, t.id),
    ).length;
    return {
      done,
      total,
      pct: total > 0 ? Math.round((done / total) * 100) : 0,
    };
  };

  const levelColor: Record<string, string> = {
    Beginner: "text-green-400 bg-green-500/10 border-green-500/20",
    Intermediate: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    Advanced: "text-red-400 bg-red-500/10 border-red-500/20",
  };

  const openQuiz = (topicId: string, topicTitle: string) => {
    const questions = TOPIC_QUIZZES[topicId] ?? GENERIC_QUESTIONS;
    setActiveQuiz({
      topicId,
      topicTitle,
      questions,
      currentQ: 0,
      selectedOption: null,
      answers: new Array(questions.length).fill(null),
      finished: false,
    });
  };

  const handleSelectOption = (optionIdx: number) => {
    if (
      !activeQuiz ||
      activeQuiz.selectedOption !== null ||
      activeQuiz.finished
    )
      return;
    setActiveQuiz((prev) => {
      if (!prev) return prev;
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentQ] = optionIdx;
      return { ...prev, selectedOption: optionIdx, answers: newAnswers };
    });
  };

  const handleNextQuestion = () => {
    if (!activeQuiz) return;
    const nextQ = activeQuiz.currentQ + 1;
    if (nextQ >= activeQuiz.questions.length) {
      const score = activeQuiz.answers.filter(
        (ans, i) => ans === activeQuiz.questions[i].correct,
      ).length;
      const earnedXP = score * 10;
      setUser({ xp: user.xp + earnedXP });
      setXpFlash(earnedXP);
      setTimeout(() => setXpFlash(null), 1500);
      setActiveQuiz((prev) => (prev ? { ...prev, finished: true } : prev));
    } else {
      setActiveQuiz((prev) =>
        prev ? { ...prev, currentQ: nextQ, selectedOption: null } : prev,
      );
    }
  };

  const handleRetryQuiz = () => {
    if (!activeQuiz) return;
    setActiveQuiz((prev) =>
      prev
        ? {
            ...prev,
            currentQ: 0,
            selectedOption: null,
            answers: new Array(prev.questions.length).fill(null),
            finished: false,
          }
        : prev,
    );
  };

  const getQuizScore = () => {
    if (!activeQuiz) return 0;
    return activeQuiz.answers.filter(
      (ans, i) => ans === activeQuiz.questions[i].correct,
    ).length;
  };

  // ── Video player view ──
  if (activeVideo) {
    return (
      <VideoPlayerPage
        videoUrl={activeVideo.url}
        videoLabel={activeVideo.label}
        topicTitle={activeVideo.topicTitle}
        topicNotes={activeVideo.topicNotes}
        onBack={() => setActiveVideo(null)}
      />
    );
  }

  // ── C Programming Course ──
  if (showCCourse) {
    return <CProgrammingCourseView onBack={() => setShowCCourse(false)} />;
  }

  // ── Domain list view ──
  if (view === "list") {
    return (
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-foreground">
              Developer Roadmaps
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Choose your path. Each topic has videos, detailed study notes, and
              official docs for revision.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {ROADMAPS.map((roadmap) => {
              // Special card for C programming
              if (roadmap.id === "c-programming") {
                const modsDone = C_PROGRAMMING_COURSE.filter((m) =>
                  getCModuleDone(m.id),
                ).length;
                const modsTotal = C_PROGRAMMING_COURSE.length;
                const pct = Math.round((modsDone / modsTotal) * 100);
                return (
                  <motion.button
                    key={roadmap.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCCourse(true)}
                    data-ocid="roadmap.c_programming_card"
                    className={`w-full text-left rounded-2xl border border-cyan-500/30 bg-gradient-to-r ${roadmap.color} overflow-hidden p-4 hover:border-cyan-500/50 transition-colors`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="text-3xl shrink-0">
                          {roadmap.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-foreground text-sm">
                            {roadmap.title}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {roadmap.description}
                          </div>
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <span
                              className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${roadmap.tagColor}`}
                            >
                              {modsTotal} modules
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full border text-cyan-400 bg-cyan-500/10 border-cyan-500/20">
                              Structured Course
                            </span>
                            {modsDone > 0 && (
                              <span className="text-xs text-cyan-400 font-semibold">
                                {pct}% done
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <ChevronDown className="w-5 h-5 text-muted-foreground -rotate-90 shrink-0 mt-1" />
                    </div>
                    {modsDone > 0 && (
                      <div className="mt-3">
                        <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            className="h-full bg-cyan-500 rounded-full"
                          />
                        </div>
                      </div>
                    )}
                  </motion.button>
                );
              }

              const { done, total, pct } = getProgress(roadmap);
              return (
                <motion.button
                  key={roadmap.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedRoadmap(roadmap);
                    setView("roadmap");
                  }}
                  className={`w-full text-left rounded-2xl border border-border bg-gradient-to-r ${roadmap.color} overflow-hidden p-4 hover:border-primary/40 transition-colors`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-3xl shrink-0">{roadmap.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-foreground text-sm">
                          {roadmap.title}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {roadmap.description}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${roadmap.tagColor}`}
                          >
                            {total} topics
                          </span>
                          {done > 0 && (
                            <span className="text-xs text-green-400 font-semibold">
                              {pct}% done
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <ChevronDown className="w-5 h-5 text-muted-foreground -rotate-90 shrink-0 mt-1" />
                  </div>
                  {done > 0 && (
                    <div className="mt-3">
                      <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── Roadmap topics view (flat domains) ──
  if (view === "roadmap" && selectedRoadmap) {
    const { done, total } = getProgress(selectedRoadmap);
    return (
      <>
        <div className="flex-1 overflow-y-auto pb-24">
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
            <div className="flex items-center gap-3 max-w-2xl mx-auto">
              <button
                type="button"
                onClick={() => {
                  setView("list");
                  setSelectedRoadmap(null);
                  setExpandedTopic(null);
                }}
                className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-2xl">{selectedRoadmap.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-foreground text-sm">
                  {selectedRoadmap.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {done}/{total} topics completed
                </div>
              </div>
            </div>
            <div className="max-w-2xl mx-auto mt-2">
              <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                <motion.div
                  animate={{
                    width: `${total > 0 ? Math.round((done / total) * 100) : 0}%`,
                  }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="px-4 pt-4 max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border z-0" />
              <div className="space-y-3 relative z-10">
                {selectedRoadmap.topics.map((topic, idx) => {
                  const isDone = isCompleted(selectedRoadmap.id, topic.id);
                  const expanded = expandedTopic === topic.id;
                  return (
                    <motion.div
                      key={topic.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            toggleComplete(selectedRoadmap.id, topic.id)
                          }
                          className={`mt-3.5 w-10 h-10 rounded-full shrink-0 border-2 flex items-center justify-center font-bold text-sm transition-all ${isDone ? "bg-primary border-primary text-primary-foreground" : "bg-background border-border text-muted-foreground hover:border-primary/50"}`}
                        >
                          {isDone ? "✓" : idx + 1}
                        </button>
                        <div className="flex-1 rounded-2xl border border-border bg-card overflow-hidden">
                          <button
                            type="button"
                            className="w-full flex items-center justify-between p-3 text-left"
                            onClick={() =>
                              setExpandedTopic(expanded ? null : topic.id)
                            }
                          >
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-foreground text-sm">
                                {topic.title}
                              </div>
                              <div className="text-xs text-muted-foreground mt-0.5">
                                {topic.description}
                              </div>
                              <span
                                className={`mt-1 inline-block text-xs font-semibold px-2 py-0.5 rounded-full border ${levelColor[topic.level]}`}
                              >
                                {topic.level}
                              </span>
                            </div>
                            <motion.span
                              animate={{ rotate: expanded ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="text-muted-foreground text-lg ml-2 shrink-0"
                            >
                              ▾
                            </motion.span>
                          </button>

                          <AnimatePresence initial={false}>
                            {expanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.22 }}
                                className="overflow-hidden"
                              >
                                <div className="px-3 pb-3 space-y-3 border-t border-border pt-3">
                                  <div>
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-wide mb-1.5">
                                      <Play className="w-3.5 h-3.5" /> Videos
                                    </div>
                                    <div className="space-y-1.5">
                                      {topic.videos.map((v) => (
                                        <button
                                          key={v.url}
                                          type="button"
                                          onClick={() =>
                                            setActiveVideo({
                                              url: v.url,
                                              label: v.label,
                                              topicTitle: topic.title,
                                              topicNotes: topic.notes,
                                            })
                                          }
                                          className="w-full flex items-center gap-2 rounded-xl bg-muted px-3 py-2 hover:bg-accent border border-border transition-colors text-left"
                                          data-ocid="roadmap.primary_button"
                                        >
                                          <span className="text-sm">▶️</span>
                                          <span className="text-xs font-medium text-foreground flex-1">
                                            {v.label}
                                          </span>
                                          <span className="text-xs text-primary font-semibold">
                                            Watch
                                          </span>
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400 uppercase tracking-wide mb-1.5">
                                      <StickyNote className="w-3.5 h-3.5" />{" "}
                                      Study Notes
                                    </div>
                                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl px-3 py-2.5">
                                      <p className="text-xs text-foreground/80 leading-relaxed whitespace-pre-line">
                                        {topic.notes}
                                      </p>
                                    </div>
                                  </div>
                                  {topic.docs && topic.docs.length > 0 && (
                                    <div>
                                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wide mb-1.5">
                                        <BookOpen className="w-3.5 h-3.5" />{" "}
                                        Docs & References
                                      </div>
                                      <div className="grid grid-cols-1 gap-1.5">
                                        {topic.docs.map((doc) => (
                                          <a
                                            key={doc.url}
                                            href={doc.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 rounded-xl bg-emerald-500/5 border border-emerald-500/20 px-3 py-2 hover:bg-emerald-500/10 transition-colors group"
                                          >
                                            <ExternalLink className="w-3 h-3 text-emerald-400 shrink-0" />
                                            <span className="text-xs font-medium text-foreground flex-1 group-hover:text-emerald-300 transition-colors">
                                              {doc.label}
                                            </span>
                                            <span className="text-xs text-emerald-400/60">
                                              ↗
                                            </span>
                                          </a>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      openQuiz(topic.id, topic.title)
                                    }
                                    data-ocid="roadmap.secondary_button"
                                    className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-colors bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20"
                                  >
                                    <span>🧠</span>
                                    <span>Take Quiz</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      toggleComplete(
                                        selectedRoadmap.id,
                                        topic.id,
                                      )
                                    }
                                    className={`w-full rounded-xl py-2 text-sm font-semibold transition-colors ${isDone ? "bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
                                  >
                                    {isDone
                                      ? "✓ Completed — Click to undo"
                                      : "Mark as Complete"}
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Modal */}
        <AnimatePresence>
          {activeQuiz && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
              data-ocid="roadmap.modal"
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="w-full max-w-lg bg-card rounded-3xl shadow-2xl overflow-hidden border border-border"
              >
                <div className="flex items-center justify-between px-6 pt-5 pb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-base truncate">
                      {activeQuiz.topicTitle} — Quiz 🧠
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveQuiz(null)}
                    data-ocid="roadmap.close_button"
                    className="ml-3 p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {activeQuiz.finished ? (
                  <div className="px-6 pb-6">
                    <div className="text-center py-6">
                      <div className="text-5xl mb-3">
                        {getQuizScore() >= 4
                          ? "🏆"
                          : getQuizScore() >= 2
                            ? "⭐"
                            : "💪"}
                      </div>
                      <div className="text-3xl font-bold text-foreground mb-1">
                        {getQuizScore()}/{activeQuiz.questions.length}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {getQuizScore() >= 4
                          ? "Excellent! You've mastered this topic! ✨"
                          : getQuizScore() >= 2
                            ? "Good effort! Keep reviewing to improve."
                            : "Keep studying — you'll get there! 🌱"}
                      </div>
                      <div className="inline-flex items-center gap-1.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full px-3 py-1 text-sm font-semibold">
                        ⚡ +{getQuizScore() * 10} XP earned
                      </div>
                    </div>
                    <div className="space-y-2 mb-5">
                      {activeQuiz.questions.map((q, i) => {
                        const isRight = activeQuiz.answers[i] === q.correct;
                        return (
                          <div
                            key={q.q.slice(0, 30)}
                            className={`rounded-xl px-3 py-2 border text-xs ${isRight ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}
                          >
                            <span className="font-semibold">
                              {isRight ? "✓" : "✗"}
                            </span>{" "}
                            {q.q.slice(0, 60)}
                            {q.q.length > 60 ? "..." : ""}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleRetryQuiz}
                        data-ocid="roadmap.secondary_button"
                        className="flex-1 rounded-xl py-2.5 text-sm font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
                      >
                        🔄 Try Again
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveQuiz(null)}
                        data-ocid="roadmap.close_button"
                        className="flex-1 rounded-xl py-2.5 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        Back to Topic
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="px-6 pb-6">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-muted-foreground font-medium">
                          Question {activeQuiz.currentQ + 1} of{" "}
                          {activeQuiz.questions.length}
                        </span>
                        <span className="text-xs text-purple-400 font-semibold">
                          {Math.round(
                            (activeQuiz.currentQ /
                              activeQuiz.questions.length) *
                              100,
                          )}
                          % done
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                        <motion.div
                          animate={{
                            width: `${(activeQuiz.currentQ / activeQuiz.questions.length) * 100}%`,
                          }}
                          className="h-full bg-purple-500 rounded-full"
                        />
                      </div>
                    </div>
                    <p className="font-bold text-foreground text-sm mb-4 leading-snug">
                      {activeQuiz.questions[activeQuiz.currentQ].q}
                    </p>
                    <div className="space-y-2 mb-5">
                      {activeQuiz.questions[activeQuiz.currentQ].options.map(
                        (opt, i) => {
                          const isSelected = activeQuiz.selectedOption === i;
                          const isCorrect =
                            activeQuiz.questions[activeQuiz.currentQ]
                              .correct === i;
                          const answered = activeQuiz.selectedOption !== null;
                          let btnClass =
                            "w-full text-left rounded-xl px-4 py-3 text-sm font-medium border transition-all ";
                          if (!answered)
                            btnClass +=
                              "bg-muted text-foreground border-border hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-300";
                          else if (isCorrect)
                            btnClass +=
                              "bg-green-500/15 text-green-400 border-green-500/40 font-semibold";
                          else if (isSelected && !isCorrect)
                            btnClass +=
                              "bg-red-500/15 text-red-400 border-red-500/40";
                          else
                            btnClass +=
                              "bg-muted/50 text-muted-foreground border-border opacity-50";
                          return (
                            <motion.button
                              key={opt.slice(0, 30)}
                              type="button"
                              whileTap={!answered ? { scale: 0.98 } : {}}
                              onClick={() => handleSelectOption(i)}
                              disabled={answered}
                              className={btnClass}
                            >
                              <span className="font-bold mr-2 text-xs opacity-60">
                                {["A", "B", "C", "D"][i]}.
                              </span>
                              {opt}
                              {answered && isCorrect && (
                                <span className="ml-2 text-green-400">✓</span>
                              )}
                              {answered && isSelected && !isCorrect && (
                                <span className="ml-2 text-red-400">✗</span>
                              )}
                            </motion.button>
                          );
                        },
                      )}
                    </div>
                    <AnimatePresence>
                      {activeQuiz.selectedOption !== null && (
                        <motion.button
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          type="button"
                          onClick={handleNextQuestion}
                          data-ocid="roadmap.primary_button"
                          className="w-full rounded-xl py-3 text-sm font-bold bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                        >
                          {activeQuiz.currentQ + 1 >=
                          activeQuiz.questions.length
                            ? "See Results 🏆"
                            : "Next Question →"}
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return null;
}
