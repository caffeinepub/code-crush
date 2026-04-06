import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ChevronRight,
  Code,
  Home,
  LayoutDashboard,
  Lightbulb,
  Send,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import MultiLangCompiler from "../components/MultiLangCompiler";
import ProjectsSection from "../components/ProjectsSection";
import { useApp } from "../context/AppContext";
import { COMPANION_PRESETS } from "../data/companions";
import { CODING_PROBLEMS, type CodingProblem } from "../data/problems";
import CodeVisualizationPage from "./CodeVisualizationPage";

type ActivePage = null | "problems" | "projects" | "compiler" | "visualizer";

const ACHIEVEMENTS = [
  { icon: "🚀", name: "First Steps", desc: "Complete your first problem" },
  { icon: "🔥", name: "Week Warrior", desc: "7-day learning streak" },
  { icon: "💻", name: "Code Master", desc: "Solve 10 problems" },
  { icon: "💖", name: "First Love Call", desc: "Unlock your first Love Call" },
  { icon: "⚡", name: "Hot Streak", desc: "3 correct answers in a row" },
  { icon: "💯", name: "Century", desc: "Earn 100 points" },
];

const DIFF_COLORS = {
  Easy: "bg-green-100 text-green-700 border-green-200",
  Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Hard: "bg-red-100 text-red-700 border-red-200",
};

async function askOpenAI({
  userMessage,
  companionName,
  problemTitle,
  problemHint,
  openaiKey,
  claudeKey,
}: {
  userMessage: string;
  companionName: string;
  problemTitle: string;
  problemHint: string;
  openaiKey: string;
  claudeKey: string;
}): Promise<string> {
  const systemPrompt = `You are ${companionName}, a friendly and encouraging AI study companion helping a student solve the coding problem "${problemTitle}". 
You are supportive, warm, and give clear technical guidance. If asked for a hint, use this hint: "${problemHint}". 
Keep responses concise (2-3 sentences max). Use light emojis for warmth.`;

  if (!claudeKey && !openaiKey) {
    return "API Key Missing in Settings";
  }

  // Try Claude first
  if (claudeKey) {
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": claudeKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 200,
          system: systemPrompt,
          messages: [{ role: "user", content: userMessage }],
        }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.content?.[0]?.text ?? "";
      }
    } catch (_) {}
  }

  if (openaiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          max_tokens: 200,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage },
          ],
        }),
      });
      if (!res.ok) {
        console.error(`OpenAI error ${res.status}:`, await res.text());
        throw new Error(`OpenAI responded with status ${res.status}`);
      }
      const data = await res.json();
      return data.choices?.[0]?.message?.content ?? "";
    } catch (err) {
      console.error("OpenAI fetch failed:", err);
    }
  }

  return "API Key Missing in Settings";
}

