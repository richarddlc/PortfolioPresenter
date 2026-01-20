import { useRef, useEffect } from "react";

interface MagneticOptions {
  strength?: number;
  tolerance?: number;
}

export function useMagneticHover({ strength = 0.3, tolerance = 50 }: MagneticOptions = {}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < tolerance) {
        const offsetX = distanceX * strength;
        const offsetY = distanceY * strength;
        element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = "translate(0, 0)";
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, tolerance]);

  return ref;
}
