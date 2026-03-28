import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Brain,
  Code,
  Heart,
  Mail,
  MapPin,
  Phone,
  Shield,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
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

const REVIEWS = [
  {
    name: "Priya Sharma",
    uni: "IIT Delhi",
    stars: 5,
    text: "I used to dread DSA but Code & Crush makes it genuinely fun! My companion explains recursion better than any YouTube video!",
  },
  {
    name: "Arjun Mehta",
    uni: "BITS Pilani",
    stars: 5,
    text: "The XP system is addictive. I've been on a 14-day streak and my CGPA went from 7.2 to 8.4. The quiz mode is insane!",
  },
  {
    name: "Aisha Nwosu",
    uni: "University of Lagos",
    stars: 4,
    text: "Finally an app that gets that burnout is real. When I was frustrated at 2am, my companion switched to full support mode.",
  },
  {
    name: "Kevin Liu",
    uni: "NUS Singapore",
    stars: 5,
    text: "Love Call is such a unique feature. Hearing my companion explain hash maps while I'm studying? Peak productivity ngl.",
  },
  {
    name: "Sofia Torres",
    uni: "Universidad Autónoma",
    stars: 5,
    text: "The Code Studio is actually LeetCode but make it beautiful. I solved Binary Search in one sitting. Game changer!",
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
    img: "/assets/generated/companion-luna.dim_200x200.png",
    color: "#8C84D8",
  },
];

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
      title: "AI Companion",
      desc: "A personalized virtual study partner who adapts to your mood and learning style.",
      color: "text-pink-400",
    },
    {
      icon: Brain,
      title: "Smart Learning",
      desc: "AI-powered explanations for CS concepts, tailored quizzes, and instant feedback.",
      color: "text-blue-400",
    },
    {
      icon: Trophy,
      title: "Gamified XP",
      desc: "Earn XP, level up, unlock badges, and maintain streaks to stay motivated.",
      color: "text-yellow-400",
    },
    {
      icon: Shield,
      title: "Burnout Guard",
      desc: "Smart frustration detection that adapts your companion's tone to support you.",
      color: "text-green-400",
    },
  ];

  return (
    <div className="min-h-screen bg-background font-jakarta">
      {/* About Us Modal */}
      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent className="max-w-lg rounded-3xl p-0 overflow-hidden bg-white">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white text-center">
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
            <div className="grid grid-cols-1 gap-4 mt-4">
              {TEAM.map((member) => (
                <div
                  key={member.name}
                  className="rounded-2xl border border-blue-100 p-4 flex items-center gap-4 bg-blue-50"
                >
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-2xl shrink-0`}
                  >
                    {member.emoji}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-blue-900">
                      {member.name}
                    </h3>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${member.badge}`}
                    >
                      {member.role}
                    </span>
                    <p className="text-xs text-blue-700 leading-relaxed mt-1">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary" />
            </div>
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
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16 hero-gradient">
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
      <section className="py-20 px-6 bg-card border-y border-border">
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background rounded-2xl p-6 border border-border"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-4 ${feat.color}`}
                >
                  <feat.icon className="w-6 h-6" />
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
      <section className="py-20 px-6 bg-background">
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
      <section className="py-20 px-6 bg-card border-y border-border">
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

      {/* Student Reviews */}
      <section className="py-20 px-6 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              Reviews
            </span>
            <h2 className="text-4xl font-extrabold text-foreground mt-2">
              What Students Say 💬
            </h2>
          </motion.div>
          <div
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory -mx-2 px-2"
            style={{ scrollbarWidth: "thin" }}
          >
            {REVIEWS.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-card shrink-0 w-72 snap-start"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">
                      {review.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {review.uni}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: review.stars }).map((_, si) => (
                    <Star
                      key={`f-${review.name}-${si}`}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  {Array.from({ length: 5 - review.stars }).map((_, si) => (
                    <Star
                      key={`e-${review.name}-${si}`}
                      className="w-4 h-4 text-muted-foreground"
                    />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-6 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              Case Studies
            </span>
            <h2 className="text-4xl font-extrabold text-foreground mt-2">
              Real Students, Real Results 📊
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              See how Code &amp; Crush transformed learning for students across
              India and beyond.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Priya S.",
                college: "IIT Delhi",
                emoji: "👩‍💻",
                color: "from-pink-500/20 to-purple-500/20",
                tag: "DSA Mastery",
                tagColor: "bg-pink-500/20 text-pink-300",
                before:
                  "Failed DSA interviews 3 times. Struggled with trees and graphs.",
                after:
                  "Cleared Amazon SDE-1 after 8 weeks of daily sessions on Code & Crush.",
                stat: "8 weeks",
                statLabel: "to interview-ready",
              },
              {
                name: "Arjun K.",
                college: "VIT Vellore",
                emoji: "🧑‍💻",
                color: "from-blue-500/20 to-cyan-500/20",
                tag: "Consistency",
                tagColor: "bg-blue-500/20 text-blue-300",
                before:
                  "Studied inconsistently, skipped revision, burned out by exam season.",
                after:
                  "Maintained a 45-day streak. Scored 92% in his DS university exam.",
                stat: "45 days",
                statLabel: "unbroken streak",
              },
              {
                name: "Riya M.",
                college: "BITS Pilani",
                emoji: "👩‍🎓",
                color: "from-green-500/20 to-emerald-500/20",
                tag: "Hackathon Win",
                tagColor: "bg-green-500/20 text-green-300",
                before:
                  "Overwhelmed by algorithms, avoided competitive coding altogether.",
                after:
                  "Won 2nd place at HackNITR after practicing with the companion daily.",
                stat: "2nd place",
                statLabel: "HackNITR 2026",
              },
            ].map((cs, i) => (
              <motion.div
                key={cs.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`bg-gradient-to-br ${cs.color} rounded-2xl p-6 border border-border`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{cs.emoji}</div>
                  <div>
                    <p className="font-bold text-foreground">{cs.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {cs.college}
                    </p>
                  </div>
                  <span
                    className={`ml-auto text-xs px-2.5 py-1 rounded-full font-semibold ${cs.tagColor}`}
                  >
                    {cs.tag}
                  </span>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="bg-background/60 rounded-xl p-3">
                    <p className="text-xs font-bold text-muted-foreground uppercase mb-1">
                      Before
                    </p>
                    <p className="text-sm text-foreground">{cs.before}</p>
                  </div>
                  <div className="bg-primary/10 rounded-xl p-3 border border-primary/20">
                    <p className="text-xs font-bold text-primary uppercase mb-1">
                      After
                    </p>
                    <p className="text-sm text-foreground">{cs.after}</p>
                  </div>
                </div>
                <div className="text-center pt-2 border-t border-border/50">
                  <p className="text-2xl font-extrabold text-primary">
                    {cs.stat}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {cs.statLabel}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
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
                {["Home", "Features", "Companions", "Study"].map((l) => (
                  <li key={l}>
                    <a
                      href="/#"
                      className="hover:text-primary transition-colors"
                    >
                      {l}
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
              <p className="text-xs text-muted-foreground mt-3">
                Built with ❤️ using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
