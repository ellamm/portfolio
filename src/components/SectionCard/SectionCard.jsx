import { useInView } from "../../hooks/useInView";
import styles from "./SectionCard.module.css";

/**
 * Shared full-screen section wrapper with a frosted-glass card.
 * Animates in (fade + rise) when scrolled into view.
 *
 * Props:
 *   id          — section anchor id
 *   children    — card content
 *   className   — optional extra class merged onto the inner card div
 *   noAnimate   — skip the entrance animation (use for the hero)
 */
export default function SectionCard({ id, title, compact = false, children, className = "", sectionClassName = "", noAnimate = false }) {
  const [ref, inView] = useInView();

  return (
    <section id={id} className={`${styles.section} ${sectionClassName}`}>
      <div
        ref={ref}
        className={`${styles.card} ${className} ${noAnimate || inView ? styles.visible : ""}`}
      >
        {title && <h2 className={compact ? styles.titleCompact : styles.title}>{title}</h2>}
        {children}
      </div>
    </section>
  );
}
