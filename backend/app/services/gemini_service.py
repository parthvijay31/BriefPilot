import json
from pathlib import Path

import google.generativeai as genai

from app.config.settings import settings

PROMPT_PATH = (
    Path(__file__).resolve().parents[2]
    / "prompts"
    / "extraction_prompt.txt"
)

# Configure Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)

# Create model
model = genai.GenerativeModel("gemini-2.5-flash")


def fallback_result(error=None):
    return {
        "required_fields": {
            "design_request": "Unknown",
            "purpose": "Unknown",
            "deadline": None,
            "brand_guidelines": None,
            "budget": None,
        },
        "missing_fields": [
            "deadline",
            "brand_guidelines",
            "budget",
        ],
        "designer_type": "Brand Identity",
        "follow_up_email": "Please provide additional project details so we can proceed.",
        "analysis_error": error,
    }


def analyze_email(email: str):

    with open(PROMPT_PATH, "r", encoding="utf-8") as file:
        system_prompt = file.read()

    final_prompt = f"""
{system_prompt}

Client Email:

{email}
"""

    try:
        response = model.generate_content(final_prompt)

        text = response.text

        # Remove markdown formatting if Gemini returns it
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        return json.loads(text)

    except Exception as e:
        print("GEMINI ERROR:", e)
        return fallback_result(str(e))