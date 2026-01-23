import { motion } from "framer-motion";
import { Briefcase, Award, Code } from "lucide-react";

export default function ExperienceSection() {
  const experiences = [
    {
      period: "AUG 2025 - PRESENT",
      role: "Freelance Instructional Designer",
      company: "Self-Employed | Remote",
      description: [
        "Delivered 20+ custom eLearning modules and 10+ comprehensive training curricula for healthcare and IT clients",
        "Designed UI layouts, mockups, and storyboards using Figma and Canva, ensuring cohesive visual learning experiences",
        "Developed interactive content in Articulate Storyline and Rise 360, including custom HTML/CSS/JavaScript interactions",
        "Produced engaging video animations using Vyond, enhancing learner engagement and content retention",
        "Leveraged AI tools (OpenAI, Claude, ElevenLabs, NanoBanana) to accelerate development workflows and improve content quality",
      ],
      icon: <Briefcase className="text-neon-green" size={24} />,
      current: true,
    },
    {
      period: "FEB 2025 - JUL 2025",
      role: "Instructional Designer",
      company: "SunLife | Taguig",
      description: [
        "Designed and developed eLearning modules for multiple business lines supporting SUMMIT platform, incorporating scenario-based case studies that improved knowledge application",
        "Created innovative gamified learning experiences, including escape room modules, increasing learner engagement scores by 30%",
        "Pioneered AI-driven training simulations using OpenAI and Storyline, reducing content development time by 20%",
        "Applied advanced techniques from Agile 101, JavaScript in Storyline, and Power Automate to drive innovation initiatives",
      ],
      icon: <Briefcase className="text-gray-400" size={24} />,
      current: false,
    },
    {
      period: "MAR 2024 - MAR 2025",
      role: "Digital Instructional Designer",
      company: "TTEC | Mandaluyong",
      description: [
        "Produced 20+ interactive eLearning modules featuring scenario-based design, contributing to a 15% improvement in learner assessment outcomes",
        "Streamlined content development workflows by implementing ADDIE and Agile methodologies, reducing production time by 25%",
        "Managed SAP Litmos LMS for 500+ users, tracking engagement metrics and publishing 50+ knowledge base articles",
        "Collaborated with project managers to align training content with KPIs, optimizing training ROI and stakeholder satisfaction",
      ],
      icon: <Code className="text-gray-400" size={24} />,
      current: false,
    },
    {
      period: "AUG 2023 - APR 2024",
      role: "Instructional Designer",
      company: "Cognizant Technology Solutions | Taguig",
      description: [
        "Developed microlearning content using Synthesia, Canva, and Evolve platforms, improving learner retention by 15%",
        "Led needs assessments for global projects and presented learning designs to senior leadership",
        "Designed interactive VILT and WBT programs tailored to diverse learner demographics and regional requirements",
      ],
      icon: <Award className="text-gray-400" size={24} />,
      current: false,
    },
    {
      period: "MAY 2022 - AUG 2023",
      role: "Digital Instructional Designer",
      company: "TTEC | Mandaluyong",
      description: [
        "Created microlearning content using Synthesia, Canva, and 7taps, achieving 15% improvement in knowledge retention",
        "Facilitated stakeholder presentations and led comprehensive needs assessments for global training initiatives",
      ],
      icon: <Code className="text-gray-400" size={24} />,
      current: false,
    },
    {
      period: "JUL 2021 - MAY 2022",
      role: "Learning Experience Designer",
      company: "Manulife | Quezon City",
      description: [
        "Redesigned onboarding programs in collaboration with SMEs, boosting new hire satisfaction from 70% to 88%",
        "Produced video-based training using Vyond and Camtasia, accelerating learning completion rates by 25%",
        "Led training evaluations using Kirkpatrick Model and managed LMS platforms (Cornerstone, Axonify)",
      ],
      icon: <Award className="text-gray-400" size={24} />,
      current: false,
    },
    {
      period: "MAY 2021 - JUL 2021",
      role: "Training Specialist",
      company: "Philchema Inc. | Quezon City",
      description: [
        "Designed and facilitated product training programs, reducing onboarding time by 30%",
        "Authored technical manuals and performance assessments in collaboration with technical SMEs",
      ],
      icon: <Award className="text-gray-400" size={24} />,
      current: false,
    },
    {
      period: "AUG 2018 - MAY 2021",
      role: "Technical Staff",
      company: "Philchema Inc. | Quezon City",
      description: [
        "Conducted laboratory testing and provided data-driven feed recommendations to optimize product performance",
        "Assisted in R&D trials and analyzed data for market positioning strategies",
        "Managed testing records and documentation using Google Sheets, ensuring accuracy and traceability",
      ],
      icon: <Award className="text-gray-400" size={24} />,
      current: false,
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-neon-green to-white bg-clip-text text-transparent animate-gradient">
              Work Experience
            </span>
          </h2>
          <p className="text-gray-400">My professional journey in instructional design and learning technologies</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line with gradient */}
          <motion.div
            className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-green via-green-400 to-gray-600 hidden md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex items-start md:pl-24">
                {/* Timeline dot with animation */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`absolute left-4 top-8 flex-shrink-0 w-8 h-8 ${
                    exp.current ? "bg-neon-green glow-neon" : "bg-dark-tertiary border-2 border-gray-600"
                  } rounded-full flex items-center justify-center z-10 hidden md:flex`}
                >
                  {exp.current && (
                    <motion.div
                      className="w-3 h-3 bg-white rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Content card */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="w-full group"
                >
                  <div className={`p-6 rounded-lg border border-gray-700 hover:border-neon-green/50 transition-all duration-300 glass-card glass-card-hover ${
                    exp.current ? "glow-neon" : ""
                  }`}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <div className="flex-1">
                        <motion.div
                          className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${
                            exp.current
                              ? "bg-neon-green/20 text-neon-green border border-neon-green/50"
                              : "bg-gray-700 text-gray-400"
                          }`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {exp.period}
                        </motion.div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-neon-green transition-colors duration-300">
                          {exp.role}
                        </h3>
                        <h4 className="text-gray-400 mb-4 group-hover:text-gray-200 transition-colors duration-300">
                          {exp.company}
                        </h4>
                      </div>
                      <motion.div
                        className="mb-4 md:mb-0"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {exp.icon}
                      </motion.div>
                    </div>

                    <ul className="text-gray-300 space-y-2 text-sm">
                      {exp.description.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 + itemIndex * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <span className="text-neon-green mr-2 flex-shrink-0">•</span>
                          <span className="group-hover:text-white transition-colors duration-300">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
