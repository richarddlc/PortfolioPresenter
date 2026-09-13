import type { ReactNode } from "react";
import { useTiltEffect } from "@/lib/useTiltEffect";

export default function DepthCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useTiltEffect();
  return <div ref={ref} className={`depth-card ${className}`}>{children}</div>;
}
