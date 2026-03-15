import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

export async function analyzeSkillGap(resume: string, role: string) {
  const prompt = `You are an expert career analyst. Analyze the resume below for the role: "${role}".

Resume:
${resume}

Return ONLY valid JSON (no markdown, no explanation) in this exact structure:
{
  "currentSkills": [
    { "skill": "skill name", "level": 85 }
  ],
  "skillGaps": [
    { "skill": "missing skill", "priority": "High", "reason": "why this skill matters for the role" }
  ],
  "roadmap": [
    { "title": "Step title", "description": "What to do", "duration": "e.g. 2 weeks" }
  ],
  "overallMatch": 65,
  "summary": "2-3 sentence honest assessment"
}

Rules:
- currentSkills: 5-8 skills found in resume with realistic levels (0-100)
- skillGaps: 4-6 missing or weak skills with priority (High/Medium/Low)
- roadmap: exactly 5 steps to close the gap
- overallMatch: realistic percentage (0-100)`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const clean = text.replace(/\`\`\`json|\`\`\`/g, "").trim();
  return JSON.parse(clean);
}