function BottomNav() {
  const { setPage, setCurrentProblemId } = useApp();
  const items = [
    {
      label: "Chat",
      icon: <Home className="w-5 h-5" />,
      action: () => {
        setCurrentProblemId(null);
        setPage("study");
      },
    },
    {
      label: "Study",
      icon: <BookOpen className="w-5 h-5" />,
      action: () => {
        setCurrentProblemId(null);
        setPage("study");
      },
    },
    {
      label: "Events",
      icon: <Calendar className="w-5 h-5" />,
      action: () => {
        setCurrentProblemId(null);
        setPage("study");
      },
    },
    {
      label: "Problems",
      icon: <Code className="w-5 h-5" />,
      action: () => setCurrentProblemId(null),
      active: true,
    },
    {
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      action: () => {
        setCurrentProblemId(null);
        setPage("dashboard");
      },
    },
  ];
  return (
    <nav className="bg-card border-t border-border shrink-0">
      <div className="flex items-stretch">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={item.action}
            className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 text-xs font-medium transition-colors ${
              item.active
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
  );
}

function ProblemCard({
  problem,
  onStart,
}: { problem: CodingProblem; onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${DIFF_COLORS[problem.difficulty]}`}
        >
          {problem.difficulty}
        </span>
        <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
          {problem.topic}
        </span>
      </div>
      <h3 className="font-bold text-primary text-base mb-2">{problem.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
        {problem.desc}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {problem.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-primary/70 bg-primary/5 px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <Button
        onClick={onStart}
        className="w-full rounded-xl bg-primary text-primary-foreground font-semibold text-sm"
      >
        Start <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </motion.div>
  );
}

function ProblemSolver({ problem }: { problem: CodingProblem }) {
  const { user, setUser, openaiKey, claudeKey } = useApp();
  const preset =
    COMPANION_PRESETS.find((p) => p.personality === user.personality) ??
    COMPANION_PRESETS[0];

  const [code, setCode] = useState(problem.template);
  const [submitted, setSubmitted] = useState(false);
  const [submitResult, setSubmitResult] = useState<"success" | "error" | null>(
    null,
  );
  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "companion"; text: string }[]
  >([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const solvedCount = user.solvedProblems?.length ?? 0;
  const totalAttempted = submitted ? solvedCount + 1 : solvedCount;
  const relationshipPct = Math.min(100, Math.round((solvedCount / 10) * 100));

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    setChatMessages([
      {
        role: "companion",
        text: `Hey! Let's solve "${problem.title}" together! ${
          problem.difficulty === "Hard"
            ? "This one's tough but I believe in you! 💪"
            : "You've got this! 💕"
        } Ask me anything or click Get Hint for a clue!`,
      },
    ]);
  }, [problem]);

  const handleSubmit = () => {
    if (code.trim() === problem.template.trim() || code.trim().length < 20) {
      setSubmitResult("error");
      setChatMessages((prev) => [
        ...prev,
        {
          role: "companion",
          text: "Hmm, it looks like you haven't written any code yet! Try implementing the solution, then submit. 💕",
        },
      ]);
      return;
    }
    setSubmitted(true);
    setSubmitResult("success");
    const xpGained =
      problem.difficulty === "Easy"
        ? 20
        : problem.difficulty === "Medium"
          ? 35
          : 50;
    const already = user.solvedProblems?.includes(problem.id);
    if (!already) {
      setUser({
        xp: user.xp + xpGained,
        solvedProblems: [...(user.solvedProblems ?? []), problem.id],
      });
    }
    setChatMessages((prev) => [
      ...prev,
      {
        role: "companion",
        text: `Amazing work! 🎉 You submitted a solution for "${problem.title}"! ${
          already ? "" : `+${xpGained} XP earned! 🌟`
        }`,
      },
    ]);
  };

  const handleGetHint = () => {
    if (!problem) return;
    // If no API key, show hint directly without calling AI
    if (!claudeKey && !openaiKey) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "companion",
          text: `💡 **Hint:** ${problem.hint || "Think about breaking the problem into smaller steps."}`,
        },
      ]);
      return;
    }
    setChatMessages((prev) => [
      ...prev,
      { role: "user", text: "Can I get a hint? 🤔" },
    ]);
    setIsTyping(true);
    askOpenAI({
      userMessage: "Can I get a hint for this problem?",
      companionName: user.companionName || preset.defaultName,
      problemTitle: problem.title,
      problemHint: problem.hint,
      openaiKey,
      claudeKey,
    })
      .then((resp) => {
        setIsTyping(false);
        setChatMessages((prev) => [
          ...prev,
          { role: "companion", text: resp || `💡 Hint: ${problem.hint}` },
        ]);
      })
      .catch(() => {
        setIsTyping(false);
        setChatMessages((prev) => [
          ...prev,
          { role: "companion", text: `💡 Hint: ${problem.hint}` },
        ]);
      });
  };

  const handleSendChat = useCallback(() => {
    const text = chatInput.trim();
    if (!text) return;
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", text }]);
    setIsTyping(true);
    askOpenAI({
      userMessage: text,
      companionName: user.companionName || preset.defaultName,
      problemTitle: problem.title,
      problemHint: problem.hint,
      openaiKey,
      claudeKey,
    }).then((resp) => {
      setIsTyping(false);
      setChatMessages((prev) => [
        ...prev,
        {
          role: "companion",
          text: resp || "You're doing great! Keep coding! 💕",
        },
      ]);
    });
  }, [
    chatInput,
    user.companionName,
    preset.defaultName,
    problem,
    openaiKey,
    claudeKey,
  ]);

  return (
    <div className="h-screen bg-[#fdf2f6] flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src={preset.image}
              alt={user.companionName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="leading-tight">
            <div className="text-xs font-bold text-foreground">
              {user.companionName || "Companion"}
            </div>
            <div className="text-[10px] text-muted-foreground">
              {preset.traits.split(" · ")[0]}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">
            ❤️ <strong className="text-foreground">0</strong> Love Calls
          </span>
          <span className="text-muted-foreground">
            Streak: <strong className="text-foreground">0/3</strong>
          </span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
          {/* Problem Statement */}
          <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-xl font-extrabold text-foreground">
                {problem.title}
              </h1>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${DIFF_COLORS[problem.difficulty]}`}
              >
                {problem.difficulty}
              </span>
            </div>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              {problem.desc}
            </p>
            <div className="bg-[#1a1a2e] rounded-xl p-4 font-mono text-xs mb-3 space-y-1">
              <div>
                <span className="text-blue-400">Input:</span>{" "}
                <span className="text-gray-300">{problem.inputDesc}</span>
              </div>
              <div>
                <span className="text-green-400">Output:</span>{" "}
                <span className="text-gray-300">{problem.outputDesc}</span>
              </div>
            </div>
            {problem.examples.map((ex) => (
              <div
                key={ex.input.slice(0, 20)}
                className="bg-[#1a1a2e] rounded-xl p-4 font-mono text-xs mb-2 space-y-1"
              >
                <div>
                  <span className="text-blue-400">Input:</span>{" "}
                  <span className="text-gray-300">{ex.input}</span>
                </div>
                <div>
                  <span className="text-green-400">Output:</span>{" "}
                  <span className="text-gray-300">{ex.output}</span>
                </div>
                {ex.comment && (
                  <div className="text-gray-500">
                    <span>{"// "}</span>
                    {ex.comment}
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-wrap gap-2 mt-3">
              {problem.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-primary/70 bg-primary/5 px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Code Editor */}
          <div className="bg-[#1e1e2e] rounded-2xl overflow-hidden border border-border shadow-sm">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-gray-400 ml-2 font-mono">
                  solution.js
                </span>
              </div>
              <span className="text-xs text-gray-500">Javascript</span>
            </div>
            <div className="flex">
              <div className="px-3 py-4 text-right select-none font-mono text-xs text-gray-600 bg-[#181825] min-w-[2.5rem]">
                {code.split("\n").map((_, i) => (
                  <div key={`ln-${i + 1}`}>{i + 1}</div>
                ))}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 bg-transparent text-gray-100 font-mono text-xs py-4 pr-4 resize-none outline-none leading-5"
                style={{ minHeight: "180px", lineHeight: "1.25rem" }}
                spellCheck={false}
              />
            </div>
            <div className="flex justify-end px-4 py-3 border-t border-white/10">
              <Button
                onClick={handleSubmit}
                className="rounded-full bg-primary text-primary-foreground font-bold text-sm gap-2 px-5"
              >
                <Code className="w-4 h-4" /> Submit Solution
              </Button>
            </div>
          </div>

          {/* Submit result */}
          <AnimatePresence>
            {submitResult && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                  submitResult === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {submitResult === "success"
                  ? "✅ Solution submitted! Great work!"
                  : "❌ Please write your solution before submitting."}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Relationship Progress */}
          <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Relationship Progress
              </span>
              <span className="text-sm font-bold text-primary">
                {relationshipPct}%
              </span>
            </div>
            <Progress value={relationshipPct} className="h-2 mb-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{solvedCount} Solved</span>
              <span>{totalAttempted} Attempted</span>
            </div>
          </div>

          {/* Companion Chat */}
          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={preset.image}
                    alt={user.companionName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold">
                    {user.companionName} Chat
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {openaiKey || claudeKey ? "🤖 AI Powered" : "💬 Local Mode"}
                  </div>
                </div>
              </div>
              <Button
                onClick={handleGetHint}
                variant="outline"
                size="sm"
                className="rounded-full border-primary text-primary gap-1 text-xs"
              >
                <Lightbulb className="w-3.5 h-3.5" /> Get Hint
              </Button>
            </div>
            <ScrollArea className="h-48">
              <div className="p-4 space-y-3">
                {chatMessages.map((msg, i) => (
                  <div
                    key={`msg-${i}-${msg.role}`}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted text-foreground rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <span
                          className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </ScrollArea>
            <div className="border-t border-border p-3 flex gap-2">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                placeholder="Ask your companion anything..."
                className="rounded-full h-9 text-sm border-2 focus:border-primary"
              />
              <Button
                onClick={handleSendChat}
                disabled={!chatInput.trim()}
                className="rounded-full w-9 h-9 p-0 bg-primary text-primary-foreground shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

// ─── Page Header with Back Button ─────────────────────────────────────────────
function PageHeader({
  title,
  emoji,
  subtitle,
  onBack,
  gradientFrom,
  gradientTo,
}: {
  title: string;
  emoji: string;
  subtitle: string;
  onBack: () => void;
  gradientFrom: string;
  gradientTo: string;
}) {
  return (
    <header
      className="shrink-0 px-4 py-3 flex items-center gap-3"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        borderBottom: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onBack}
        className="rounded-xl text-white/80 hover:text-white hover:bg-white/15 shrink-0"
        data-ocid="problems.back_button"
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-xl shrink-0"
        style={{ background: "rgba(255,255,255,0.2)" }}
      >
        {emoji}
      </div>
      <div className="flex-1 min-w-0">
        <h1 className="font-extrabold text-white text-base leading-tight truncate">
          {title}
        </h1>
        <p className="text-[11px] text-white/70 truncate">{subtitle}</p>
      </div>
    </header>
  );
}

// ─── Sub-pages ────────────────────────────────────────────────────────────────
function ProblemsSubPage({
  onBack,
  onStartProblem,
}: {
  onBack: () => void;
  onStartProblem: (id: string) => void;
}) {
  return (
    <div className="h-screen bg-[#fdf2f6] flex flex-col overflow-hidden">
      <PageHeader
        title="Coding Problems"
        emoji="🧩"
        subtitle="Solve real challenges with AI hints"
        onBack={onBack}
        gradientFrom="#10b981"
        gradientTo="#0d9488"
      />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {CODING_PROBLEMS.map((problem) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                onStart={() => onStartProblem(problem.id)}
              />
            ))}
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-2">
              🏆 Achievements
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ACHIEVEMENTS.map((ach) => (
                <div
                  key={ach.name}
                  className="bg-card rounded-2xl p-4 border border-border text-center opacity-60"
                >
                  <div className="text-2xl mb-1">{ach.icon}</div>
                  <div className="text-xs font-bold text-foreground">
                    {ach.name}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    {ach.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

function ProjectsSubPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="h-screen bg-[#fdf2f6] flex flex-col overflow-hidden">
      <PageHeader
        title="Project-Based Learning"
        emoji="🛠️"
        subtitle="Build real projects step by step"
        onBack={onBack}
        gradientFrom="#f97316"
        gradientTo="#ef4444"
      />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <ProjectsSection />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

function CompilerSubPage({ onBack }: { onBack: () => void }) {
  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ background: "#0d1117" }}
    >
      <PageHeader
        title="Multi-Language Compiler"
        emoji="💻"
        subtitle="20+ languages · Judge0 powered · Auto-save"
        onBack={onBack}
        gradientFrom="#0891b2"
        gradientTo="#2563eb"
      />
      <div
        className="flex-1 overflow-y-auto px-4 pt-5"
        style={{ background: "#0d1117" }}
      >
        <MultiLangCompiler />
      </div>
      <div style={{ background: "#0d1117" }}>
        <BottomNav />
      </div>
    </div>
  );
}

function VisualizerSubPage({ onBack }: { onBack: () => void }) {
  // CodeVisualizationPage has its own BottomNav and header — we wrap it
  // and inject a back button by overlaying it at the top
  return (
    <div className="h-screen flex flex-col overflow-hidden relative">
      {/* Overlay back button strip */}
      <div
        className="shrink-0 flex items-center gap-2 px-3 py-2 z-10"
        style={{
          background:
            "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)",
          borderBottom: "1px solid rgba(139,92,246,0.3)",
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-xl text-white/80 hover:text-white hover:bg-white/15 w-8 h-8"
          data-ocid="visualizer.back_button"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <span className="text-white/70 text-xs font-semibold">
          ← Back to Code Studio
        </span>
      </div>
      {/* Visualizer fills the rest */}
      <div className="flex-1 overflow-hidden">
        <CodeVisualizationPage />
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function ProblemsPage() {
  const { currentProblemId, setCurrentProblemId } = useApp();
  const [activePage, setActivePage] = useState<ActivePage>(null);

  const currentProblem = currentProblemId
    ? CODING_PROBLEMS.find((p) => p.id === currentProblemId)
    : null;

  // If a specific problem is open, show the solver view
  if (currentProblem) {
    return <ProblemSolver problem={currentProblem} />;
  }

  // Full-page sub-views
  if (activePage === "problems") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="problems-page"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.22 }}
          className="h-screen"
        >
          <ProblemsSubPage
            onBack={() => setActivePage(null)}
            onStartProblem={(id) => setCurrentProblemId(id)}
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  if (activePage === "projects") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="projects-page"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.22 }}
          className="h-screen"
        >
          <ProjectsSubPage onBack={() => setActivePage(null)} />
        </motion.div>
      </AnimatePresence>
    );
  }

  if (activePage === "compiler") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="compiler-page"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.22 }}
          className="h-screen"
        >
          <CompilerSubPage onBack={() => setActivePage(null)} />
        </motion.div>
      </AnimatePresence>
    );
  }

  if (activePage === "visualizer") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="visualizer-page"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.22 }}
          className="h-screen"
        >
          <VisualizerSubPage onBack={() => setActivePage(null)} />
        </motion.div>
      </AnimatePresence>
    );
  }

  // ── Banner List (default view) ──────────────────────────────────────────────
  return (
    <div className="h-screen bg-[#fdf2f6] flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-3">
        <span className="font-bold text-foreground">Code Studio 💻</span>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Section heading */}
          <div className="mb-5">
            <h2 className="text-2xl font-extrabold text-primary">
              💻 Code Studio
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Practice real coding problems with your companion by your side
            </p>
          </div>

          {/* Code Visualizer Banner */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setActivePage("visualizer")}
            className="w-full mb-5 bg-gradient-to-r from-violet-500 to-pink-500 rounded-2xl p-4 text-left flex items-center gap-4 shadow-lg hover:shadow-xl transition-shadow"
            data-ocid="problems.visualizer.button"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl shrink-0">
              🔍
            </div>
            <div className="flex-1">
              <div className="text-white font-extrabold text-base">
                Code Visualizer
              </div>
              <div className="text-white/80 text-xs mt-0.5">
                Upload or paste code — see it animate step by step with
                variables, arrays &amp; speed control
              </div>
            </div>
            <div className="text-white/60 text-lg">&rsaquo;</div>
          </motion.button>

          {/* Compiler Banner */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setActivePage("compiler")}
            className="w-full mb-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-4 text-left flex items-center gap-4 shadow-lg hover:shadow-xl transition-shadow"
            data-ocid="problems.compiler.button"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl shrink-0">
              💻
            </div>
            <div className="flex-1">
              <div className="text-white font-extrabold text-base">
                Multi-Language Compiler
              </div>
              <div className="text-white/80 text-xs mt-0.5">
                Write &amp; run code in 20 languages — Python, Java, C++, Go,
                Rust &amp; more. Save your snippets.
              </div>
            </div>
            <div className="text-white/60 text-lg">&rsaquo;</div>
          </motion.button>

          {/* Problems Banner */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setActivePage("problems")}
            className="w-full mb-5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 text-left flex items-center gap-4 shadow-lg hover:shadow-xl transition-shadow"
            data-ocid="problems.banner"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl shrink-0">
              🧩
            </div>
            <div className="flex-1">
              <div className="text-white font-extrabold text-base">
                Coding Problems
              </div>
              <div className="text-white/80 text-xs mt-0.5">
                Solve real coding challenges with hints and your AI companion by
                your side
              </div>
            </div>
            <div className="text-white/60 text-lg">&rsaquo;</div>
          </motion.button>

          {/* Projects Banner */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setActivePage("projects")}
            className="w-full mb-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 text-left flex items-center gap-4 shadow-lg hover:shadow-xl transition-shadow"
            data-ocid="projects.banner"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl shrink-0">
              🛠️
            </div>
            <div className="flex-1">
              <div className="text-white font-extrabold text-base">
                Project-Based Learning
              </div>
              <div className="text-white/80 text-xs mt-0.5">
                Build real projects step-by-step with tasks, hints, and
                companion guidance
              </div>
            </div>
            <div className="text-white/60 text-lg">&rsaquo;</div>
          </motion.button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
