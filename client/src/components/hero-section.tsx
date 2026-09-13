import { ArrowUpRight } from "lucide-react";
import professionalImage from "@assets/Untitled design (14).png";

export default function HeroSection() {
  return (
      <div className="hero-content">
        <div className="hero-copy">
        <p className="studio-eyebrow"><span /> AI Learning &amp; Instructional Designer</p>
        <h1 id="hero-title">Complex ideas.<br />Compelling<br /><span>learning.</span></h1>
        <p className="hero-description">I turn complex information into interactive learning experiences. Thoughtfully designed. Brought to life with AI.</p>
        <div className="hero-links">
          <a className="studio-text-link" href="#projects">Explore my work <ArrowUpRight size={17} /></a>
        </div>
        </div>
        <div className="hero-person">
          <img src={professionalImage} alt="Richard de la Cruz" width="220" height="220" />
          <div><p>Richard <span className="hero-surname">de la Cruz</span></p><span>Learning design. Human connection.</span></div>
        </div>
      </div>
  );
}
