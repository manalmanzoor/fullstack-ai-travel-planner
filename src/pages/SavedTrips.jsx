import { useEffect, useState } from "react";
import { MapPin, Trash2, ChevronDown } from "lucide-react";
import { getSavedTrips, deleteTrip } from "../api/trips";
import { TripMeta, ItineraryTimeline } from "../components/ItineraryDisplay";

function TripCard({ trip, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);

  let parsedItinerary = null;
  try {
    const parsed = JSON.parse(trip.itinerary);
    if (parsed && parsed.days) parsedItinerary = parsed;
  } catch {
    parsedItinerary = null;
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(`Remove your ${trip.destination} trip?`);
    if (!confirmed) return;

    setDeleting(true);
    try {
      await deleteTrip(trip.id);
      onDelete(trip.id);
    } catch {
      alert("Failed to delete trip. Please try again.");
      setDeleting(false);
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-sm overflow-hidden transition-opacity ${deleting ? "opacity-40" : ""}`}>
      <div className="h-1.5 bg-gradient-to-r from-primary to-secondary" />
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-primary" />
            <h2 className="text-xl font-semibold text-ink">{trip.destination}</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-ink/40">
              {new Date(trip.created_at).toLocaleDateString()}
            </span>
            <button
              onClick={handleDelete}
              disabled={deleting}
              title="Remove trip"
              className="text-ink/30 hover:text-red-500 transition-colors disabled:cursor-not-allowed"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {parsedItinerary ? (
          <>
            <TripMeta
              destination={trip.destination}
              days={trip.days}
              budget={trip.budget}
              interests={trip.interests}
            />
            <ItineraryTimeline data={parsedItinerary} />
          </>
        ) : (
          <>
            <p className={`whitespace-pre-line text-ink/70 text-sm leading-relaxed ${expanded ? "" : "line-clamp-4"}`}>
              {trip.itinerary}
            </p>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-primary text-sm font-medium mt-3 hover:underline"
            >
              {expanded ? "Show less" : "Read full itinerary"}
              <ChevronDown size={16} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function SavedTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await getSavedTrips();
        setTrips(data);
      } catch {
        setError("Failed to load saved trips. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const handleDelete = (deletedId) => {
    setTrips((prev) => prev.filter((trip) => trip.id !== deletedId));
  };

  if (loading) return <p className="text-center mt-10 text-ink/50">Loading saved trips...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  if (trips.length === 0) {
    return (
      <div className="text-center mt-20 px-6">
        <p className="text-ink/50 mb-2">No saved trips yet.</p>
        <p className="text-ink/40 text-sm">Head to the Planner to generate your first one.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-14">
      <h1 className="text-3xl font-semibold text-ink mb-8">Saved Trips</h1>
      <div className="space-y-6">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default SavedTrips;