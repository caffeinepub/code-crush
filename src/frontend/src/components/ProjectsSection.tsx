import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  ChevronRight,
  Circle,
  Eye,
  EyeOff,
  Github,
  Lightbulb,
  Loader2,
  MessageCircle,
  Pencil,
  Send,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import { COMPANION_PRESETS } from "../data/companions";
import {
  ALL_PROJECTS,
  type Project,
  type ProjectTask,
  TRACKS,
  type TrackFilter,
} from "../data/projects";

const STORAGE_KEY = "cnc_projects_state";
const CODE_KEY = (taskId: string) => `cnc_task_code_${taskId}`;
const HINTS_KEY = (taskId: string) => `cnc_task_hints_${taskId}`;

function loadState(): Record<string, string[]> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveState(s: Record<string, string[]>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

const TRACK_COLORS: Record<string, string> = {
  "Full Stack": "bg-blue-100 text-blue-700 border-blue-200",
  Frontend: "bg-pink-100 text-pink-700 border-pink-200",
  "App Development": "bg-purple-100 text-purple-700 border-purple-200",
  "Web Development": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Python Developer": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Java Developer": "bg-orange-100 text-orange-700 border-orange-200",
};

const DIFF_COLORS: Record<string, string> = {
  Beginner: "bg-green-100 text-green-700 border-green-200",
  Intermediate: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Advanced: "bg-red-100 text-red-700 border-red-200",
};

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ── Task Workspace Modal ──────────────────────────────────────────────────
type WorkspaceProps = {
  task: ProjectTask;
  projectTitle: string;
  isDone: boolean;
  onClose: () => void;
  onComplete: () => void;
};

function TaskWorkspace({
  task,
  projectTitle,
  isDone,
  onClose,
  onComplete,
}: WorkspaceProps) {
  const { user, openaiKey, claudeKey } = useApp();
  const preset =
    COMPANION_PRESETS.find((p) => p.personality === user.personality) ??
    COMPANION_PRESETS[0];
  const companionImage = user.companionCustomPhoto || preset.image;
  const accentColor = preset.accentColor;

  const [code, setCode] = useState(
    () => localStorage.getItem(CODE_KEY(task.id)) ?? task.starterCode,
  );
  const [revealedCount, setRevealedCount] = useState<number>(() => {
    try {
      return Number.parseInt(localStorage.getItem(HINTS_KEY(task.id)) ?? "0");
    } catch {
      return 0;
    }
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Companion chat
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    Array<{ role: "user" | "companion"; text: string }>
  >([
    {
      role: "companion",
      text: `Hey! I'm here to help you with "${task.title}". Don't worry if it seems hard — just try first and ask me when stuck! 💪`,
    },
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatOpen) {
      setTimeout(
        () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }),
        100,
      );
    }
  }, [chatOpen]);

  useEffect(() => {
    localStorage.setItem(CODE_KEY(task.id), code);
  }, [code, task.id]);

  useEffect(() => {
    localStorage.setItem(HINTS_KEY(task.id), String(revealedCount));
  }, [revealedCount, task.id]);

  const getLocalReply = (msg: string): string => {
    const lower = msg.toLowerCase();
    if (/help|stuck|how|what|where|why/.test(lower)) {
      return "What have you tried so far? Think about the steps one at a time! 🤔";
    }
    if (/hint/.test(lower)) {
      return "Check the hints section above — reveal them one at a time! Each hint is a nudge in the right direction 💡";
    }
    if (/done|complete|finished|submit/.test(lower)) {
      return "Great work! Double-check your code before submitting 🎉";
    }
    return "Good question! Try breaking the problem into smaller pieces. What's the first tiny step you need to do?";
  };

  const handleSendChat = async () => {
    const text = chatInput.trim();
    if (!text || chatLoading) return;
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", text }]);
    setChatLoading(true);

    try {
      const effectiveKey = claudeKey || openaiKey;
      if (claudeKey) {
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
            system: `You are ${user.companionName}, a coding study companion. The user is working on a task: "${task.title}". Goal: "${task.desc}". Give HINTS and GUIDANCE only — never give the complete solution/code. Be encouraging, ask them what they've tried, guide with questions. Keep responses to 2-3 sentences.`,
            messages: [{ role: "user", content: text }],
          }),
        });
        if (res.ok) {
          const data = await res.json();
          const reply = data.content?.[0]?.text ?? getLocalReply(text);
          setChatMessages((prev) => [
            ...prev,
            { role: "companion", text: reply },
          ]);
          setChatLoading(false);
          return;
        }
      }
      if (openaiKey) {
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
              {
                role: "system",
                content: `You are ${user.companionName}, a coding study companion. The user is working on a task: "${task.title}". Goal: "${task.desc}". Give HINTS and GUIDANCE only — never give the complete solution/code. Be encouraging, ask them what they've tried, guide with questions. Keep responses to 2-3 sentences.`,
              },
              { role: "user", content: text },
            ],
          }),
        });
        if (res.ok) {
          const data = await res.json();
          const reply =
            data.choices?.[0]?.message?.content ?? getLocalReply(text);
          setChatMessages((prev) => [
            ...prev,
            { role: "companion", text: reply },
          ]);
          setChatLoading(false);
          return;
        }
      }
      if (!effectiveKey) {
        setChatMessages((prev) => [
          ...prev,
          { role: "companion", text: getLocalReply(text) },
        ]);
      }
    } catch {
      setChatMessages((prev) => [
        ...prev,
        { role: "companion", text: getLocalReply(text) },
      ]);
    }
    setChatLoading(false);
  };

  const handleRevealHint = () => {
    if (revealedCount < task.hints.length) {
      setRevealedCount(revealedCount + 1);
    }
  };

  const handleSubmit = () => {
    onComplete();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch bg-black/60 backdrop-blur-sm"
      data-ocid="task_workspace.modal"
    >
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 60 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="ml-auto w-full max-w-2xl bg-card border-l border-border shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-muted/30">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground font-medium truncate">
              {projectTitle}
            </p>
            <h2 className="text-base font-extrabold text-foreground leading-tight mt-0.5 truncate">
              {task.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-ocid="task_workspace.close_button"
            className="ml-3 p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {/* Task guide — no spoilers */}
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
              📋 What To Do
            </h3>
            <p className="text-sm text-foreground leading-relaxed bg-muted/50 rounded-xl p-3">
              {task.desc}
            </p>
            <div className="mt-3 flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5">
              <span className="text-blue-500 text-sm shrink-0">💡</span>
              <p className="text-xs text-blue-700 leading-relaxed">
                Try to write the code yourself first! Use the hints below if you
                get stuck. Your companion can also help you think through it.
              </p>
            </div>
          </div>

          {/* Code editor */}
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Your Code
            </h3>
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              data-ocid="task_workspace.code_editor"
              className="w-full min-h-[200px] bg-gray-950 text-gray-100 text-xs font-mono p-4 rounded-xl border border-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y leading-relaxed placeholder:text-gray-600"
              placeholder="Write your code here..."
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
            <p className="text-[11px] text-muted-foreground mt-1">
              Your code is saved automatically.
            </p>
          </div>

          {/* Hints */}
          <div className="px-5 py-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" /> Hints ({revealedCount}/
                {task.hints.length})
              </h3>
              {revealedCount < task.hints.length && (
                <button
                  type="button"
                  onClick={handleRevealHint}
                  data-ocid="task_workspace.reveal_hint_button"
                  className="text-xs font-semibold text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/20 px-3 py-1 rounded-full transition-colors"
                >
                  Reveal Hint {revealedCount + 1}
                </button>
              )}
            </div>
            <div className="space-y-2">
              <AnimatePresence>
                {task.hints.slice(0, revealedCount).map((hint, i) => (
                  <motion.div
                    key={hint.slice(0, 20)}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    data-ocid={`task_workspace.hint_${i + 1}`}
                    className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3"
                  >
                    <span className="text-amber-500 font-bold text-sm shrink-0 mt-0.5">
                      {i + 1}.
                    </span>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      {hint}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
              {revealedCount === 0 && (
                <p className="text-xs text-muted-foreground italic">
                  Click "Reveal Hint 1" if you're stuck.
                </p>
              )}
              {revealedCount === task.hints.length && revealedCount > 0 && (
                <p className="text-xs text-muted-foreground">
                  All hints revealed. You've got this!
                </p>
              )}
            </div>
          </div>

          {/* Companion Chat */}
          <div className="px-5 py-4 border-t border-border">
            <button
              type="button"
              onClick={() => setChatOpen(!chatOpen)}
              data-ocid="task_workspace.chat_toggle"
              className="w-full flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-border shrink-0">
                <img
                  src={companionImage}
                  alt={user.companionName}
                  className="w-full h-full object-cover"
                />
              </div>
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>💬 Ask {user.companionName}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {chatOpen ? "▲" : "▼"}
              </span>
            </button>
            <AnimatePresence>
              {chatOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div
                    className="mt-3 rounded-xl border border-border bg-muted/20 flex flex-col"
                    style={{ maxHeight: 280 }}
                  >
                    {/* Messages */}
                    <div
                      className="flex-1 overflow-y-auto p-3 space-y-2.5"
                      style={{ maxHeight: 220 }}
                    >
                      {chatMessages.map((msg, i) => (
                        <div
                          key={`chat-${msg.role}-${i}`}
                          className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                        >
                          {msg.role === "companion" && (
                            <div
                              className="w-6 h-6 rounded-full overflow-hidden shrink-0 mt-0.5 border-2"
                              style={{ borderColor: accentColor }}
                            >
                              <img
                                src={companionImage}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div
                            className={`max-w-[78%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                              msg.role === "user"
                                ? "bg-primary text-primary-foreground rounded-tr-sm"
                                : "text-foreground rounded-tl-sm"
                            }`}
                            style={
                              msg.role === "companion"
                                ? {
                                    backgroundColor: `${accentColor}22`,
                                    border: `1px solid ${accentColor}44`,
                                  }
                                : {}
                            }
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      {chatLoading && (
                        <div className="flex gap-2">
                          <div
                            className="w-6 h-6 rounded-full overflow-hidden shrink-0 border-2"
                            style={{ borderColor: accentColor }}
                          >
                            <img
                              src={companionImage}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div
                            className="rounded-2xl rounded-tl-sm px-3 py-2 text-xs"
                            style={{
                              backgroundColor: `${accentColor}22`,
                              border: `1px solid ${accentColor}44`,
                            }}
                          >
                            <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>
                    {/* Input */}
                    <div className="flex gap-2 p-2 border-t border-border">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                        placeholder={`Ask ${user.companionName} for a hint...`}
                        data-ocid="task_workspace.chat_input"
                        className="flex-1 text-xs bg-background border border-border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground"
                      />
                      <button
                        type="button"
                        onClick={handleSendChat}
                        disabled={!chatInput.trim() || chatLoading}
                        data-ocid="task_workspace.chat_send_button"
                        className="p-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border bg-muted/20 flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 rounded-xl"
            data-ocid="task_workspace.cancel_button"
          >
            Close
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isDone}
            data-ocid="task_workspace.submit_button"
            className="flex-1 rounded-xl font-bold bg-primary text-primary-foreground gap-2"
          >
            {isDone ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> Completed!
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" /> Mark Complete
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

// ── GitHub Upload Modal ───────────────────────────────────────────────────
type UploadModalProps = {
  project: Project;
  onClose: () => void;
};

function GitHubUploadModal({ project, onClose }: UploadModalProps) {
  const [repoName, setRepoName] = useState(slugify(project.title));
  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const repoId = `repo-name-${project.id}`;
  const tokenId = `gh-token-${project.id}`;

  const handleCreate = async () => {
    if (!repoName.trim() || !token.trim()) {
      setError("Repository name and token are required.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("https://api.github.com/user/repos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.trim()}`,
        },
        body: JSON.stringify({
          name: repoName.trim(),
          description: project.desc,
          auto_init: true,
          private: false,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setSuccess(data.html_url as string);
      } else {
        const data = await res.json();
        setError(data.message ?? `GitHub API error ${res.status}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      data-ocid="github_upload.modal"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="bg-card rounded-2xl border border-border shadow-2xl w-full max-w-md p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-extrabold text-foreground">
              Upload to GitHub 🚀
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-ocid="github_upload.close_button"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          We'll create a public repository and push a README with your project
          details.
        </p>

        <div className="space-y-4">
          <div>
            <label
              htmlFor={repoId}
              className="text-sm font-semibold text-foreground block mb-1.5"
            >
              Repository Name
            </label>
            <Input
              id={repoId}
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              placeholder="my-awesome-project"
              className="rounded-xl"
              data-ocid="github_upload.input"
            />
          </div>

          <div>
            <label
              htmlFor={tokenId}
              className="text-sm font-semibold text-foreground block mb-1.5"
            >
              GitHub Personal Access Token
            </label>
            <div className="relative">
              <Input
                id={tokenId}
                type={showToken ? "text" : "password"}
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxx"
                className="rounded-xl pr-10"
                data-ocid="github_upload.token_input"
              />
              <button
                type="button"
                onClick={() => setShowToken(!showToken)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showToken ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Needs <code className="bg-muted px-1 rounded text-xs">repo</code>{" "}
              scope.
              <a
                href="https://github.com/settings/tokens/new"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline ml-1"
              >
                Generate one here.
              </a>
            </p>
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              data-ocid="github_upload.error_state"
              className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-2.5 text-sm"
            >
              ❌ {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              data-ocid="github_upload.success_state"
              className="mt-4 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-2.5 text-sm"
            >
              ✅ Repository created!{" "}
              <a
                href={success}
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold"
              >
                View on GitHub →
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-5 flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 rounded-xl"
            data-ocid="github_upload.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={loading || !!success}
            data-ocid="github_upload.confirm_button"
            className="flex-1 rounded-xl bg-primary text-primary-foreground font-bold gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Creating…
              </>
            ) : (
              <>
                <Github className="w-4 h-4" /> Create Repository
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────
type ProjectCardProps = {
  project: Project;
  completedTaskIds: string[];
  onCompleteTask: (taskId: string) => void;
  index: number;
};

function ProjectCard({
  project,
  completedTaskIds,
  onCompleteTask,
  index,
}: ProjectCardProps) {
  const [showUpload, setShowUpload] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeTask, setActiveTask] = useState<ProjectTask | null>(null);

  const completedCount = completedTaskIds.length;
  const totalCount = project.tasks.length;
  const isComplete = completedCount === totalCount;
  const progressPct = Math.round((completedCount / totalCount) * 100);
  const tasksToShow = expanded ? project.tasks : project.tasks.slice(0, 3);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        data-ocid={`projects.item.${index + 1}`}
        className={`bg-card rounded-2xl p-5 border shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3 ${
          isComplete
            ? "border-primary/40 shadow-primary/10 shadow-lg"
            : "border-border"
        }`}
      >
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
              TRACK_COLORS[project.track] ??
              "bg-muted text-muted-foreground border-border"
            }`}
          >
            {project.track}
          </span>
          <span
            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${DIFF_COLORS[project.difficulty]}`}
          >
            {project.difficulty}
          </span>
          <span className="ml-auto text-xs text-amber-600 font-bold bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
            +{project.xpReward} XP
          </span>
        </div>

        {/* Title & description */}
        <div>
          <h3 className="font-extrabold text-primary text-base leading-snug">
            {project.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
            {project.desc}
          </p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] text-primary/70 bg-primary/5 px-2 py-0.5 rounded-full font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-muted-foreground">
              Tasks
            </span>
            <span className="text-xs font-bold text-primary">
              {completedCount}/{totalCount} done
            </span>
          </div>
          <Progress value={progressPct} className="h-2" />
        </div>

        {/* Task list */}
        <div className="space-y-1.5">
          {tasksToShow.map((task) => {
            const done = completedTaskIds.includes(task.id);
            return (
              <button
                key={task.id}
                type="button"
                onClick={() => setActiveTask(task)}
                className="w-full flex items-center gap-2.5 text-left group hover:bg-muted/50 rounded-lg px-2 py-1.5 transition-colors"
                data-ocid={`projects.task_row.${project.id}`}
              >
                {done ? (
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-muted-foreground/50 shrink-0 group-hover:text-primary/50 transition-colors" />
                )}
                <div className="flex-1 min-w-0">
                  <span
                    className={`text-xs font-semibold leading-tight block truncate ${
                      done
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
                {done ? (
                  <Pencil className="w-3 h-3 text-muted-foreground shrink-0 opacity-50" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
                )}
              </button>
            );
          })}
        </div>

        {project.tasks.length > 3 && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-primary font-semibold hover:underline text-left"
          >
            {expanded
              ? "Show less ↑"
              : `Show ${project.tasks.length - 3} more tasks ↓`}
          </button>
        )}

        {/* Complete button */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                type="button"
                onClick={() => setShowUpload(true)}
                data-ocid="projects.open_modal_button"
                className="w-full mt-1 py-3 rounded-2xl font-extrabold text-sm text-white
                  bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500
                  shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50
                  transition-all hover:scale-[1.02] active:scale-[0.99]
                  relative overflow-hidden"
                style={{ animation: "glow-pulse 2s ease-in-out infinite" }}
              >
                🎉 Project Complete! Upload to GitHub
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Task Workspace */}
      <AnimatePresence>
        {activeTask && (
          <TaskWorkspace
            task={activeTask}
            projectTitle={project.title}
            isDone={completedTaskIds.includes(activeTask.id)}
            onClose={() => setActiveTask(null)}
            onComplete={() => {
              if (!completedTaskIds.includes(activeTask.id)) {
                onCompleteTask(activeTask.id);
              }
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showUpload && (
          <GitHubUploadModal
            project={project}
            onClose={() => setShowUpload(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ── Main Component ────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const [activeTrack, setActiveTrack] = useState<TrackFilter>("All");
  const [projectState, setProjectState] =
    useState<Record<string, string[]>>(loadState);
  const stateRef = useRef(projectState);
  stateRef.current = projectState;

  useEffect(() => {
    saveState(projectState);
  }, [projectState]);

  const handleCompleteTask = (projectId: string, taskId: string) => {
    setProjectState((prev) => {
      const current = prev[projectId] ?? [];
      if (current.includes(taskId)) return prev;
      return { ...prev, [projectId]: [...current, taskId] };
    });
  };

  const filtered =
    activeTrack === "All"
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.track === activeTrack);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-primary">
          🛠️ Project Tracks
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Click any task to open the workspace. Write code, reveal hints, then
          submit when done.
        </p>
      </div>

      {/* Track filter tabs */}
      <div className="flex flex-wrap gap-2" data-ocid="projects.filter.tab">
        {TRACKS.map((track) => (
          <button
            key={track}
            type="button"
            onClick={() => setActiveTrack(track)}
            data-ocid="projects.tab"
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
              activeTrack === track
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
            }`}
          >
            {track}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            completedTaskIds={projectState[project.id] ?? []}
            onCompleteTask={(taskId) => handleCompleteTask(project.id, taskId)}
            index={i}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="projects.empty_state"
        >
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-semibold">No projects in this track yet.</p>
        </div>
      )}

      <style>{`
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 12px 2px rgba(236, 72, 153, 0.45); }
          50% { box-shadow: 0 0 24px 6px rgba(168, 85, 247, 0.55); }
        }
      `}</style>
    </div>
  );
}
