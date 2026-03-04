import { useState, useEffect } from "react";
import { useInView } from "../../hooks/useInView";
import SectionCard from "../../components/SectionCard/SectionCard";
import styles from "./StorySection.module.css";

const STATS = [
  { num: "9",   label: "years at Nokia" },
  { num: "15+", label: "engineers led"  },
  { num: "3",   label: "roles worn"     },
];

function AnimatedNum({ value, active }) {
  const parsed = parseInt(value, 10);
  const suffix = value.replace(/\d/g, "");
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) {
      setN(0);
      return;
    }
    let current = 0;
    const step = Math.max(28, Math.round(1100 / parsed));
    const id = setInterval(() => {
      current += 1;
      setN(current);
      if (current >= parsed) clearInterval(id);
    }, step);
    return () => clearInterval(id);
  }, [active, parsed]);

  if (isNaN(parsed)) return <>{value}</>;
  return <>{n}{suffix}</>;
}

export default function StorySection() {
  const [statsRef, statsInView] = useInView({ once: false });

  return (
    <SectionCard id="story" title="My Story">
      <div className={styles.body}>

        <p className={styles.para}>
          My career didn't start in a browser and isn't a straight line to
          frontend. I started it writing <code className={styles.kw}>C++</code> code
          for Nokia's alarming systems — production software running in live networks,
          where reliability is not optional. Over nine years, I moved from engineering
          into Agile product ownership and eventually led a team of{" "}
          <code className={styles.kw}>15+ engineers</code>.
        </p>

        <div ref={statsRef} className={styles.stats} role="list" aria-label="Career highlights">
          {STATS.map(({ num, label }) => (
            <div key={label} className={styles.stat} role="listitem">
              <span className={styles.statNum}>
                <AnimatedNum value={num} active={statsInView} />
              </span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </div>

        <p className={styles.para}>
          Then I made a deliberate choice to take a break and experiment again
          with hands-on building — not because management wasn't fulfilling,
          but because the engineers I most respected never lost touch with the
          code. So I dove into <code className={styles.kw}>modern frontend</code> and{" "}
          <code className={styles.kw}>AI-assisted development</code>, mostly for the
          joy of it — experimenting with tools, building things that interest me,
          and staying close to the craft while I figure out where I want to go next.
        </p>

        <figure className={styles.pullQuote}>
          <blockquote>
            <p className={styles.pullQuoteText}>
              "The engineers I most respected never lost touch with the code."
            </p>
          </blockquote>
          <figcaption className={styles.pullQuoteSub}>
            So I didn't either. What I bring that a bootcamp graduate cannot:
            I've sat on both sides of the code review, I know what
            "production-ready" actually means, and I know how to work across
            engineering, product, and business stakeholder layers simultaneously.
            That's not a gap in my profile — it's the whole point.
          </figcaption>
        </figure>

      </div>
    </SectionCard>
  );
}
