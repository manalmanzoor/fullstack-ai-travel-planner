import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/planner", label: "Planner" },
  { to: "/saved-trips", label: "Saved Trips" },
  { to: "/about", label: "About" },
];

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-5 bg-cream sticky top-0 z-50 border-b border-ink/10">
      <NavLink to="/" className="font-display text-xl font-semibold text-ink">
        Travel<span className="text-primary">AI</span>
      </NavLink>
      <div className="flex gap-8">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `text-sm transition-colors ${
                isActive ? "text-primary font-semibold" : "text-ink/70 hover:text-primary"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;