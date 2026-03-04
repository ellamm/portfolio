import { Github, ExternalLink, Play } from "lucide-react";
import styles from "./AppCard.module.css";

const CATEGORY_COLORS = {
  Health:        { bg: "rgba(5, 150, 105, 0.18)",   border: "rgba(5, 150, 105, 0.38)"   },
  Education:     { bg: "rgba(79, 70, 229, 0.18)",   border: "rgba(79, 70, 229, 0.38)"   },
  "E-commerce":  { bg: "rgba(8, 145, 178, 0.18)",   border: "rgba(8, 145, 178, 0.38)"   },
  Games:         { bg: "rgba(124, 58, 237, 0.18)",  border: "rgba(124, 58, 237, 0.38)"  },
  Utility:       { bg: "rgba(245, 158, 11, 0.18)",  border: "rgba(245, 158, 11, 0.38)"  },
  Forms:         { bg: "rgba(225, 29, 72, 0.16)",   border: "rgba(225, 29, 72, 0.34)"   },
  "UI Library":  { bg: "rgba(79, 70, 229, 0.18)",   border: "rgba(79, 70, 229, 0.36)"   },
  API:           { bg: "rgba(8, 145, 178, 0.18)",   border: "rgba(8, 145, 178, 0.36)"   },
  "Landing Page":{ bg: "rgba(217, 70, 239, 0.16)",  border: "rgba(217, 70, 239, 0.34)"  },
  Visual:        { bg: "rgba(245, 158, 11, 0.18)",  border: "rgba(245, 158, 11, 0.36)"  },
};
const DEFAULT_COLOR = { bg: "rgba(99, 102, 241, 0.18)", border: "rgba(99, 102, 241, 0.36)" };

function getHeaderColor(category) {
  return CATEGORY_COLORS[category] ?? DEFAULT_COLOR;
}

export default function AppCard({ app, onLaunch }) {
  return app.type === "external" ? (
    <ExternalCard app={app} />
  ) : (
    <InternalCard app={app} onLaunch={onLaunch} />
  );
}

function ExternalCard({ app }) {
  const color = getHeaderColor(app.category);
  return (
    <article className={styles.card}>
      <CardHeader app={app} color={color} />
      <p className={styles.desc}>{app.description}</p>
      <TagSection label="Tech Stack" tags={app.tech} type="tech" />
      <TagSection label="Skills" tags={app.skills} type="skill" />
      <footer className={styles.footer}>
        <DifficultyBadge difficulty={app.difficulty} />
        <div className={styles.buttons}>
          {app.liveDemo && (
            <a href={app.liveDemo} target="_blank" rel="noopener noreferrer"
              className={`${styles.actionBtn} ${styles.liveBtn}`}
              aria-label={`Live demo for ${app.title}`}>
              <ExternalLink size={12} aria-hidden="true" /> Live
            </a>
          )}
          {app.route && (
            <a href={app.route} target="_blank" rel="noopener noreferrer"
              className={styles.actionBtn}
              aria-label={`${app.title} on GitHub`}>
              <Github size={12} aria-hidden="true" /> GitHub
            </a>
          )}
        </div>
      </footer>
    </article>
  );
}

function InternalCard({ app, onLaunch }) {
  const color = getHeaderColor(app.category);
  return (
    <article
      className={styles.card}
      onClick={() => onLaunch?.(app)}
      style={{ cursor: "pointer" }}
    >
      <CardHeader app={app} color={color} />
      <p className={styles.desc}>{app.description}</p>
      <TagSection label="Tech Stack" tags={app.tech} type="tech" />
      <TagSection label="Skills" tags={app.skills} type="skill" />
      <footer className={styles.footer}>
        <DifficultyBadge difficulty={app.difficulty} />
        <span className={`${styles.actionBtn} ${styles.launchBtn}`}>
          <Play size={12} aria-hidden="true" /> Launch
        </span>
      </footer>
    </article>
  );
}

function CardHeader({ app, color }) {
  return (
    <div
      className={styles.header}
      style={{ "--hbg": color.bg, "--hborder": color.border }}
    >
      <span className={styles.icon}>{app.icon}</span>
      <h3 className={styles.title}>{app.title}</h3>
      {app.category && (
        <span className={styles.categoryChip}>{app.category}</span>
      )}
    </div>
  );
}

function TagSection({ label, tags, type }) {
  if (!tags?.length) return null;
  return (
    <div className={styles.tagSection}>
      <span className={styles.tagLabel}>{label}</span>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <span key={tag} className={`${styles.tag} ${styles[`tag--${type}`]}`}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

function DifficultyBadge({ difficulty }) {
  return (
    <span className={`${styles.diffBadge} ${styles[difficulty.toLowerCase()]}`}>
      {difficulty}
    </span>
  );
}
