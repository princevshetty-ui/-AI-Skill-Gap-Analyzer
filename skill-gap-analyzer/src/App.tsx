import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { analyzeSkillGap } from "./lib/gemini";
import { extractTextFromPDF } from "./lib/pdfExtract";
import SkillChart from "./components/SkillChart";
import GapCards from "./components/GapCards";
import Roadmap from "./components/Roadmap";
import MatchScore from "./components/MatchScore";

const ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "AI/ML Engineer",
  "Data Scientist",
  "DevOps Engineer",
  "Cloud Architect",
  "Cybersecurity Analyst",
  "Mobile Developer",
  "Product Manager",
];

export default function App() {
  const [resume, setResume] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("gaps");
  const [uploadMode, setUploadMode] = useState<"text" | "pdf">("text");
  const [fileName, setFileName] = useState<string | null>(null);

  const analyze = async () => {
    if (!resume.trim() || !role) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await analyzeSkillGap(resume, role);
      setResult(data);
      setActiveTab("gaps");
    } catch (e) {
      setError("Analysis failed. Please check your input and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePDFUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const text = await extractTextFromPDF(file);
    setResume(text);
  };

  return (
    <div className="min-h-screen bg-[#020817] text-slate-200">
      {/* Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_#1e3a5f_0%,_transparent_60%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDBNIDAgMjAgTCA0MCAyMCBNIDIwIDAgTCAyMCA0MCBNIDAgMzAgTCA0MCAzMCBNIDMwIDAgTCAzMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMWUzYTVmIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="text-xs font-mono text-blue-400 tracking-[0.3em] mb-3">
            ◈ SDG-04 · QUALITY EDUCATION · AI POWERED
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600 bg-clip-text text-transparent mb-3 tracking-tight">
            Skill Gap Analyzer
          </h1>
          <p className="text-slate-400 text-sm font-mono tracking-widest">
            CAREER INTELLIGENCE SYSTEM
          </p>
        </motion.div>

        {/* Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 mb-6 shadow-2xl"
        >
          {/* Resume Input */}
          <div className="mb-6">
            {/* Toggle */}
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => { setUploadMode("text"); setFileName(null); }}
                className={`px-4 py-1.5 rounded-lg font-mono text-xs tracking-widest transition-all ${
                  uploadMode === "text"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-400 border border-slate-700"
                }`}
              >
                TEXT
              </button>
              <button
                onClick={() => setUploadMode("pdf")}
                className={`px-4 py-1.5 rounded-lg font-mono text-xs tracking-widest transition-all ${
                  uploadMode === "pdf"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-400 border border-slate-700"
                }`}
              >
                PDF UPLOAD
              </button>
            </div>

            <label className="block text-xs font-mono text-blue-400 tracking-widest mb-2">
              ▸ {uploadMode === "text" ? "PASTE YOUR RESUME" : "UPLOAD RESUME PDF"}
            </label>

            {uploadMode === "text" ? (
              <textarea
                value={resume}
                onChange={e => setResume(e.target.value)}
                placeholder="Paste your resume text here — skills, experience, education, projects..."
                rows={7}
                className="w-full bg-slate-950/80 border border-slate-700/50 rounded-xl text-slate-300 font-mono text-sm p-4 resize-none outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder-slate-600"
              />
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-40 bg-slate-950/80 border-2 border-dashed border-slate-700/50 rounded-xl cursor-pointer hover:border-blue-500/50 transition-all">
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handlePDFUpload}
                />
                {fileName ? (
                  <div className="text-center">
                    <div className="text-2xl mb-2">📄</div>
                    <div className="text-slate-300 font-mono text-sm">{fileName}</div>
                    <div className="text-slate-500 font-mono text-xs mt-1">Click to change</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-3xl mb-2">⬆</div>
                    <div className="text-slate-400 font-mono text-sm">Click to upload PDF</div>
                    <div className="text-slate-600 font-mono text-xs mt-1">Supports .pdf files</div>
                  </div>
                )}
              </label>
            )}
          </div>

          {/* Role Select */}
          <div className="mb-6">
            <label className="block text-xs font-mono text-blue-400 tracking-widest mb-2">
              ▸ TARGET ROLE
            </label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/50 rounded-xl text-slate-300 font-mono text-sm p-4 outline-none focus:border-blue-500/50 transition-all cursor-pointer"
            >
              <option value="">— SELECT TARGET ROLE —</option>
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {/* Button */}
          <button
            onClick={analyze}
            disabled={loading || !resume.trim() || !role}
            className="w-full py-4 rounded-xl font-mono text-sm tracking-widest transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold shadow-lg hover:shadow-blue-500/25"
          >
            {loading ? "◌ ANALYZING..." : "◈ RUN ANALYSIS"}
          </button>
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-950/50 border border-red-500/30 rounded-xl p-4 mb-6 text-red-400 font-mono text-sm"
          >
            ⚠ {error}
          </motion.div>
        )}

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <MatchScore score={result.overallMatch} summary={result.summary} />

              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                {["gaps", "skills", "roadmap"].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 rounded-lg font-mono text-xs tracking-widest transition-all ${
                      activeTab === tab
                        ? "bg-blue-600 text-white"
                        : "bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-700/50"
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeTab === "gaps" && <GapCards key="gaps" gaps={result.skillGaps} />}
                {activeTab === "skills" && <SkillChart key="skills" skills={result.currentSkills} />}
                {activeTab === "roadmap" && <Roadmap key="roadmap" steps={result.roadmap} />}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}