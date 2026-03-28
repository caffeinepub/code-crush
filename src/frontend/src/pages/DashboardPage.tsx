import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  Camera,
  CheckCircle,
  Flame,
  Palette,
  ShoppingBag,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { type AppTheme, useApp } from "../context/AppContext";
import { COMPANION_PRESETS } from "../data/companions";

const XP_PER_LEVEL = 100;

const DAILY_TIPS = [
  {
    icon: "💧",
    tip: "Drink water regularly! Hydration improves focus and memory retention by up to 20%.",
  },
  {
    icon: "💡",
    tip: "Study in 25-minute sprints with 5-minute breaks. The Pomodoro Technique beats marathon sessions every time.",
  },
  {
    icon: "🌙",
    tip: "Sleep is when your brain consolidates code! Aim for 7-8 hours to retain what you learned today.",
  },
  {
    icon: "🤸",
    tip: "Stretch every 45 minutes. A 2-minute stretch improves blood flow and keeps you sharp.",
  },
  {
    icon: "🎧",
    tip: "Lo-fi music or white noise can boost concentration by 15%. Try it for your next session!",
  },
  {
    icon: "✏️",
    tip: "Write code by hand occasionally. It strengthens understanding far better than copy-paste.",
  },
  {
    icon: "🧠",
    tip: "Teach what you learn. Explaining a concept out loud reveals gaps in your knowledge instantly.",
  },
  {
    icon: "🍎",
    tip: "Brain food: blueberries, dark chocolate, and nuts support focus and cognitive performance!",
  },
  {
    icon: "👀",
    tip: "Follow the 20-20-20 rule: every 20 mins, look at something 20 feet away for 20 seconds.",
  },
  {
    icon: "📝",
    tip: "Review your notes within 24 hours. The forgetting curve drops sharply — re-reading locks it in.",
  },
  {
    icon: "🌳",
    tip: "A short walk outside resets your mind and improves creative problem-solving skills.",
  },
  {
    icon: "💪",
    tip: "Progress beats perfection. Solving one problem imperfectly beats planning forever.",
  },
];

