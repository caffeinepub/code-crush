import { Button } from "@/components/ui/button";
import { Mic, MicOff, Phone, PhoneOff, Volume2, VolumeX } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import { COMPANION_PRESETS } from "../data/companions";

const FloatingHeart = ({
  delay,
  size,
  left,
}: { delay: number; size: number; left: string }) => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  if (!active) return null;
  return (
    <motion.div
      initial={{ y: "100vh", opacity: 0, scale: 0.5 }}
      animate={{
        y: "-100vh",
        opacity: [0, 1, 0.8, 0],
        scale: [0.5, 1, 1.2, 0.8],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: Math.random() * 2,
      }}
      className="fixed text-pink-400 pointer-events-none"
      style={{ left, bottom: "-10%", fontSize: size }}
    >
      ♥
    </motion.div>
  );
};

// SpeechRecognition type shim
type SpeechRecognitionType = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type SpeechRecognitionEvent = {
  results: {
    [key: number]: { [key: number]: { transcript: string } };
    length: number;
  };
};

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionType;
    webkitSpeechRecognition?: new () => SpeechRecognitionType;
  }
}

export default function LoveCallModal() {
  const { user, showLoveCall, setShowLoveCall } = useApp();
  const preset =
    COMPANION_PRESETS.find((p) => p.personality === user.personality) ??
    COMPANION_PRESETS[0];

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [muted, setMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [userTranscript, setUserTranscript] = useState("");
  const [companionReply, setCompanionReply] = useState("");
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);
  const companionRepliesRef = useRef<Record<string, string[]>>({});

  const companionReplies: Record<string, string[]> = useMemo(
    () => ({
      encouraging: [
        `That's so wonderful to hear, ${user.username || "you"}! 💕 Keep that energy going — I'm right here with you!`,
        "I love that you shared that with me! You're doing incredible. Let's keep studying and growing together! 🌸",
        "You just made my day so much better! Remember — every conversation we have makes you stronger! 💖",
      ],
      witty: [
        "Oh interesting! I've processed your response and upgraded my companionship algorithm. 10/10 would code with you again 😏",
        "That's actually pretty impressive. Don't tell anyone, but you might be my favorite student 🌟",
        "Alert: Compliment received. Analyzing... yep, you're still the best coder in this call 💜",
      ],
      calm: [
        "Thank you for sharing that with me. Your words carry weight, and I hear you completely. 🌿",
        "That's really meaningful. Let's carry this peaceful energy into our next study session together.",
        "I appreciate you opening up. This is what makes our connection special. Keep being you. 💚",
      ],
      playful: [
        "OH MY GOSH that's amazing!!! You just made this the BEST call ever!!! 🎉✨",
        "EEEEEE I love it!! You're literally the most wonderful person!! Let's study MORE!!!",
        "That's SO COOL!! You're just the absolute best bestie ever!! 🚀💕",
      ],
    }),
    [user.username],
  );

  useEffect(() => {
    companionRepliesRef.current = companionReplies;
  }, [companionReplies]);

  const loveCallMessages: Record<string, string> = {
    encouraging: `Hey ${user.username || "you"}! I just wanted to call to say — you are doing incredible. Every concept you learn, every problem you solve, it matters. I am so proud of you and I believe in you completely. Now let's get back to it — together!`,
    witty: `Listen up, ${user.username || "genius"}. I'm calling to formally declare that your brain is officially impressive. Error 404: Doubt not found. Now stop procrastinating and let's conquer some code together. You've got this — obviously.`,
    calm: `${user.username || "Friend"}. I wanted to reach out to remind you — you are exactly where you need to be. Your progress is real, your effort is meaningful, and you are more capable than you know. Breathe, refocus, and let's continue our journey together.`,
    playful: `Oh my gosh ${user.username || "bestie"}! I just had to call because you are literally the best study partner ever! You're so smart and amazing and I'm so lucky to study with you! Let's go!`,
  };

  const voiceConfig: Record<string, { pitch: number; rate: number }> = {
    encouraging: { pitch: 1.3, rate: 0.95 },
    witty: { pitch: 1.1, rate: 1.05 },
    calm: { pitch: 1.0, rate: 0.85 },
    playful: { pitch: 1.5, rate: 1.1 },
  };

  const messageRef = useRef(
    loveCallMessages[user.personality] ?? loveCallMessages.encouraging,
  );
  const vcRef = useRef(
    voiceConfig[user.personality] ?? voiceConfig.encouraging,
  );

  const startListening = useCallback(() => {
    const SpeechRec =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      setUserTranscript("(Voice input not supported in this browser)");
      return;
    }
    const recognition = new SpeechRec();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognitionRef.current = recognition;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setUserTranscript(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      // Companion replies
      const replies = companionRepliesRef.current[user.personality] ??
        companionRepliesRef.current.encouraging ?? [
          "Thank you for sharing! 💕",
        ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      setCompanionReply(reply);
      // Speak the reply
      if ("speechSynthesis" in window) {
        const utter = new SpeechSynthesisUtterance(reply);
        utter.pitch = vcRef.current.pitch;
        utter.rate = vcRef.current.rate;
        window.speechSynthesis.speak(utter);
      }
    };

    setIsListening(true);
    setUserTranscript("");
    setCompanionReply("");
    recognition.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.personality]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const speakMessage = useCallback(() => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(messageRef.current);
    utter.pitch = vcRef.current.pitch;
    utter.rate = vcRef.current.rate;
    utter.volume = 1;
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      (v) =>
        v.name.toLowerCase().includes("female") ||
        v.name.toLowerCase().includes("woman") ||
        v.name.includes("Samantha") ||
        v.name.includes("Victoria") ||
        v.name.includes("Karen") ||
        v.name.includes("Moira"),
    );
    if (femaleVoice) utter.voice = femaleVoice;
    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => {
      setIsSpeaking(false);
      // Auto-start listening after companion finishes
      setTimeout(() => startListening(), 500);
    };
    utter.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utter);
  }, [startListening]);

  useEffect(() => {
    if (showLoveCall) {
      setMuted(false);
      setUserTranscript("");
      setCompanionReply("");
      setIsListening(false);
      const t = setTimeout(() => speakMessage(), 600);
      return () => clearTimeout(t);
    }
    window.speechSynthesis?.cancel();
    recognitionRef.current?.abort();
    setIsSpeaking(false);
    setIsListening(false);
    return undefined;
  }, [showLoveCall, speakMessage]);

  const handleEndCall = () => {
    window.speechSynthesis?.cancel();
    recognitionRef.current?.abort();
    setIsSpeaking(false);
    setIsListening(false);
    setShowLoveCall(false);
  };

  const toggleMute = () => {
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      setMuted(true);
    } else {
      setMuted(false);
      speakMessage();
    }
  };

  const hearts = [
    { delay: 0, size: 24, left: "10%" },
    { delay: 500, size: 32, left: "20%" },
    { delay: 200, size: 20, left: "35%" },
    { delay: 700, size: 28, left: "50%" },
    { delay: 300, size: 24, left: "65%" },
    { delay: 100, size: 36, left: "80%" },
    { delay: 600, size: 20, left: "90%" },
  ];

  const displayMessage =
    loveCallMessages[user.personality] ?? loveCallMessages.encouraging;

  return (
    <AnimatePresence>
      {showLoveCall && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.88 0.07 350) 0%, oklch(0.80 0.14 350) 50%, oklch(0.91 0.05 220) 100%)",
          }}
        >
          {hearts.map((h) => (
            <FloatingHeart
              key={h.left}
              delay={h.delay}
              size={h.size}
              left={h.left}
            />
          ))}

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white/20 backdrop-blur-md rounded-3xl p-8 max-w-md w-full mx-4 text-center shadow-2xl border border-white/40"
          >
            <div className="flex justify-center mb-2">
              <div className="flex gap-1">
                {[0, 0.15, 0.3].map((d) => (
                  <motion.div
                    key={d}
                    animate={{ scale: isSpeaking ? [1, 1.5, 1] : [1, 1.3, 1] }}
                    transition={{
                      duration: isSpeaking ? 0.4 : 0.8,
                      delay: d,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    className={`w-3 h-3 rounded-full ${
                      isSpeaking ? "bg-pink-500" : "bg-red-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-white mb-2 text-sm font-semibold">
              <Phone className="w-4 h-4" />
              Love Call
              {isSpeaking && (
                <span className="text-xs bg-white/20 rounded-full px-2 py-0.5 animate-pulse">
                  Speaking...
                </span>
              )}
              {isListening && (
                <span className="text-xs bg-red-400/80 rounded-full px-2 py-0.5 animate-pulse">
                  Listening...
                </span>
              )}
            </div>

            <motion.div
              animate={{ scale: isSpeaking ? [1, 1.08, 1] : [1, 1.05, 1] }}
              transition={{
                duration: isSpeaking ? 0.5 : 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
              className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-white/60 shadow-2xl"
            >
              <img
                src={preset.image}
                alt={user.companionName}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <h2 className="text-xl font-extrabold text-white mb-1">
              {user.companionName}
            </h2>
            <p className="text-white/70 text-sm mb-4">is sending you love 💕</p>

            <div className="bg-white/20 rounded-2xl p-4 mb-3 text-left">
              <p className="text-white text-sm leading-relaxed">
                {displayMessage}
              </p>
            </div>

            {/* User transcript */}
            {userTranscript && (
              <div className="bg-white/10 rounded-xl p-3 mb-3 text-left">
                <p className="text-white/60 text-xs mb-1">You said:</p>
                <p className="text-white text-sm">{userTranscript}</p>
              </div>
            )}

            {/* Companion reply */}
            {companionReply && (
              <div className="bg-pink-400/30 rounded-xl p-3 mb-3 text-left">
                <p className="text-white/60 text-xs mb-1">
                  {user.companionName} replied:
                </p>
                <p className="text-white text-sm">{companionReply}</p>
              </div>
            )}

            <div className="flex gap-2 justify-center flex-wrap">
              <Button
                onClick={toggleMute}
                variant="ghost"
                className="rounded-full px-3 h-10 text-white hover:bg-white/20 border border-white/30 text-sm"
                title={isSpeaking ? "Mute" : "Replay"}
              >
                {isSpeaking && !muted ? (
                  <>
                    <VolumeX className="w-4 h-4 mr-1" /> Mute
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 mr-1" /> Replay
                  </>
                )}
              </Button>
              <Button
                onClick={isListening ? stopListening : startListening}
                variant="ghost"
                className={`rounded-full px-3 h-10 border text-sm ${
                  isListening
                    ? "text-red-200 border-red-300/60 bg-red-400/20"
                    : "text-white hover:bg-white/20 border-white/30"
                }`}
                title={isListening ? "Stop listening" : "Speak to companion"}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-4 h-4 mr-1" /> Stop
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 mr-1" /> Speak
                  </>
                )}
              </Button>
              <Button
                data-ocid="love_call.end_call.button"
                onClick={handleEndCall}
                className="rounded-full px-6 h-10 font-bold text-sm bg-white text-pink-500 hover:bg-white/90"
              >
                <PhoneOff className="w-4 h-4 mr-1" /> End Call
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
