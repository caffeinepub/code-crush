import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, Heart, Sparkles, Upload } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import { COMPANION_PRESETS, type PersonalityType } from "../data/companions";
import { useUpdateCompanion } from "../hooks/useQueries";

const allCompanions = COMPANION_PRESETS;

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
  const [customPhoto, setCustomPhoto] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateCompanion = useUpdateCompanion();

  const [verifyCode, setVerifyCode] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");
  const otpRef = useRef<string>("");

  const preset =
    COMPANION_PRESETS.find((p) => p.personality === personality) ??
    COMPANION_PRESETS[0];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCustomPhoto(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
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
      companionCustomPhoto: customPhoto,
    });
    updateCompanion.mutate({ name: finalName, personality });
    const greeting =
      preset.greetings[Math.floor(Math.random() * preset.greetings.length)];
    addMessage({ role: "companion", text: greeting });
    setPage("study");
  };

  const femaleCompanions = allCompanions.filter((c) => c.gender === "female");
  const maleCompanions = allCompanions.filter((c) => c.gender === "male");

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-3"
          >
            <Heart className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-extrabold text-foreground">
            Code &amp; Crush
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Your AI study companion 💙
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`transition-all duration-300 rounded-full ${
                s === step
                  ? "w-8 h-2 bg-primary"
                  : s < step
                    ? "w-2 h-2 bg-primary/70"
                    : "w-2 h-2 bg-border"
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
              className="bg-card rounded-3xl p-8 shadow-card-hover border border-border"
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
                    className="rounded-xl h-12 bg-input border-border text-foreground placeholder:text-muted-foreground"
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
                    className="rounded-xl h-12 bg-input border-border text-foreground placeholder:text-muted-foreground"
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
                    className="rounded-xl h-12 bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                {emailError && (
                  <p
                    className="text-sm text-red-400 font-medium"
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
              className="bg-card rounded-3xl p-8 shadow-card-hover border border-border"
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
              <div className="bg-primary/10 border border-primary/30 rounded-xl px-4 py-3 mb-4 text-center">
                <p className="text-xs text-primary font-semibold mb-1">
                  Demo Mode — Your Code:
                </p>
                <p className="text-2xl font-extrabold text-primary tracking-widest">
                  {verifyCode}
                </p>
              </div>
              <Input
                data-ocid="onboarding.otp.input"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength={6}
                className="rounded-xl h-12 text-center text-xl tracking-widest font-bold mb-3 bg-input border-border text-foreground"
              />
              {otpError && (
                <p
                  className="text-sm text-red-400 font-medium mb-3"
                  data-ocid="onboarding.otp.error_state"
                >
                  {otpError}
                </p>
              )}
              <Button
                data-ocid="onboarding.verify.button"
                onClick={handleVerifyOTP}
                className="w-full rounded-full h-12 font-bold bg-primary text-primary-foreground"
              >
                Verify <Check className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          )}

          {/* Step 3: Companion Setup */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="bg-card rounded-3xl p-8 shadow-card-hover border border-border"
            >
              <h2 className="text-xl font-extrabold text-foreground mb-2">
                Choose Your Companion 💙
              </h2>
              <p className="text-sm text-muted-foreground mb-5">
                Pick a study partner that matches your vibe
              </p>

              <div className="space-y-4">
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
                    className="rounded-xl h-11 bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                {/* Female Companions */}
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    Female Companions
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {femaleCompanions.map((c) => (
                      <button
                        type="button"
                        key={c.id}
                        data-ocid={`onboarding.personality_${c.id}.button`}
                        onClick={() => setPersonality(c.personality)}
                        className={`p-3 rounded-2xl border-2 text-left transition-all duration-200 ${
                          personality === c.personality
                            ? "border-primary bg-primary/10 scale-105 shadow-glow-sm"
                            : "border-border bg-muted/50 hover:border-primary/40"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <img
                            src={c.image}
                            alt={c.defaultName}
                            className="w-8 h-8 rounded-full object-cover shrink-0"
                          />
                          <div>
                            <div className="font-bold text-xs text-foreground">
                              {c.defaultName}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {c.traits.split(" · ")[0]}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Male Companions */}
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    Male Companions
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {maleCompanions.map((c) => (
                      <button
                        type="button"
                        key={c.id}
                        data-ocid={`onboarding.personality_${c.id}.button`}
                        onClick={() => setPersonality(c.personality)}
                        className={`p-3 rounded-2xl border-2 text-left transition-all duration-200 ${
                          personality === c.personality
                            ? "border-primary bg-primary/10 scale-105 shadow-glow-sm"
                            : "border-border bg-muted/50 hover:border-primary/40"
                        }`}
                      >
                        <img
                          src={c.image}
                          alt={c.defaultName}
                          className="w-10 h-10 rounded-full object-cover mx-auto mb-1"
                        />
                        <div className="text-center">
                          <div className="font-bold text-xs text-foreground">
                            {c.defaultName}
                          </div>
                          <div className="text-xs text-muted-foreground leading-tight">
                            {c.traits.split(" · ")[0]}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Photo */}
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    Custom Photo (optional)
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      data-ocid="onboarding.photo_upload.button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-primary/50 text-primary text-sm font-semibold hover:bg-primary/10 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Upload from library
                    </button>
                    {customPhoto && (
                      <div className="relative">
                        <img
                          src={customPhoto}
                          alt="Custom"
                          className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                        />
                        <button
                          type="button"
                          onClick={() => setCustomPhoto("")}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                  {customPhoto && (
                    <p className="text-xs text-primary mt-1">
                      ✓ Custom photo will be used as companion avatar
                    </p>
                  )}
                </div>
              </div>

              <Button
                data-ocid="onboarding.step2_next.button"
                onClick={() => setStep(4)}
                className="w-full mt-6 rounded-full h-12 font-bold bg-primary text-primary-foreground"
              >
                Continue <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          )}

          {/* Step 4: Preview */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-card rounded-3xl p-8 shadow-card-hover border border-border text-center"
            >
              <h2 className="text-2xl font-extrabold text-foreground mb-2">
                Meet Your Companion! 💙
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Signed in as <strong className="text-primary">{email}</strong>
              </p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 ring-8 ring-primary/40 shadow-glow"
              >
                <img
                  src={customPhoto || preset.image}
                  alt={companionName || preset.defaultName}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <h3 className="text-xl font-bold text-primary">
                {companionName || preset.defaultName}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {preset.traits}
              </p>
              <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary font-semibold">
                {preset.gender === "male" ? "♂ Male" : "♀ Female"}
              </span>
              <div className="bg-muted rounded-2xl p-4 text-left mb-6 mt-4">
                <p className="text-sm text-foreground leading-relaxed">
                  {preset.greetings[0].replace("there", userName || "there")}
                </p>
              </div>
              <Button
                data-ocid="onboarding.start_studying.button"
                onClick={handleFinish}
                className="w-full rounded-full h-12 font-bold bg-primary text-primary-foreground shadow-glow"
              >
                Start Studying! 🚀
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
