import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import professionalImage from "@assets/Untitled design (14).png";

interface CounterProps {
  target: number;
  duration?: number;
  suffix?: string;
}

function Counter({ target, duration = 2000, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const startCount = 0;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      const currentCount = Math.floor(startCount + (target - startCount) * percentage);
      setCount(currentCount);

      if (percentage < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(updateCount);
    }, 500);

    return () => clearTimeout(timer);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
}

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary opacity-80"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Mobile: Image first */}
        <div className="md:hidden flex justify-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <img
                src={professionalImage}
                alt="Richard de la Cruz - Professional Headshot"
                className="w-64 h-64 rounded-full object-cover"
              />
              <div className="absolute inset-0 rounded-full animate-spin-slow">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="#00ff88"
                    strokeWidth="2"
                    strokeDasharray="20 10 5 10"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content and Desktop Image */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-gray-400 mb-4"
            >
              Instructional Designer
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              Hello I'm<br />
              <span className="text-neon-green">Richard de la Cruz</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-gray-300 text-lg mb-8 max-w-lg"
            >
              5+ years of crafting engaging digital learning experiences and 
              proficient in various instructional design methodologies and 
              eLearning technologies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="flex space-x-6">
                <a
                  href="https://linkedin.com/in/richard-de-la-cruz-7782bb92"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-dark-secondary rounded-full flex items-center justify-center hover:bg-neon-green hover:text-black transition-colors transform hover:scale-110 duration-300 shadow-lg"
                >
                  <FaLinkedinIn size={20} />
                </a>
                <a
                  href="mailto:chard.bdc@gmail.com"
                  className="w-14 h-14 bg-dark-secondary rounded-full flex items-center justify-center hover:bg-neon-green hover:text-black transition-colors transform hover:scale-110 duration-300 shadow-lg"
                >
                  <FaEnvelope size={20} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Desktop Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden md:flex justify-center"
          >
            <div className="relative">
              <img
                src={professionalImage}
                alt="Richard de la Cruz - Professional Headshot"
                className="w-80 h-80 rounded-full object-cover"
              />
              <div className="absolute inset-0 rounded-full animate-spin-slow">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="#00ff88"
                    strokeWidth="2"
                    strokeDasharray="20 10 5 10"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 w-full max-w-4xl mx-auto px-4"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-counter">
              <div className="text-3xl font-bold text-neon-green">
                <Counter target={5} suffix="+" />
              </div>
              <div className="text-gray-400 text-sm">Years of<br />Experience</div>
            </div>
            <div className="animate-counter">
              <div className="text-3xl font-bold text-neon-green">
                <Counter target={50} suffix="+" />
              </div>
              <div className="text-gray-400 text-sm">eLearning<br />Modules</div>
            </div>
            <div className="animate-counter">
              <div className="text-3xl font-bold text-neon-green">
                <Counter target={6} />
              </div>
              <div className="text-gray-400 text-sm">Companies<br />Served</div>
            </div>
            <div className="animate-counter">
              <div className="text-3xl font-bold text-neon-green">
                <Counter target={500} suffix="+" />
              </div>
              <div className="text-gray-400 text-sm">Users<br />Trained</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}