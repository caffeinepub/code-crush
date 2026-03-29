import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  Camera,
  CheckCircle,
  Flame,
  Palette,
  Pencil,
  ShoppingBag,
  Wallet,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import AvatarBuilder from "../components/AvatarBuilder";
import CompanionDressAvatar from "../components/CompanionDressAvatar";
import WhatsAppAvatar, {
  DEFAULT_AVATAR_CONFIG,
} from "../components/WhatsAppAvatar";
import {
  type AppTheme,
  type AvatarConfig,
  type WalletEntry,
  useApp,
} from "../context/AppContext";
import {
  CLOTHING_ITEMS,
  type ClothingSlot,
  SLOT_LABELS,
} from "../data/clothing";
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

function relativeDate(isoDate: string): string {
  const now = Date.now();
  const then = new Date(isoDate).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function DashboardPage() {
  const { user, setUser, setPage, appTheme, setAppTheme } = useApp();
  const [tipIndex, setTipIndex] = useState(() =>
    Math.floor(Math.random() * DAILY_TIPS.length),
  );
  const [activeSlot, setActiveSlot] = useState<ClothingSlot>("cap");
  const [showAvatarBuilder, setShowAvatarBuilder] = useState(false);
  // Local draft of avatar during editing
  const [draftAvatar, setDraftAvatar] = useState<AvatarConfig>(
    user.avatarConfig ?? DEFAULT_AVATAR_CONFIG,
  );
  const photoInputRef = useRef<HTMLInputElement>(null);

  const preset =
    COMPANION_PRESETS.find((p) => p.personality === user.personality) ??
    COMPANION_PRESETS[0];
  const level = Math.floor(user.xp / XP_PER_LEVEL) + 1;
  const xpProgress = ((user.xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;
  const companionImage = user.companionCustomPhoto || preset.image;

  const equippedClothing = user.equippedClothing ?? {};
  const ownedClothing = user.ownedClothing ?? [];
  const walletHistory: WalletEntry[] = user.walletHistory ?? [];

  // Current displayed avatar config (saved one or default)
  const savedAvatarConfig = user.avatarConfig;

  // Helpers
  const getEquipped = (slot: ClothingSlot) => equippedClothing[slot] ?? "";

  const slotItems = CLOTHING_ITEMS.filter((c) => c.slot === activeSlot);

  const handleBuy = (item: (typeof CLOTHING_ITEMS)[0]) => {
    if (user.studyPoints < item.cost) return;
    const entry: WalletEntry = {
      id: `${Date.now()}_${Math.random()}`,
      itemId: item.id,
      itemLabel: item.label,
      itemEmoji: item.emoji,
      cost: item.cost,
      date: new Date().toISOString(),
    };
    setUser({
      studyPoints: user.studyPoints - item.cost,
      ownedClothing: [...ownedClothing, item.id],
      equippedClothing: { ...equippedClothing, [item.slot]: item.id },
      walletHistory: [entry, ...walletHistory],
    });
  };

  const handleWear = (item: (typeof CLOTHING_ITEMS)[0]) => {
    setUser({
      equippedClothing: { ...equippedClothing, [item.slot]: item.id },
    });
  };

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

  const handleAvatarChange = (patch: Partial<AvatarConfig>) => {
    setDraftAvatar((prev) => ({ ...prev, ...patch }));
  };

  const handleAvatarDone = () => {
    setUser({ avatarConfig: draftAvatar });
    setShowAvatarBuilder(false);
  };

  const handleEditAvatar = () => {
    // Seed draft from saved config or default
    setDraftAvatar(user.avatarConfig ?? DEFAULT_AVATAR_CONFIG);
    setShowAvatarBuilder(true);
  };

  const initials = user.username
    ? user.username.slice(0, 2).toUpperCase()
    : "?";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const totalSpent = walletHistory.reduce((s, e) => s + e.cost, 0);

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

        {/* ── WHATSAPP-STYLE AVATAR ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.28 }}
          className="bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/5 rounded-3xl border border-primary/20 p-5"
          data-ocid="dashboard.avatar.card"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-foreground text-base">
                Your Avatar
              </h3>
              <p className="text-xs text-muted-foreground">
                {savedAvatarConfig
                  ? "Custom cartoon avatar"
                  : `Showing ${user.companionName}'s photo`}
              </p>
            </div>
            <span className="text-xs bg-primary/20 text-primary border border-primary/30 rounded-full px-3 py-1 font-semibold">
              ✨ Style
            </span>
          </div>

          {/* Avatar preview */}
          <div className="flex flex-col items-center py-4 gap-3">
            {savedAvatarConfig ? (
              <motion.div
                key="cartoon"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative"
              >
                {/* WhatsApp-style ring */}
                <div
                  className="rounded-full p-[3px] shadow-xl"
                  style={{
                    background: `conic-gradient(${savedAvatarConfig.outfitColor}, #f97316, #a855f7, ${savedAvatarConfig.outfitColor})`,
                  }}
                >
                  <div className="rounded-full bg-background p-[3px]">
                    <WhatsAppAvatar
                      config={savedAvatarConfig}
                      size={160}
                      className="rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="photo"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <CompanionDressAvatar
                  companionImage={companionImage}
                  companionName={user.companionName}
                  equippedClothing={user.equippedClothing ?? {}}
                />
              </motion.div>
            )}

            {/* Edit Avatar button */}
            <Button
              size="sm"
              variant={savedAvatarConfig ? "outline" : "default"}
              onClick={handleEditAvatar}
              className="rounded-full gap-2 px-5"
              data-ocid="dashboard.avatar.edit_button"
            >
              <Pencil className="w-3.5 h-3.5" />
              {savedAvatarConfig ? "Edit Avatar" : "Create Cartoon Avatar"}
            </Button>

            {savedAvatarConfig && (
              <button
                type="button"
                onClick={() => setUser({ avatarConfig: null })}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
                data-ocid="dashboard.avatar.delete_button"
              >
                Remove cartoon avatar
              </button>
            )}
          </div>

          {/* Avatar Builder panel */}
          <AnimatePresence>
            {showAvatarBuilder && (
              <motion.div
                key="builder"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-4"
                data-ocid="dashboard.avatar.panel"
              >
                {/* Live preview while editing */}
                <div className="flex justify-center mb-4">
                  <div
                    className="rounded-full p-[2px]"
                    style={{
                      background: `conic-gradient(${draftAvatar.outfitColor}, #f97316, #a855f7, ${draftAvatar.outfitColor})`,
                    }}
                  >
                    <div className="rounded-full bg-background p-[2px]">
                      <WhatsAppAvatar
                        config={draftAvatar}
                        size={120}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                </div>

                <AvatarBuilder
                  config={draftAvatar}
                  onChange={handleAvatarChange}
                  onDone={handleAvatarDone}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── WARDROBE SHOP ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.31 }}
          className="bg-card rounded-2xl p-5 border border-border"
          data-ocid="dashboard.wardrobe.card"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">👗</span>
            <h3 className="font-semibold text-foreground">Wardrobe</h3>
            <span className="ml-auto text-sm font-bold text-amber-400">
              ⭐ {user.studyPoints} SP
            </span>
          </div>

          {/* Slot tabs */}
          <div className="flex gap-1 overflow-x-auto mb-4 pb-1">
            {(
              ["cap", "shirt", "pant", "shoe", "accessory"] as ClothingSlot[]
            ).map((slot) => (
              <button
                key={slot}
                type="button"
                data-ocid={`dashboard.wardrobe_${slot}.tab`}
                onClick={() => setActiveSlot(slot)}
                className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${
                  activeSlot === slot
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                {SLOT_LABELS[slot]}
              </button>
            ))}
          </div>

          {/* Items grid */}
          <div className="grid grid-cols-3 gap-3">
            {slotItems.map((item) => {
              const owned = ownedClothing.includes(item.id);
              const equipped = getEquipped(item.slot) === item.id;
              const canAfford = user.studyPoints >= item.cost;
              return (
                <div
                  key={item.id}
                  className={`rounded-xl border p-3 text-center transition-all ${
                    equipped
                      ? "border-primary bg-primary/10"
                      : "border-border bg-muted"
                  }`}
                >
                  <div className="text-2xl mb-1">{item.emoji}</div>
                  <p className="text-xs font-semibold text-foreground leading-tight">
                    {item.label}
                  </p>
                  {item.cost === 0 ? (
                    <p className="text-xs text-green-400 mt-1">Free</p>
                  ) : (
                    <p className="text-xs text-amber-400 mt-1">
                      ⭐ {item.cost} SP
                    </p>
                  )}
                  {!owned ? (
                    <button
                      type="button"
                      data-ocid={`dashboard.wardrobe_buy_${item.id}.button`}
                      disabled={!canAfford}
                      onClick={() => handleBuy(item)}
                      className="mt-2 w-full text-xs py-1 rounded-lg bg-primary text-primary-foreground disabled:opacity-40 font-semibold"
                    >
                      Buy
                    </button>
                  ) : equipped ? (
                    <button
                      type="button"
                      disabled
                      className="mt-2 w-full text-xs py-1 rounded-lg bg-primary text-primary-foreground font-semibold opacity-90"
                    >
                      Equipped
                    </button>
                  ) : (
                    <button
                      type="button"
                      data-ocid={`dashboard.wardrobe_wear_${item.id}.button`}
                      onClick={() => handleWear(item)}
                      className="mt-2 w-full text-xs py-1 rounded-lg bg-muted border border-border text-foreground hover:bg-accent font-semibold"
                    >
                      Wear
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ── WALLET ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.34 }}
          className="bg-card rounded-2xl p-5 border border-border"
          data-ocid="dashboard.wallet.card"
        >
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">Wallet</h3>
          </div>

          {/* SP Balance */}
          <div className="flex items-center justify-between bg-amber-500/10 rounded-2xl p-4 border border-amber-500/20 mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">
                Available Balance
              </p>
              <p className="text-3xl font-extrabold text-amber-400">
                ⭐ {user.studyPoints} SP
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total Spent</p>
              <p className="text-lg font-bold text-foreground">
                {totalSpent} SP
              </p>
            </div>
          </div>

          {/* Purchase History */}
          <h4 className="text-sm font-semibold text-foreground mb-3">
            Purchase History
          </h4>
          {walletHistory.length === 0 ? (
            <div
              className="text-center py-6"
              data-ocid="dashboard.wallet.empty_state"
            >
              <div className="text-3xl mb-2">👛</div>
              <p className="text-sm text-muted-foreground">
                No purchases yet. Visit the Wardrobe or Outfit Shop!
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {walletHistory.map((entry, i) => (
                <div
                  key={entry.id}
                  data-ocid={`dashboard.wallet.item.${i + 1}`}
                  className="flex items-center gap-3 p-3 bg-muted rounded-xl border border-border"
                >
                  <span className="text-2xl">{entry.itemEmoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {entry.itemLabel}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {relativeDate(entry.date)}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-amber-400 shrink-0">
                    ⭐ {entry.cost} SP
                  </span>
                </div>
              ))}
              {walletHistory.length > 0 && (
                <p className="text-xs text-muted-foreground text-right pt-1">
                  Total spent:{" "}
                  <span className="font-bold text-foreground">
                    {totalSpent} SP
                  </span>
                </p>
              )}
            </div>
          )}
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
