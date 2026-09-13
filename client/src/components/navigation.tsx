import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { activePortfolioSection } from "@/lib/active-portfolio-section";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Portfolio" },
    { id: "contact", label: "Contact" },
  ];

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const update = () => setActiveSection(activePortfolioSection(["home", ...navItems.map(item => item.id)]));
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-dark-secondary/95 backdrop-blur-md" : "bg-transparent"
      } border-b border-gray-700/50`}
    >
      {/* Scroll Progress Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-neon-green via-green-400 to-neon-green glow-neon-strong"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 lg:gap-8 h-16">
          <a
            href="#home"
            onClick={() => setIsOpen(false)}
            aria-label="Richard. Home"
            aria-current={activeSection === "home" ? "location" : undefined}
            className="text-2xl font-bold shrink-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon-green"
            data-nav-brand
          >
            Richard<span className="text-neon-green">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 ml-auto text-sm whitespace-nowrap" data-nav-links>
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`${
                  activeSection === item.id
                    ? "text-neon-green border-b-2 border-neon-green"
                    : "text-gray-300 hover:text-neon-green"
                } pb-1 transition-colors duration-300`}
              >
                {item.label}
              </button>
            ))}
          </div>

         <a
  href="/Resume-Richard-de-la-cruz.pdf"
  download="Resume - Richard de la cruz.pdf"
  className="hidden sm:inline-flex items-center justify-center shrink-0 whitespace-nowrap ml-auto lg:ml-0 bg-neon-green text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-400 transition-colors"
>
  Download CV
</a>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-neon-green shrink-0 ml-auto sm:ml-0 p-2"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-dark-secondary/95 backdrop-blur-md border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection("about")}
                className="block px-3 py-2 text-white hover:text-neon-green transition-colors w-full text-left"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("experience")}
                className="block px-3 py-2 text-white hover:text-neon-green transition-colors w-full text-left"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection("skills")}
                className="block px-3 py-2 text-white hover:text-neon-green transition-colors w-full text-left"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="block px-3 py-2 text-white hover:text-neon-green transition-colors w-full text-left"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block px-3 py-2 text-white hover:text-neon-green transition-colors w-full text-left"
              >
                Contact
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="mt-4 bg-neon-green text-black px-4 py-2 rounded-lg font-medium hover:bg-green-400 transition-colors w-full"
              >
                Hire me
              </button>
              <a href="/Resume-Richard-de-la-cruz.pdf" download="Resume - Richard de la cruz.pdf" className="sm:hidden block px-3 py-3 text-neon-green font-medium">Download CV</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
