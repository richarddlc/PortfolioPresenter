import { useRef } from "react";
import { useInView } from "framer-motion";

/** A transparent CSS 3D object, animated only while visible. */
export default function PortfolioBriefcase() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.2 });

  return (
    <div ref={ref} className={`summary-briefcase${visible ? " is-visible" : ""}`} role="img" aria-label="Three-dimensional graphite and green portfolio briefcase">
      <div className="briefcase-object" aria-hidden="true">
        <div className="briefcase-handle" />
        <div className="briefcase-face briefcase-back" />
        <div className="briefcase-face briefcase-left" />
        <div className="briefcase-face briefcase-right" />
        <div className="briefcase-face briefcase-top" />
        <div className="briefcase-face briefcase-bottom" />
        <div className="briefcase-face briefcase-front">
          <div className="briefcase-seam" />
          <div className="briefcase-clasp" />
          <div className="briefcase-mark"><span /><span /><span /></div>
        </div>
      </div>
      <div className="briefcase-shadow" aria-hidden="true" />
    </div>
  );
}
