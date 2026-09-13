import { useId, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface CircularProgressProps {
  percentage: number;
  label: string;
  size?: number;
  strokeWidth?: number;
  delay?: number;
}

export default function CircularProgress({
  percentage,
  label,
  size = 120,
  strokeWidth = 8,
  delay = 0,
}: CircularProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.4 });
  const reducedMotion = useReducedMotion();
  const gradientId = useId();
  const progress = visible || reducedMotion ? percentage : 0;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center gap-4" role="progressbar" aria-label={label} aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
      <div className="relative skill-dial" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg aria-hidden="true" width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(75, 85, 99, 0.3)"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={false}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: reducedMotion ? 0 : 1.5, ease: "easeOut", delay: reducedMotion ? 0 : delay / 1000 }}
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c4fce0" />
              <stop offset="100%" stopColor="#568e71" />
            </linearGradient>
          </defs>
        </svg>

        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-2xl font-bold text-neon-green"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: delay / 1000 + 0.5 }}
          >
            {percentage}%
          </motion.span>
        </div>
      </div>

      {/* Label */}
      <motion.p
        className="text-sm text-gray-300 text-center max-w-[120px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay / 1000 + 0.7 }}
      >
        {label}
      </motion.p>
    </div>
  );
}
