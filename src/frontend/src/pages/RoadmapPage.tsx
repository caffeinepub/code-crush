import {
  BookOpen,
  ChevronDown,
  ExternalLink,
  Play,
  StickyNote,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { ROADMAPS, type Roadmap } from "../data/roadmaps";
import VideoPlayerPage from "./VideoPlayerPage";

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

interface QuizState {
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
  const [activeQuiz, setActiveQuiz] = useState<QuizState | null>(null);
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
      // Calculate score and award XP
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

  // --- VIDEO PLAYER VIEW ---
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

  // --- DOMAIN LIST VIEW ---
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

  // --- ROADMAP TOPICS VIEW ---
  if (view === "roadmap" && selectedRoadmap) {
    const { done, total } = getProgress(selectedRoadmap);
    return (
      <>
        <div className="flex-1 overflow-y-auto pb-24">
          {/* Header */}
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

          {/* Topic list */}
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
                        {/* Circle node */}
                        <button
                          type="button"
                          onClick={() =>
                            toggleComplete(selectedRoadmap.id, topic.id)
                          }
                          className={`mt-3.5 w-10 h-10 rounded-full shrink-0 border-2 flex items-center justify-center font-bold text-sm transition-all ${
                            isDone
                              ? "bg-primary border-primary text-primary-foreground"
                              : "bg-background border-border text-muted-foreground hover:border-primary/50"
                          }`}
                        >
                          {isDone ? "✓" : idx + 1}
                        </button>

                        {/* Card */}
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
                                  {/* Videos */}
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

                                  {/* Study Notes */}
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

                                  {/* Docs & References */}
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

                                  {/* Take Quiz */}
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

                                  {/* Mark complete */}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      toggleComplete(
                                        selectedRoadmap.id,
                                        topic.id,
                                      )
                                    }
                                    className={`w-full rounded-xl py-2 text-sm font-semibold transition-colors ${
                                      isDone
                                        ? "bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20"
                                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                                    }`}
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
                {/* Quiz Header */}
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
                  /* Results Screen */
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

                    {/* Answer review */}
                    <div className="space-y-2 mb-5">
                      {activeQuiz.questions.map((q, i) => {
                        const userAns = activeQuiz.answers[i];
                        const isRight = userAns === q.correct;
                        return (
                          <div
                            key={q.q.slice(0, 30)}
                            className={`rounded-xl px-3 py-2 border text-xs ${
                              isRight
                                ? "bg-green-500/10 border-green-500/20 text-green-400"
                                : "bg-red-500/10 border-red-500/20 text-red-400"
                            }`}
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
                  /* Question Screen */
                  <div className="px-6 pb-6">
                    {/* Progress */}
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

                    {/* Question */}
                    <p className="font-bold text-foreground text-sm mb-4 leading-snug">
                      {activeQuiz.questions[activeQuiz.currentQ].q}
                    </p>

                    {/* Options */}
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

                          if (!answered) {
                            btnClass +=
                              "bg-muted text-foreground border-border hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-300";
                          } else if (isCorrect) {
                            btnClass +=
                              "bg-green-500/15 text-green-400 border-green-500/40 font-semibold";
                          } else if (isSelected && !isCorrect) {
                            btnClass +=
                              "bg-red-500/15 text-red-400 border-red-500/40";
                          } else {
                            btnClass +=
                              "bg-muted/50 text-muted-foreground border-border opacity-50";
                          }

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

                    {/* Next button — appears after answering */}
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
