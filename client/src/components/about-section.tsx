import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

interface SectionData {
  id: string;
  title: string;
  icon: string;
  content: JSX.Element;
}

export default function AboutSection() {
  const [activeSection, setActiveSection] = useState<string>("summary");

  const sections: SectionData[] = [
    {
      id: "summary",
      title: "Professional Summary",
      icon: "💼",
      content: (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-300 mb-4">
              Instructional Designer with 5+ years of experience delivering engaging digital learning solutions across finance, BPO, and tech industries. Proven expertise in eLearning development, ILT/WBT curriculum design, and multimedia integration.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-neon-green/20 text-neon-green px-3 py-1 rounded-full text-sm">ADDIE</span>
              <span className="bg-neon-green/20 text-neon-green px-3 py-1 rounded-full text-sm">Agile (SAM)</span>
              <span className="bg-neon-green/20 text-neon-green px-3 py-1 rounded-full text-sm">Adult Learning</span>
              <span className="bg-neon-green/20 text-neon-green px-3 py-1 rounded-full text-sm">4MAT</span>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80"
              alt="Collaborative learning environment with laptops and teamwork"
              className="rounded-lg w-full h-48 object-cover"
            />
          </div>
        </div>
      ),
    },
    {
      id: "experience",
      title: "Experience",
      icon: "🚀",
      content: (
        <div className="space-y-8">
          <div className="border-l-2 border-neon-green pl-6 relative">
            <div className="absolute w-4 h-4 bg-neon-green rounded-full -left-2 top-0"></div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <div>
                <h4 className="text-lg font-semibold text-neon-green">Instructional Designer</h4>
                <p className="text-gray-400">Sunlife, Taguig</p>
              </div>
              <span className="text-sm text-gray-500 md:text-right">Mar 2025 - Present</span>
            </div>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Analyze business-submitted training content to ensure alignment with defined learning objectives</li>
              <li>• Develop ILT and WBT modules using Articulate 360, Adobe Suite, and video tools</li>
              <li>• Apply adult learning frameworks (ADDIE, 4MAT, Agile) to create learner-centric programs</li>
              <li>• Publish SCORM-compliant content on LMS and Breeze Server</li>
            </ul>
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300&q=80"
              alt="Modern laptop displaying educational content and e-learning interface"
              className="rounded-lg mt-4 w-full h-32 object-cover"
            />
          </div>

          <div className="border-l-2 border-gray-600 pl-6 relative">
            <div className="absolute w-4 h-4 bg-gray-600 rounded-full -left-2 top-0"></div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <div>
                <h4 className="text-lg font-semibold">Digital Instructional Designer</h4>
                <p className="text-gray-400">TTEC, Philippines</p>
              </div>
              <span className="text-sm text-gray-500">Mar 2024 - Mar 2025</span>
            </div>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Created 20+ interactive eLearning modules with scenario-based design</li>
              <li>• Applied instructional models (ADDIE, SAM) to reduce design cycles by 25%</li>
              <li>• Managed SAP Litmos LMS for 500+ users; tracked engagement metrics</li>
              <li>• Collaborated with project managers to align content with KPIs</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-2 border-gray-600 pl-4 relative">
              <div className="absolute w-3 h-3 bg-gray-600 rounded-full -left-1.5 top-0"></div>
              <h5 className="font-semibold">Learning Experience Designer</h5>
              <p className="text-gray-400 text-sm">Manulife • May 2021 - May 2022</p>
              <p className="text-gray-300 text-xs mt-1">Redesigned onboarding programs, boosting satisfaction from 70% to 88%</p>
            </div>
            <div className="border-l-2 border-gray-600 pl-4 relative">
              <div className="absolute w-3 h-3 bg-gray-600 rounded-full -left-1.5 top-0"></div>
              <h5 className="font-semibold">Training Specialist</h5>
              <p className="text-gray-400 text-sm">Philchema Inc • Aug 2018 - May 2021</p>
              <p className="text-gray-300 text-xs mt-1">Designed product training programs, reducing onboarding time by 30%</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "skills",
      title: "Skills & Technologies",
      icon: "⚡",
      content: (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-neon-green">eLearning & Media Tools</h4>
            <div className="space-y-3">
              {[
                { name: "Articulate 360", level: 95 },
                { name: "Adobe Creative Suite", level: 90 },
                { name: "Camtasia", level: 85 },
                { name: "ADDIE/SAM Methodologies", level: 98 },
              ].map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{skill.name}</span>
                    <span className="text-sm text-neon-green">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-neon-green h-2 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            <h4 className="text-lg font-semibold mb-4 mt-6 text-neon-green">LMS Platforms</h4>
            <div className="flex flex-wrap gap-2">
              {["SAP Litmos", "Cornerstone", "Axonify", "SCORM/xAPI"].map((platform) => (
                <span key={platform} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                  {platform}
                </span>
              ))}
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80"
              alt="Digital learning interface on tablet with interactive educational content"
              className="rounded-lg w-full h-48 object-cover mb-4"
            />

            <h4 className="text-lg font-semibold mb-4 text-neon-green">Instructional Design</h4>
            <div className="space-y-2">
              {[
                "ADDIE Methodology",
                "Agile (SAM, 4MAT)",
                "Adult Learning Theory",
                "Kirkpatrick Evaluation",
              ].map((method) => (
                <div key={method} className="flex items-center">
                  <Check className="text-neon-green mr-2" size={16} />
                  <span className="text-sm">{method}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "education",
      title: "Education & Certifications",
      icon: "🎓",
      content: (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-neon-green">Education</h4>
            <div className="bg-dark-tertiary p-4 rounded-lg">
              <h5 className="font-semibold">Bachelor of Science in Agricultural Biotechnology</h5>
              <p className="text-gray-400">University of the Philippines Los Baños, Laguna</p>
              <p className="text-gray-400 text-sm">2012 - 2016 • GWA: 2.1</p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-neon-green">Certifications</h4>
            <div className="space-y-3">
              <div className="bg-dark-tertiary p-4 rounded-lg">
                <h5 className="font-semibold">Licensed Professional Agriculturist</h5>
                <p className="text-gray-400 text-sm">PRC, Philippines • 2018 - Present</p>
              </div>
              <div className="bg-dark-tertiary p-4 rounded-lg">
                <h5 className="font-semibold">Human-Centered Design</h5>
                <p className="text-gray-400 text-sm">Luma Institute Practitioner • 2022 - Present</p>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300&q=80"
              alt="Open notebook with design sketches and learning diagrams on desk"
              className="rounded-lg mt-4 w-full h-32 object-cover"
            />
          </div>
        </div>
      ),
    },
  ];

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? "" : sectionId);
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Why hire me?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Instructional Designer with 5+ years of experience delivering engaging digital learning solutions across finance, BPO, and tech industries.
          </p>
        </motion.div>

        {/* Mobile Layout - Keep collapsible */}
        <div className="md:hidden space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-dark-secondary rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-dark-tertiary transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-4">{section.icon}</span>
                  <h3 className={`text-xl font-semibold ${
                    activeSection === section.id ? "text-neon-green" : ""
                  }`}>
                    {section.title}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: activeSection === section.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-gray-400" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {activeSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      {section.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Desktop Layout - Tabs on left, content on right */}
        <div className="hidden md:flex gap-8">
          {/* Left Side - Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-80 flex-shrink-0"
          >
            <div className="space-y-3">
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full p-4 text-left rounded-lg transition-all duration-300 ${
                    activeSection === section.id
                      ? "bg-neon-green text-black"
                      : "bg-dark-secondary hover:bg-dark-tertiary"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">{section.icon}</span>
                    <h3 className="text-lg font-semibold">{section.title}</h3>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="bg-dark-secondary rounded-lg p-8 min-h-[500px]">
              <AnimatePresence mode="wait">
                {sections.map((section) => (
                  activeSection === section.id && (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center mb-6">
                        <span className="text-3xl mr-4">{section.icon}</span>
                        <h3 className="text-2xl font-bold text-neon-green">{section.title}</h3>
                      </div>
                      {section.content}
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
