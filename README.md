# AI Skill Gap Analyzer

An AI-powered career analysis web application that compares a user's resume against a selected target role and identifies skill gaps, current strengths, and recommended learning steps.

> **Status:** Work in progress.

## What it does

1. Accepts resume information as pasted text or a PDF upload.
2. Extracts text from uploaded PDF resumes.
3. Analyzes the resume against a selected career role using Gemini.
4. Produces an overall match score and summary.
5. Highlights missing or weak skills.
6. Visualizes the user's current skills.
7. Generates a learning roadmap based on the identified gaps.

## Supported Roles

The current interface includes roles such as:

- Frontend Developer
- Backend Developer
- Full Stack Developer
- AI/ML Engineer
- Data Scientist
- DevOps Engineer
- Cloud Architect
- Cybersecurity Analyst
- Mobile Developer
- Product Manager

## Tech Stack

- **Frontend:** React, TypeScript
- **Build Tool:** Vite
- **AI:** Google Gemini
- **PDF Processing:** PDF.js
- **Charts:** Recharts
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion

## Getting Started

### Prerequisites

- Node.js
- A Google Gemini API key

### Installation

```bash
npm install
```

Create a `.env.local` file and configure the Gemini API key required by the application.

### Run locally

```bash
npm run dev
```

Then open the local development URL shown by Vite.

## Project Structure

The application separates the main analysis workflow into reusable components, including skill charts, skill-gap cards, roadmap generation, and match-score presentation. Resume PDF extraction and Gemini analysis are handled through dedicated utility modules.

## Current Status

This is an ongoing project and may contain incomplete features or areas that are still being refined.
