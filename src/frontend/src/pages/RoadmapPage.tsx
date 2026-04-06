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
import { ROADMAPS, type Roadmap } from "../data/roadmaps";

type View = "list" | "roadmap";

export default function RoadmapPage() {
  const [view, setView] = useState<View>("list");
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
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
                                      <a
                                        key={v.url}
                                        href={v.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2 hover:bg-accent border border-border transition-colors"
                                      >
                                        <span className="text-sm">▶️</span>
                                        <span className="text-xs font-medium text-foreground flex-1">
                                          {v.label}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                          ↗
                                        </span>
                                      </a>
                                    ))}
                                  </div>
                                </div>

                                {/* Study Notes */}
                                <div>
                                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400 uppercase tracking-wide mb-1.5">
                                    <StickyNote className="w-3.5 h-3.5" /> Study
                                    Notes
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
                                      <BookOpen className="w-3.5 h-3.5" /> Docs
                                      & References
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

                                {/* Mark complete */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    toggleComplete(selectedRoadmap.id, topic.id)
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
    );
  }

  return null;
}
