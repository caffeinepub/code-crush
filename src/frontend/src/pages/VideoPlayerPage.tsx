import { ArrowLeft, Bot, Loader2, Send, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface VideoPlayerPageProps {
  videoUrl: string;
  videoLabel: string;
  topicTitle: string;
  topicNotes: string;
  onBack: () => void;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

function extractYouTubeId(url: string): string | null {
  try {
    const shortMatch = url.match(/youtu\.be\/([^?&#]+)/);
    if (shortMatch) return shortMatch[1];

    const watchMatch = url.match(/[?&]v=([^&#]+)/);
    if (watchMatch) return watchMatch[1];

    const embedMatch = url.match(/\/embed\/([^?&#]+)/);
    if (embedMatch) return embedMatch[1];

    return null;
  } catch {
    return null;
  }
}

function generateLocalSummary(topicTitle: string, topicNotes: string): string {
  const lines = topicNotes
    .split(/\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 20);

  const bullets = lines
    .slice(0, 6)
    .map((l) => `• ${l.slice(0, 120)}${l.length > 120 ? "..." : ""}`);

  return `📋 Summary: ${topicTitle}\n\n${bullets.join("\n")}\n\n💡 Tip: Add your OpenAI or Claude API key (⚙️ icon) for a richer AI-generated summary.`;
}

function generateLocalFallback(topicTitle: string): string {
  const tips: Record<string, string> = {
    html: "Start by learning semantic elements like header, main, article. They improve SEO and accessibility!",
    css: "Flexbox and Grid are your best friends for modern layouts. Practice them on flexboxfroggy.com and cssgridgarden.com!",
    javascript:
      "Master the event loop and async/await early — they're used in every real project.",
    react:
      "Think in components: every UI piece is its own reusable building block.",
    python:
      "Python's list comprehensions and dictionary methods will save you tons of code. Practice them daily!",
    default: `Focus on the fundamentals of ${topicTitle} first. Build small projects to reinforce each concept as you learn it.`,
  };
  const key = Object.keys(tips).find((k) =>
    topicTitle.toLowerCase().includes(k),
  );
  return `I'd need an API key to answer that in detail, but here's a tip: ${tips[key ?? "default"]}`;
}

async function callAI(
  apiMessages: { role: string; content: string }[],
  systemPrompt: string,
): Promise<string | null> {
  const claudeKey = localStorage.getItem("claude_api_key");
  const openaiKey = localStorage.getItem("openai_api_key");

  if (claudeKey) {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": claudeKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1024,
        system: systemPrompt,
        messages: apiMessages,
      }),
    });
    const data = await res.json();
    return data.content?.[0]?.text ?? "Sorry, I couldn't process that.";
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
        max_tokens: 1024,
        messages: [{ role: "system", content: systemPrompt }, ...apiMessages],
      }),
    });
    const data = await res.json();
    return (
      data.choices?.[0]?.message?.content ?? "Sorry, I couldn't process that."
    );
  }

  return null;
}

function makeMsg(role: "user" | "assistant", content: string): ChatMessage {
  return { id: `${role}-${Date.now()}-${Math.random()}`, role, content };
}

export default function VideoPlayerPage({
  videoUrl,
  videoLabel,
  topicTitle,
  topicNotes,
  onBack,
}: VideoPlayerPageProps) {
  const videoId = extractYouTubeId(videoUrl);
  const embedUrl = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0&origin=https://ic0.app`
    : null;

  const systemPrompt = `You are a helpful study companion for Code & Crush. The user is watching a YouTube video titled "${videoLabel}" about "${topicTitle}". Help them understand the topic, answer questions, and explain concepts clearly. Keep responses concise and friendly. Here are the study notes for context:\n\n${topicNotes}`;

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    makeMsg(
      "assistant",
      `Hi! I'm here to help you learn from this video. Ask me anything about ${topicTitle}, or tap ✨ Get Summary to get an overview.`,
    ),
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll after each new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (userText: string) => {
    if (!userText.trim() || isLoading) return;

    const userMsg = makeMsg("user", userText.trim());
    const currentMessages = messages;
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const historyForAPI = [...currentMessages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const aiResponse = await callAI(historyForAPI, systemPrompt);
      const reply = makeMsg(
        "assistant",
        aiResponse ?? generateLocalFallback(topicTitle),
      );
      setMessages((prev) => [...prev, reply]);
    } catch {
      const fallback = makeMsg("assistant", generateLocalFallback(topicTitle));
      setMessages((prev) => [...prev, fallback]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetSummary = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const summaryPrompt = `Please provide a concise summary of the topic "${topicTitle}" (video: "${videoLabel}") in bullet points. Cover the key concepts, why they matter, and actionable takeaways for a student. Use the following study notes as context:\n\n${topicNotes}`;

    const userMsg = makeMsg("user", "✨ Get a summary of this video");
    setMessages((prev) => [...prev, userMsg]);

    try {
      const claudeKey = localStorage.getItem("claude_api_key");
      const openaiKey = localStorage.getItem("openai_api_key");

      let summaryText: string;
      if (claudeKey || openaiKey) {
        const res = await callAI(
          [{ role: "user", content: summaryPrompt }],
          systemPrompt,
        );
        summaryText = res ?? generateLocalSummary(topicTitle, topicNotes);
      } else {
        summaryText = generateLocalSummary(topicTitle, topicNotes);
      }

      const reply = makeMsg("assistant", summaryText);
      setMessages((prev) => [...prev, reply]);
    } catch {
      const fallback = makeMsg(
        "assistant",
        generateLocalSummary(topicTitle, topicNotes),
      );
      setMessages((prev) => [...prev, fallback]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Top bar */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b border-border bg-background/95 backdrop-blur shrink-0"
        data-ocid="video_player.panel"
      >
        <button
          type="button"
          onClick={onBack}
          data-ocid="video_player.close_button"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg px-2 py-1.5 hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground truncate">
            {videoLabel}
          </p>
          <p className="text-xs text-muted-foreground truncate">{topicTitle}</p>
        </div>
      </div>

      {/* Main content: video + chat */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {/* Video pane */}
        <div className="w-full md:w-[58%] shrink-0 flex flex-col bg-black">
          {embedUrl ? (
            <>
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src={embedUrl}
                  title={videoLabel}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              {/* Always-visible YouTube fallback link */}
              <div className="flex items-center justify-between gap-3 px-3 py-2 bg-background/90 border-t border-border">
                <p className="text-xs text-muted-foreground truncate flex-1">
                  Can't see the video?
                </p>
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="video_player.primary_button"
                  className="inline-flex items-center gap-1.5 shrink-0 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  Watch on YouTube
                </a>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-40 md:h-full text-muted-foreground text-sm bg-muted/30">
              <div className="text-center px-4">
                <span className="text-4xl mb-3 block">🎬</span>
                <p className="text-sm font-medium text-foreground mb-1">
                  Video not available in-app
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Watch it directly on YouTube for the best experience.
                </p>
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="video_player.primary_button"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                    aria-hidden="true"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  ▶ Watch on YouTube
                </a>
              </div>
            </div>
          )}
          {/* Topic info under video — mobile only */}
          <div className="px-4 py-2 bg-background/90 border-t border-border md:hidden">
            <p className="text-xs font-semibold text-foreground truncate">
              {videoLabel}
            </p>
            <p className="text-xs text-muted-foreground">{topicTitle}</p>
          </div>
        </div>

        {/* Chat pane */}
        <div
          className="flex-1 flex flex-col border-t md:border-t-0 md:border-l border-border min-h-0 overflow-hidden"
          data-ocid="video_player.panel"
        >
          {/* Chat header */}
          <div className="px-4 py-3 border-b border-border shrink-0 flex items-center justify-between gap-3 bg-card/60">
            <div className="flex items-center gap-2 min-w-0">
              <Bot className="w-4 h-4 text-primary shrink-0" />
              <span className="text-xs font-bold text-foreground truncate">
                Study Companion
              </span>
            </div>
            <button
              type="button"
              onClick={handleGetSummary}
              disabled={isLoading}
              data-ocid="video_player.secondary_button"
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors disabled:opacity-50 shrink-0"
            >
              {isLoading ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Sparkles className="w-3 h-3" />
              )}
              Get Summary
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-3 py-3 space-y-3"
            data-ocid="video_player.list"
          >
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm border border-border"
                    }`}
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
                data-ocid="video_player.loading_state"
              >
                <div className="bg-muted rounded-2xl rounded-bl-sm border border-border px-3 py-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:300ms]" />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-border shrink-0 bg-background">
            <div className="flex items-center gap-2 bg-muted rounded-2xl border border-border px-3 py-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask about ${topicTitle}...`}
                disabled={isLoading}
                data-ocid="video_player.input"
                className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                data-ocid="video_player.submit_button"
                className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground disabled:opacity-40 hover:bg-primary/90 transition-colors shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
