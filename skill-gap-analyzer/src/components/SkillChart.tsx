import { motion } from "framer-motion";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface Skill {
  skill: string;
  level: number;
}

interface Props {
  skills: Skill[];
}

export default function SkillChart({ skills }: Props) {
  const data = skills.map(s => ({ subject: s.skill, value: s.level }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8"
    >
      <div className="text-xs font-mono text-blue-400 tracking-widest mb-6">
        ▸ CURRENT SKILL MATRIX
      </div>

      {/* Radar Chart */}
      <div className="h-72 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#1e293b" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#94a3b8", fontSize: 11, fontFamily: "monospace" }}
            />
            <Radar
              name="Skills"
              dataKey="value"
              stroke="#22d3ee"
              fill="#22d3ee"
              fillOpacity={0.15}
              strokeWidth={2}
            />
            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #1e40af",
                borderRadius: "8px",
                fontFamily: "monospace",
                fontSize: "12px",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Skill Bars */}
      {skills.map((s, i) => {
        const color = s.level >= 70 ? "#22d3ee" : s.level >= 40 ? "#f0c040" : "#ff4d6d";
        return (
          <div key={i} className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-mono text-slate-300">{s.skill}</span>
              <span className="text-sm font-mono" style={{ color }}>{s.level}%</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.level}%` }}
                transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${color}80, ${color})`, boxShadow: `0 0 8px ${color}60` }}
              />
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}