import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import {
  Award,
  BookOpen,
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
  Settings,
  Star,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import { COMPANION_PRESETS } from "../data/companions";
import { useAddMessage } from "../hooks/useQueries";
import { useResponseQueue } from "../hooks/useResponseQueue";

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
    id: "ds",
    title: "Data Structures",
    icon: "🗄️",
    description: "Arrays, Linked Lists, Trees, Graphs & more",
    color: "from-blue-50 to-indigo-50",
    border: "border-blue-200",
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
  },
  {
    id: "js",
    title: "JavaScript",
    icon: "💛",
    description: "ES6+, Async, DOM & Modern JS patterns",
    color: "from-amber-50 to-yellow-50",
    border: "border-amber-200",
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
        label: "Async/Await",
        url: "https://www.youtube.com/watch?v=V_Kr9OSfDeU",
      },
    ],
  },
];

const TypingIndicator = ({ companionImg }: { companionImg: string }) => (
  <div className="flex items-end gap-2 slide-in-up">
    <img
      src={companionImg}
      alt="companion"
      className="w-8 h-8 rounded-full object-cover shrink-0"
    />
    <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-card border border-border">
      <div className="flex gap-1 items-center">
        <span className="typing-dot w-2 h-2 rounded-full bg-primary/40" />
        <span className="typing-dot w-2 h-2 rounded-full bg-primary/40" />
        <span className="typing-dot w-2 h-2 rounded-full bg-primary/40" />
      </div>
    </div>
  </div>
);

type BottomTab = "chat" | "modules" | "quiz" | "problems" | "dashboard";

