import { Layers, Code2, Github, Mail } from "lucide-react";
import { miniApps } from "../../../../data/miniApps";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const externalCount = miniApps.filter(
    (app) => app.type === "external"
  ).length;
  const internalCount = miniApps.length - externalCount;

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroContent}>
        <h1 id="hero-title" className={styles.heroTitle}>
          Interactive Portfolio of Apps & Projects
        </h1>
        <p className={styles.heroSubtitle}>
          Explore interactive mini-apps you can try in your browser, alongside
          external projects with live demos and source code. Each one highlights
          frontend concepts and skills.
        </p>

        <div
          className={styles.heroStats}
          role="list"
          aria-label="Portfolio statistics"
        >
          <HeroStat
            icon={Layers}
            text={
              <>
                <strong>{internalCount}</strong> Internal Apps
              </>
            }
            label={`Portfolio contains ${internalCount} mini applications`}
          />
          <HeroStat
            icon={Layers}
            text={
              <>
                <strong>{externalCount}</strong> External Projects
              </>
            }
            label={`Portfolio contains ${externalCount} mini applications`}
          />
          <HeroStat
            icon={Code2}
            text={
              <>
                <strong>Frontend</strong> Skills Showcase
              </>
            }
            label="Portfolio showcases React development skills"
          />
        </div>
      </div>
    </section>
  );
}

function HeroStat({ icon: Icon, text, label }) {
  return (
    <div className={styles.stat} role="listitem" aria-label={label}>
      {Icon && <Icon size={20} aria-hidden="true" />}
      <span>{text}</span>
    </div>
  );
}
