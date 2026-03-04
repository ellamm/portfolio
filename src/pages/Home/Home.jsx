import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import SectionCard from "../../components/SectionCard/SectionCard";
import BottomDock from "../../sections/BottomDock/BottomDock";
import ConstellationLines from "../../sections/ConstellationLines/ConstellationLines";
import ShootingStar from "../../sections/ConstellationLines/ShootingStar";
import StorySection from "../../sections/StorySection/StorySection";
import JourneySection from "../../sections/JourneySection/JourneySection";
import SkillsSection from "../../sections/SkillsSection/SkillsSection";
import ProjectsSection from "../../sections/ProjectsSection/ProjectsSection";
import ContactSection from "../../sections/ContactSection/ContactSection";
import Footer from "../../components/Footer/Footer";
import Terminal from "../../sections/Terminal/Terminal";
import MiniTerminal from "../../sections/Terminal/MiniTerminal";
import styles from "./Home.module.css";

const SECTION_IDS = ["hero", "story", "journey", "skills", "projects", "contact"];
const ROLES = ["Frontend Developer", "Engineering Team Lead", "Technical Product Owner"];

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [photoError, setPhotoError] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const lastSparkleTime = useRef(0);
  const reducedMotion = useRef(
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Typewriter state
  const [direction, setDirection] = useState("typing");
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");

  // Scroll tracking for active section
  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.45;
      let current = "hero";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= threshold) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const full = ROLES[roleIndex];
    let timeout;
    if (direction === "typing") {
      if (displayed.length < full.length) {
        timeout = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 65);
      } else if (roleIndex < ROLES.length - 1) {
        timeout = setTimeout(() => { setRoleIndex(i => i + 1); setDisplayed(""); }, 380);
      } else {
        timeout = setTimeout(() => { setDirection("deleting"); }, 1600);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32);
      } else if (roleIndex > 0) {
        timeout = setTimeout(() => {
          setRoleIndex(i => i - 1);
          setDisplayed(ROLES[roleIndex - 1]);
        }, 140);
      } else {
        timeout = setTimeout(() => { setDirection("typing"); setDisplayed(""); }, 700);
      }
    }
    return () => clearTimeout(timeout);
  }, [direction, displayed, roleIndex]);

  // Terminal keyboard shortcut — '/' opens terminal (not in inputs)
  useEffect(() => {
    const onKey = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.key === "/" && !terminalOpen) { e.preventDefault(); setTerminalOpen(true); }
      if (e.key === "Escape" && terminalOpen) setTerminalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [terminalOpen]);

  // Cursor sparkle trail — hero section only
  useEffect(() => {
    if (reducedMotion.current) return;
    const onMove = (e) => {
      const now = Date.now();
      if (now - lastSparkleTime.current < 55) return;
      const hero = document.getElementById("hero");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;
      lastSparkleTime.current = now;
      const id = now + Math.random();
      setSparkles((prev) => [...prev.slice(-14), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setSparkles((prev) => prev.filter((s) => s.id !== id)), 650);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Tab blur — change title when user switches tabs
  useEffect(() => {
    const original = document.title;
    const onVisChange = () => {
      document.title = document.hidden ? "still here when you're ready" : original;
    };
    document.addEventListener("visibilitychange", onVisChange);
    return () => document.removeEventListener("visibilitychange", onVisChange);
  }, []);

  const handleHire = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.page}>
      <ConstellationLines activeSection={activeSection} />
      <ShootingStar />

      {/* Cursor sparkle trail */}
      {sparkles.map(({ id, x, y }) => (
        <span key={id} className={styles.sparkle} style={{ left: x, top: y }} aria-hidden="true" />
      ))}

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
          <div className={styles.photoFallback} aria-label="MD monogram">MD</div>
        )}

        <div className={styles.heroRoles} aria-live="polite">
          {ROLES.map((role, i) => {
            if (i < roleIndex) return <span key={role} className={styles.heroRole}>{role}</span>;
            if (i === roleIndex) return (
              <span key={role} className={styles.heroRole}>
                {displayed}
                <span className={styles.cursor} aria-hidden="true">|</span>
              </span>
            );
            return null;
          })}
        </div>

        <p className={styles.heroBio}>
          9+ years at Nokia — from C++ to leading 15+ engineers.
          Now building things I love, and open to roles where both sides of that experience matter.
        </p>

        <MiniTerminal onOpen={() => setTerminalOpen(true)} />
      </SectionCard>

      {/* Scroll prompt */}
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

      <BottomDock activeSection={activeSection} />

      {/* Terminal Easter egg */}
      <Terminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onHire={handleHire}
      />
    </div>
  );
}
