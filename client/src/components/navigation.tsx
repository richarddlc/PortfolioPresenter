import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-dark-secondary/95 backdrop-blur-md" : "bg-transparent"
      } border-b border-gray-700/50`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold">
            Richard<span className="text-neon-green">.</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-neon-green transition-colors duration-300"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-neon-green transition-colors duration-300"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="hover:text-neon-green transition-colors duration-300"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="hover:text-neon-green transition-colors duration-300"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-neon-green transition-colors duration-300"
            >
              Contact
            </button>
          </div>
          
          <button
            onClick={() => scrollToSection("contact")}
            className="hidden md:block bg-neon-green text-black px-4 py-2 rounded-lg font-medium hover:bg-green-400 transition-colors"
          >
            Hire me
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-neon-green"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-dark-secondary/95 backdrop-blur-md border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection("home")}
                className="block px-3 py-2 text-white hover:text-neon-green transition-colors w-full text-left"
              >
                Home
              </button>
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
                onClick={() => scrollToSection("contact")}
                className="block px-3 py-2 text-white hover:text-neon-green transition-colors w-full text-left"
              >
                Contact
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="mx-3 mt-4 bg-neon-green text-black px-4 py-2 rounded-lg font-medium hover:bg-green-400 transition-colors w-full"
              >
                Hire me
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
