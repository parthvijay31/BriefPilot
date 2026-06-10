#  BriefPilot

**BriefPilot** is an AI-powered creative request intake system that automates the first stage of client communication for a design agency.

Instead of manually reading every email and identifying missing information, BriefPilot uses **Google Gemini AI** to:

* Extract project requirements
* Identify missing details
* Assign the request to the appropriate designer
* Generate a professional follow-up email automatically

---

#  Features

###  AI Email Analysis

Parses unstructured client emails and extracts:

* Design Request
* Purpose
* Brand Guidelines
* Budget
* Deadline

---

###  Missing Information Detection

Automatically identifies missing project details and highlights them for follow-up.

Example:

* Deadline
* Budget
* Brand Guidelines

---

###  Automatic Designer Assignment

Routes requests to the appropriate design team based on the project type.

Example:

```
Logo Design
      ↓
Brand Identity Team
      ↓
Assigned Designer: Priya
```

---

###  AI Follow-up Email Generation

Generates a professional follow-up email requesting only the missing information required to proceed.

---

###  Modern Dashboard

Displays:

* Client Brief
* Missing Information
* Assigned Designer
* AI Generated Follow-up Email

inside a clean and responsive interface.

---

#  Tech Stack

## Frontend

* React
* Axios
* CSS

## Backend

* FastAPI
* Python

## AI

* Google Gemini API

## Deployment

* GitHub
* Render

---

#  Project Structure

```
BriefPilot/

│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── config/
│   │   ├── prompts/
│   │   ├── routes/
│   │   └── services/
│   │
│   ├── requirements.txt
│   └── main.py
│
└── README.md
```

---

#  Local Setup

## Clone Repository

```bash
git clone https://github.com/parthvijay31/BriefPilot.git

cd BriefPilot
```

---

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on:

```
http://127.0.0.1:8000
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

#  Environment Variables

Create a `.env` file inside the backend folder.

```
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

#  Demo Workflow

```
Client Email
        │
        ▼
 Gemini AI Analysis
        │
        ▼
Extract Project Details
        │
        ▼
Find Missing Information
        │
        ▼
Assign Designer
        │
        ▼
Generate Follow-up Email
        │
        ▼
Display Result Dashboard
```

---

#  Future Improvements

* Human-in-the-loop approval workflow
* Email integration (Gmail/Outlook)
* Multi-designer routing logic
* Database support
* Authentication & role management
* Conversation history
* Production deployment

---
