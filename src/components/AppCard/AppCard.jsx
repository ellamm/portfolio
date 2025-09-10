import { Link } from "react-router-dom";
import { Github, Eye, Play, Star } from "lucide-react";
import { getCategoryIcon } from "../../data/miniApps";
import styles from "./AppCard.module.css";
import buttonStyles from "../../styles/Button.module.css";

export default function AppCard({ app }) {
  return app.type === "external" ? (
    <ExternalAppCard app={app} />
  ) : (
    <InternalAppCard app={app} />
  );
}

function InternalAppCard({ app }) {
  return (
    <Link to={app.route} className={styles.cardLink}>
      <article className={`${styles.card} ${styles["card--internal"]}`}>
        <Header app={app} showScreenshot={false} />
        <Content app={app} showTech={false} />
        <Footer app={app} type="internal" />
        <HoverOverlay />
      </article>
    </Link>
  );
}

function ExternalAppCard({ app }) {
  return (
    <article className={`${styles.card} ${styles["card--external"]}`}>
      <div className={styles.externalBadge}>
        <Github size={14} aria-hidden="true" /> GitHub Project
      </div>
      <Header app={app} showScreenshot={true} />
      <Content app={app} showTech={true} />
      <Footer app={app} type="external" />
    </article>
  );
}

function Header({ app, showScreenshot }) {
  return (
    <header className={styles.header}>
      {showScreenshot && app.images?.length > 0 ? (
        <div className={styles.screenshot}>
          <img src={app.images[0]} alt={`${app.title} screenshot`} />
        </div>
      ) : (
        <IconContainer icon={app.icon} title={app.title} />
      )}
      <CategoryInfo category={app.category} difficulty={app.difficulty} />
    </header>
  );
}

function Content({ app, showTech }) {
  return (
    <main className={styles.content}>
      <h3 className={styles.title}>{app.title}</h3>
      <p className={styles.description}>{app.description}</p>

      {showTech && app.tech?.length > 0 && (
        <TagList title="Tech Stack:" tags={app.tech} type="tech" />
      )}

      {app.features?.length > 0 && (
        <TagList
          title="Key Features:"
          tags={showTech ? app.features.slice(0, 3) : app.features}
          type="feature"
        />
      )}

      {app.skills?.length > 0 && (
        <TagList title="Skills Demonstrated:" tags={app.skills} type="skill" />
      )}
    </main>
  );
}

function Footer({ app, type }) {
  return (
    <footer className={styles.footer}>
      {type === "internal" ? (
        <CardButton
          variant="launch"
          icon={Play}
          ariaLabel={`Launch ${app.title}`}
        >
          Launch App
        </CardButton>
      ) : (
        <div className={styles.buttonGroup}>
          <CardButton
            href={app.liveDemo}
            variant="launch"
            icon={Eye}
            ariaLabel={`Open live demo for ${app.title}`}
          >
            Live Demo
          </CardButton>

          <CardButton
            href={app.route}
            variant="github"
            icon={Github}
            ariaLabel={`View ${app.title} code on GitHub`}
          >
            View Code
          </CardButton>
        </div>
      )}
    </footer>
  );
}

function IconContainer({ icon, title }) {
  return (
    <div
      className={styles.iconContainer}
      role="img"
      aria-label={`${title} icon`}
    >
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
    </div>
  );
}

function CategoryInfo({ category, difficulty }) {
  return (
    <div className={styles.categoryInfo}>
      <div
        className={styles.categoryBadge}
        aria-label={`Category: ${category}`}
      >
        <span aria-hidden="true">{getCategoryIcon(category)}</span>
        <span>{category}</span>
      </div>
      <div
        className={`${styles.difficultyBadge} ${
          styles[difficulty.toLowerCase()]
        }`}
        aria-label={`Difficulty: ${difficulty}`}
      >
        <Star size={12} aria-hidden="true" />
        {difficulty}
      </div>
    </div>
  );
}

function TagList({ title, tags, type }) {
  return (
    <section className={styles.section}>
      <h4 className={styles.sectionTitle}>{title}</h4>
      <div className={styles.tags} role="list">
        {tags.map((tag, index) => (
          <span key={index} className={styles[`${type}Tag`]} role="listitem">
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}

function CardButton({
  href,
  onClick,
  variant,
  icon: Icon,
  children,
  ariaLabel,
}) {
  const className = `${buttonStyles.button} ${
    buttonStyles[`button--${variant}`]
  }`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={ariaLabel}
      >
        {Icon && <Icon size={16} aria-hidden="true" />}
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className} aria-label={ariaLabel}>
      {Icon && <Icon size={16} aria-hidden="true" />}
      {children}
    </button>
  );
}

function HoverOverlay() {
  return <div className={styles.hoverOverlay} aria-hidden="true" />;
}
