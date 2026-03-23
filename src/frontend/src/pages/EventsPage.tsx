import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type EventCategory = "All" | "Hackathon" | "Fest" | "Contest" | "Program";

const EVENTS = [
  {
    id: 1,
    name: "HackIndia 2026",
    date: "Apr 15, 2026",
    location: "New Delhi, India",
    category: "Hackathon" as EventCategory,
    description:
      "India's largest hackathon series. Build innovative solutions for real-world problems with 10,000+ participants across the nation.",
    prize: "\u20B910 Lakhs",
    link: "https://hackindia.xyz",
    hot: true,
  },
  {
    id: 2,
    name: "Smart India Hackathon 2026",
    date: "May 1 – Jun 30, 2026",
    location: "Nationwide (Online + Offline)",
    category: "Hackathon" as EventCategory,
    description:
      "Government of India's premier hackathon initiative. Students solve pressing national problems across verticals.",
    prize: "\u20B91 Lakh per team",
    link: "https://sih.gov.in",
    hot: true,
  },
  {
    id: 3,
    name: "Google Summer of Code 2026",
    date: "Apr 20 – Aug 30, 2026",
    location: "Online (Global)",
    category: "Program" as EventCategory,
    description:
      "Contribute to open source projects under Google's mentorship. One of the most prestigious student developer programs.",
    prize: "$1,500 – $6,600 stipend",
    link: "https://summerofcode.withgoogle.com",
    hot: true,
  },
  {
    id: 4,
    name: "CodeChef Starters",
    date: "Every Wednesday",
    location: "Online",
    category: "Contest" as EventCategory,
    description:
      "Weekly competitive programming contest on CodeChef. Rated contest with all difficulty levels — great for practice.",
    prize: "Ratings & Prizes",
    link: "https://codechef.com/contests",
    hot: false,
  },
  {
    id: 5,
    name: "TechFest IIT Bombay 2026",
    date: "Oct 2 – 4, 2026",
    location: "IIT Bombay, Mumbai",
    category: "Fest" as EventCategory,
    description:
      "Asia's largest science and technology festival. Events include robotics, AI challenges, coding contests, and more.",
    prize: "\u20B950 Lakhs+ prize pool",
    link: "https://techfest.org",
    hot: false,
  },
  {
    id: 6,
    name: "Pragma 2026",
    date: "Aug 12 – 13, 2026",
    location: "VJTI, Mumbai",
    category: "Fest" as EventCategory,
    description:
      "VJTI Mumbai's annual technical festival featuring hackathons, competitive coding, workshops, and project competitions.",
    prize: "\u20B920 Lakhs+",
    link: "#",
    hot: false,
  },
  {
    id: 7,
    name: "Flipkart Grid 7.0",
    date: "Jun 10, 2026",
    location: "Online + Bengaluru Finals",
    category: "Hackathon" as EventCategory,
    description:
      "Flipkart's flagship engineering challenge. Solve real-world e-commerce problems with data, AI, and product thinking.",
    prize: "\u20B92 Lakhs + PPO opportunities",
    link: "#",
    hot: false,
  },
  {
    id: 8,
    name: "Microsoft Imagine Cup 2026",
    date: "Mar 30, 2026",
    location: "Online (Global)",
    category: "Program" as EventCategory,
    description:
      "Microsoft's global student technology competition. Build impactful AI solutions for the world's biggest challenges.",
    prize: "$75,000 grand prize",
    link: "https://imaginecup.microsoft.com",
    hot: true,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Hackathon: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Fest: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Contest: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Program: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<EventCategory>("All");

  const filtered =
    activeFilter === "All"
      ? EVENTS
      : EVENTS.filter((e) => e.category === activeFilter);

  const categories: EventCategory[] = [
    "All",
    "Hackathon",
    "Fest",
    "Contest",
    "Program",
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <h2 className="text-xl font-extrabold text-foreground">
          🎤 Events &amp; Opportunities
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Upcoming hackathons, fests &amp; competitions
        </p>
      </div>

      {/* Filters */}
      <div className="px-4 pb-4 flex gap-2 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            data-ocid={`events.filter_${cat.toLowerCase()}.tab`}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
              activeFilter === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted text-muted-foreground border-border hover:border-primary/40"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="px-4 pb-24 space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((event, i) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              data-ocid={`events.item.${i + 1}`}
              className="bg-card border border-border rounded-2xl p-4 relative overflow-hidden"
            >
              {event.hot && (
                <div className="absolute top-3 right-3">
                  <span className="text-xs bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.5 rounded-full font-semibold">
                    🔥 Hot
                  </span>
                </div>
              )}

              <div className="flex items-start gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-foreground text-sm">
                      {event.name}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-medium ${CATEGORY_COLORS[event.category]}`}
                    >
                      {event.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {event.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {event.location}
                </span>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                {event.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-primary">
                  🏆 {event.prize}
                </span>
                <Button
                  size="sm"
                  data-ocid={`events.register.button.${i + 1}`}
                  className="h-7 text-xs rounded-full bg-primary text-primary-foreground px-3"
                  onClick={() => {
                    if (event.link !== "#") window.open(event.link, "_blank");
                  }}
                >
                  {event.link !== "#" ? (
                    <>
                      <ExternalLink className="w-3 h-3 mr-1" /> Register
                    </>
                  ) : (
                    "Coming Soon"
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16" data-ocid="events.empty_state">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-muted-foreground">
              No events in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
