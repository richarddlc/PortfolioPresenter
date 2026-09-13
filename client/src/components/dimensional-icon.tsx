import { useRef } from "react";
import { useInView } from "framer-motion";
import { Code2, BookOpen, Layers3, GraduationCap, Sparkles, Phone, Mail, MapPin, BriefcaseBusiness, Award } from "lucide-react";

const icons = { code: Code2, book: BookOpen, layers: Layers3, education: GraduationCap, ai: Sparkles, phone: Phone, mail: Mail, location: MapPin, briefcase: BriefcaseBusiness, award: Award };
export type DimensionalIconKind = keyof typeof icons;

/** Extruded vector surfaces stay sharp at every size, without a bitmap backdrop. */
export default function DimensionalIcon({ kind, size = "large" }: { kind: DimensionalIconKind; size?: "small" | "medium" | "large" }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { amount: 0.2 });
  const Icon = icons[kind];
  return (
    <span ref={ref} className={`dimensional-icon icon-${size}${visible ? " is-visible" : ""}`} aria-hidden="true">
      <span className="dimensional-icon-object">
        {Array.from({ length: 7 }, (_, layer) => (
          <Icon key={layer} className={`icon-surface${layer === 6 ? " icon-front" : ""}`} strokeWidth={1.65}
            style={{ transform: `translateZ(${layer * 1.6}px)` }} />
        ))}
      </span>
    </span>
  );
}
