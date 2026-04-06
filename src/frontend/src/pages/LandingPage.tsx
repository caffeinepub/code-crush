import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BookOpen,
  Brain,
  Code,
  Code2,
  Heart,
  Layers,
  Mail,
  MapPin,
  MessageSquare,
  Mic,
  Music,
  Phone,
  Shield,
  Sparkles,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import { CODING_PROBLEMS } from "../data/problems";

const TEAM = [
  {
    name: "Kripanshu",
    role: "Founder & CEO",
    emoji: "👑",
    color: "from-blue-600 to-indigo-600",
    badge: "bg-blue-100 text-blue-700",
    bio: "Visionary entrepreneur and CS enthusiast who founded Code & Crush to make learning joyful. Kripanshu blends product thinking with a deep love for education technology.",
  },
  {
    name: "Mayank",
    role: "CTO & Founder",
    emoji: "⚡",
    color: "from-sky-500 to-blue-600",
    badge: "bg-sky-100 text-sky-700",
    bio: "Full-stack engineer and AI architect behind the Code & Crush platform. Mayank leads technical innovation, crafting the AI systems that power every companion interaction.",
  },
  {
    name: "Dinesh",
    role: "CMO",
    emoji: "📣",
    color: "from-indigo-500 to-blue-500",
    badge: "bg-indigo-100 text-indigo-700",
    bio: "Marketing strategist and brand builder driving Code & Crush's growth. Dinesh crafts the story that connects students worldwide to the platform that makes studying feel like an adventure.",
  },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    icon: "💙",
    title: "Create Your Companion",
    desc: "Pick a personality that matches your vibe — encouraging, witty, calm, or playful.",
  },
  {
    step: 2,
    icon: "📚",
    title: "Choose a Study Topic",
    desc: "Select from CS fundamentals to advanced algorithms. Your companion is always ready.",
  },
  {
    step: 3,
    icon: "💬",
    title: "Chat, Quiz & Solve Problems",
    desc: "Engage in AI-driven conversations, ace quizzes, and conquer coding challenges.",
  },
  {
    step: 4,
    icon: "🏆",
    title: "Earn XP & Level Up",
    desc: "Every answer, message, and solved problem earns XP. Level up and collect badges!",
  },
];

const companions = [
  {
    name: "Sakura",
    traits: "Warm · Encouraging",
    img: "/assets/generated/companion-sakura.dim_200x200.png",
    color: "#F06A9B",
  },
  {
    name: "Kai",
    traits: "Cool · Analytical",
    img: "/assets/generated/companion-kai-transparent.dim_400x400.png",
    color: "#4f6ef7",
  },
  {
    name: "Zen",
    traits: "Calm · Patient",
    img: "/assets/generated/companion-zen.dim_200x200.png",
    color: "#4BAF8C",
  },
  {
    name: "Ryu",
    traits: "Energetic · Hype",
    img: "/assets/generated/companion-ryu-transparent.dim_400x400.png",
    color: "#f7724f",
  },
  {
    name: "Arjun",
    traits: "Wise · Gentle",
    img: "/assets/generated/companion-arjun-transparent.dim_400x400.png",
    color: "#b88a44",
  },
  {
    name: "Nova",
    traits: "Sharp · Witty",
    img: "/assets/generated/companion-nova.dim_200x200.png",
    color: "#8C84D8",
  },
];

interface UserReview {
  name: string;
  university: string;
  stars: number;
  text: string;
  date: string;
}

const REVIEWS_KEY = "codeandcrush_reviews";

