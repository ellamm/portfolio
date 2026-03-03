import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import SectionCard from "../../components/SectionCard/SectionCard";
import styles from "./JourneySection.module.css";

const timeline = [
  {
    year: "2015",
    dateRange: "Jul 2015 – Nov 2019",
    role: "Software Engineer",
    company: "Nokia",
    location: "Timișoara, Romania",
    summary: "Telecom alarming systems in C++ and Linux",
    bullets: [
      "Developed and tested features for telecommunications alarming systems using C++ and object-oriented programming.",
      "Wrote clean, maintainable code following best practices and coding standards; participated in code reviews.",
      "Debugged complex technical issues applying systematic problem-solving.",
      "Worked with version control (Git, SVN) and issue tracking (Jira) daily.",
    ],
    x: 15,
    isUp: false,
  },
  {
    year: "2019",
    dateRange: "Nov 2019 – Feb 2022",
    role: "Fault Manager · Agile PO",
    company: "Nokia",
    location: "Timișoara, Romania",
    summary: "Product Owner and critical issue coordinator for fault management",
    bullets: [
      "Managed product backlog and facilitated communication between technical and business teams.",
      "Collaborated with development teams defining technical requirements and user stories.",
      "Prioritized product backlog based on technical dependencies.",
      "Managed technical issue escalations, coordinating resolution efforts.",
      "Facilitated daily interaction with development teams in an agile environment.",
    ],
    x: 38,
    isUp: true,
  },
  {
    year: "2022",
    dateRange: "Feb 2022 – Aug 2024",
    role: "Team Manager",
    company: "Nokia",
    location: "Timișoara, Romania",
    summary: "Led a team of 15+ engineers in telecom software development",
    bullets: [
      "Led cross-functional team of 15+ engineers in telecommunications software development.",
      "Collaborated with developers on technical requirements, user stories, and backlog prioritization.",
      "Managed team scheduling, workload planning, and resource allocation.",
      "Tracked and reported KPIs: delivery timelines, quality metrics, and team productivity.",
      "Served as primary interface between engineering teams and senior leadership.",
    ],
    x: 62,
    isUp: false,
  },
  {
    year: "2025",
    dateRange: "Jan 2025 – Present",
    role: "Frontend Developer",
    company: "Self-employed",
    location: "Remote",
    summary: "Building with React and AI tools — mostly for the joy of it",
    bullets: [
      "Transitioned into modern frontend development through intensive self-directed learning and a structured bootcamp (GoIT Global).",
      "Built and deployed multiple React applications with focus on clean code, component-based architecture, and responsive design.",
      "CalorieIQ (calorieiq.ro) — AI-assisted React app: defined architecture, component structure, and UI/UX; managed AI-generated code through review, debugging, and refactoring.",
      "Portfolio website and E-Learning Platform (React/Vite) — structured content, navigation, and consistent UI patterns.",
    ],
    x: 85,
    isUp: true,
    current: true,
  },
];

const Y_DOWN = 72;
const Y_UP   = 28;

const PATH_D = (() => {
  const pts = timeline.map((e) => ({ x: e.x, y: e.isUp ? Y_UP : Y_DOWN }));
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p = pts[i], q = pts[i + 1];
    const mx = (p.x + q.x) / 2;
    d += ` C${mx},${p.y} ${mx},${q.y} ${q.x},${q.y}`;
  }
  return d;
})();

export default function JourneySection() {
  const [modal, setModal] = useState(null);
  const closeRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    if (!modal) return;
    const onKey = (e) => { if (e.key === "Escape") setModal(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal]);

  // Focus close button when modal opens
  useEffect(() => {
    if (modal && closeRef.current) closeRef.current.focus();
  }, [modal]);

  return (
    <SectionCard id="journey">
      <h2 className={styles.title}>My Journey</h2>

      {/* ── Desktop winding timeline ── */}
      <div className={styles.timelineWrap}>
        <svg
          className={styles.svg}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={PATH_D}
            fill="none"
            stroke="rgba(109,40,217,0.28)"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {timeline.map((entry) => {
          const yPct = entry.isUp ? Y_UP : Y_DOWN;
          return (
            <div
              key={`${entry.year}-${entry.role}`}
              className={styles.nodeGroup}
              style={{ left: `${entry.x}%`, top: `${yPct}%` }}
            >
              {/* Summary above DOWN nodes */}
              {!entry.isUp && (
                <div className={styles.labelAbove}>
                  <span className={styles.summary}>{entry.summary}</span>
                </div>
              )}

              <button
                className={`${styles.circle} ${entry.current ? styles.circleCurrent : ""}`}
                onClick={() => setModal(entry)}
                aria-label={`${entry.year}: ${entry.role} — click for details`}
              >
                <span className={styles.year}>{entry.year}</span>
                <span className={styles.circleRule} aria-hidden="true" />
                <span className={styles.circleRole}>{entry.role}</span>
              </button>

              {/* Summary below UP nodes */}
              {entry.isUp && (
                <div className={styles.labelBelow}>
                  <span className={styles.summary}>{entry.summary}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Mobile stacked fallback ── */}
      <div className={styles.mobileTimeline}>
        {timeline.map((entry, idx) => (
          <div key={`mobile-${entry.year}-${entry.role}`} className={styles.mobileItem}>
            <div className={styles.mobileConnector}>
              <div className={`${styles.mobileDot} ${entry.current ? styles.mobileDotCurrent : ""}`} />
              {idx < timeline.length - 1 && <div className={styles.mobileLine} />}
            </div>
            <button
              className={styles.mobileContent}
              onClick={() => setModal(entry)}
              aria-label={`${entry.year}: ${entry.role} — click for details`}
            >
              <span className={styles.mobileYear}>{entry.year}</span>
              <span className={styles.mobileRole}>{entry.role}</span>
              <span className={styles.mobileCompany}>{entry.company}</span>
            </button>
          </div>
        ))}
      </div>

      {/* ── Detail modal ── */}
      {modal && (
        <div
          className={styles.backdrop}
          onClick={() => setModal(null)}
        >
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="journey-modal-title"
          >
            <button
              ref={closeRef}
              className={styles.modalClose}
              onClick={() => setModal(null)}
              aria-label="Close journey detail"
            >
              <X size={18} />
            </button>
            <span className={styles.modalDateRange}>{modal.dateRange}</span>
            <h3 id="journey-modal-title" className={styles.modalRole}>{modal.role}</h3>
            <span className={styles.modalCompany}>
              {modal.company} · {modal.location}
            </span>
            <ul className={styles.modalBullets}>
              {modal.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </SectionCard>
  );
}
