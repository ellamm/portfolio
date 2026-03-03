import styles from "./SectionCard.module.css";

/**
 * Shared full-screen section wrapper with a frosted-glass card.
 * Used by every Home section (hero, journey, skills, projects, contact).
 *
 * Props:
 *   id          — section anchor id
 *   children    — card content
 *   className   — optional extra class merged onto the inner card div
 */
export default function SectionCard({ id, children, className = "", sectionClassName = "" }) {
  return (
    <section id={id} className={`${styles.section} ${sectionClassName}`}>
      <div className={`${styles.card} ${className}`}>
        {children}
      </div>
    </section>
  );
}
