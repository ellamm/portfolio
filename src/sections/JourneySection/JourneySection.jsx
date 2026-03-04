import { useState, useEffect, useRef } from "react";
import { X, ChevronRight } from "lucide-react";
import SectionCard from "../../components/SectionCard/SectionCard";
import styles from "./JourneySection.module.css";

const commits = [
  {
    hash: "c389b76",
    tag: "HEAD → main",
    dotColor: "#7c3aed",
    tagColor: "#7c3aed",
    dateRange: "Jan 2025 – Present",
    role: "Frontend Developer",
    company: "Self-employed",
    location: "Remote",
    summary: "Building with React and AI tools — for the joy of it",
    current: true,
    fullDateRange: "Jan 2025 – Present",
    bullets: [
      "Transitioned into modern frontend development through intensive self-directed learning and a structured bootcamp (GoIT Global).",
      "Built and deployed multiple React applications with focus on clean code, component-based architecture, and responsive design.",
      "CalorieIQ (calorieiq.ro) — AI-assisted React app: defined architecture, component structure, and UI/UX; managed AI-generated code through review, debugging, and refactoring.",
      "Portfolio website and E-Learning Platform (React/Vite) — structured content, navigation, and consistent UI patterns.",
    ],
  },
  {
    hash: "7491207",
    tag: "chore/leadership",
    dotColor: "#0284c7",
    tagColor: "#0284c7",
    dateRange: "Feb 2022 – Aug 2024",
    role: "Team Manager",
    company: "Nokia",
    location: "Timișoara, Romania",
    summary: "Led cross-functional team of 15+ engineers",
    fullDateRange: "Feb 2022 – Aug 2024",
    bullets: [
      "Led cross-functional team of 15+ engineers in telecommunications software development.",
      "Collaborated with developers on technical requirements, user stories, and backlog prioritization.",
      "Managed team scheduling, workload planning, and resource allocation.",
      "Tracked and reported KPIs: delivery timelines, quality metrics, and team productivity.",
      "Served as primary interface between engineering teams and senior leadership.",
    ],
  },
  {
    hash: "f759d1f",
    tag: "feat/product-mgmt",
    dotColor: "#059669",
    tagColor: "#059669",
    dateRange: "Nov 2019 – Feb 2022",
    role: "Fault Manager · Agile PO",
    company: "Nokia",
    location: "Timișoara, Romania",
    summary: "Product ownership and critical issue coordination",
    fullDateRange: "Nov 2019 – Feb 2022",
    bullets: [
      "Managed product backlog and facilitated communication between technical and business teams.",
      "Collaborated with development teams defining technical requirements and user stories.",
      "Prioritized product backlog based on technical dependencies.",
      "Managed technical issue escalations, coordinating resolution efforts.",
      "Facilitated daily interaction with development teams in an agile environment.",
    ],
  },
  {
    hash: "04f9a39",
    tag: "feat/initial-commit",
    dotColor: "#64748b",
    tagColor: "#64748b",
    dateRange: "Jul 2015 – Nov 2019",
    role: "Software Engineer",
    company: "Nokia",
    location: "Timișoara, Romania",
    summary: "Telecom alarming systems in C++ and Linux",
    fullDateRange: "Jul 2015 – Nov 2019",
    bullets: [
      "Developed and tested features for telecommunications alarming systems using C++ and object-oriented programming.",
      "Wrote clean, maintainable code following best practices and coding standards; participated in code reviews.",
      "Debugged complex technical issues applying systematic problem-solving.",
      "Worked with version control (Git, SVN) and issue tracking (Jira) daily.",
    ],
  },
];

export default function JourneySection() {
  const [modal, setModal] = useState(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e) => { if (e.key === "Escape") setModal(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal]);

  useEffect(() => {
    if (modal && closeRef.current) closeRef.current.focus();
  }, [modal]);

  return (
    <SectionCard id="journey" title="My Journey">

      <div className={styles.gitLog} role="list">
        {commits.map((commit, idx) => (
          <div key={commit.hash} className={styles.commitRow} role="listitem">

            {/* Graph column */}
            <div className={styles.graph} aria-hidden="true">
              <div
                className={`${styles.dot} ${commit.current ? styles.dotCurrent : ""}`}
                style={{ background: commit.dotColor, boxShadow: commit.current ? `0 0 0 3px ${commit.dotColor}26, 0 0 12px ${commit.dotColor}40` : undefined }}
              />
              {idx < commits.length - 1 && (
                <div className={styles.line} style={{ background: `linear-gradient(to bottom, ${commit.dotColor}60, ${commits[idx + 1].dotColor}40)` }} />
              )}
            </div>

            {/* Commit info */}
            <button
              className={styles.commitInfo}
              onClick={() => setModal(commit)}
              aria-label={`${commit.dateRange}: ${commit.role} at ${commit.company} — click for details`}
            >
              <div className={styles.commitHeader}>
                <span className={styles.hash}>{commit.hash}</span>
                <span
                  className={styles.tag}
                  style={{ color: commit.tagColor, borderColor: `${commit.tagColor}40`, background: `${commit.tagColor}12` }}
                >
                  {commit.tag}
                </span>
                <span className={styles.dateRange}>{commit.dateRange}</span>
                <ChevronRight size={14} className={styles.clickHint} aria-hidden="true" />
              </div>
              <p className={styles.role}>{commit.role}</p>
              <p className={styles.company}>{commit.company} · {commit.location}</p>
              <p className={styles.summary}>{commit.summary}</p>
            </button>
          </div>
        ))}
      </div>

      {/* Detail modal */}
      {modal && (
        <div className={styles.backdrop} onClick={() => setModal(null)}>
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="journey-modal-title"
          >
            <button ref={closeRef} className={styles.modalClose} onClick={() => setModal(null)} aria-label="Close journey detail">
              <X size={18} />
            </button>
            <span className={styles.modalDateRange}>{modal.fullDateRange}</span>
            <h3 id="journey-modal-title" className={styles.modalRole}>{modal.role}</h3>
            <span className={styles.modalCompany}>{modal.company} · {modal.location}</span>
            <ul className={styles.modalBullets}>
              {modal.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        </div>
      )}
    </SectionCard>
  );
}
