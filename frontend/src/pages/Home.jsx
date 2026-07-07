import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, MapPin, Zap, BookmarkCheck, ArrowRight, Plane } from "lucide-react";
import { getDestinations } from "../api/destinations";
import { useReveal } from "../hooks/useReveal";
import AnimatedCounter from "../components/AnimatedCounter";

const HERO_BG = "https://images.unsplash.com/photo-1548013146-72479768bada";
const STACK_IMAGES = [
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
  "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
];

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI-Personalized",
    text: "Tell us your interests and budget — get a tailored itinerary in seconds.",
  },
  {
    icon: MapPin,
    title: "Real Destinations",
    text: "Every place is pulled from a live, curated destination list.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    text: "Powered by fast AI inference — itineraries return in seconds, not minutes.",
  },
  {
    icon: BookmarkCheck,
    title: "Save & Revisit",
    text: "Keep every itinerary you generate, organized in one place.",
  },
];

// Bespoke asymmetric placement mirroring an editorial masonry layout, for exactly 6 destinations.
const GRID_POSITIONS = [
  "lg:col-start-1 lg:row-start-1 lg:row-span-2",
  "lg:col-start-2 lg:row-start-1",
  "lg:col-start-2 lg:row-start-2",
  "lg:col-start-3 lg:row-start-1 lg:row-span-2",
  "lg:col-start-4 lg:row-start-1",
  "lg:col-start-4 lg:row-start-2",
];

function Section({ children, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <section
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </section>
  );
}

