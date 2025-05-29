import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaEnvelope } from "react-icons/fa";

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
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
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
            className="flex flex-col sm:flex-row items-center gap-4 mb-8"
          >
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-neon-green text-black px-6 py-3 rounded-lg font-medium hover:bg-green-400 transition-colors"
            >
              Download CV
            </button>
            
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/in/richard-de-la-cruz-7782bb92"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-dark-secondary rounded-full flex items-center justify-center hover:bg-neon-green hover:text-black transition-colors"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="mailto:chard.bdc@gmail.com"
                className="w-12 h-12 bg-dark-secondary rounded-full flex items-center justify-center hover:bg-neon-green hover:text-black transition-colors"
              >
                <FaEnvelope />
              </a>
              <a
                href="https://richardbdelacruz.my.canva.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-dark-secondary rounded-full flex items-center justify-center hover:bg-neon-green hover:text-black transition-colors"
              >
                <FaGithub />
              </a>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-neon-green/30"
            />
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=500&q=80"
                alt="Richard de la Cruz - Professional Headshot"
                className="w-80 h-80 rounded-full object-cover border-4 border-neon-green animate-pulse-border animate-float"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-neon-green rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4"
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
              <Counter target={20} suffix="+" />
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
    </section>
  );
}
