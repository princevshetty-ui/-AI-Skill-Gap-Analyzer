import { motion } from "framer-motion";

interface Step {
  title: string;
  description: string;
  duration: string;
}

interface Props {
  steps: Step[];
}

export default function Roadmap({ steps }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8"
    >
      <div className="text-xs font-mono text-blue-400 tracking-widest mb-8">
        ▸ LEARNING ROADMAP
      </div>

      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex gap-5 mb-8 last:mb-0"
        >
          {/* Step number + line */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/50 flex items-center justify-center text-blue-400 font-mono text-xs flex-shrink-0">
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className="w-px flex-1 mt-2 bg-gradient-to-b from-blue-500/30 to-transparent" />
            )}
          </div>

          {/* Content */}
          <div className="pt-1 pb-6">
            <div className="font-semibold text-slate-100 mb-1">{step.title}</div>
            <div className="text-slate-400 text-sm leading-relaxed mb-2">{step.description}</div>
            {step.duration && (
              <div className="text-xs font-mono text-blue-400/70">⏱ {step.duration}</div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}