async function callAI(
  userMessage: string,
  companionName: string,
  personality: string,
  claudeKey: string,
  openaiKey: string,
): Promise<string> {
  const systemPrompt = `You are ${companionName}, a kawaii AI study companion with a ${personality} personality. You help students study Computer Science topics. Keep responses short (2-3 sentences), warm, encouraging, and educational. Use occasional emojis.`;

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
    activeTopic,
    setActiveTopic,
    setShowLoveCall,
    frustrationCount,
    setFrustrationCount,
    xpFlash,
    setXpFlash,
    spFlash,
    setSpFlash,
    openaiKey,
    setOpenaiKey,
    claudeKey,
    setClaudeKey,
    focusModeEnabled,
    setFocusModeEnabled,
  } = useApp();
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [burnoutMode, setBurnoutMode] = useState(false);
  const [activeTab, setActiveTab] = useState<BottomTab>("chat");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(openaiKey);
  const [claudeKeyInput, setClaudeKeyInput] = useState(claudeKey);
  const [breakTipIdx, setBreakTipIdx] = useState(0);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const addMessageMutation = useAddMessage();
  const pick = useResponseQueue();

  const preset =
    COMPANION_PRESETS.find((p) => p.personality === user.personality) ??
    COMPANION_PRESETS[0];
  const xpProgress = ((user.xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;
  const level = Math.floor(user.xp / XP_PER_LEVEL) + 1;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  // Rotate break tips every 45 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBreakTipIdx((prev) => (prev + 1) % BREAK_TIPS.length);
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  // Focus Mode — detect tab away
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
            text: `Hey!! 👀 I noticed you were away for a bit~ You're not scrolling Instagram instead of studying, are you? 😏 Come back to me, let's focus! 💕`,
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

  const awardSP = useCallback(() => {
    setUser({ studyPoints: user.studyPoints + 1 });
    setSpFlash(1);
    setTimeout(() => setSpFlash(null), 1500);
  }, [user.studyPoints, setUser, setSpFlash]);

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
        awardSP();
      } catch {
        setIsTyping(false);
        const fallback = generateResponse(text);
        addMessage({ role: "companion", text: fallback });
        addMessageMutation.mutate({ role: "companion", text: fallback });
        setUser({ xp: user.xp + 2 });
        setXpFlash(2);
        setTimeout(() => setXpFlash(null), 1500);
        awardSP();
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
          awardSP();
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
    awardSP,
    user.xp,
    user.companionName,
    user.personality,
    claudeKey,
    openaiKey,
  ]);

  const greetingRef = useRef<{
    preset: typeof preset;
    addMsg: typeof addMessage;
  }>({ preset, addMsg: addMessage });
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

  const topicIcons: Record<string, string> = {
    "Data Structures": "🗄️",
    Algorithms: "⚡",
    Python: "🐍",
    "HTML/CSS": "🌐",
    OOP: "🏗️",
  };

  const bottomNavItems: {
    tab: BottomTab;
    icon: React.ReactNode;
    label: string;
  }[] = [
    { tab: "chat", icon: <Home className="w-5 h-5" />, label: "Chat" },
    {
      tab: "modules",
      icon: <BookOpen className="w-5 h-5" />,
      label: "Modules",
    },
    { tab: "quiz", icon: <Star className="w-5 h-5" />, label: "Quiz" },
    { tab: "problems", icon: <Code className="w-5 h-5" />, label: "Problems" },
    {
      tab: "dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Dashboard",
    },
  ];

  const handleTabClick = (tab: BottomTab) => {
    if (tab === "quiz") {
      setPage("quiz");
      return;
    }
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
    <div className="h-screen bg-muted flex flex-col overflow-hidden">
      {/* Settings Sheet */}
      <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
        <SheetContent side="right" className="w-80">
          <SheetHeader>
            <SheetTitle>⚙️ Settings</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {/* AI Status */}
            <div className="bg-muted rounded-xl px-3 py-2 text-sm font-semibold text-center text-foreground">
              {activeAILabel}
            </div>

            {/* Claude Key */}
            <div>
              <label
                htmlFor="claude-key"
                className="text-sm font-semibold text-foreground block mb-1.5"
              >
                Claude API Key (Priority)
              </label>
              <Input
                id="claude-key"
                data-ocid="settings.claude_key.input"
                type="password"
                value={claudeKeyInput}
                onChange={(e) => setClaudeKeyInput(e.target.value)}
                placeholder="sk-ant-..."
                className="rounded-xl h-10 font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Claude Sonnet 4.5 — priority over OpenAI.
              </p>
            </div>

            {/* OpenAI Key */}
            <div>
              <label
                htmlFor="openai-key"
                className="text-sm font-semibold text-foreground block mb-1.5"
              >
                OpenAI API Key (Fallback)
              </label>
              <Input
                id="openai-key"
                data-ocid="settings.openai_key.input"
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="sk-..."
                className="rounded-xl h-10 font-mono text-sm"
              />
            </div>

            {/* Focus Mode */}
            <div className="flex items-center justify-between bg-muted rounded-xl px-3 py-3">
              <div>
                <Label className="text-sm font-semibold text-foreground">
                  🎯 Focus Mode
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Nudge if you go away &gt;30s
                </p>
              </div>
              <Switch
                data-ocid="settings.focus_mode.switch"
                checked={focusModeEnabled}
                onCheckedChange={setFocusModeEnabled}
              />
            </div>

            <Button
              data-ocid="settings.save.button"
              onClick={() => {
                setClaudeKey(claudeKeyInput);
                setOpenaiKey(apiKeyInput);
                setSettingsOpen(false);
              }}
              className="w-full rounded-xl bg-primary text-primary-foreground font-semibold"
            >
              Save Settings
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Top bar */}
      <header className="bg-white border-b border-border px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
            <span className="text-white text-xs font-bold">C&amp;C</span>
          </div>
          <span className="font-bold text-foreground">Code &amp; Crush</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden sm:block">
            Hi, <strong>{user.username}</strong>! 💕
          </span>
          <Button
            data-ocid="study.settings.button"
            variant="ghost"
            size="sm"
            onClick={() => setSettingsOpen(true)}
            className="rounded-full text-muted-foreground hover:text-foreground"
          >
            <Settings className="w-4 h-4" />
          </Button>
          <Button
            data-ocid="study.call.button"
            variant="ghost"
            size="sm"
            title="Love Call"
            onClick={() => setShowLoveCall(true)}
            className="rounded-full text-muted-foreground hover:text-foreground"
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
        <aside className="w-64 bg-white border-r border-border flex flex-col p-4 gap-4 shrink-0 hidden md:flex">
          <div className="text-center py-4">
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              className={`w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 ring-4 shadow-glow ${
                burnoutMode
                  ? "ring-red-300"
                  : "ring-pink-400 shadow-[0_0_20px_rgba(240,106,155,0.4)]"
              }`}
            >
              <img
                src={preset.image}
                alt={user.companionName}
                className="w-full h-full object-cover"
              />
            </motion.div>
            {burnoutMode && (
              <div className="flex justify-center gap-0.5 mb-1">
                {["h1", "h2", "h3", "h4", "h5"].map((hk, i) => (
                  <motion.span
                    key={hk}
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.1,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    className="text-red-400 text-sm"
                  >
                    ♥
                  </motion.span>
                ))}
              </div>
            )}
            <h3 className="font-bold text-foreground">{user.companionName}</h3>
            <p className="text-xs text-muted-foreground">
              {preset.traits.split(" · ")[0]}
            </p>
          </div>

          <div className="bg-muted rounded-2xl p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                <Zap className="w-3 h-3 text-yellow-500" /> Match Level {level}
              </span>
              <span className="text-xs text-muted-foreground">
                {user.xp} XP
              </span>
            </div>
            <Progress value={xpProgress} className="h-2 rounded-full" />
            <p className="text-xs text-muted-foreground mt-1 text-right">
              {XP_PER_LEVEL - (user.xp % XP_PER_LEVEL)} XP to next level
            </p>
            {/* Study Points */}
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                ⭐ Study Points
              </span>
              <span className="text-xs font-bold text-yellow-500 bg-yellow-50 px-2 py-0.5 rounded-full border border-yellow-200">
                {user.studyPoints} SP
              </span>
            </div>
          </div>

          <div className="bg-muted rounded-2xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <Flame className="w-5 h-5 text-orange-500" />
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
                    className="text-xs bg-white border border-border rounded-full px-2 py-0.5"
                  >
                    {b}
                  </span>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Center: Chat or Modules panel */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Modules panel */}
          {activeTab === "modules" && (
            <div className="flex-1 bg-white p-4 overflow-y-auto">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Study Modules
              </p>
              <div className="space-y-3">
                {STUDY_MODULES.map((mod) => (
                  <div
                    key={mod.id}
                    data-ocid={`modules.${mod.id}.panel`}
                    className={`rounded-2xl border bg-gradient-to-br ${mod.color} ${mod.border} overflow-hidden`}
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
                          <div className="px-4 pb-4 space-y-2">
                            {mod.resources.map((r) => (
                              <a
                                key={r.url}
                                href={r.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 hover:shadow-sm transition-shadow border border-white/60"
                              >
                                {r.type === "pdf" ? (
                                  <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                                ) : (
                                  <Play className="w-4 h-4 text-red-500 shrink-0" />
                                )}
                                <span className="text-sm font-medium text-foreground flex-1">
                                  {r.label}
                                </span>
                                <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0" />
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chat panel */}
          {activeTab === "chat" && (
            <>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4 max-w-2xl mx-auto">
                  {messages.length === 0 && (
                    <div
                      className="text-center py-16"
                      data-ocid="chat.empty_state"
                    >
                      <p className="text-muted-foreground">
                        Start a conversation! 💕
                      </p>
                    </div>
                  )}
                  <AnimatePresence initial={false}>
                    {messages.map((msg, i) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                        data-ocid={`chat.message.${i + 1}`}
                      >
                        {msg.role === "companion" && (
                          <img
                            src={preset.image}
                            alt="companion"
                            className="w-8 h-8 rounded-full object-cover shrink-0"
                          />
                        )}
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-white border border-border shadow-card rounded-bl-sm text-foreground"}`}
                        >
                          {msg.text}
                        </div>
                        {msg.role === "user" && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {user.username.charAt(0).toUpperCase() || "U"}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {isTyping && <TypingIndicator companionImg={preset.image} />}
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
                    className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-pink-500 text-white font-extrabold text-xl px-5 py-2 rounded-full shadow-lg pointer-events-none z-40 flex items-center gap-1"
                  >
                    💗 +{xpFlash} XP!
                  </motion.div>
                )}
              </AnimatePresence>

              {/* SP Flash */}
              <AnimatePresence>
                {spFlash !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 0, scale: 0.5 }}
                    animate={{ opacity: 1, y: -80, scale: 1.1 }}
                    exit={{ opacity: 0, y: -120, scale: 0.8 }}
                    className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-yellow-400 text-white font-extrabold text-lg px-4 py-1.5 rounded-full shadow-lg pointer-events-none z-40 flex items-center gap-1"
                  >
                    ⭐ +{spFlash} SP!
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="bg-white border-t border-border p-4">
                <div className="max-w-2xl mx-auto flex gap-3">
                  <Input
                    data-ocid="chat.message.input"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder={`Message ${user.companionName}... 💕`}
                    className="rounded-full h-12 border-2 focus:border-primary flex-1"
                  />
                  <Button
                    data-ocid="chat.send.button"
                    onClick={sendMessage}
                    disabled={!inputText.trim() || isTyping}
                    className="rounded-full w-12 h-12 p-0 bg-primary text-primary-foreground shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </main>

        {/* Right Sidebar — desktop */}
        <aside className="w-64 bg-white border-l border-border p-4 flex flex-col gap-4 shrink-0 hidden lg:flex">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Study Topics
            </p>
            <div className="space-y-2">
              {Object.entries(topicIcons).map(([topic, icon]) => (
                <button
                  type="button"
                  key={topic}
                  data-ocid={`topic.${topic.toLowerCase().replace(/[^a-z0-9]/g, "_")}.button`}
                  onClick={() => setActiveTopic(topic)}
                  className={`w-full text-left rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 flex items-center gap-2 ${activeTopic === topic ? "bg-primary/10 text-primary border border-primary/20" : "hover:bg-muted text-foreground"}`}
                >
                  <span>{icon}</span>
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <Button
            data-ocid="quiz.start.button"
            onClick={() => setPage("quiz")}
            className="w-full rounded-xl h-12 font-bold bg-primary text-primary-foreground"
          >
            <Star className="w-4 h-4 mr-2" /> Start Quiz
          </Button>

          <Button
            data-ocid="problems.open.button"
            onClick={() => {
              setCurrentProblemId(null);
              setPage("problems");
            }}
            variant="outline"
            className="w-full rounded-xl h-12 font-bold border-2"
          >
            <Code className="w-4 h-4 mr-2" /> Code Studio 💻
          </Button>

          <Button
            data-ocid="love_call.open_modal_button"
            onClick={() => setShowLoveCall(true)}
            variant="outline"
            className="w-full rounded-xl h-12 font-bold border-2"
            style={{
              borderColor: preset.accentColor,
              color: preset.accentColor,
            }}
          >
            <Phone className="w-4 h-4 mr-2" /> Love Call 📞
          </Button>

          <div className="bg-muted rounded-2xl p-3">
            <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> Current Topic
            </p>
            <p className="font-bold text-primary text-sm">
              {topicIcons[activeTopic]} {activeTopic}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Ask me anything about {activeTopic}!
            </p>
          </div>

          {/* Break Tips */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-3 border border-pink-100 mt-auto">
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
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="bg-white border-t border-border shrink-0 safe-area-pb">
        <div className="flex items-stretch">
          {bottomNavItems.map((item) => (
            <button
              type="button"
              key={item.tab}
              data-ocid={`bottomnav.${item.tab}.button`}
              onClick={() => handleTabClick(item.tab)}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs font-medium transition-colors ${
                activeTab === item.tab &&
                item.tab !== "quiz" &&
                item.tab !== "problems" &&
                item.tab !== "dashboard"
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
