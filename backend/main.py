from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from app.services.gemini_service import analyze_email
from app.utils.routing import assign_designer

app = FastAPI(
    title="BriefPilot API",
    description="AI-powered creative request analyzer",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EmailRequest(BaseModel):
    email: str


@app.get("/")
def home():
    return {
        "status": "running",
        "message": "BriefPilot Backend is live!"
    }


@app.post("/analyze-email")
def analyze(request: EmailRequest):

    result = analyze_email(request.email)

    print("========== GEMINI RESULT ==========")
    print(result)
    print("===================================")

    designer_type = result.get("designer_type", "Brand Identity")

    assigned_to = assign_designer(designer_type)

    result["assigned_to"] = assigned_to

    return result
