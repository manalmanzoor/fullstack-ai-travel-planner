import { useState } from "react";
import { generateTrip, saveTrip } from "../api/trips";

function Planner() {
  const [formData, setFormData] = useState({
    destination: "",
    days: "",
    interests: "",
    budget: "medium",
  });
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setItinerary(null);
    setSaveStatus(null);

    try {
      const result = await generateTrip({
        ...formData,
        days: parseInt(formData.days, 10),
      });
      setItinerary(result.itinerary);
    } catch (err) {
      setError("Failed to generate itinerary. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      await saveTrip({
        ...formData,
        days: parseInt(formData.days, 10),
        itinerary,
      });
      setSaveStatus("saved");
    } catch (err) {
      setSaveStatus("error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">AI Trip Planner</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
            placeholder="e.g. Kyoto, Japan"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Days</label>
          <input
            type="number"
            name="days"
            value={formData.days}
            onChange={handleChange}
            required
            min="1"
            max="14"
            placeholder="e.g. 3"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Interests</label>
          <input
            type="text"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            required
            placeholder="e.g. temples, food, hiking"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Itinerary"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {itinerary && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
          <p className="whitespace-pre-line text-gray-700 leading-relaxed mb-4">{itinerary}</p>

          <button
            onClick={handleSave}
            disabled={saveStatus === "saving" || saveStatus === "saved"}
            className="bg-secondary text-white font-medium px-5 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saveStatus === "saving" && "Saving..."}
            {saveStatus === "saved" && "✓ Saved"}
            {(saveStatus === null || saveStatus === "error") && "Save This Trip"}
          </button>

          {saveStatus === "error" && (
            <p className="text-red-500 mt-2 text-sm">Failed to save trip.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Planner;