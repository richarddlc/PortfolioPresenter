import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Calendar, User, Briefcase, Target } from "lucide-react";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  results: string;
  viewLink: string;
  thumbnail?: string;
  details: {
    client: string;
    tool: string;
    role: string;
    type: string;
    date: string;
    overview: string;
    objectives: string[];
    strategies: string[];
    features: string[];
    outcome: string;
  };
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: "escape-room",
      title: "Nice to Know: Escape Room Module",
      subtitle: "Gamified Microlearning",
      description: "A gamified e-learning experience created for seasoned Plan Specialists at Sun Life. Designed as an escape room, the module reinforces additional product knowledge through interactive challenges, puzzles, and scenario-based tasks.",
      technologies: ["Articulate Storyline", "Gamification", "Scenario-Based Learning", "Instructional Design", "Microlearning"],
      results: "High engagement among advanced learners, positive feedback for creativity, and successful knowledge reinforcement beyond core topics.",
      viewLink: "https://richardportfolio10.s3.ap-southeast-2.amazonaws.com/Nice+to+Know_Richard+-+Storyline+output/story.html",
      thumbnail: "/assets/Nice to Know.png",
      details: {
        client: "Sun Life Financial",
        tool: "Articulate Storyline 360",
        role: "Instructional Designer",
        type: "Self-paced E-learning / Gamified Learning",
        date: "March 2025",
        overview: "This module was part of the GB Admin Life Plan curriculum designed for experienced Plan Specialists. Rather than reiterating core knowledge, it provided additional context, updates, and historical insights—packaged in a fun, gamified experience using an escape room format to boost engagement.",
        objectives: [
          "Deepen understanding of non-critical but relevant topics like Paid-Up Life, Clarica Heritage, and non-coded Phoenix scenarios.",
          "Encourage self-directed discovery through puzzles and scenario-based learning.",
          "Reinforce key updates via challenge-based tasks and knowledge checks."
        ],
        strategies: [
          "Gamification: Learners solve puzzles to progress through different \"rooms,\" each representing a knowledge topic.",
          "Scenario-Based Learning: Challenges were wrapped in realistic, work-relevant scenarios.",
          "Immediate Feedback: Learners received guided feedback after each activity to reinforce correct understanding."
        ],
        features: [
          "Articulate Storyline 360 with custom triggers and branching",
          "Drag-and-drop activities, locked progression, and timers",
          "Custom avatars and themed visuals for immersion",
          "Final \"Self Check\" room with cumulative scenario challenges"
        ],
        outcome: "The module received positive feedback from internal SMEs and learners for its creativity and effectiveness. It was praised for being a refreshing departure from traditional compliance-focused modules while still reinforcing critical operational context."
      }
    },
    {
      id: "gib-case-study",
      title: "GIB Case Study Module",
      subtitle: "Scenario-Based Training",
      description: "Interactive case study training for Case Managers to strengthen decision-making on Guaranteed Insurability Benefit (GIB) requests. Includes realistic scenarios, system simulations, and ATHENA-based guidance.",
      technologies: ["Articulate Storyline", "Scenario-Based Learning", "System Simulation", "Branching Logic", "Instructional Design"],
      results: "Improved learner confidence and accuracy in GIB handling, with strong SME endorsement for real-world alignment.",
      viewLink: "https://richardportfolio10.s3.ap-southeast-2.amazonaws.com/GIB+Case+Study_Richard/story.html",
      thumbnail: "/assets/GIB Case Study.png",
      details: {
        client: "Sun Life Financial",
        tool: "Articulate Storyline 360",
        role: "Instructional Designer",
        type: "Self-paced E-learning | Case Study Simulation",
        date: "March 2025",
        overview: "This module is part of the My New Business Options Learning Curriculum tailored for Case Managers. It focuses on helping learners navigate Guaranteed Insurability Benefit (GIB) cases through interactive case studies, guided decision-making, and realistic system simulations using ATHENA procedures.",
        objectives: [
          "Understand how to identify and assess GIB requests.",
          "Navigate the correct procedures using PHOENIX and ATHENA systems.",
          "Apply judgment in nuanced scenarios using real-life case data."
        ],
        strategies: [
          "Scenario-Based Learning: Multiple case studies drawn from real GIB situations.",
          "Guided Prompts: Learners make decisions with immediate feedback.",
          "System Simulation Walkthroughs: Simulated screens to reinforce navigation and actions in PHOENIX.",
          "Branching Logic: Paths differ based on learner choices, allowing them to explore consequences."
        ],
        features: [
          "Articulate Storyline 360 with advanced triggers",
          "Custom feedback layers",
          "Simulated UI based on Sun Life's PHOENIX system",
          "Embedded ATHENA procedure notes"
        ],
        outcome: "Learners reported greater confidence in managing GIB scenarios. SMEs commended the training for its realism and accuracy. The module became a benchmark for other case study-based trainings in the curriculum."
      }
    }
  ];

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore my latest instructional design projects showcasing innovative e-learning solutions and gamified experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-dark-secondary rounded-lg border border-gray-700 hover:border-neon-green/50 transition-all duration-300 group overflow-hidden"
            >
              {/* Project Thumbnail */}
              {project.thumbnail && (
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 left-4 right-4"
                  >
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                      <h3 className="text-lg font-bold text-neon-green">{project.title}</h3>
                      <p className="text-sm text-gray-300">{project.subtitle}</p>
                    </div>
                  </motion.div>
                </div>
              )}
              
              <div className="p-6">
                {!project.thumbnail && (
                  <>
                    <h3 className="text-xl font-bold mb-2 text-neon-green">{project.title}</h3>
                    <h4 className="text-lg font-semibold mb-4 text-gray-300">{project.subtitle}</h4>
                  </>
                )}
                
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

              <div className="mb-4">
                <h5 className="text-sm font-semibold mb-2 text-neon-green">Technologies & Methods:</h5>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="bg-dark-tertiary text-xs px-2 py-1 rounded border border-gray-600">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h5 className="text-sm font-semibold mb-2 text-neon-green">Results:</h5>
                <p className="text-gray-400 text-sm">{project.results}</p>
              </div>

              <div className="flex gap-3">
                  <motion.button
                    onClick={() => openProjectModal(project)}
                    className="bg-neon-green text-black px-4 py-2 rounded-lg font-medium hover:bg-green-400 transition-colors text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Show more
                  </motion.button>
                  <motion.a
                    href={project.viewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-neon-green text-neon-green px-4 py-2 rounded-lg font-medium hover:bg-neon-green hover:text-black transition-colors text-sm flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Project
                    <ExternalLink size={14} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-dark-primary border border-gray-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-dark-primary border-b border-gray-700 p-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-neon-green mb-2">{selectedProject.title}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-neon-green" />
                        <div>
                          <p className="text-gray-400">Client</p>
                          <p className="font-medium">{selectedProject.details.client}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} className="text-neon-green" />
                        <div>
                          <p className="text-gray-400">Role</p>
                          <p className="font-medium">{selectedProject.details.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target size={16} className="text-neon-green" />
                        <div>
                          <p className="text-gray-400">Tool</p>
                          <p className="font-medium">{selectedProject.details.tool}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-neon-green" />
                        <div>
                          <p className="text-gray-400">Date</p>
                          <p className="font-medium">{selectedProject.details.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-neon-green">Project Overview</h4>
                    <p className="text-gray-300 leading-relaxed">{selectedProject.details.overview}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-neon-green">Learning Objectives</h4>
                    <ul className="space-y-2">
                      {selectedProject.details.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-300">
                          <div className="w-2 h-2 bg-neon-green rounded-full mt-2 flex-shrink-0" />
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-neon-green">Instructional Strategies</h4>
                    <ul className="space-y-2">
                      {selectedProject.details.strategies.map((strategy, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-300">
                          <div className="w-2 h-2 bg-neon-green rounded-full mt-2 flex-shrink-0" />
                          {strategy}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-neon-green">Tools & Features</h4>
                    <ul className="space-y-2">
                      {selectedProject.details.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-300">
                          <div className="w-2 h-2 bg-neon-green rounded-full mt-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-neon-green">Outcome</h4>
                    <p className="text-gray-300 leading-relaxed">{selectedProject.details.outcome}</p>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <a
                      href={selectedProject.viewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-neon-green text-black px-6 py-3 rounded-lg font-medium hover:bg-green-400 transition-colors inline-flex items-center gap-2"
                    >
                      View Project
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
