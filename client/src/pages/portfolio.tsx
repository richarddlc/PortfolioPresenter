import Navigation from "@/components/navigation";
import LearningStudio from "@/components/learning-studio";
import AboutSection from "@/components/about-section";
import ExperienceSection from "@/components/experience-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";
import CustomCursor from "@/components/CustomCursor";
import FloatingActions from "@/components/FloatingActions";
import SideNavDots from "@/components/SideNavDots";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-dark-primary text-white">
      <CustomCursor />
      <FloatingActions />
      <SideNavDots />
      <Navigation />
      <LearningStudio />
      <div className="portfolio-proof" aria-label="Experience at a glance">
        <div><strong>5+</strong><span>Years of experience</span></div>
        <div><strong>50+</strong><span>eLearning modules</span></div>
        <div><strong>6</strong><span>Companies served</span></div>
        <div><strong>500+</strong><span>Users trained</span></div>
      </div>
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />

      {/* Footer */}
      <footer className="bg-dark-primary py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-700">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">© 2025 Richard de la Cruz. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
