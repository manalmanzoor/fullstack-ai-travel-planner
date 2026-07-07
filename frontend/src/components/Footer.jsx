import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-ink text-cream/70 mt-20">
      <div className="max-w-6xl mx-auto px-8 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <span className="font-display text-lg font-semibold text-cream">
            Travel<span className="text-secondary">AI</span>
          </span>
          <p className="text-sm mt-3 max-w-xs leading-relaxed">
            AI-generated itineraries for the trips you haven't taken yet.
          </p>
        </div>

        <div>
          <h4 className="text-cream text-sm font-semibold mb-3 uppercase tracking-wide">
            Explore
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/explore" className="hover:text-secondary transition-colors">Destinations</Link></li>
            <li><Link to="/planner" className="hover:text-secondary transition-colors">Trip Planner</Link></li>
            <li><Link to="/saved-trips" className="hover:text-secondary transition-colors">Saved Trips</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-cream text-sm font-semibold mb-3 uppercase tracking-wide">
            Company
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-secondary transition-colors">About</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 text-center text-xs py-5">
        © {new Date().getFullYear()} TravelAI. Built as a learning project.
      </div>
    </footer>
  );
}

export default Footer;