import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, Heart, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import type { PersonalityType } from "../data/companions";
import { COMPANION_PRESETS } from "../data/companions";
import { useUpdateCompanion } from "../hooks/useQueries";

const personalities: {
  id: PersonalityType;
  label: string;
  emoji: string;
  desc: string;
  color: string;
}[] = [
  {
    id: "encouraging",
    label: "Encouraging",
    emoji: "💖",
    desc: "Warm, supportive cheerleader who celebrates every win.",
    color: "border-pink-300 bg-pink-50",
  },
  {
    id: "witty",
    label: "Witty",
    emoji: "😏",
    desc: "Sharp, clever, with a playful sass that keeps you on your toes.",
    color: "border-purple-300 bg-purple-50",
  },
  {
    id: "calm",
    label: "Calm",
    emoji: "🌿",
    desc: "Peaceful, grounding presence. Zen vibes only.",
    color: "border-green-300 bg-green-50",
  },
  {
    id: "playful",
    label: "Playful",
    emoji: "🎉",
    desc: "Bubbly, energetic, always excited to learn with you!",
    color: "border-yellow-300 bg-yellow-50",
  },
];

export default function OnboardingPage() {
  const { user, setUser, setPage, addMessage } = useApp();
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState(user.password || "");
  const [emailError, setEmailError] = useState("");
  const [companionName, setCompanionName] = useState(user.companionName || "");
  const [personality, setPersonality] = useState<PersonalityType>(
    user.personality || "encouraging",
  );
  const updateCompanion = useUpdateCompanion();

  const preset =
    COMPANION_PRESETS.find((p) => p.personality === personality) ??
    COMPANION_PRESETS[0];

  const welcomeMessages: Record<PersonalityType, string> = {
    encouraging: `Hi ${userName || "there"}! 💕 I'm ${companionName || "your companion"} and I am SO excited to study with you today! You've already made the best decision by showing up. Let's make this session amazing together!`,
    witty: `Oh hello, ${userName || "genius"}. I'm ${companionName || "your companion"}. Error 404: boring study sessions no longer found. I'll be your slightly sarcastic but incredibly effective study partner 😏 Ready?`,
    calm: `Hello, ${userName || "friend"}. I'm ${companionName || "your companion"} 🌿 I'm here to make this learning journey peaceful and purposeful. Take a breath — we'll move at your pace, together.`,
    playful: `HIII ${userName || "bestie"}!!! 🎉✨ I'm ${companionName || "your companion"} and OH MY GOSH I'm so excited to meet you!! Let's have the BEST study session ever!!!! 🚀`,
  };

  const validateStep1 = () => {
    if (!userName.trim()) return false;
    if (!email.trim() || !email.includes("@")) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    if (!password.trim() || password.length < 6) {
      setEmailError("Password must be at least 6 characters");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleFinish = async () => {
    const updates = {
      username: userName,
      email,
      password,
      companionName: companionName || preset.defaultName,
      personality,
      isOnboarded: true,
    };
    setUser(updates);
    try {
      await updateCompanion.mutateAsync({
        name: companionName || preset.defaultName,
        personality,
      });
    } catch {}
    addMessage({ role: "companion", text: welcomeMessages[personality] });
    setPage("study");
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-4 py-12">
      {/* Floating hearts */}
      {([0, 1, 2, 3, 4, 5] as const).map((i) => (
        <div
          key={`floatHeart-${i}`}
          className="fixed text-primary/40 text-2xl pointer-events-none"
          style={{
            top: `${10 + i * 15}%`,
            left: i % 2 === 0 ? `${3 + i * 2}%` : undefined,
            right: i % 2 !== 0 ? `${3 + i * 2}%` : undefined,
            animation: `float-gentle ${3 + i * 0.5}s ${i * 0.7}s ease-in-out infinite`,
          }}
        >
          ♥
        </div>
      ))}

      <div className="w-full max-w-lg">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  step > s
                    ? "bg-primary text-primary-foreground"
                    : step === s
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-white/60 text-muted-foreground"
                }`}
              >
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-12 h-0.5 transition-all ${step > s ? "bg-primary" : "bg-white/40"}`}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Your Info */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl p-8 shadow-card-hover"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-extrabold text-foreground">
                  Welcome! 💕
                </h2>
                <p className="text-muted-foreground mt-2">
                  Create your account to get started
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="onb-username"
                    className="text-sm font-semibold text-foreground block mb-1.5"
                  >
                    Your Name
                  </label>
                  <Input
                    id="onb-username"
                    data-ocid="onboarding.username.input"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name..."
                    className="rounded-2xl h-12 text-base border-2 focus:border-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="onb-email"
                    className="text-sm font-semibold text-foreground block mb-1.5"
                  >
                    Email Address
                  </label>
                  <Input
                    id="onb-email"
                    data-ocid="onboarding.email.input"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                    placeholder="your@email.com"
                    className="rounded-2xl h-12 text-base border-2 focus:border-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="onb-password"
                    className="text-sm font-semibold text-foreground block mb-1.5"
                  >
                    Password
                  </label>
                  <Input
                    id="onb-password"
                    data-ocid="onboarding.password.input"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setEmailError("");
                    }}
                    placeholder="Min 6 characters"
                    className="rounded-2xl h-12 text-base border-2 focus:border-primary"
                    onKeyDown={(e) =>
                      e.key === "Enter" && validateStep1() && setStep(2)
                    }
                  />
                </div>
                {emailError && (
                  <p className="text-sm text-red-500">{emailError}</p>
                )}
              </div>
              <Button
                data-ocid="onboarding.step1_next.button"
                disabled={!userName.trim()}
                onClick={() => {
                  if (validateStep1()) setStep(2);
                }}
                className="w-full mt-6 rounded-full h-12 font-bold text-base bg-primary text-primary-foreground"
              >
                Continue <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          )}

          {/* Step 2: Companion Setup */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl p-8 shadow-card-hover"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-extrabold text-foreground">
                  Create Your Companion 💫
                </h2>
                <p className="text-muted-foreground mt-2">
                  Design your perfect study date!
                </p>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Name your companion
                  </p>
                  <Input
                    data-ocid="onboarding.companion_name.input"
                    value={companionName}
                    onChange={(e) => setCompanionName(e.target.value)}
                    placeholder="e.g., Sakura, Luna, Pixel..."
                    className="rounded-2xl h-12 text-base border-2 focus:border-primary mt-2"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Choose a personality
                  </p>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {personalities.map((p) => (
                      <button
                        type="button"
                        key={p.id}
                        data-ocid={`onboarding.personality_${p.id}.button`}
                        onClick={() => setPersonality(p.id)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                          personality === p.id
                            ? `${p.color} border-current scale-105 shadow-md`
                            : "border-border bg-white hover:border-primary/40"
                        }`}
                      >
                        <div className="text-2xl mb-1">{p.emoji}</div>
                        <div className="font-bold text-sm text-foreground">
                          {p.label}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5 leading-tight">
                          {p.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button
                  data-ocid="onboarding.step2_back.button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 rounded-full h-12"
                >
                  Back
                </Button>
                <Button
                  data-ocid="onboarding.step2_next.button"
                  onClick={() => setStep(3)}
                  className="flex-1 rounded-full h-12 font-bold bg-primary text-primary-foreground"
                >
                  Continue <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Preview */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl p-8 shadow-card-hover text-center"
            >
              <h2 className="text-2xl font-extrabold text-foreground mb-2">
                Meet Your Companion! 💖
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Signed in as <strong className="text-primary">{email}</strong>
              </p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-primary/30 shadow-glow"
              >
                <img
                  src={preset.image}
                  alt={companionName || preset.defaultName}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <h3
                className="text-xl font-bold"
                style={{ color: preset.accentColor }}
              >
                {companionName || preset.defaultName}
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                {preset.traits}
              </p>
              <div className="bg-muted rounded-2xl p-4 text-left mb-6">
                <p className="text-sm text-foreground leading-relaxed">
                  {welcomeMessages[personality]}
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  data-ocid="onboarding.step3_back.button"
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1 rounded-full h-12"
                >
                  Back
                </Button>
                <Button
                  data-ocid="onboarding.start_studying.button"
                  onClick={handleFinish}
                  className="flex-1 rounded-full h-12 font-bold bg-primary text-primary-foreground shadow-glow"
                >
                  Start Studying! 🚀
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
