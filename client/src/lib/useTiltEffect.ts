import { useRef, useEffect } from "react";

export function useTiltEffect() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const enabled = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let raf = 0;
    const reset = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      element.style.setProperty("--tilt-x", "0deg");
      element.style.setProperty("--tilt-y", "0deg");
      element.style.setProperty("--light-opacity", "0");
    };
    const move = (event: PointerEvent) => {
      if (!enabled.matches || event.pointerType !== "mouse") return;
      const bounds = (element.parentElement || element).getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
      const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        element.style.setProperty("--tilt-x", `${(0.5 - y) * 6}deg`);
        element.style.setProperty("--tilt-y", `${(x - 0.5) * 6}deg`);
        element.style.setProperty("--light-x", `${x * 100}%`);
        element.style.setProperty("--light-y", `${y * 100}%`);
        element.style.setProperty("--light-opacity", "1");
      });
    };
    const preferenceChanged = () => { if (!enabled.matches) reset(); };
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", reset);
    enabled.addEventListener("change", preferenceChanged);
    return () => {
      reset();
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
      enabled.removeEventListener("change", preferenceChanged);
    };
  }, []);
  return ref;
}
