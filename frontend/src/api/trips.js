import api from "./axios";

export const generateTrip = async (tripData) => {
  const response = await api.post("/generate-trip", tripData);
  return response.data;
};
export const saveTrip = async (tripData) => {
  const response = await api.post("/save-trip", tripData);
  return response.data;
};

export const getSavedTrips = async () => {
  const response = await api.get("/saved-trips");
  return response.data;
};
export const deleteTrip = async (tripId) => {
  const response = await api.delete(`/saved-trips/${tripId}`);
  return response.data;
};