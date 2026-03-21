import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Award,
  BookOpen,
  Code,
  Flame,
  LogOut,
  Phone,
  Send,
  Star,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import { COMPANION_PRESETS } from "../data/companions";
import { TOPICS } from "../data/quizData";
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

type MobilePanel = "topics" | null;

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
  } = useApp();
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [burnoutMode, setBurnoutMode] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>(null);
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

  const generateResponse = useCallback(
    (text: string): string => {
      const lower = text.toLowerCase();

      // CS keyword detection
      for (const kw of CS_KEYWORDS) {
        if (lower.includes(kw) && preset.csKeywordResponses[kw]) {
          return preset.csKeywordResponses[kw];
        }
      }

      // Frustration detection
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

      // Default encouragement — no repeats thanks to queue
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

    setTimeout(
      () => {
        const response = generateResponse(text);
        setIsTyping(false);
        addMessage({ role: "companion", text: response });
        addMessageMutation.mutate({ role: "companion", text: response });
        setUser({ xp: user.xp + 2 });
      },
      600 + Math.random() * 400,
    );
  }, [
    inputText,
    addMessage,
    addMessageMutation,
    generateResponse,
    setUser,
    user.xp,
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

  return (
    <div className="h-screen bg-muted flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="bg-white border-b border-border px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
            <span className="text-white text-xs font-bold">C&amp;C</span>
          </div>
          <span className="font-bold text-foreground">Code &amp; Crush</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Mobile quick actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setMobilePanel(mobilePanel === "topics" ? null : "topics")
              }
              className="rounded-full text-muted-foreground hover:text-foreground text-xs gap-1 px-2"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Topics</span>
            </Button>
            <Button
              size="sm"
              onClick={() => setPage("quiz")}
              className="rounded-full bg-primary text-primary-foreground text-xs gap-1 px-3"
            >
              <Star className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Quiz</span>
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setCurrentProblemId(null);
                setPage("problems");
              }}
              variant="outline"
              className="rounded-full text-xs gap-1 px-2"
            >
              <Code className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Problems</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLoveCall(true)}
              className="rounded-full text-xs gap-1 px-3"
              style={{
                borderColor: preset.accentColor,
                color: preset.accentColor,
              }}
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Call</span>
            </Button>
          </div>
          <span className="text-sm text-muted-foreground hidden sm:block">
            Hi, <strong>{user.username}</strong>! 💕
          </span>
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

      {/* Mobile Topics Panel */}
      <AnimatePresence>
        {mobilePanel === "topics" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden bg-white border-b border-border px-4 py-3 flex flex-wrap gap-2 shrink-0 shadow-sm"
          >
            {TOPICS.map((topic) => (
              <button
                type="button"
                key={topic}
                onClick={() => {
                  setActiveTopic(topic);
                  setMobilePanel(null);
                }}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all flex items-center gap-1.5 ${
                  activeTopic === topic
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "bg-muted text-foreground border border-border hover:border-primary/30"
                }`}
              >
                <span>{topicIcons[topic] ?? "📚"}</span>
                {topic}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-border flex flex-col p-4 gap-4 shrink-0 hidden md:flex">
          {/* Companion */}
          <div className="text-center py-4">
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              className={`w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 ring-4 shadow-glow ${
                burnoutMode ? "ring-red-300" : "ring-primary/30"
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

          {/* XP Bar */}
          <div className="bg-muted rounded-2xl p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                <Zap className="w-3 h-3 text-yellow-500" /> Level {level}
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

          {/* Streak */}
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

          {/* Badges */}
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

        {/* Center: Chat */}
        <main className="flex-1 flex flex-col min-w-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4 max-w-2xl mx-auto pb-2">
              {messages.length === 0 && (
                <div className="text-center py-12" data-ocid="chat.empty_state">
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
                    className={`flex items-end gap-2 ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
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
                      className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-white border border-border shadow-card rounded-bl-sm text-foreground"
                      }`}
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

          {/* XP Flash overlay */}
          <AnimatePresence>
            {xpFlash !== null && (
              <motion.div
                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                animate={{ opacity: 1, y: -40, scale: 1.2 }}
                exit={{ opacity: 0, y: -80, scale: 0.8 }}
                className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-yellow-400 text-white font-extrabold text-2xl px-6 py-2 rounded-full shadow-lg pointer-events-none z-40"
              >
                +{xpFlash} XP! ✨
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input */}
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
        </main>

        {/* Right Sidebar */}
        <aside className="w-64 bg-white border-l border-border p-4 flex flex-col gap-4 shrink-0 hidden lg:flex">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Study Topics
            </p>
            <div className="space-y-2">
              {TOPICS.map((topic) => (
                <button
                  type="button"
                  key={topic}
                  data-ocid={`topic.${topic.toLowerCase().replace(/[^a-z0-9]/g, "_")}.button`}
                  onClick={() => setActiveTopic(topic)}
                  className={`w-full text-left rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeTopic === topic
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "hover:bg-muted text-foreground"
                  }`}
                >
                  <span>{topicIcons[topic] ?? "📚"}</span>
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

          <div className="bg-muted rounded-2xl p-3 mt-auto">
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
        </aside>
      </div>
    </div>
  );
}
