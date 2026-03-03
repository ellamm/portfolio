import { useState, useEffect } from "react";
import SectionCard from "../../components/SectionCard/SectionCard";
import BottomDock from "../../sections/BottomDock/BottomDock";
import ConstellationLines from "../../sections/ConstellationLines/ConstellationLines";
import StorySection from "../../sections/StorySection/StorySection";
import JourneySection from "../../sections/JourneySection/JourneySection";
import SkillsSection from "../../sections/SkillsSection/SkillsSection";
import ProjectsSection from "../../sections/ProjectsSection/ProjectsSection";
import ContactSection from "../../sections/ContactSection/ContactSection";
import Footer from "../../components/Footer/Footer";
import styles from "./Home.module.css";

const SECTION_IDS = ["hero", "story", "journey", "skills", "projects", "contact"];

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [photoError, setPhotoError] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.45;
      let current = "hero";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= threshold) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={styles.page}>
      <ConstellationLines />

      {/* Hero — full-viewport card, no extra bottom padding */}
      <SectionCard id="hero" sectionClassName={styles.heroSection} className={styles.heroCard}>
        <h1 className={styles.heroName}>
          <span className={styles.nameFirst}>Mihaela</span>
          <span className={styles.nameLast}>Drondu</span>
        </h1>

        {!photoError ? (
          <div className={styles.photoWrap}>
            <img
              src="/picture.jpg"
              alt="Mihaela Drondu"
              className={styles.photo}
              onError={() => setPhotoError(true)}
            />
          </div>
        ) : (
          <div className={styles.photoFallback} aria-label="MD monogram">
            MD
          </div>
        )}

        <div className={styles.heroRoles}>
          <span className={styles.heroRole}>Frontend Developer</span>
          <span className={styles.heroRole}>Engineering Team Lead</span>
          <span className={styles.heroRole}>Technical Product Owner</span>
        </div>

        <p className={styles.heroBio}>
          9+ years at Nokia — from software engineering through Agile product
          ownership to leading team of 15+. Now exploring frontend and
          AI-assisted development for the joy of it — and open to roles where
          technical depth and leadership experience intersect.
        </p>

        {/* Dock embedded inside the hero card */}
        <BottomDock activeSection={activeSection} embedded />
      </SectionCard>

      {/* Scrollable sections */}
      <StorySection />
      <JourneySection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />

      {/* Fixed dock — appears only when scrolled past hero */}
      {activeSection !== "hero" && <BottomDock activeSection={activeSection} />}
    </div>
  );
}
