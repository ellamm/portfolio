import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
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
const ROLES = ["Frontend Developer", "Engineering Team Lead", "Technical Product Owner"];

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [photoError, setPhotoError] = useState(false);

  // Typewriter state
  const [direction, setDirection] = useState("typing");
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");

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

  // Typewriter effect — type all roles, delete in reverse, loop forever
  useEffect(() => {
    const full = ROLES[roleIndex];
    let timeout;

    if (direction === "typing") {
      if (displayed.length < full.length) {
        timeout = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 65);
      } else if (roleIndex < ROLES.length - 1) {
        // role fully typed, move to next
        timeout = setTimeout(() => { setRoleIndex(i => i + 1); setDisplayed(""); }, 380);
      } else {
        // all roles typed — pause then start deleting
        timeout = setTimeout(() => { setDirection("deleting"); }, 1600);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32);
      } else if (roleIndex > 0) {
        // role deleted, move to previous and restore its full text
        timeout = setTimeout(() => {
          setRoleIndex(i => i - 1);
          setDisplayed(ROLES[roleIndex - 1]);
        }, 140);
      } else {
        // all deleted — pause then restart
        timeout = setTimeout(() => { setDirection("typing"); setDisplayed(""); }, 700);
      }
    }

    return () => clearTimeout(timeout);
  }, [direction, displayed, roleIndex]);

  return (
    <div className={styles.page}>
      <ConstellationLines />

      {/* Hero */}
      <SectionCard id="hero" sectionClassName={styles.heroSection} className={styles.heroCard} noAnimate>
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

        <div className={styles.heroRoles} aria-live="polite">
          {ROLES.map((role, i) => {
            if (i < roleIndex) {
              return <span key={role} className={styles.heroRole}>{role}</span>;
            }
            if (i === roleIndex) {
              return (
                <span key={role} className={styles.heroRole}>
                  {displayed}
                  <span className={styles.cursor} aria-hidden="true">|</span>
                </span>
              );
            }
            return null;
          })}
        </div>

        <p className={styles.heroBio}>
          9+ years at Nokia — from C++ to leading 15+ engineers.
          Now building things I love, and open to roles where both sides of that experience matter.
        </p>

      </SectionCard>

      {/* Scroll prompt — between hero and story */}
      <button
        className={styles.scrollPrompt}
        onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll to My Story"
      >
        <ChevronDown size={28} aria-hidden="true" />
        <span>scroll</span>
      </button>

      {/* Scrollable sections */}
      <StorySection />
      <JourneySection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />

      {/* Fixed dock — always visible */}
      <BottomDock activeSection={activeSection} />
    </div>
  );
}
