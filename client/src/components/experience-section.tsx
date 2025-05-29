import { motion } from "framer-motion";
import { Briefcase, Award, Code } from "lucide-react";

export default function ExperienceSection() {
  const experiences = [
    {
      period: "MAR 2025 - PRESENT",
      role: "Instructional Designer",
      company: "Sunlife, Taguig",
      description: [
        "Analyze business-submitted training content to ensure alignment with defined learning objectives",
        "Develop ILT and WBT modules using Articulate 360, Adobe Suite, and video tools such as Camtasia",
        "Apply adult learning frameworks (ADDIE, 4MAT, Agile) to create learner-centric programs",
        "Collaborate with SMEs to finalize content and implement rapid-learning cycles",
        "Publish SCORM-compliant content on LMS and Breeze Server; test functionality",
      ],
      icon: <Briefcase className="text-neon-green" size={24} />,
      current: true,
    },
    {
      period: "MAR 2024 - MAR 2025",
      role: "Digital Instructional Designer",
      company: "TTEC, Philippines",
      description: [
        "Created 20+ interactive eLearning modules with scenario-based design",
        "Applied instructional models (ADDIE, SAM) to reduce design cycles by 25%",
        "Managed SAP Litmos LMS for 500+ users; tracked engagement metrics",
        "Published 50+ support articles in Shelf",
        "Collaborated with project managers to align content with KPIs and optimize training ROI",
      ],
      icon: <Code className="text-gray-400" size={24} />,
      current: false,
    },
    {
      period: "AUG 2023 - APR 2024",
      role: "Instructional Designer",
      company: "Cognizant Technology Solutions, Taguig",
      description: [
        "Developed microlearning content using Synthesia, Canva, and Evolve",
        "Improved retention by 15% through interactive learning design",
        "Presented learning designs to senior leadership and led needs assessments",
        "Designed interactive VILT and WBT programs tailored to diverse learner groups",
      ],
      icon: <Award className="text-gray-400" size={24} />,
      current: false,
    },
    {
      period: "MAY 2021 - MAY 2022",
      role: "Learning Experience Designer",
      company: "Manulife, Quezon City",
      description: [
        "Redesigned onboarding programs with SMEs, boosting new hire satisfaction from 70% to 88%",
        "Produced video-based training using Vyond and Camtasia; accelerated learning completion by 25%",
        "Led evaluations using Kirkpatrick Model and managed LMS platforms (Cornerstone, Axonify)",
      ],
      icon: <Award className="text-gray-400" size={24} />,
      current: false,
    },
    {
      period: "AUG 2018 - MAY 2021",
      role: "Training Specialist",
      company: "Philchema Inc, Quezon City",
      description: [
        "Designed and facilitated product training programs, reducing onboarding time by 30%",
        "Authored technical manuals and performance assessments",
        "Collaborated with technical SMEs on updates and improvements",
        "Conducted lab testing and provided feed recommendations to optimize product performance",
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
          <h2 className="text-4xl font-bold mb-4">Work Experience</h2>
          <p className="text-gray-400">My professional journey in instructional design and learning technologies</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-neon-green hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-dark-secondary p-6 rounded-lg border border-gray-700 hover:border-neon-green/50 transition-all duration-300"
              >
                {/* Timeline dot */}
                <div className={`flex-shrink-0 w-16 h-16 ${
                  exp.current ? "bg-neon-green" : "bg-dark-tertiary border-2 border-gray-600"
                } rounded-full flex items-center justify-center z-10 hidden md:flex`}>
                  {exp.icon}
                </div>

                {/* Content */}
                <div className="w-full md:ml-8 bg-dark-primary p-6 rounded-lg border border-gray-700 hover:border-neon-green/50 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                      <div className={`text-sm mb-2 transition-colors duration-300 ${exp.current ? "text-neon-green" : "text-gray-400 group-hover:text-neon-green"}`}>
                        {exp.period}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-neon-green transition-colors duration-300">{exp.role}</h3>
                      <h4 className="text-gray-400 mb-4 group-hover:text-gray-200 transition-colors duration-300">{exp.company}</h4>
                    </div>
                    <div className="md:hidden mb-4 group-hover:scale-110 transition-transform duration-300">{exp.icon}</div>
                  </div>

                  <ul className="text-gray-300 space-y-2 text-sm">
                    {exp.description.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-300">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}