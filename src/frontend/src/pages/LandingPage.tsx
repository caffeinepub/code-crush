import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  ChevronDown,
  ChevronUp,
  Code,
  FileText,
  Heart,
  Play,
  Shield,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { CODING_PROBLEMS } from "../data/problems";

const FloatingHeart = ({ style }: { style: React.CSSProperties }) => (
  <div
    className="absolute text-pink-crush pointer-events-none select-none"
    style={{ fontSize: "1.2rem", opacity: 0.6, ...style }}
  >
    ♥
  </div>
);

const TEAM = [
  {
    name: "Kripanshu",
    role: "Founder & CEO",
    emoji: "👑",
    color: "from-purple-500 to-indigo-500",
    badge: "bg-purple-100 text-purple-700",
    bio: "Visionary entrepreneur and CS enthusiast who founded Code & Crush to make learning joyful. Kripanshu blends product thinking with a deep love for education technology.",
  },
  {
    name: "Mayank",
    role: "CTO & Co-Founder",
    emoji: "⚡",
    color: "from-pink-500 to-rose-500",
    badge: "bg-pink-100 text-pink-700",
    bio: "Full-stack engineer and AI architect behind the Code & Crush platform. Mayank leads technical innovation, crafting the AI systems that power every companion interaction.",
  },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    icon: "💖",
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
    text: "I used to dread DSA but Code & Crush makes it genuinely fun! My companion Sakura explains recursion better than any YouTube video 😭💖",
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
    text: "Finally an app that gets that burnout is real. When I was frustrated at 2am, my companion switched to full support mode. That meant so much.",
  },
  {
    name: "Kevin Liu",
    uni: "NUS Singapore",
    stars: 5,
    text: "Love Call is such a unique feature. Hearing my companion explain hash maps while I'm in the gym? Peak productivity ngl 🎧",
  },
  {
    name: "Sofia Torres",
    uni: "Universidad Autónoma",
    stars: 5,
    text: "The Code Studio is actually LeetCode but make it kawaii. I solved Binary Search in one sitting with Zen. Game changer for internship prep!",
  },
];

const MODULE_RESOURCES: Record<string, { pdfs: string[]; videos: string[] }> = {
  "Python Basics": {
    pdfs: [
      "Python Fundamentals Cheatsheet",
      "OOP Concepts in Python",
      "Python Interview Q&A",
    ],
    videos: ["Intro to Python & Variables", "Functions & Loops Masterclass"],
  },
  "HTML & CSS": {
    pdfs: [
      "HTML5 Complete Reference",
      "CSS Flexbox & Grid Guide",
      "Responsive Design Checklist",
    ],
    videos: ["Build Your First Webpage", "Advanced CSS Animations"],
  },
  "Data Structures": {
    pdfs: [
      "Arrays, Stacks & Queues",
      "Trees & Graph Theory",
      "Big-O Complexity Guide",
    ],
    videos: ["Linked Lists Explained", "Binary Search Trees Deep Dive"],
  },
};

