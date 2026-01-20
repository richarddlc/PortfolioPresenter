import { useRef, useEffect } from "react";

interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
}

export function useTiltEffect({
  maxTilt = 15,
  perspective = 1000,
  scale = 1.05,
  speed = 400,
}: TiltOptions = {}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.style.transformStyle = "preserve-3d";
    element.style.transition = `transform ${speed}ms ease-out`;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * maxTilt;
      const rotateY = ((centerX - x) / centerX) * maxTilt;

      element.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
    };

    const handleMouseLeave = () => {
      element.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [maxTilt, perspective, scale, speed]);

  return ref;
}
