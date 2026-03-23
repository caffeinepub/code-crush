import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, Heart, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import type { PersonalityType } from "../data/companions";
import { COMPANION_PRESETS } from "../data/companions";
import { useUpdateCompanion } from "../hooks/useQueries";

const personalities: {
  id: PersonalityType;
  label: string;
  emoji: string;
  image?: string;
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
    label: "Playful / Ember 🔥",
    emoji: "🔥",
    image: "/assets/generated/companion-ember.dim_256x256.png",
    desc: "Energetic, hyped, always cheering you on!!",
    color: "border-yellow-300 bg-yellow-50",
  },
];

export default function OnboardingPage() {
  const { user, setUser, setPage, addMessage } = useApp();
  // step: 1=info, 2=verify, 3=companion, 4=preview
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

  // OTP state
  const [verifyCode, setVerifyCode] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");
  const otpRef = useRef<string>("");

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
      setEmailError("Please enter a valid email address.");
      return false;
    }
    if (!password || password.length < 6) {
      setEmailError("Password must be at least 6 characters.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleStep1Continue = () => {
    if (!validateStep1()) return;
    // Generate OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerifyCode(code);
    otpRef.current = code;
    setStep(2);
  };

  const handleVerifyOTP = () => {
    if (otpInput.trim() === otpRef.current) {
      setOtpError("");
      setStep(3);
    } else {
      setOtpError("Incorrect code. Please try again.");
    }
  };

  const handleFinish = () => {
    const finalName = companionName.trim() || preset.defaultName;
    setUser({
      username: userName.trim(),
      email: email.trim(),
      password,
      companionName: finalName,
      personality,
      isOnboarded: true,
    });
    updateCompanion.mutate({ name: finalName, personality });
    const greeting =
      preset.greetings[Math.floor(Math.random() * preset.greetings.length)];
    addMessage({ role: "companion", text: greeting });
    setPage("study");
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3"
          >
            <Heart className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-extrabold text-white">
            Code &amp; Crush
          </h1>
          <p className="text-white/80 text-sm mt-1">
            Your kawaii AI study companion 💕
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`transition-all duration-300 rounded-full ${
                s === step
                  ? "w-8 h-2 bg-white"
                  : s < step
                    ? "w-2 h-2 bg-white/80"
                    : "w-2 h-2 bg-white/30"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Account Info */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="bg-white rounded-3xl p-8 shadow-card-hover"
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-extrabold text-foreground">
                  Create Your Account
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="text-sm font-semibold text-foreground block mb-1.5"
                  >
                    Your Name
                  </label>
                  <Input
                    id="username"
                    data-ocid="onboarding.username.input"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Priya, Alex..."
                    className="rounded-xl h-12"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-foreground block mb-1.5"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    data-ocid="onboarding.email.input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="rounded-xl h-12"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-foreground block mb-1.5"
                  >
                    Password
                  </label>
                  <Input
                    id="password"
                    data-ocid="onboarding.password.input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="rounded-xl h-12"
                  />
                </div>
                {emailError && (
                  <p
                    className="text-sm text-red-500 font-medium"
                    data-ocid="onboarding.email.error_state"
                  >
                    {emailError}
                  </p>
                )}
              </div>
              <Button
                data-ocid="onboarding.step1_continue.button"
                onClick={handleStep1Continue}
                disabled={!userName.trim()}
                className="w-full mt-6 rounded-full h-12 font-bold bg-primary text-primary-foreground"
              >
                Continue <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          )}

          {/* Step 2: Email Verification */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="bg-white rounded-3xl p-8 shadow-card-hover"
            >
              <div className="flex items-center gap-2 mb-2">
                <Check className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-extrabold text-foreground">
                  Verify Your Email
                </h2>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                We sent a code to{" "}
                <strong className="text-foreground">{email}</strong>. Enter it
                below:
              </p>
              {/* Demo: show code */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 mb-4 text-center">
                <p className="text-xs text-yellow-600 font-semibold mb-1">
                  Demo Mode — Your Code:
                </p>
                <p className="text-2xl font-extrabold text-yellow-700 tracking-widest">
                  {verifyCode}
                </p>
              </div>
              <Input
                data-ocid="onboarding.otp.input"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength={6}
                className="rounded-xl h-12 text-center text-xl tracking-widest font-bold mb-3"
              />
              {otpError && (
                <p
                  className="text-sm text-red-500 font-medium mb-3"
                  data-ocid="onboarding.otp.error_state"
                >
                  {otpError}
                </p>
              )}
              <div className="flex gap-3">
                <Button
                  data-ocid="onboarding.step1_back.button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 rounded-full h-12"
                >
                  Back
                </Button>
                <Button
                  data-ocid="onboarding.verify.button"
                  onClick={handleVerifyOTP}
                  className="flex-1 rounded-full h-12 font-bold bg-primary text-primary-foreground"
                >
                  Verify <Check className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Companion Setup */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="bg-white rounded-3xl p-8 shadow-card-hover"
            >
              <h2 className="text-xl font-extrabold text-foreground mb-6">
                Design Your Companion 💖
              </h2>
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="companion-name"
                    className="text-sm font-semibold text-foreground block mb-1.5"
                  >
                    Companion Name
                  </label>
                  <Input
                    id="companion-name"
                    data-ocid="onboarding.companion_name.input"
                    value={companionName}
                    onChange={(e) => setCompanionName(e.target.value)}
                    placeholder={preset.defaultName}
                    className="rounded-xl h-12"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">
                    Choose Personality
                  </p>
                  <div className="grid grid-cols-2 gap-3">
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
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.label}
                            className="w-8 h-8 rounded-full object-cover mb-1"
                          />
                        ) : (
                          <div className="text-2xl mb-1">{p.emoji}</div>
                        )}
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
                  onClick={() => setStep(2)}
                  className="flex-1 rounded-full h-12"
                >
                  Back
                </Button>
                <Button
                  data-ocid="onboarding.step2_next.button"
                  onClick={() => setStep(4)}
                  className="flex-1 rounded-full h-12 font-bold bg-primary text-primary-foreground"
                >
                  Continue <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Preview — Dating App Profile Reveal */}
          {step === 4 && (
            <motion.div
              key="step4"
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
                className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 ring-8 ring-primary/40 shadow-[0_0_40px_rgba(240,106,155,0.5)]"
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
                  onClick={() => setStep(3)}
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