export default function DashboardPage() {
  const { user, setUser, setPage, appTheme, setAppTheme } = useApp();
  const [tipIndex, setTipIndex] = useState(() =>
    Math.floor(Math.random() * DAILY_TIPS.length),
  );
  const photoInputRef = useRef<HTMLInputElement>(null);

  const preset =
    COMPANION_PRESETS.find((p) => p.personality === user.personality) ??
    COMPANION_PRESETS[0];
  const level = Math.floor(user.xp / XP_PER_LEVEL) + 1;
  const xpProgress = ((user.xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;
  const companionImage = user.companionCustomPhoto || preset.image;

  // Rotate tips every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % DAILY_TIPS.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUser({ profilePhoto: ev.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const initials = user.username
    ? user.username.slice(0, 2).toUpperCase()
    : "?";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <img
          src="/assets/generated/code-crush-logo-transparent.dim_400x400.png"
          alt="Code & Crush"
          className="w-7 h-7 rounded-full object-cover"
        />
        <h1 className="font-bold text-foreground">Dashboard</h1>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5 pb-24">
        {/* Daily Tip */}
        <motion.div
          key={tipIndex}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/10 rounded-2xl p-5 border border-primary/20"
        >
          <div className="flex items-start gap-3">
            <span className="text-3xl">{DAILY_TIPS[tipIndex].icon}</span>
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">
                Daily Tip — {today}
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                {DAILY_TIPS[tipIndex].tip}
              </p>
            </div>
          </div>
          <div className="flex gap-1.5 mt-3">
            {DAILY_TIPS.map((tip, i) => (
              <button
                key={tip.tip.slice(0, 15)}
                type="button"
                onClick={() => setTipIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === tipIndex ? "w-5 bg-primary" : "w-1.5 bg-primary/30"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Hero Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card rounded-3xl overflow-hidden border border-border shadow-card"
        >
          {/* Banner */}
          <div className="h-24 bg-gradient-to-r from-primary/30 via-secondary/20 to-primary/10 relative">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, oklch(0.6 0.2 265 / 0.5) 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>
          <div className="px-6 pb-6 -mt-12">
            <div className="flex items-end justify-between mb-4">
              {/* Profile Photo */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-card overflow-hidden bg-muted">
                  {user.profilePhoto ? (
                    <img
                      src={user.profilePhoto}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/60 to-secondary/60 flex items-center justify-center">
                      <span className="text-white text-xl font-extrabold">
                        {initials}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  data-ocid="dashboard.photo.upload_button"
                  onClick={() => photoInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
                >
                  <Camera className="w-3.5 h-3.5 text-white" />
                </button>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </div>
              {/* Companion */}
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Companion</p>
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-sm font-bold text-foreground">
                    {user.companionName}
                  </span>
                  <img
                    src={companionImage}
                    alt={user.companionName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
            <h2 className="font-extrabold text-xl text-foreground">
              {user.username || "Student"}
            </h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary font-semibold border border-primary/30">
                Level {level} Scholar
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 font-semibold border border-orange-500/30">
                🔥 {user.streak} Day Streak
              </span>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "XP",
              value: user.xp,
              icon: <Zap className="w-5 h-5 text-yellow-400" />,
              color: "text-yellow-400",
            },
            {
              label: "SP",
              value: user.studyPoints,
              icon: <span className="text-lg">⭐</span>,
              color: "text-amber-400",
            },
            {
              label: "Solved",
              value: user.solvedProblems.length,
              icon: <CheckCircle className="w-5 h-5 text-green-400" />,
              color: "text-green-400",
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-2xl p-4 border border-border text-center"
            >
              <div className="flex justify-center mb-1">{stat.icon}</div>
              <p className={`text-2xl font-extrabold ${stat.color}`}>
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* XP Progress */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-card rounded-2xl p-5 border border-border"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="font-semibold text-foreground text-sm">
                Level {level}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {user.xp} / {level * XP_PER_LEVEL} XP
            </span>
          </div>
          <Progress value={xpProgress} className="h-3 rounded-full" />
          <p className="text-xs text-muted-foreground mt-2">
            {XP_PER_LEVEL - (user.xp % XP_PER_LEVEL)} XP to Level {level + 1}
          </p>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-card rounded-2xl p-5 border border-border"
        >
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">Badges</h3>
          </div>
          {user.badges.length === 0 ? (
            <div
              className="text-center py-6"
              data-ocid="dashboard.badges.empty_state"
            >
              <div className="text-3xl mb-2">🏆</div>
              <p className="text-sm text-muted-foreground">
                Complete quizzes to earn badges!
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {user.badges.map((b) => (
                <span
                  key={b}
                  className="text-sm bg-primary/20 text-primary border border-primary/30 rounded-full px-3 py-1 font-medium"
                >
                  {b}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Streak */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-card rounded-2xl p-5 border border-border"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
              <Flame className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="font-bold text-foreground">
                {user.streak} Day Streak
              </p>
              <p className="text-xs text-muted-foreground">
                Keep studying daily to maintain your streak!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Outfit Shop */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-card rounded-2xl p-5 border border-border"
        >
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">Outfit Shop</h3>
            <span className="ml-auto text-sm font-bold text-amber-400">
              ⭐ {user.studyPoints} SP
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {preset.outfits.map((outfit) => {
              const owned = user.unlockedOutfits.includes(outfit.id);
              const active = user.activeOutfit === outfit.id;
              const canAfford = user.studyPoints >= outfit.cost;
              return (
                <div
                  key={outfit.id}
                  className={`rounded-xl border p-3 text-center transition-all ${
                    active
                      ? "border-primary bg-primary/10"
                      : "border-border bg-muted"
                  }`}
                >
                  <div className="text-2xl mb-1">{outfit.emoji}</div>
                  <p className="text-xs font-semibold text-foreground">
                    {outfit.label}
                  </p>
                  {outfit.cost === 0 ? (
                    <p className="text-xs text-green-400 mt-1">Free</p>
                  ) : (
                    <p className="text-xs text-amber-400 mt-1">
                      ⭐ {outfit.cost} SP
                    </p>
                  )}
                  {!owned ? (
                    <button
                      type="button"
                      data-ocid={`dashboard.outfit_${outfit.id}.button`}
                      disabled={!canAfford}
                      onClick={() => {
                        if (!canAfford) return;
                        setUser({
                          studyPoints: user.studyPoints - outfit.cost,
                          unlockedOutfits: [...user.unlockedOutfits, outfit.id],
                          activeOutfit: outfit.id,
                        });
                      }}
                      className="mt-2 w-full text-xs py-1 rounded-lg bg-primary text-primary-foreground disabled:opacity-40 font-semibold"
                    >
                      Buy
                    </button>
                  ) : (
                    <button
                      type="button"
                      data-ocid={`dashboard.equip_${outfit.id}.button`}
                      onClick={() => setUser({ activeOutfit: outfit.id })}
                      className={`mt-2 w-full text-xs py-1 rounded-lg font-semibold transition-colors ${
                        active
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted border border-border text-foreground hover:bg-accent"
                      }`}
                    >
                      {active ? "Equipped" : "Equip"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Theme Selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-card rounded-2xl p-5 border border-border"
        >
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">App Theme</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {(
              [
                {
                  id: "default",
                  label: "Default",
                  emoji: "🎨",
                  desc: "Classic",
                },
                {
                  id: "romantic",
                  label: "Romantic",
                  emoji: "💖",
                  desc: "Pink & soft",
                },
                {
                  id: "chill",
                  label: "Chill",
                  emoji: "🌊",
                  desc: "Blue & calm",
                },
                {
                  id: "motivation",
                  label: "Motivation",
                  emoji: "🔥",
                  desc: "Orange energy",
                },
                {
                  id: "focus",
                  label: "Focus",
                  emoji: "🔮",
                  desc: "Purple deep",
                },
                { id: "night", label: "Night", emoji: "🌙", desc: "Dark mode" },
              ] as {
                id: AppTheme;
                label: string;
                emoji: string;
                desc: string;
              }[]
            ).map((theme) => {
              const isActive = appTheme === theme.id;
              return (
                <button
                  type="button"
                  key={theme.id}
                  onClick={() => setAppTheme(theme.id)}
                  className={`rounded-xl border p-3 text-center transition-all hover:scale-105 ${
                    isActive
                      ? "border-primary bg-primary/15 shadow-md"
                      : "border-border bg-muted hover:border-primary/40"
                  }`}
                >
                  <div className="text-2xl mb-1">{theme.emoji}</div>
                  <p className="text-xs font-semibold text-foreground">
                    {theme.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {theme.desc}
                  </p>
                  {isActive && (
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-primary mx-auto" />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        <Button
          data-ocid="dashboard.back.button"
          variant="outline"
          onClick={() => setPage("study")}
          className="w-full rounded-full border-border text-muted-foreground hover:text-foreground"
        >
          Return to Study
        </Button>
      </div>
    </div>
  );
}
