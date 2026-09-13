import Navigation from "@/components/navigation";
import LearningStudio from "@/components/learning-studio";
import PortfolioStats from "@/components/portfolio-stats";
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
    <div className="portfolio-page min-h-screen text-white">
      <CustomCursor />
      <FloatingActions />
      <SideNavDots />
      <Navigation />
      <LearningStudio />
      <PortfolioStats />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />

      {/* Footer */}
      <footer className="portfolio-footer py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">© 2025 Richard de la Cruz. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