export default function LandingPage() {
  const { setPage, setCurrentProblemId } = useApp();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

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
      color: "text-purple-400",
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

  const companions = [
    {
      name: "Sakura",
      traits: "Warm · Encouraging · Supportive",
      color: "from-pink-100 to-rose-100",
      accent: "#F06A9B",
      img: "/assets/generated/companion-sakura.dim_200x200.png",
    },
    {
      name: "Nova",
      traits: "Sharp · Witty · Clever",
      color: "from-purple-100 to-violet-100",
      accent: "#8C84D8",
      img: "/assets/generated/companion-nova.dim_200x200.png",
    },
    {
      name: "Zen",
      traits: "Calm · Focused · Patient",
      color: "from-green-100 to-teal-100",
      accent: "#4BAF8C",
      img: "/assets/generated/companion-zen.dim_200x200.png",
    },
  ];

  const studyModules = [
    { title: "Python Basics", icon: "🐍", level: "Beginner", progress: 68 },
    { title: "HTML & CSS", icon: "🌐", level: "Intermediate", progress: 45 },
    { title: "Data Structures", icon: "🗄️", level: "Advanced", progress: 23 },
  ];

  return (
    <div className="min-h-screen bg-white font-poppins">
      {/* About Us Modal */}
      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent className="max-w-lg rounded-3xl p-0 overflow-hidden">
          <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-6 text-white text-center">
            <DialogHeader>
              <DialogTitle className="text-2xl font-extrabold text-white">
                About Code &amp; Crush 💖
              </DialogTitle>
            </DialogHeader>
            <p className="text-white/80 mt-2 text-sm">
              Study Better. Feel Better. Together.
            </p>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              Code &amp; Crush is an AI-powered Virtual StudyDate Companion that
              makes learning CS interactive, emotional, and less isolating. We
              believe every student deserves support — academic and emotional.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {TEAM.map((member) => (
                <div
                  key={member.name}
                  className="rounded-2xl border border-border p-4 text-center space-y-2 shadow-sm"
                >
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center mx-auto text-2xl`}
                  >
                    {member.emoji}
                  </div>
                  <h3 className="font-extrabold text-foreground">
                    {member.name}
                  </h3>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${member.badge}`}
                  >
                    {member.role}
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-bold text-lg text-foreground">
              Code &amp; Crush
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Home", "Features", "Companions", "Study"].map((link) => (
              <a
                key={link}
                href="/#"
                data-ocid={`nav.${link.toLowerCase()}.link`}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <Button
            data-ocid="nav.start_now.button"
            onClick={() => setPage("onboarding")}
            className="rounded-full px-6 bg-primary text-primary-foreground hover:opacity-90 font-semibold shadow-glow"
          >
            Start Now ✨
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient pt-24 pb-16 px-6 relative overflow-hidden min-h-screen flex items-center">
        <FloatingHeart
          style={{
            top: "15%",
            left: "8%",
            fontSize: "2rem",
            animation: "float-gentle 3s ease-in-out infinite",
          }}
        />
        <FloatingHeart
          style={{
            top: "30%",
            left: "15%",
            fontSize: "1rem",
            animation: "float-gentle 4s 1s ease-in-out infinite",
          }}
        />
        <FloatingHeart
          style={{
            top: "20%",
            right: "12%",
            fontSize: "1.5rem",
            animation: "float-gentle 3.5s 0.5s ease-in-out infinite",
          }}
        />
        <FloatingHeart
          style={{
            top: "60%",
            right: "8%",
            fontSize: "1rem",
            animation: "float-gentle 5s 2s ease-in-out infinite",
          }}
        />
        <FloatingHeart
          style={{
            bottom: "20%",
            left: "20%",
            fontSize: "2.5rem",
            animation: "float-gentle 4s 1.5s ease-in-out infinite",
          }}
        />
        <div className="absolute left-2 top-1/3 text-[10px] font-mono text-pink-300/40 select-none leading-4 hidden lg:block">
          {[
            "01001000",
            "01101001",
            "00100001",
            "10110100",
            "01100011",
            "01111000",
          ].map((b) => (
            <div key={b}>{b}</div>
          ))}
        </div>
        <div className="absolute right-2 top-1/3 text-[10px] font-mono text-blue-300/40 select-none leading-4 hidden lg:block">
          {[
            "11001010",
            "00110101",
            "10101010",
            "01010101",
            "11100010",
            "00010111",
          ].map((b) => (
            <div key={b}>{b}</div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-primary border border-pink-200">
              <Sparkles className="w-4 h-4" /> AI-Powered Study Companion
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-foreground leading-tight">
              Study Better.
              <br />
              <span className="text-primary">Feel Better.</span>
              <br />
              Together. 💕
            </h1>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Meet your personalized virtual study date who makes learning CS
              not just effective, but genuinely <em>enjoyable</em>. Powered by
              AI, driven by heart.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                data-ocid="hero.start_study_date.button"
                onClick={() => setPage("onboarding")}
                size="lg"
                className="rounded-full px-8 bg-primary text-primary-foreground font-bold text-base shadow-glow hover:opacity-90 transition-all"
              >
                Start Your Study Date 💖
              </Button>
              <Button
                data-ocid="hero.meet_companion.button"
                onClick={() => setPage("onboarding")}
                size="lg"
                variant="outline"
                className="rounded-full px-8 font-bold text-base border-2"
                style={{ borderColor: "#8C84D8", color: "#8C84D8" }}
              >
                Meet Your Companion
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-2">
              <div className="text-center">
                <p className="font-bold text-2xl text-foreground">10K+</p>
                <p className="text-xs text-muted-foreground">Happy Students</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="font-bold text-2xl text-foreground">50K+</p>
                <p className="text-xs text-muted-foreground">
                  Sessions Completed
                </p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="font-bold text-2xl text-foreground">98%</p>
                <p className="text-xs text-muted-foreground">
                  Burnout Reduction
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center items-center relative"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-white/40 blur-3xl scale-110" />
              <img
                src="/assets/generated/hero-companion.dim_600x600-transparent.png"
                alt="Study companion at desk"
                className="relative z-10 w-[420px] h-[420px] object-contain float-gentle drop-shadow-xl"
              />
              {[
                { top: "5%", left: "10%", size: "2rem", id: "tl" },
                { top: "20%", right: "5%", size: "1.5rem", id: "tr" },
                { bottom: "15%", right: "10%", size: "2.5rem", id: "br" },
                { bottom: "10%", left: "15%", size: "1rem", id: "bl" },
              ].map((pos, i) => (
                <div
                  key={pos.id}
                  className="absolute text-primary"
                  style={{
                    ...pos,
                    fontSize: pos.size,
                    animation: `float-gentle ${3 + i * 0.5}s ${i * 0.7}s ease-in-out infinite`,
                  }}
                >
                  ♥
                </div>
              ))}
              <div className="absolute -bottom-4 -left-8 bg-white rounded-2xl p-3 shadow-card text-xs font-mono text-primary border border-border">
                <div className="text-muted-foreground">
                  def study_with_me():
                </div>
                <div className="pl-3 text-green-500">
                  return happiness + knowledge
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-20 px-6 bg-white relative overflow-hidden"
        id="features"
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
              Explore the Code &amp; Crush Universe ✨
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Everything you need to transform your CS journey from lonely grind
              to joyful adventure.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-border shadow-card card-hover"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-4 ${f.color}`}
                >
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Studio / Problems Section */}
      <section className="py-20 px-6 bg-white" id="problems">
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
              💻 Code Studio
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Practice real coding problems with your companion by your side.
              Earn XP and level up your skills!
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {CODING_PROBLEMS.slice(0, 8).map((problem, i) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${problem.difficulty === "Easy" ? "bg-green-100 text-green-700 border-green-200" : problem.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700 border-yellow-200" : "bg-red-100 text-red-700 border-red-200"}`}
                  >
                    {problem.difficulty}
                  </span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {problem.topic}
                  </span>
                </div>
                <h3 className="font-bold text-primary text-sm mb-1.5">
                  {problem.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                  {problem.desc}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {problem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-primary/60 bg-primary/5 px-1.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button
                  onClick={() => {
                    setCurrentProblemId(problem.id);
                    setPage("problems");
                  }}
                  className="w-full rounded-xl bg-primary text-primary-foreground font-semibold text-xs h-8"
                >
                  Start →
                </Button>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Button
              onClick={() => {
                setCurrentProblemId(null);
                setPage("problems");
              }}
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-2 border-primary text-primary font-bold"
            >
              View All Problems 💻
            </Button>
          </div>
        </div>
      </section>

      {/* Meet Companions Section */}
      <section className="py-20 px-6 bg-muted" id="companions">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-extrabold text-foreground">
              Meet Companions 💫
            </h2>
            <p className="text-muted-foreground mt-3">
              Choose a companion who matches your vibe, or let them surprise
              you!
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {companions.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white rounded-3xl overflow-hidden shadow-card card-hover"
              >
                <div
                  className={`h-52 bg-gradient-to-br ${c.color} flex items-end justify-center pb-0 relative`}
                >
                  <img
                    src={c.img}
                    alt={c.name}
                    className="h-52 w-full object-cover object-top"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-xl text-foreground">
                    {c.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">
                    {c.traits}
                  </p>
                  <Button
                    data-ocid={`companion.${c.name.toLowerCase()}.button`}
                    onClick={() => setPage("onboarding")}
                    className="rounded-full w-full font-semibold"
                    style={{ background: c.accent, color: "white" }}
                  >
                    Chat Now 💕
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Modules Section */}
      <section className="py-20 px-6 bg-white" id="study">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-extrabold text-foreground">
              Study Modules 📚
            </h2>
            <p className="text-muted-foreground mt-3">
              Track your progress across all CS topics with your companion by
              your side.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {studyModules.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-border shadow-card card-hover"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl">{m.icon}</span>
                  <div>
                    <h3 className="font-bold text-foreground">{m.title}</h3>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {m.level}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold text-primary">
                      {m.progress}%
                    </span>
                  </div>
                  <Progress value={m.progress} className="h-2 rounded-full" />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setExpandedModule(
                      expandedModule === m.title ? null : m.title,
                    )
                  }
                  className="w-full flex items-center justify-between text-xs font-semibold text-primary mt-2 py-1 hover:opacity-80 transition-opacity"
                  data-ocid={`module.${m.title.toLowerCase().replace(/[^a-z0-9]/g, "_")}.toggle`}
                >
                  <span>
                    {expandedModule === m.title
                      ? "Hide Resources"
                      : "Show Resources"}
                  </span>
                  {expandedModule === m.title ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedModule === m.title && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          📄 PDF Resources
                        </p>
                        {MODULE_RESOURCES[m.title]?.pdfs.map((pdf) => (
                          <button
                            key={pdf}
                            type="button"
                            className="flex items-center gap-2 text-xs text-primary hover:underline py-1"
                          >
                            <FileText className="w-3.5 h-3.5 shrink-0" />
                            {pdf}
                          </button>
                        ))}
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mt-3">
                          🎬 Video Lessons
                        </p>
                        {MODULE_RESOURCES[m.title]?.videos.map((video) => (
                          <div
                            key={video}
                            className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2 cursor-pointer hover:bg-primary/10 transition-colors"
                          >
                            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                              <Play className="w-3 h-3 text-primary fill-primary" />
                            </div>
                            <span className="text-xs font-medium text-foreground">
                              {video}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              data-ocid="landing.start_learning.button"
              onClick={() => setPage("onboarding")}
              size="lg"
              className="rounded-full px-10 bg-primary text-primary-foreground font-bold text-base shadow-glow"
            >
              Start Learning with Your Companion 💕
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-pink-50 to-purple-50">
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
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              From zero to hero — here's how Code &amp; Crush transforms your CS
              study experience.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-white rounded-2xl p-6 border border-border shadow-card text-center relative"
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

      {/* Student Reviews Section */}
      <section className="py-20 px-6 bg-white overflow-hidden">
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
            <p className="text-muted-foreground mt-3">
              Real stories from real students who leveled up with Code &amp;
              Crush.
            </p>
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
                className="bg-white rounded-2xl p-6 border border-border shadow-card shrink-0 w-72 snap-start"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
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
                      key={`filled-${review.name}-${si}`}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  {Array.from({ length: 5 - review.stars }).map((_, si) => (
                    <Star
                      key={`empty-${review.name}-${si}`}
                      className="w-4 h-4 text-gray-200"
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

      {/* Footer */}
      <footer className="bg-muted border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white fill-white" />
                </div>
                <span className="font-bold text-lg">Code &amp; Crush</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Code &amp; Crush is not just helping students study better —
                it&apos;s helping them feel better while studying.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
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
              <h4 className="font-semibold mb-3">Company</h4>
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
                  <a href="/#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/#" className="hover:text-primary transition-colors">
                    Terms &amp; Ethics
                  </a>
                </li>
                <li>
                  <a href="/#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✉️ hello@codeandcrush.ai</li>
                <li>💬 Discord Community</li>
                <li>🐦 @CodeAndCrush</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Code &amp; Crush. Built with ❤️ using{" "}
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
      </footer>
    </div>
  );
}
