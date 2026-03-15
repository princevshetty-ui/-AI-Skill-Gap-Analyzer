import { motion } from "framer-motion";

interface Gap {
  skill: string;
  priority: string;
  reason: string;
}

interface Props {
  gaps: Gap[];
}

export default function GapCards({ gaps }: Props) {
  const priorityColors: Record<string, string> = {
    High: "#ff4d6d",
    Medium: "#f0c040",
    Low: "#22d3ee",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {gaps.map((gap, i) => {
        const color = priorityColors[gap.priority] || "#22d3ee";
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-5 mb-3 border border-slate-700/50"
            style={{ borderLeft: `3px solid ${color}` }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-slate-100">{gap.skill}</span>
              <span
                className="text-xs font-mono px-3 py-1 rounded-full"
                style={{ color, background: `${color}20`, border: `1px solid ${color}40` }}
              >
                {gap.priority.toUpperCase()}
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">{gap.reason}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}