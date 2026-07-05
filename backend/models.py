from pydantic import BaseModel

class TripRequest(BaseModel):
    destination: str
    days: int
    interests: str
    budget: str

class SaveTripRequest(BaseModel):
    destination: str
    days: int
    interests: str
    budget: str
    itinerary: str