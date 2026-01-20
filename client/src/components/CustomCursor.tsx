import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Add to trail
      trailRef.current.push({ x: e.clientX, y: e.clientY });
      if (trailRef.current.length > 8) {
        trailRef.current.shift();
      }
      setTrail(trailRef.current.map((pos, i) => ({ ...pos, id: i })));
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Trail effect */}
      {trail.map((pos, index) => (
        <motion.div
          key={pos.id}
          className="fixed pointer-events-none z-[9999] rounded-full bg-neon-green mix-blend-screen"
          style={{
            left: pos.x - 2,
            top: pos.y - 2,
            width: 4,
            height: 4,
            opacity: (index + 1) / trail.length * 0.3,
          }}
          initial={{ scale: 1, opacity: 0.3 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div className="relative w-8 h-8">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-neon-green"
            animate={{
              scale: isHovering ? 1.2 : 1,
            }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: isClicking ? 0.5 : 1,
            }}
          >
            <div className="w-2 h-2 rounded-full bg-neon-green" />
          </motion.div>
        </div>
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998] mix-blend-difference"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          opacity: isHovering ? 1 : 0.5,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.8,
        }}
      >
        <div className="w-12 h-12 rounded-full border border-neon-green/30" />
      </motion.div>
    </>
  );
}
