import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Calendar, User, Briefcase, Target } from "lucide-react";
import DepthCard from "./depth-card";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  results: string;
  viewLink: string;
  actionLabel?: string;
  resultLabel?: string;
  objectivesLabel?: string;
  thumbnail?: string;
  details: {
    client: string;
    tool: string;
    role: string;
    type: string;
    date?: string;
    overview: string;
    objectives: string[];
    strategies: string[];
    features: string[];
    outcome: string;
  };
}

function ProjectCard({ project, index, onOpenModal }: { project: Project; index: number; onOpenModal: (project: Project) => void }) {
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.15 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <DepthCard className="project-depth-card group">
      {/* Project Thumbnail */}
      {project.thumbnail && (
        <div className="project-thumbnail relative overflow-hidden">
          <motion.img
            src={project.thumbnail}
            alt={project.title}
            className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      <div className="project-card-content p-6 sm:p-8">
        <p className="project-type">{project.subtitle}</p>
        <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>

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
          <h5 className="text-sm font-semibold mb-2 text-neon-green">{project.resultLabel || "Results"}:</h5>
          <p className="text-gray-400 text-sm">{project.results}</p>
        </div>

        <div className="project-actions flex flex-wrap gap-3">
          <motion.button
            onClick={() => onOpenModal(project)}
            className="premium-action px-4 py-3 rounded-lg font-medium transition-colors text-sm"
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
            {project.actionLabel || "View Project"}
            <ExternalLink size={14} />
          </motion.a>
        </div>
      </div>
      </DepthCard>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedProject) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
      if (event.key !== "Tab") return;
      const items = dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button, [tabindex="0"]');
      if (!items?.length) return;
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    };
    document.addEventListener("keydown", keyboard);
    return () => {
      document.removeEventListener("keydown", keyboard);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [selectedProject]);

  const projects: Project[] = [
    {
      id: "kalina-choking-course",
      title: "Choking Response: Custom eLearning",
      subtitle: "Custom development · SCORM 2004",
      description: "A 22-slide course created from scratch for Kalina staff supporting NDIS participants. I developed the content, scripts, interactions and assessment, then built the experience primarily with Claude in HTML, CSS and JavaScript, without a traditional authoring tool.",
      technologies: ["Claude", "HTML / CSS / JavaScript", "SCORM 2004", "ChatGPT", "ElevenLabs", "Canva", "Figma"],
      resultLabel: "Deliverable",
      results: "A custom SCORM 2004 course combining narrated content, interactive practice, workplace scenarios and a 12-question assessment.",
      actionLabel: "View Course",
      viewLink: "https://richardportfolio10.s3.ap-southeast-2.amazonaws.com/build/index.html",
      thumbnail: "/assets/kalina-choking-response.png",
      details: {
        client: "Kalina Health & Community Services",
        tool: "Claude + HTML, CSS & JavaScript",
        role: "Instructional Designer & Developer",
        type: "Custom eLearning · SCORM 2004",
        overview: "Kalina needed learning resources for staff supporting NDIS participants. Starting with the training need and no supplied course content, I developed Choking Response from the initial content and script through storyboarding, interaction design, development and SCORM 2004 packaging. Claude was the primary coding tool; the course was built directly in HTML, CSS and JavaScript without a traditional authoring tool.",
        objectives: [
          "Recognise signs of choking and distinguish between different levels of severity.",
          "Practise decisions about responding, escalating and reporting within a disability-support context.",
          "Connect choking prevention to individual mealtime management plans and everyday staff responsibilities."
        ],
        strategies: [
          "Develop the content and learning sequence from the training need, supported by the references documented in the storyboard.",
          "Use hotspots, matching, flip cards, tabs and accordions to break information into focused interactions.",
          "Place decisions in workplace scenarios, including support for a wheelchair user and a person with limited verbal communication.",
          "Combine ungraded practice with a 12-question final assessment and feedback."
        ],
        features: [
          "Claude: primary tool for custom HTML, CSS and JavaScript development.",
          "ChatGPT: course scripting support.",
          "ElevenLabs: voiceover production.",
          "Canva: image editing and preparation.",
          "Figma: visual storyboarding; a separate written storyboard documents narration, content and interactions.",
          "SCORM 2004 packaging with a custom course player, progress navigation and assessment."
        ],
        outcome: "Produced a complete custom-coded learning experience and its written design documentation for Kalina. The public course link provides a standalone preview. The storyboard preserves the project's clinical-review notes; this case study describes the design and development deliverables."
      }
    },
    {
      id: "kalina-choking-storyboard",
      title: "Choking Response: Written Storyboard",
      subtitle: "Design documentation · Content & narration",
      description: "The written design blueprint behind the Kalina course: a 22-slide plan covering learning objectives, narration, interactions, scenario feedback and assessment questions. This sample shows the content and instructional decisions; the visual storyboards were created separately in Figma.",
      technologies: ["Instructional Design", "Content Development", "ChatGPT", "Narration Scripting", "Assessment Design", "Figma Visual Storyboards"],
      resultLabel: "Deliverable",
      results: "A readable, slide-by-slide design document connecting the content, voiceover script, interaction plans and assessment.",
      actionLabel: "Read Storyboard",
      objectivesLabel: "Design Goals",
      viewLink: "/projects/kalina-choking-response/storyboard.html",
      thumbnail: "/assets/kalina-choking-storyboard.svg",
      details: {
        client: "Kalina Health & Community Services",
        tool: "Written HTML document · Figma visuals",
        role: "Instructional Designer & Content Developer",
        type: "Written storyboard · Portfolio sample",
        overview: "This companion artifact makes the instructional design behind Choking Response visible. It records the learning objectives, narration, screen sequence, interaction choices, scenario responses and assessment items used to guide course development. The linked sample is the written storyboard; Figma was used separately to plan the visual experience.",
        objectives: [
          "Translate the staff-training need into a coherent 22-slide learning sequence.",
          "Align the narration, on-screen content and learner interactions.",
          "Document scenarios, feedback and assessment items before implementation."
        ],
        strategies: [
          "Map each slide to its purpose, interaction type and planned content.",
          "Write narration alongside the content plan to support production and review.",
          "Specify scenario options and feedback so instructional intent carries through to development.",
          "Maintain source references and clinical-review notes within the design document."
        ],
        features: [
          "22-slide content and interaction map.",
          "Narration script and planned voiceover content.",
          "Hotspot, matching, flip-card, tab and accordion specifications.",
          "Workplace scenarios, practice feedback and 12 final-assessment questions.",
          "Browser-readable document with section navigation and source references.",
          "Visual storyboards created separately in Figma."
        ],
        outcome: "A detailed written blueprint connecting the training brief to the finished course. The portfolio copy retains the original document's review and source notes and presents the written design process as a separate work sample."
      }
    },
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
    <section id="projects" className="premium-section py-20 px-4 sm:px-6 lg:px-8">
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
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore custom-coded learning, instructional storyboards, and interactive eLearning built around real workplace needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenModal={openProjectModal}
            />
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
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-dialog-title"
                tabIndex={-1}
                className="premium-dialog bg-dark-primary border border-gray-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 z-10 bg-dark-primary border-b border-gray-700 p-5 sm:p-6 flex justify-between items-start gap-4">
                  <div className="min-w-0">
                    <h3 id="project-dialog-title" className="text-2xl font-bold text-neon-green mb-2">{selectedProject.title}</h3>
                    <p className="project-type mb-0">{selectedProject.subtitle}</p>
                  </div>
                  <button onClick={closeModal} aria-label="Close project details" className="shrink-0 p-1 text-gray-400 hover:text-white transition-colors">
                    <X size={24} />
                  </button>
                </div>

                {/* Keep longer project metadata outside the sticky title on phones. */}
                <div className="p-5 sm:p-6 space-y-6">
                    <div className="grid sm:grid-cols-2 gap-5 text-sm border-b border-gray-700 pb-6">
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
                          <p className="text-gray-400">Build / design tools</p>
                          <p className="font-medium">{selectedProject.details.tool}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-neon-green" />
                        <div>
                          <p className="text-gray-400">{selectedProject.details.date ? "Date" : "Format"}</p>
                          <p className="font-medium">{selectedProject.details.date || selectedProject.details.type}</p>
                        </div>
                      </div>
                    </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-neon-green">Project Overview</h4>
                    <p className="text-gray-300 leading-relaxed">{selectedProject.details.overview}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-neon-green">{selectedProject.objectivesLabel || "Learning Objectives"}</h4>
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
                      {selectedProject.actionLabel || "View Project"}
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
