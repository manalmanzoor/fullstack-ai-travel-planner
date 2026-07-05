import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, MapPin, Zap, BookmarkCheck, ArrowRight } from "lucide-react";
import { getDestinations } from "../api/destinations";

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

function Home() {
  const [destinations, setDestinations] = useState([]);
  const [days, setDays] = useState("3");
  const [budget, setBudget] = useState("medium");

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

  return (
    <div>
      {/* HERO */}
      <section className="relative max-w-6xl mx-auto px-6 pt-14 pb-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-primary bg-sage/50 px-3 py-1.5 rounded-full mb-6">
              <Sparkles size={14} /> Explore. Dream. Discover.
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold text-ink leading-tight mb-2">
              Discover Amazing
            </h1>
            <h1 className="font-display italic text-4xl md:text-5xl text-secondary leading-tight mb-6">
              Places with AI
            </h1>
            <p className="text-ink/70 text-lg mb-8 max-w-md">
              Find the best destinations and get a personalized day-by-day
              itinerary — everything you need for the perfect trip, generated in seconds.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/planner"
                className="inline-flex items-center gap-2 bg-secondary text-white font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Start Planning <ArrowRight size={18} />
              </Link>
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 border border-primary text-primary font-medium px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                Explore Destinations
              </Link>
            </div>
          </div>

          <div className="relative animate-fade-up">
            <img
              src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff"
              alt="Santorini, Greece"
              className="w-full h-96 object-cover rounded-3xl shadow-lg"
            />
          </div>
        </div>

        {/* FLOATING QUICK-PLAN CARD */}
<div className="mt-12 mx-auto w-full max-w-4xl bg-white rounded-2xl shadow-xl px-6 py-6 grid sm:grid-cols-4 gap-4 items-end">          <div>
            <label className="block text-xs font-semibold text-ink/50 uppercase tracking-wide mb-1.5">
              Destination
            </label>
            <select className="w-full border border-ink/10 rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary">
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
              className="w-full border border-ink/10 rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink/50 uppercase tracking-wide mb-1.5">
              Budget
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full border border-ink/10 rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <Link
            to="/planner"
            className="bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-lg text-center hover:bg-teal-800 transition-colors"
          >
            Plan This Trip
          </Link>
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-semibold text-ink">Popular Destinations</h2>
          <Link to="/explore" className="flex items-center gap-1 text-sm text-primary hover:underline">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="group relative rounded-2xl overflow-hidden h-64 shadow-sm"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <span className="absolute top-4 left-4 text-xs font-semibold bg-secondary text-white px-3 py-1 rounded-full capitalize">
                {dest.tags[0]}
              </span>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-semibold text-lg">{dest.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold text-ink mb-8">
            Why Choose <span className="font-display italic text-secondary">TravelAI</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex gap-3">
                <div className="bg-sage/50 text-primary rounded-full p-2.5 h-fit">
                  <f.icon size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-ink text-sm mb-1">{f.title}</h3>
                  <p className="text-ink/60 text-sm leading-relaxed">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden h-96">
          <img
            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4"
            alt="Bali, Indonesia"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <span className="text-secondary text-xs font-semibold uppercase tracking-wide">
              Let's go
            </span>
            <h3 className="text-white text-2xl font-semibold mt-2 mb-4">
              Your Next Adventure Awaits
            </h3>
            <Link
              to="/planner"
              className="inline-flex items-center gap-2 bg-white text-ink text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-cream transition-colors"
            >
              Plan Your Trip <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-primary rounded-3xl max-w-6xl mx-auto mb-16 px-8 py-14 text-center">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Ready to see your itinerary?
        </h2>
        <p className="text-white/70 mb-8 max-w-md mx-auto">
          Tell us where you're headed and what you love — the AI planner handles the rest.
        </p>
        <Link
          to="/planner"
          className="inline-block bg-secondary text-white font-medium px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Plan a Trip
        </Link>
      </section>
    </div>
  );
}

export default Home;