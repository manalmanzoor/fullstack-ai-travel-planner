from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from data.destinations import destinations
from models import TripRequest
from services.groq_service import generate_itinerary
from database import init_db
from models import SaveTripRequest
from database import get_connection
from fastapi import HTTPException


app = FastAPI(title="AI Travel Companion API")   # <-- app must be created first

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


init_db()
@app.get("/")
def health_check():
    return {"status": "ok", "message": "Travel Companion API is running"}

@app.get("/destinations")
def get_destinations():
    return destinations

    

@app.post("/generate-trip")
def generate_trip(request: TripRequest):
    try:
        itinerary = generate_itinerary(
            destination=request.destination,
            days=request.days,
            interests=request.interests,
            budget=request.budget,
        )
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to generate itinerary. Please try again.")
    return {"itinerary": itinerary}


   
@app.post("/save-trip")
def save_trip(trip: SaveTripRequest):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        INSERT INTO trips (destination, days, interests, budget, itinerary)
        VALUES (?, ?, ?, ?, ?)
        """,
        (trip.destination, trip.days, trip.interests, trip.budget, trip.itinerary),
    )
    conn.commit()
    trip_id = cursor.lastrowid
    conn.close()
    return {"message": "Trip saved successfully", "id": trip_id}

@app.get("/saved-trips")
def get_saved_trips():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM trips ORDER BY created_at DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

   

@app.delete("/saved-trips/{trip_id}")
def delete_trip(trip_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM trips WHERE id = ?", (trip_id,))
    conn.commit()
    deleted = cursor.rowcount
    conn.close()

    if deleted == 0:
        raise HTTPException(status_code=404, detail="Trip not found")

    return {"message": "Trip deleted successfully"}