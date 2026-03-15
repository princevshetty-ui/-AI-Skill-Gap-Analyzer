import { motion } from "framer-motion";

interface Props {
  score: number;
  summary: string;
}

export default function MatchScore({ score, summary }: Props) {
  const color = score >= 70 ? "#22d3ee" : score >= 45 ? "#f0c040" : "#ff4d6d";
  const label = score >= 70 ? "STRONG MATCH" : score >= 45 ? "PARTIAL MATCH" : "WEAK MATCH";
  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 mb-6 shadow-2xl"
    >
      <div className="flex items-center gap-8">
        {/* Score Circle */}
        <div className="relative flex-shrink-0" style={{ width: 100, height: 100 }}>
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            style={{ overflow: "visible" }}
          >
            {/* Glow filter */}
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#1e293b"
              strokeWidth="8"
            />

            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              transform="rotate(-90 50 50)"
              animate={{
                strokeDashoffset: circumference * (1 - score / 100),
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              filter="url(#glow)"
            />
          </svg>

          {/* Score text centered */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                color,
                fontFamily: "monospace",
              }}
            >
              {score}%
            </span>
          </div>
        </div>

        {/* Summary */}
        <div>
          <div
            className="text-xs font-mono tracking-widest mb-2"
            style={{ color }}
          >
            ◈ {label}
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{summary}</p>
        </div>
      </div>
    </motion.div>
  );
}