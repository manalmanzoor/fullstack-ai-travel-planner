import { Plane } from "lucide-react";

function PlaneLoader({ label = "Crafting your itinerary..." }) {
  return (
    <div className="flex flex-col items-center py-10">
      <div className="relative w-64 h-10 mb-4">
        <div className="absolute top-1/2 left-0 right-0 border-t-2 border-dashed border-primary/30" />
        <Plane size={22} className="absolute text-primary animate-plane-fly" style={{ top: "30%" }} />
      </div>
      <p className="text-ink/60 text-sm">{label}</p>
    </div>
  );
}

export default PlaneLoader;