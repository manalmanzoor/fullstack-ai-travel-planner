import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_itinerary(destination: str, days: int, interests: str, budget: str) -> dict:
    prompt = f"""
    Create a detailed {days}-day travel itinerary for {destination}.
    Traveler interests: {interests}.
    Budget level: {budget}.

    Respond with ONLY valid JSON in exactly this structure, no extra text:

    {{
      "trip_title": "short catchy title for the trip",
      "days": [
        {{
          "day": 1,
          "title": "short theme for the day",
          "activities": [
            {{
              "period": "Morning",
              "time": "09:00 - 11:00",
              "title": "activity name",
              "description": "1-2 sentence description"
            }}
          ]
        }}
      ]
    }}

    Include 3-4 activities per day, spanning morning, afternoon, and evening.
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are an expert travel planner. Always respond with valid JSON only — no markdown, no explanation.",
            },
            {"role": "user", "content": prompt},
        ],
        temperature=0.7,
        max_tokens=2048,
        response_format={"type": "json_object"},
    )

    return json.loads(response.choices[0].message.content)