function ReviewForm() {
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [stars, setStars] = useState(0);
  const [text, setText] = useState("");
  const [hoverStar, setHoverStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || stars === 0) return;
    const existing: UserReview[] = JSON.parse(
      localStorage.getItem(REVIEWS_KEY) ?? "[]",
    );
    const newReview: UserReview = {
      name: name.trim(),
      university: university.trim(),
      stars,
      text: text.trim(),
      date: new Date().toISOString(),
    };
    localStorage.setItem(REVIEWS_KEY, JSON.stringify([newReview, ...existing]));
    setSubmitted(true);
    setName("");
    setUniversity("");
    setStars(0);
    setText("");
    setTimeout(() => setSubmitted(false), 3000);
    window.dispatchEvent(new Event("reviews-updated"));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {submitted && (
        <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4 text-center">
          <p className="text-primary font-semibold">
            ✅ Thank you for your review!
          </p>
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="review-name"
            className="text-xs font-semibold text-foreground block mb-1.5"
          >
            Your Name *
          </label>
          <input
            id="review-name"
            data-ocid="review.name.input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Priya Sharma"
            required
            className="w-full rounded-xl h-11 px-4 bg-input border border-border text-foreground text-sm outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label
            htmlFor="review-university"
            className="text-xs font-semibold text-foreground block mb-1.5"
          >
            University / College (optional)
          </label>
          <input
            id="review-university"
            data-ocid="review.university.input"
            type="text"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            placeholder="e.g. IIT Delhi"
            className="w-full rounded-xl h-11 px-4 bg-input border border-border text-foreground text-sm outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-foreground block mb-2">
          Rating *
        </p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              data-ocid={`review.star.${n}`}
              onClick={() => setStars(n)}
              onMouseEnter={() => setHoverStar(n)}
              onMouseLeave={() => setHoverStar(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-7 h-7 ${n <= (hoverStar || stars) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <label
          htmlFor="review-text"
          className="text-xs font-semibold text-foreground block mb-1.5"
        >
          Your Review *
        </label>
        <textarea
          id="review-text"
          data-ocid="review.text.textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share how Code & Crush helped you study..."
          rows={4}
          required
          className="w-full rounded-xl px-4 py-3 bg-input border border-border text-foreground text-sm outline-none focus:border-primary transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        data-ocid="review.submit.button"
        className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity"
      >
        Submit Review ✨
      </button>
    </form>
  );
}

function SavedReviews() {
  const [reviews, setReviews] = useState<UserReview[]>([]);

  useEffect(() => {
    const load = () => {
      const stored: UserReview[] = JSON.parse(
        localStorage.getItem(REVIEWS_KEY) ?? "[]",
      );
      setReviews(stored);
    };
    load();
    window.addEventListener("reviews-updated", load);
    return () => window.removeEventListener("reviews-updated", load);
  }, []);

  if (reviews.length === 0) return null;

  const getRelativeDate = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(iso).toLocaleDateString();
  };

  return (
    <div>
      <h3 className="font-bold text-lg text-foreground mb-6">
        Student Reviews ({reviews.length})
      </h3>
      <div className="grid sm:grid-cols-2 gap-4" data-ocid="review.list">
        {reviews.map((r, i) => (
          <motion.div
            key={`review-${r.date}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="bg-card rounded-2xl p-5 border border-border shadow-card"
            data-ocid={`review.item.${i + 1}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shrink-0">
                {r.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-foreground truncate">
                  {r.name}
                </p>
                {r.university && (
                  <p className="text-xs text-muted-foreground truncate">
                    {r.university}
                  </p>
                )}
              </div>
              <span className="text-xs text-muted-foreground shrink-0">
                {getRelativeDate(r.date)}
              </span>
            </div>
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, si) => (
                <Star
                  key={`star-${r.date}-${si}`}
                  className={`w-3.5 h-3.5 ${si < r.stars ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                />
              ))}
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              &ldquo;{r.text}&rdquo;
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TeamCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number, dir: number) => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 300);
  };

  const next = () => {
    goTo((current + 1) % TEAM.length, 1);
  };

  const prev = () => {
    goTo((current - 1 + TEAM.length) % TEAM.length, -1);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % TEAM.length);
      setDirection(1);
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleDragStart = (clientX: number) => {
    dragStartX.current = clientX;
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleDragEnd = (clientX: number) => {
    if (dragStartX.current === null) return;
    const diff = dragStartX.current - clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
    dragStartX.current = null;
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % TEAM.length);
      setDirection(1);
    }, 3000);
  };

  const member = TEAM[current];

  return (
    <div className="mt-4 select-none">
      <div
        className="relative overflow-hidden"
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseUp={(e) => handleDragEnd(e.clientX)}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="rounded-2xl border border-blue-100 p-5 flex items-center gap-4 bg-blue-50 cursor-grab active:cursor-grabbing"
          >
            <div
              className={`w-16 h-16 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-3xl shrink-0`}
            >
              {member.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-extrabold text-blue-900 text-lg">
                {member.name}
              </h3>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${member.badge} inline-block mb-1`}
              >
                {member.role}
              </span>
              <p className="text-xs text-blue-700 leading-relaxed">
                {member.bio}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-3">
        {TEAM.map((teamMember, i) => (
          <button
            key={teamMember.name}
            type="button"
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-blue-600 w-5" : "bg-blue-200 w-2"
            }`}
          />
        ))}
      </div>

      {/* Swipe hint */}
      <p className="text-center text-xs text-blue-400 mt-2">
        Swipe or drag to explore team
      </p>
    </div>
  );
}

export default function LandingPage() {
  const { setPage, setCurrentProblemId } = useApp();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [ethicsOpen, setEthicsOpen] = useState(false);
  const [feedbackPhoto, setFeedbackPhoto] = useState<string>("");
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [contactSent, setContactSent] = useState(false);
  const feedbackPhotoRef = useRef<HTMLInputElement>(null);

  const features = [
    {
      icon: Heart,
      title: "AI Study Companion",
      desc: "Choose from 7 unique AI companions — each with their own personality, voice, and teaching style. They adapt to your mood and keep you motivated.",
      color: "text-pink-400",
      emoji: "💕",
    },
    {
      icon: Brain,
      title: "Smart CS Roadmap",
      desc: "15+ developer tracks: Frontend, Backend, Full Stack, Python, Java, ML, DevOps, iOS, Android, Cybersecurity, Blockchain, Cloud, and more — each with curated videos and notes.",
      color: "text-blue-400",
      emoji: "🧠",
    },
    {
      icon: Trophy,
      title: "Gamified XP & Badges",
      desc: "Earn XP for every quiz, problem, and challenge. Level up, collect badges, maintain study streaks, and track your relationship progress with your companion.",
      color: "text-yellow-400",
      emoji: "🏆",
    },
    {
      icon: Shield,
      title: "Burnout Guard",
      desc: "Smart frustration detection that adapts your companion's tone to support you through tough sessions. Focus mode nudges you if you leave the tab.",
      color: "text-green-400",
      emoji: "🛡️",
    },
    {
      icon: Code2,
      title: "Code Studio",
      desc: "10+ real coding challenges with a dark editor, hints (no API key needed), companion-assisted solving, and relationship progress tracking.",
      color: "text-cyan-400",
      emoji: "💻",
    },
    {
      icon: Zap,
      title: "Code Visualizer",
      desc: "See algorithms come alive — Bubble Sort, Binary Search, Fibonacci, Two Sum — with step-by-step animated frames, speed controls, and zoom.",
      color: "text-orange-400",
      emoji: "⚡",
    },
    {
      icon: Layers,
      title: "Multi-Language Compiler",
      desc: "Write, run, and save code in 20+ languages. Save snippets by name, reload them anytime — Python, Java, C++, Go, Rust, and more.",
      color: "text-violet-400",
      emoji: "🔧",
    },
    {
      icon: BookOpen,
      title: "Project-Based Learning",
      desc: "12+ real projects broken into small guided tasks. Starter code, hints, and a companion chat for guidance — upload your finished project to GitHub.",
      color: "text-emerald-400",
      emoji: "📚",
    },
    {
      icon: Mic,
      title: "Love Call (Voice AI)",
      desc: "Two-way human-like voice calls with your companion. Powered by ElevenLabs + Web Speech API. Works with or without an API key.",
      color: "text-rose-400",
      emoji: "📞",
    },
    {
      icon: MessageSquare,
      title: "Chat Without API",
      desc: "15+ conversation topics with fuzzy matching. Your companion talks naturally about greetings, hobbies, food, and more — even without an API key.",
      color: "text-sky-400",
      emoji: "💬",
    },
    {
      icon: Users,
      title: "Avatar Builder",
      desc: "WhatsApp-style cartoon avatar customization — skin tone, hair, eyes, mouth, outfits, accessories, glasses, headband, and more.",
      color: "text-fuchsia-400",
      emoji: "🎨",
    },
    {
      icon: Music,
      title: "Relax Music & Themes",
      desc: "4 ambient tracks (Lo-Fi, Rain, White Noise, Study Jazz) playing natively in the Dashboard. Plus 6 UI themes: Default, Romantic, Chill, Motivation, Focus, Night.",
      color: "text-teal-400",
      emoji: "🎵",
    },
  ];

  return (
    <div className="min-h-screen bg-background font-jakarta">
      {/* About Us Modal */}
      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent className="max-w-lg rounded-3xl p-0 overflow-hidden bg-white">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white text-center relative">
            <button
              type="button"
              onClick={() => setAboutOpen(false)}
              className="absolute top-3 right-3 text-white/80 hover:text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-white/20 transition-colors text-lg font-bold"
              aria-label="Close"
            >
              ✕
            </button>
            <DialogHeader>
              <DialogTitle className="text-2xl font-extrabold text-white">
                About Code &amp; Crush
              </DialogTitle>
            </DialogHeader>
            <p className="text-white/80 mt-2 text-sm">
              Study Better. Feel Better. Together.
            </p>
          </div>
          <div className="p-6 space-y-4 bg-white">
            <p className="text-sm text-blue-800 text-center leading-relaxed">
              Code &amp; Crush is an AI-powered Virtual StudyDate Companion that
              makes learning CS interactive, emotional, and less isolating.
            </p>
            <TeamCarousel />
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Us Modal */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="max-w-md rounded-3xl p-0 overflow-hidden bg-background border border-border">
          <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-extrabold text-white">
                Contact Us
              </DialogTitle>
            </DialogHeader>
            <p className="text-white/80 text-sm mt-1">
              We'd love to hear from you!
            </p>
          </div>
          <div className="p-6 space-y-4">
            {contactSent ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-3">✅</div>
                <h3 className="text-lg font-bold text-foreground">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  We'll get back to you soon.
                </p>
                <Button
                  onClick={() => {
                    setContactSent(false);
                    setContactOpen(false);
                  }}
                  className="mt-4 rounded-full bg-primary text-primary-foreground"
                >
                  Close
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-semibold text-foreground block mb-1">
                      Name
                    </p>
                    <input
                      data-ocid="contact.name.input"
                      type="text"
                      placeholder="Your name"
                      className="w-full rounded-xl h-10 px-3 bg-input border border-border text-foreground text-sm outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground block mb-1">
                      Email
                    </p>
                    <input
                      data-ocid="contact.email.input"
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-xl h-10 px-3 bg-input border border-border text-foreground text-sm outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground block mb-1">
                    Subject
                  </p>
                  <input
                    data-ocid="contact.subject.input"
                    type="text"
                    placeholder="How can we help?"
                    className="w-full rounded-xl h-10 px-3 bg-input border border-border text-foreground text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground block mb-1">
                    Message
                  </p>
                  <textarea
                    data-ocid="contact.message.textarea"
                    rows={4}
                    placeholder="Your message..."
                    className="w-full rounded-xl px-3 py-2 bg-input border border-border text-foreground text-sm outline-none focus:border-primary resize-none"
                  />
                </div>
                {/* Attach Photo */}
                <div>
                  <p className="text-xs font-semibold text-foreground block mb-1">
                    Attach Photo (optional)
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      data-ocid="contact.photo.upload_button"
                      onClick={() => feedbackPhotoRef.current?.click()}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-primary/50 text-primary text-xs font-semibold hover:bg-primary/10 transition-colors"
                    >
                      📎 Attach Photo
                    </button>
                    {feedbackPhoto && (
                      <img
                        src={feedbackPhoto}
                        alt="Attachment"
                        className="w-10 h-10 rounded-lg object-cover border border-border"
                      />
                    )}
                  </div>
                  <input
                    ref={feedbackPhotoRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      const r = new FileReader();
                      r.onload = (ev) =>
                        setFeedbackPhoto(ev.target?.result as string);
                      r.readAsDataURL(f);
                    }}
                  />
                </div>
                {/* Star Rating */}
                <div>
                  <p className="text-xs font-semibold text-foreground block mb-1">
                    Rate Your Experience
                  </p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        type="button"
                        key={n}
                        onClick={() => setFeedbackRating(n)}
                        className="text-2xl transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-6 h-6 ${n <= feedbackRating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <Button
                  data-ocid="contact.send.button"
                  onClick={() => setContactSent(true)}
                  className="w-full rounded-full bg-primary text-primary-foreground font-semibold"
                >
                  Send Message
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Ethics & Policy Modal */}
      <Dialog open={ethicsOpen} onOpenChange={setEthicsOpen}>
        <DialogContent className="max-w-lg rounded-3xl p-0 overflow-hidden bg-background border border-border max-h-[80vh] overflow-y-auto">
          <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white sticky top-0">
            <DialogHeader>
              <DialogTitle className="text-xl font-extrabold text-white">
                ⚖️ Ethics &amp; Policy
              </DialogTitle>
            </DialogHeader>
          </div>
          <div className="p-6 space-y-5">
            {[
              {
                title: "🧑‍🏫 Student Code of Conduct",
                content:
                  "Code & Crush is a respectful, inclusive learning environment. We expect all students to engage with the platform honestly, use AI assistance to support learning (not replace it), and treat all system interactions with integrity.",
              },
              {
                title: "🤖 AI Usage Policy",
                content:
                  "Our AI companions are designed to assist learning, not complete assignments. All AI responses are generated to educate and encourage. We encourage students to verify AI responses against authoritative sources.",
              },
              {
                title: "🔒 Data Usage Policy",
                content:
                  "We store only the minimum data necessary: your username, email, learning progress, and conversation history. We do not sell your data to third parties. Your API keys are stored locally in your browser and never sent to our servers.",
              },
              {
                title: "❤️ Ethics Statement",
                content:
                  "Code & Crush is committed to equitable education. We believe emotional support and gamification should empower students of all backgrounds. Our companion personalities are designed to be inclusive, culturally respectful, and free from harmful stereotypes.",
              },
              {
                title: "📝 Privacy Policy",
                content:
                  "Your conversation data is used solely to improve your personal experience. You can delete all your data at any time by clearing your local storage. We comply with applicable data protection regulations including GDPR principles.",
              },
            ].map((section) => (
              <div
                key={section.title}
                className="bg-card rounded-2xl border border-border p-4"
              >
                <h3 className="font-bold text-foreground mb-2">
                  {section.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/assets/generated/code-crush-logo-refined-transparent.dim_400x400.png"
              alt="Code & Crush"
              className="w-9 h-9 rounded-full object-cover drop-shadow-md"
            />
            <span className="font-extrabold text-lg text-foreground">
              Code &amp; Crush
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              data-ocid="nav.get_started.button"
              onClick={() => setPage("onboarding")}
              className="rounded-full bg-primary text-primary-foreground font-semibold px-5"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden pt-16 hero-gradient"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, oklch(0.6 0.2 265 / 0.6) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-1.5 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary">
                  AI-Powered Study Companion
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
                Study Better, <span className="text-primary">Feel Better</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Code &amp; Crush gives you a kawaii AI companion who teaches CS,
                supports you emotionally, and makes every study session feel
                like an adventure.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  data-ocid="hero.get_started.button"
                  onClick={() => setPage("onboarding")}
                  size="lg"
                  className="rounded-full bg-primary text-primary-foreground font-bold px-8 shadow-glow"
                >
                  Start for Free 🚀
                </Button>
                <Button
                  data-ocid="hero.view_demo.button"
                  variant="outline"
                  size="lg"
                  onClick={() => setPage("onboarding")}
                  className="rounded-full border-border text-foreground font-semibold px-8"
                >
                  View Demo
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8">
                {[
                  { label: "Students", value: "12,000+" },
                  { label: "Companions", value: "7" },
                  { label: "Problems", value: "50+" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-extrabold text-primary">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Companion Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-3 gap-3"
            >
              {companions.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-3 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => setPage("onboarding")}
                >
                  <div
                    className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 ring-2"
                    style={{ outline: `2px solid ${c.color}` }}
                  >
                    <img
                      src={c.img}
                      alt={c.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-bold text-xs text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {c.traits.split(" · ")[0]}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-20 px-6 bg-card border-y border-border"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              Features
            </span>
            <h2 className="text-4xl font-extrabold text-foreground mt-2">
              Everything You Need to Succeed
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.08 }}
                className="bg-background rounded-2xl p-6 border border-border hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-muted flex items-center justify-center ${feat.color} shrink-0`}
                  >
                    <feat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl">{feat.emoji}</span>
                </div>
                <h3 className="font-bold text-foreground mb-2">{feat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems Preview */}
      <section id="companions" className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              Problems
            </span>
            <h2 className="text-4xl font-extrabold text-foreground mt-2">
              Code Studio 💻
            </h2>
            <p className="text-muted-foreground mt-3">
              Real coding challenges with your companion by your side
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {CODING_PROBLEMS.slice(0, 6).map((problem, i) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-card rounded-2xl p-5 border border-border hover:border-primary/40 transition-colors cursor-pointer"
                onClick={() => {
                  setCurrentProblemId(problem.id);
                  setPage("problems");
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background:
                        problem.difficulty === "Easy"
                          ? "oklch(0.35 0.1 160)"
                          : problem.difficulty === "Medium"
                            ? "oklch(0.35 0.1 50)"
                            : "oklch(0.35 0.1 27)",
                      color:
                        problem.difficulty === "Easy"
                          ? "oklch(0.75 0.15 160)"
                          : problem.difficulty === "Medium"
                            ? "oklch(0.75 0.15 50)"
                            : "oklch(0.75 0.15 27)",
                    }}
                  >
                    {problem.difficulty}
                  </span>
                  <Code className="w-4 h-4 text-muted-foreground" />
                </div>
                <h3 className="font-bold text-foreground text-sm mb-1">
                  {problem.title}
                </h3>
                <p className="text-xs text-muted-foreground">{problem.topic}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Button
              data-ocid="problems.view_all.button"
              onClick={() => setPage("onboarding")}
              className="rounded-full bg-primary text-primary-foreground font-semibold px-8"
            >
              Start Solving →
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="study" className="py-20 px-6 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              How It Works
            </span>
            <h2 className="text-4xl font-extrabold text-foreground mt-2">
              Start Your Journey in 4 Steps 🚀
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-background rounded-2xl p-6 border border-border text-center relative"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-extrabold shadow-glow">
                  {step.step}
                </div>
                <div className="text-4xl mt-4 mb-3">{step.icon}</div>
                <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Form */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              Reviews
            </span>
            <h2 className="text-4xl font-extrabold text-foreground mt-2">
              Share Your Experience 💬
            </h2>
            <p className="text-muted-foreground mt-3">
              Tell us how Code &amp; Crush helped you study ⭐
            </p>
          </motion.div>

          {/* Review Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-3xl border border-border p-8 mb-10 shadow-card"
          >
            <ReviewForm />
          </motion.div>

          {/* Saved Reviews */}
          <SavedReviews />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-primary" />
                </div>
                <span className="font-bold text-lg text-foreground">
                  Code &amp; Crush
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Code &amp; Crush is not just helping students study better —
                it&apos;s helping them feel better while studying.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {(
                  [
                    { label: "Home", href: "#home" },
                    { label: "Features", href: "#features" },
                    { label: "Companions", href: "#companions" },
                    { label: "Study", href: "#study" },
                  ] as const
                ).map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-primary transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById(link.href.slice(1))
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button
                    type="button"
                    onClick={() => setAboutOpen(true)}
                    className="hover:text-primary transition-colors text-left"
                    data-ocid="footer.about_us.button"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setContactOpen(true)}
                    className="hover:text-primary transition-colors text-left"
                    data-ocid="footer.contact.button"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setEthicsOpen(true)}
                    className="hover:text-primary transition-colors text-left"
                    data-ocid="footer.ethics.button"
                  >
                    Ethics &amp; Policy
                  </button>
                </li>
                <li>
                  <a href="/#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> hello@codeandcrush.ai
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" /> Discord Community
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" /> @CodeAndCrush
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">
                &copy; {new Date().getFullYear()} Code &amp; Crush. All rights
                reserved.
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground flex-wrap">
                <a href="/#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
                <span>|</span>
                <a href="/#" className="hover:text-primary transition-colors">
                  Terms of Service
                </a>
                <span>|</span>
                <button
                  type="button"
                  onClick={() => setEthicsOpen(true)}
                  className="hover:text-primary transition-colors"
                >
                  Ethics &amp; Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
