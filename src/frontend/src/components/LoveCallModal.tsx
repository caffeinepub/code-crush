import { Button } from "@/components/ui/button";
import { Mic, MicOff, Phone, PhoneOff, Volume2, VolumeX } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import { COMPANION_PRESETS } from "../data/companions";

// Voice profiles per companion
const VOICE_PROFILES: Record<
  string,
  { pitch: number; rate: number; pauses: boolean; fillers: string[] }
> = {
  sakura: {
    pitch: 1.2,
    rate: 0.85,
    pauses: true,
    fillers: ["Oh!", "Hmm...", "Let me think...", "Sure!"],
  },
  nova: {
    pitch: 1.1,
    rate: 0.95,
    pauses: false,
    fillers: ["Interesting.", "Right, so...", "Hmm.", "Actually..."],
  },
  zen: {
    pitch: 0.9,
    rate: 0.8,
    pauses: true,
    fillers: ["Hmm...", "Let me reflect...", "Ah yes.", "Indeed."],
  },
  ember: {
    pitch: 1.3,
    rate: 1.1,
    pauses: false,
    fillers: ["Oh my gosh!", "YES!", "OKAY so!", "Wait!"],
  },
  kai: {
    pitch: 0.75,
    rate: 0.9,
    pauses: false,
    fillers: ["Right.", "So...", "Let me think.", "Alright."],
  },
  ryu: {
    pitch: 1.0,
    rate: 1.15,
    pauses: false,
    fillers: ["Yo!", "Dude!", "Okay so!", "Listen!"],
  },
  arjun: {
    pitch: 0.7,
    rate: 0.82,
    pauses: true,
    fillers: [
      "Hmm...",
      "Ah, yes.",
      "Let me think on that.",
      "Interesting question.",
    ],
  },
};

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
      className="fixed text-blue-300 pointer-events-none"
      style={{ left, bottom: "-10%", fontSize: size }}
    >
      ♥
    </motion.div>
  );
};

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
  const [isThinking, setIsThinking] = useState(false);
  const [muted, setMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [userTranscript, setUserTranscript] = useState("");
  const [companionReply, setCompanionReply] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);
  const companionRepliesRef = useRef<Record<string, string[]>>({});
  const voiceProfile =
    (VOICE_PROFILES as Record<string, typeof VOICE_PROFILES.sakura>)[
      preset.id
    ] ?? VOICE_PROFILES.sakura;
  const companionImage = user.companionCustomPhoto || preset.image;

  const companionReplies: Record<string, string[]> = useMemo(
    () => ({
      encouraging: [
        `That's so wonderful to hear, ${user.username || "you"}! 💕 Keep that energy going!`,
        "I love that you shared that with me! You're doing incredible.",
        "You just made my day so much better! You're going to achieve great things!",
      ],
      witty: [
        "Oh interesting! I've upgraded my companionship algorithm. 10/10 would code with you again.",
        "That's actually pretty impressive. Don't tell anyone, but you might be my favorite student.",
        "Alert: Compliment received. You're still the best coder in this call.",
      ],
      calm: [
        "Thank you for sharing that with me. Your words carry weight, and I hear you completely.",
        "That's really meaningful. Let's carry this peaceful energy into our next session.",
        "I appreciate you opening up. This is what makes our connection special.",
      ],
      playful: [
        "OH MY GOSH that's amazing!!! You just made this the BEST call ever!!! 🎉",
        "EEEEEE I love it!! You're the most wonderful person!! Let's study MORE!!!",
        "That's SO COOL!! You're just the absolute best bestie ever!! 🚀",
      ],
      cool: [
        "Good to hear. Your progress has been solid. Keep that trajectory.",
        "That tracks. You've been thinking about this the right way.",
        "Acknowledged. You're building real understanding — not just memorizing.",
      ],
      energetic: [
        "YOOO that's EPIC!! You're literally leveling up every day!! 💪",
        "BRO that's so sick!! I knew you had it in you!! LET'S GOOO!!",
        "That's the mindset of a CHAMPION!! Keep that energy, no cap!!",
      ],
      wise: [
        "That is deeply meaningful to hear. You're growing not just in knowledge, but in wisdom.",
        "Thank you for sharing that. Your reflection speaks to genuine maturity of thought.",
        "Well said. Every insight you share tells me you're on the right path, friend.",
      ],
    }),
    [user.username],
  );

  useEffect(() => {
    companionRepliesRef.current = companionReplies;
  }, [companionReplies]);

  const loveCallMessages: Record<string, string> = {
    encouraging: `Hey ${user.username || "there"}! 💕 I just had to call you because... I'm so proud of how hard you've been working! You're amazing. Let's keep studying together!`,
    witty: `Oh hello ${user.username || "genius"}. I've been running diagnostics and concluded you're probably the most underrated programmer I know. Don't let it go to your head though.`,
    calm: `Hello ${user.username || "friend"}. I wanted to reach out and remind you... you're doing wonderfully. Take a breath. You're on the right path.`,
    playful: `OHHH HIIII ${user.username || "bestie"}!!! I literally COULDN'T WAIT to call you!! You've been working SO hard and I'm SO PROUD!! Let's GO!!`,
    cool: `Hey ${user.username || ""}.  Checking in. Your study sessions have been consistent. That kind of discipline compounds over time. Keep it going.`,
    energetic: `YO ${user.username || ""} WHAT'S UP!! Dude I've been HYPED for this call!! You're CRUSHING it out there!! LET'S GOOO CHAMPION!!`,
    wise: `Greetings, ${user.username || "dear student"}. I called to remind you that the path of learning is not a sprint — it is a journey. You are walking it with grace.`,
  };

  const speakText = useCallback(
    (text: string, onEnd?: () => void) => {
      if (muted || !window.speechSynthesis) return;

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = voiceProfile.pitch;
      utterance.rate = voiceProfile.rate;
      utterance.volume = 1;

      // Try to pick a suitable voice
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const preferredVoice =
          voices.find(
            (v) =>
              v.lang.startsWith("en") &&
              (preset.gender === "male"
                ? v.name.toLowerCase().includes("male") ||
                  v.name.includes("Daniel") ||
                  v.name.includes("David") ||
                  v.name.includes("Alex")
                : v.name.includes("Samantha") ||
                  v.name.includes("Karen") ||
                  v.name.includes("Victoria")),
          ) ??
          voices.find((v) => v.lang.startsWith("en")) ??
          voices[0];
        if (preferredVoice) utterance.voice = preferredVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        onEnd?.();
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        onEnd?.();
      };

      window.speechSynthesis.speak(utterance);
    },
    [muted, voiceProfile, preset.gender],
  );

  const startListening = useCallback(() => {
    const SpeechRec =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SpeechRec) return;

    const recognition = new SpeechRec();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserTranscript(transcript);
      setIsListening(false);

      // Think then reply
      setIsThinking(true);
      setTimeout(
        () => {
          setIsThinking(false);
          const replies =
            (companionRepliesRef.current as Record<string, string[]>)[
              user.personality
            ] ?? [];
          const reply =
            replies[Math.floor(Math.random() * replies.length)] ??
            "I hear you! 💙";
          const filler =
            voiceProfile.fillers[
              Math.floor(Math.random() * voiceProfile.fillers.length)
            ];
          const fullReply = `${filler} ${reply}`;
          setCompanionReply(fullReply);
          setDisplayMessage(fullReply);
          speakText(fullReply);
        },
        300 + Math.random() * 500,
      );
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    setIsListening(true);
    try {
      recognition.start();
    } catch {}
  }, [user.personality, voiceProfile, speakText]);

  const stopListening = () => {
    recognitionRef.current?.abort();
    setIsListening(false);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally only re-runs on showLoveCall change
  useEffect(() => {
    if (!showLoveCall) return;

    const msg =
      (loveCallMessages as Record<string, string>)[user.personality] ??
      loveCallMessages.encouraging;
    const filler =
      voiceProfile.fillers[
        Math.floor(Math.random() * voiceProfile.fillers.length)
      ];
    const fullMsg = `${filler} ${msg}`;
    setDisplayMessage(fullMsg);
    setUserTranscript("");
    setCompanionReply("");
    setIsThinking(false);

    // Add natural pause before speaking
    const delay = voiceProfile.pauses
      ? 600 + Math.random() * 200
      : 300 + Math.random() * 200;
    const timer = setTimeout(() => {
      speakText(fullMsg, () => {
        // Auto-listen after speaking
        setTimeout(() => startListening(), 500);
      });
    }, delay);

    return () => {
      clearTimeout(timer);
      window.speechSynthesis?.cancel();
      recognitionRef.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showLoveCall]);

  const handleClose = () => {
    window.speechSynthesis?.cancel();
    recognitionRef.current?.abort();
    setShowLoveCall(false);
    setIsSpeaking(false);
    setIsListening(false);
    setIsThinking(false);
  };

  const toggleMute = () => {
    if (muted) {
      setMuted(false);
    } else {
      window.speechSynthesis?.cancel();
      setMuted(true);
      setIsSpeaking(false);
    }
  };

  const hearts = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        delay: i * 700,
        size: 16 + i * 4,
        left: `${10 + i * 14}%`,
      })),
    [],
  );

  return (
    <AnimatePresence>
      {showLoveCall && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.12 0.06 265) 0%, oklch(0.18 0.08 280) 50%, oklch(0.1 0.05 255) 100%)",
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
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full mx-4 text-center shadow-2xl border border-white/20"
          >
            {/* Audio bars */}
            <div className="flex justify-center gap-1 mb-2 h-6">
              {(["bar-a", "bar-b", "bar-c", "bar-d", "bar-e"] as const).map(
                (barId, i) => {
                  const delays = [0, 0.1, 0.2, 0.1, 0];
                  const d = delays[i];
                  return (
                    <motion.div
                      key={barId}
                      animate={{
                        scaleY: isSpeaking
                          ? [0.3, 1, 0.5, 0.8, 0.3]
                          : [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: isSpeaking ? 0.5 : 1.5,
                        delay: d,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                      style={{ transformOrigin: "bottom" }}
                      className={`w-1.5 rounded-full ${
                        isSpeaking ? "bg-primary" : "bg-white/30"
                      }`}
                    />
                  );
                },
              )}
            </div>

            <div className="flex items-center justify-center gap-2 text-white mb-3 text-sm font-semibold">
              <Phone className="w-4 h-4" />
              <span>Voice Call</span>
              {isThinking && (
                <span className="flex items-center gap-1 text-xs bg-white/20 rounded-full px-2 py-0.5">
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-white" />
                  thinking
                </span>
              )}
              {isSpeaking && (
                <span className="text-xs bg-primary/40 rounded-full px-2 py-0.5 animate-pulse">
                  Speaking...
                </span>
              )}
              {isListening && (
                <span className="text-xs bg-red-500/60 rounded-full px-2 py-0.5 animate-pulse">
                  Listening...
                </span>
              )}
            </div>

            <motion.div
              animate={{ scale: isSpeaking ? [1, 1.08, 1] : [1, 1.04, 1] }}
              transition={{
                duration: isSpeaking ? 0.5 : 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
              className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-white/30 shadow-2xl"
            >
              <img
                src={companionImage}
                alt={user.companionName}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <h2 className="text-xl font-extrabold text-white mb-1">
              {user.companionName}
            </h2>
            <p className="text-white/60 text-sm mb-4">
              {preset.traits.split(" · ")[0]}
            </p>

            <div className="bg-white/10 rounded-2xl p-4 mb-3 text-left">
              <p className="text-white text-sm leading-relaxed">
                {displayMessage}
              </p>
            </div>

            {userTranscript && (
              <div className="bg-white/10 rounded-xl p-3 mb-3 text-left">
                <p className="text-white/50 text-xs mb-1">You said:</p>
                <p className="text-white text-sm">{userTranscript}</p>
              </div>
            )}

            {companionReply && (
              <div className="bg-primary/20 rounded-xl p-3 mb-3 text-left">
                <p className="text-white/50 text-xs mb-1">
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
              >
                {muted ? (
                  <Volume2 className="w-4 h-4 mr-1" />
                ) : (
                  <VolumeX className="w-4 h-4 mr-1" />
                )}
                {muted ? "Unmute" : "Mute"}
              </Button>

              <Button
                onClick={isListening ? stopListening : startListening}
                variant="ghost"
                className="rounded-full px-3 h-10 text-white hover:bg-white/20 border border-white/30 text-sm"
              >
                {isListening ? (
                  <MicOff className="w-4 h-4 mr-1" />
                ) : (
                  <Mic className="w-4 h-4 mr-1" />
                )}
                {isListening ? "Stop" : "Speak"}
              </Button>

              <Button
                onClick={handleClose}
                className="rounded-full px-4 h-10 bg-red-500/80 hover:bg-red-500 text-white border-0 text-sm"
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