function Home() {
  const [destinations, setDestinations] = useState([]);
  const [days, setDays] = useState("3");
  const [budget, setBudget] = useState("medium");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations();
        setDestinations(data);
      } catch {
        setDestinations([]);
      }
    };
    fetchDestinations();
  }, []);

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 20;
    const y = (e.clientY / innerHeight - 0.5) * 20;
    setMouse({ x, y });
  };

  return (
    <div>
      {/* HERO */}
      <section
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden pb-28"
      >
        {/* Background photo + tint */}
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-cream" />
        </div>

        {/* Aurora glow blobs */}
        <div className="absolute -top-20 -left-10 w-72 h-72 bg-primary/40 rounded-full blur-3xl animate-aurora" />
        <div className="absolute top-10 right-0 w-80 h-80 bg-secondary/30 rounded-full blur-3xl animate-aurora" style={{ animationDelay: "2s" }} />

        {/* Floating light particles */}
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1.5 h-1.5 bg-secondary/70 rounded-full animate-particle"
            style={{
              left: `${10 + i * 11}%`,
              bottom: "20%",
              animationDelay: `${i * 0.9}s`,
            }}
          />
        ))}

        {/* Floating plane icon */}
        <Plane
          size={28}
          className="absolute top-24 right-[15%] text-cream/50 rotate-45 animate-float-slower hidden md:block"
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-secondary bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/10">
                <Sparkles size={14} /> AI-Powered Travel Planning
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-semibold uppercase leading-[1.05] text-white mb-6 tracking-tight">
                Explore the world<br />
                <span className="text-secondary">with AI</span>
              </h1>
              <p className="text-white/70 text-lg mb-8 max-w-md">
                Personalized, day-by-day itineraries generated in seconds —
                from curated destinations to a plan that's actually yours.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/planner"
                  className="inline-flex items-center gap-2 bg-secondary text-white font-medium px-7 py-3 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-secondary/30"
                >
                  Start Planning <ArrowRight size={18} />
                </Link>
                <Link
                  to="/explore"
                  className="inline-flex items-center gap-2 border border-white/30 text-white font-medium px-7 py-3 rounded-full hover:bg-white/10 backdrop-blur-sm transition-colors"
                >
                  Explore Destinations
                </Link>
              </div>
            </div>

            {/* Staggered photo stack with mouse parallax */}
            <div className="relative h-96 hidden md:block">
              {STACK_IMAGES.map((src, i) => {
                const layout = [
                  { w: "w-48", h: "h-64", top: "top-2", left: "left-4", factor: 0.6 },
                  { w: "w-44", h: "h-56", top: "top-24", left: "left-48", factor: 1 },
                  { w: "w-40", h: "h-72", top: "top-0", left: "left-80", factor: 1.4 },
                ][i];
                return (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className={`absolute ${layout.w} ${layout.h} ${layout.top} ${layout.left} rounded-2xl object-cover shadow-2xl transition-transform duration-300 ease-out animate-float-slow`}
                    style={{
                      transform: `translate(${mouse.x * layout.factor}px, ${mouse.y * layout.factor}px)`,
                      animationDelay: `${i * 0.6}s`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* FLOATING GLASS QUICK-PLAN PANEL */}
          <div className="relative max-w-4xl mx-auto px-6 mt-6">          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl px-6 py-6 grid sm:grid-cols-4 gap-4 items-end border border-white/40">
            <div>
              <label className="block text-xs font-semibold text-ink/50 uppercase tracking-wide mb-1.5">
                Destination
              </label>
              <select className="w-full border border-ink/10 rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary transition-shadow">
                {destinations.length === 0 && <option>Loading...</option>}
                {destinations.map((d) => (
                  <option key={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink/50 uppercase tracking-wide mb-1.5">
                Days
              </label>
              <input
                type="number"
                min="1"
                max="14"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full border border-ink/10 rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink/50 uppercase tracking-wide mb-1.5">
                Budget
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full border border-ink/10 rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <Link
              to="/planner"
              className="bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-lg text-center hover:scale-[1.02] hover:shadow-lg transition-all"
            >
              Plan This Trip
            </Link>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <Section className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-3 gap-6 text-center">
        <div>
          <AnimatedCounter end={destinations.length || 6} />
          <p className="text-ink/60 text-sm mt-1">Curated destinations</p>
        </div>
        <div>
          <AnimatedCounter end={10} suffix="s" />
          <p className="text-ink/60 text-sm mt-1">Avg. generation time</p>
        </div>
        <div>
          <AnimatedCounter end={100} suffix="%" />
          <p className="text-ink/60 text-sm mt-1">Personalized to you</p>
        </div>
      </Section>

      {/* POPULAR DESTINATIONS — editorial asymmetric grid */}
      <Section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-semibold text-ink">Popular Destinations</h2>
          <Link to="/explore" className="flex items-center gap-1 text-sm text-primary hover:underline">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-5">
          {destinations.map((dest, i) => (
            <div
              key={dest.id}
              className={`group relative rounded-2xl overflow-hidden h-64 lg:h-auto shadow-sm ${GRID_POSITIONS[i] || ""}`}
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
              <span className="absolute top-4 left-4 text-xs font-semibold bg-secondary text-white px-3 py-1 rounded-full capitalize">
                {dest.tags[0]}
              </span>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-semibold text-lg">{dest.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* WHY CHOOSE — tinted glass section */}
      <Section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-ink/90 via-primary/80 to-ink/90" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-white text-center mb-12">
            Why Choose <span className="font-display italic text-secondary">TravelAI</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 hover:bg-white/15 transition-colors"
              >
                <div className="bg-secondary/90 text-white rounded-full p-2.5 w-fit mb-4">
                  <f.icon size={18} />
                </div>
                <h3 className="font-semibold text-white text-sm mb-2">{f.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA BANNER */}
      <Section className="max-w-6xl mx-auto px-6 py-16">
        <div className="relative bg-primary rounded-3xl px-8 py-14 text-center overflow-hidden">
          <div className="absolute -top-10 -right-10 w-56 h-56 bg-secondary/30 rounded-full blur-3xl animate-aurora" />
          <div className="relative">
            <h2 className="text-3xl font-semibold text-white mb-4">
              Ready to see your itinerary?
            </h2>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              Tell us where you're headed and what you love — the AI planner handles the rest.
            </p>
            <Link
              to="/planner"
              className="inline-block bg-secondary text-white font-medium px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Plan a Trip
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default Home;