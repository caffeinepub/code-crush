import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Award,
  CheckCircle,
  Flame,
  Settings,
  ShoppingBag,
  Star,
  User,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { COMPANION_PRESETS } from "../data/companions";

const XP_PER_LEVEL = 100;

export default function DashboardPage() {
  const {
    user,
    setUser,
    setPage,
    openaiKey,
    setOpenaiKey,
    claudeKey,
    setClaudeKey,
  } = useApp();
  const [apiKeyInput, setApiKeyInput] = useState(openaiKey);
  const [claudeKeyInput, setClaudeKeyInput] = useState(claudeKey);
  const [saved, setSaved] = useState(false);

  const preset =
    COMPANION_PRESETS.find((p) => p.personality === user.personality) ??
    COMPANION_PRESETS[0];
  const level = Math.floor(user.xp / XP_PER_LEVEL) + 1;
  const xpProgress = ((user.xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;

  const handleSaveKey = () => {
    setOpenaiKey(apiKeyInput);
    setClaudeKey(claudeKeyInput);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const initials = user.username
    ? user.username.slice(0, 2).toUpperCase()
    : "?";

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-white border-b border-border px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <Button
          data-ocid="dashboard.back.button"
          variant="ghost"
          size="sm"
          onClick={() => setPage("study")}
          className="rounded-full"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-bold text-foreground">Dashboard</h1>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl p-6 shadow-card border border-border"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white text-xl font-extrabold shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-extrabold text-xl text-foreground truncate">
                {user.username || "Student"}
              </h2>
              <p className="text-sm text-muted-foreground truncate">
                {user.email}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <img
                  src={preset.image}
                  alt={user.companionName}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="text-xs text-muted-foreground">
                  Companion:{" "}
                  <strong className="text-foreground">
                    {user.companionName}
                  </strong>
                </span>
                <span className="text-xs text-muted-foreground">
                  · {user.personality}
                </span>
              </div>
            </div>
            <Button
              data-ocid="dashboard.edit_profile.button"
              variant="outline"
              size="sm"
              className="rounded-full shrink-0"
            >
              <User className="w-3.5 h-3.5 mr-1" /> Edit
            </Button>
          </div>
        </motion.div>

        {/* XP & Level */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="bg-white rounded-3xl p-6 shadow-card border border-border"
        >
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" /> XP &amp; Progress
          </h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Match Level {level}
            </span>
            <span className="font-bold text-primary">{user.xp} XP total</span>
          </div>
          <Progress value={xpProgress} className="h-3 rounded-full" />
          <p className="text-xs text-muted-foreground mt-2">
            {XP_PER_LEVEL - (user.xp % XP_PER_LEVEL)} XP until Level {level + 1}
          </p>
        </motion.div>

        {/* Study Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="bg-white rounded-3xl p-6 shadow-card border border-border"
          data-ocid="dashboard.study_points.card"
        >
          <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" /> Study Points
          </h3>
          <p className="text-3xl font-bold text-yellow-500">
            {user.studyPoints} SP
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Earn SP by solving problems (+3) and quiz answers (+1). Spend in the
            Outfit Shop!
          </p>
        </motion.div>

        {/* Streak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-3xl p-6 shadow-card border border-border flex items-center gap-4"
        >
          <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0">
            <Flame className="w-7 h-7 text-orange-500" />
          </div>
          <div>
            <p className="font-extrabold text-2xl text-foreground">
              {user.streak} Day Streak 🔥
            </p>
            <p className="text-sm text-muted-foreground">
              Keep it up! Consistency beats intensity.
            </p>
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-white rounded-3xl p-6 shadow-card border border-border"
        >
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-purple-500" /> Badges
          </h3>
          {user.badges.length === 0 ? (
            <div
              className="text-center py-6"
              data-ocid="dashboard.badges.empty_state"
            >
              <p className="text-4xl mb-2">🏆</p>
              <p className="text-sm text-muted-foreground">
                No badges yet. Complete quizzes to earn them!
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {user.badges.map((b) => (
                <span
                  key={b}
                  className="bg-primary/10 text-primary font-semibold px-3 py-1.5 rounded-full text-sm border border-primary/20"
                >
                  {b}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Solved Problems */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-3xl p-6 shadow-card border border-border"
        >
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" /> Solved Problems
          </h3>
          {user.solvedProblems.length === 0 ? (
            <div
              className="text-center py-6"
              data-ocid="dashboard.problems.empty_state"
            >
              <p className="text-4xl mb-2">💻</p>
              <p className="text-sm text-muted-foreground">
                No problems solved yet. Head to Code Studio!
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {user.solvedProblems.map((pid, i) => (
                <div
                  key={pid}
                  className="flex items-center gap-2 bg-green-50 rounded-xl px-3 py-2"
                  data-ocid={`dashboard.problems.item.${i + 1}`}
                >
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="text-sm font-medium text-foreground">
                    {pid}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Outfit Shop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.22 }}
          className="bg-white rounded-3xl p-6 shadow-card border border-border"
          data-ocid="dashboard.outfit_shop.card"
        >
          <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-pink-500" /> Outfit Shop 👗
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Unlock new looks for {user.companionName}! You have{" "}
            <strong className="text-yellow-600">{user.studyPoints} SP</strong>
          </p>
          <div className="space-y-3">
            {preset.outfits.map((outfit) => {
              const isUnlocked = user.unlockedOutfits.includes(outfit.id);
              const isEquipped = user.activeOutfit === outfit.id;
              const canAfford = user.studyPoints >= outfit.cost;
              return (
                <div
                  key={outfit.id}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 border-2 transition-all ${
                    isEquipped
                      ? "border-primary bg-primary/5"
                      : "border-border bg-muted/40"
                  }`}
                  data-ocid={`dashboard.outfit.${outfit.id}.row`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{outfit.emoji}</span>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {outfit.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {outfit.cost === 0 ? "Free" : `${outfit.cost} SP`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isEquipped ? (
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                        Equipped ✓
                      </span>
                    ) : isUnlocked ? (
                      <Button
                        data-ocid={`dashboard.outfit.${outfit.id}.edit_button`}
                        size="sm"
                        variant="outline"
                        className="rounded-full h-8 text-xs font-bold border-primary text-primary"
                        onClick={() => setUser({ activeOutfit: outfit.id })}
                      >
                        Equip
                      </Button>
                    ) : (
                      <Button
                        data-ocid={`dashboard.outfit.${outfit.id}.primary_button`}
                        size="sm"
                        className="rounded-full h-8 text-xs font-bold bg-yellow-400 text-white hover:bg-yellow-500"
                        disabled={!canAfford}
                        onClick={() => {
                          if (!canAfford) return;
                          setUser({
                            studyPoints: user.studyPoints - outfit.cost,
                            unlockedOutfits: [
                              ...user.unlockedOutfits,
                              outfit.id,
                            ],
                            activeOutfit: outfit.id,
                          });
                        }}
                      >
                        {canAfford
                          ? `Unlock ⭐${outfit.cost}`
                          : `Need ${outfit.cost} SP`}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Settings — API Keys */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-white rounded-3xl p-6 shadow-card border border-border"
        >
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Settings className="w-4 h-4 text-muted-foreground" /> AI Settings
          </h3>
          <div className="space-y-4">
            {/* Claude Key */}
            <div>
              <label
                htmlFor="dash-claude-key"
                className="text-sm font-semibold text-foreground block mb-1.5"
              >
                Claude API Key{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  (Priority)
                </span>
              </label>
              <Input
                id="dash-claude-key"
                data-ocid="dashboard.claude_key.input"
                type="password"
                value={claudeKeyInput}
                onChange={(e) => setClaudeKeyInput(e.target.value)}
                placeholder="sk-ant-..."
                className="rounded-xl h-10 font-mono text-sm"
              />
              {claudeKey && (
                <p className="text-xs text-green-600 mt-1">
                  ✅ Claude key active — using Claude Sonnet 4.5
                </p>
              )}
            </div>
            {/* OpenAI Key */}
            <div>
              <label
                htmlFor="dash-openai-key"
                className="text-sm font-semibold text-foreground block mb-1.5"
              >
                OpenAI API Key
              </label>
              <Input
                id="dash-openai-key"
                data-ocid="dashboard.openai_key.input"
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="sk-..."
                className="rounded-xl h-10 font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Fallback when Claude key is not set.
              </p>
            </div>
            <Button
              data-ocid="dashboard.save_key.button"
              onClick={handleSaveKey}
              className="rounded-xl bg-primary text-primary-foreground font-semibold w-full"
            >
              {saved ? "✅ Saved!" : "Save API Keys"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
