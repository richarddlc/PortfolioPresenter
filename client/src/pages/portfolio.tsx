import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ExperienceSection from "@/components/experience-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-dark-primary text-white">
      <Navigation />
      <HeroSection />
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
