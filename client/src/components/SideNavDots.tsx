import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function SideNavDots() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
      {sections.map((section) => (
        <motion.button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group relative w-3 h-3 rounded-full transition-all"
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Navigate to ${section.label}`}
        >
          <motion.div
            className={`absolute inset-0 rounded-full border-2 ${
              activeSection === section.id
                ? "border-neon-green bg-neon-green"
                : "border-gray-500 bg-transparent"
            } transition-all`}
            animate={{
              scale: activeSection === section.id ? 1 : 0.8,
            }}
          />
          {activeSection === section.id && (
            <motion.div
              layoutId="activeDot"
              className="absolute inset-0 rounded-full bg-neon-green glow-neon"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}

          {/* Tooltip */}
          <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-dark-secondary text-white px-3 py-1 rounded text-sm whitespace-nowrap pointer-events-none">
            {section.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
