import { motion } from "framer-motion";
import { Code, BookOpen, Users } from "lucide-react";

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "eLearning Development",
      icon: <Code className="text-neon-green" size={32} />,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=200",
      skills: [
        "Articulate Storyline & Rise 360",
        "Adobe Creative Suite",
        "Camtasia & Video Production",
        "SCORM/xAPI Compliance",
        "Interactive Assessments",
        "Multimedia Integration",
      ],
    },
    {
      title: "Design Methodologies",
      icon: <BookOpen className="text-neon-green" size={32} />,
      image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=200",
      skills: [
        "ADDIE Framework",
        "Agile (SAM, 4MAT)",
        "Adult Learning Theory",
        "Kirkpatrick Evaluation",
        "Needs Analysis",
        "Curriculum Mapping",
      ],
    },
    {
      title: "Platform Management",
      icon: <Users className="text-neon-green" size={32} />,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=200",
      skills: [
        "SAP Litmos",
        "Cornerstone OnDemand",
        "Axonify & Breeze Server",
        "Learning Analytics",
        "User Management",
        "Performance Tracking",
      ],
    },
  ];

  const coreSkills = [
    { name: "Instructional Design", level: 98 },
    { name: "eLearning Development", level: 95 },
    { name: "Adult Learning Theory", level: 90 },
    { name: "LMS Management", level: 85 },
    { name: "Video Production", level: 82 },
    { name: "Project Management", level: 88 },
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Core Skills & Technologies</h2>
          <p className="text-gray-400">Technologies and methodologies I use to create exceptional learning experiences</p>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-dark-secondary rounded-lg p-8 border border-gray-700 hover:border-neon-green/50 transition-all duration-300"
            >
              <div className="w-full h-48 rounded-lg mb-4 bg-gradient-to-br from-dark-tertiary to-dark-secondary flex items-center justify-center">
                <div className="text-6xl opacity-80">
                  {category.icon}
                </div>
              </div>

              <div className="flex items-center mb-4">
                {category.icon}
                <h3 className="text-xl font-bold ml-3 text-neon-green">{category.title}</h3>
              </div>

              <ul className="space-y-2 text-gray-300">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-neon-green rounded-full mr-3 flex-shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Core Skills Progress Bars */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-dark-secondary p-8 rounded-lg border border-gray-700"
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-neon-green">Expertise Level</h3>

          <div className="grid md:grid-cols-2 gap-8">
            {coreSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-neon-green font-bold">{skill.level}%</span>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, hsl(var(--neon-green)) 0%, #22c55e 100%)"
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <h4 className="text-xl font-semibold mb-6 text-neon-green">Additional Technologies & Tools</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Vyond", "Powtoon", "MURF", "Synthesia", "Canva", "7taps",
              "Evolve", "Snag-it", "Microsoft Office", "Google Workspace",
              "Shelf", "PowerPoint", "Excel", "Word"
            ].map((tech) => (
              <span
                key={tech}
                className="bg-dark-tertiary hover:bg-neon-green hover:text-black transition-colors px-4 py-2 rounded-full text-sm border border-gray-600 hover:border-neon-green"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}