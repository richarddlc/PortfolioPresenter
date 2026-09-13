import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import DimensionalIcon, { type DimensionalIconKind } from "./dimensional-icon";

const stats: { value: number; suffix: string; label: string; icon: DimensionalIconKind }[] = [
  { value: 5, suffix: "+", label: "Years of experience", icon: "briefcase" },
  { value: 50, suffix: "+", label: "eLearning modules", icon: "book" },
  { value: 6, suffix: "", label: "Companies served", icon: "layers" },
  { value: 500, suffix: "+", label: "Users trained", icon: "education" },
];

function Stat({ value, suffix, label, icon, index }: typeof stats[number] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.65 });
  const reducedMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reducedMotion) { setCount(value); return; }
    if (!visible) return;
    const animation = animate(0, value, {
      duration: 1.8,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: current => setCount(Math.round(current)),
      onComplete: () => setCount(value),
    });
    return () => animation.stop();
  }, [visible, reducedMotion, value, index]);

  return (
    <div ref={ref} className="proof-stat">
      <DimensionalIcon kind={icon} size="small" />
      {/* Expose the final figure once, without announcing every animation tick. */}
      <span className="sr-only">{value}{suffix} {label}</span>
      <div aria-hidden="true">
        <p className="proof-number"><span className="proof-count">{reducedMotion ? value : count}</span><span className="proof-suffix">{suffix}</span></p>
        <p className="proof-label">{label}</p>
      </div>
    </div>
  );
}

export default function PortfolioStats() {
  return (
    <section className="portfolio-proof" aria-labelledby="proof-title">
      <div className="proof-panel">
        <div className="proof-heading"><span aria-hidden="true" /><h2 id="proof-title">Experience at a glance</h2></div>
        <div className="proof-grid">
          {stats.map((stat, index) => <Stat key={stat.label} {...stat} index={index} />)}
        </div>
      </div>
    </section>
  );
}
