import { useState } from "react";
import SectionCard from "../../components/SectionCard/SectionCard";
import styles from "./SkillsSection.module.css";
import sc from "../../components/SectionCard/SectionCard.module.css";

const ALL_COLUMNS = [
  {
    id: "frontend",
    accentColor: "#7c3aed",
    category: "Frontend",
    headline: "I build",
    desc: "Modern, accessible interfaces with a focus on craft.",
    skills: ["React & JavaScript", "HTML5 & CSS3", "Responsive Design", "REST APIs & JSON", "Git & GitHub", "Accessibility (WCAG)", "AI-assisted Development"],
  },
  {
    id: "leadership",
    accentColor: "#0284c7",
    category: "Leadership",
    headline: "I lead",
    desc: "Engineering teams across planning, delivery, and growth.",
    skills: ["Team of 15+ engineers", "C++ & Linux systems", "Code review & standards", "Hiring & performance", "Cross-team coordination", "KPI tracking"],
  },
  {
    id: "product",
    accentColor: "#059669",
    category: "Product",
    headline: "I align",
    desc: "From backlog to stakeholders — end to end.",
    skills: ["Agile / Scrum", "Product ownership", "Stakeholder management", "Risk & dependency mgmt", "Jira & Confluence", "Critical escalation"],
  },
];


const languages = [
  { lang: "English",  level: "C2"    },
  { lang: "Romanian", level: "C2"    },
  { lang: "German",   level: "A1/A2" },
  { lang: "Spanish",  level: "A1"    },
];

// Helper: renders a highlighted string array inline
function StrArr({ items }) {
  return (
    <>
      {items.map((item, i) => (
        <span key={item}>
          <span className={styles.str}>&quot;{item}&quot;</span>
          {i < items.length - 1 && <span className={styles.punct}>, </span>}
        </span>
      ))}
    </>
  );
}

// Manual syntax-highlighted code block — mirrors the visual cards 1-to-1
function CodeView() {
  return (
    <pre className={styles.codeBlock} aria-label="Skills as a JavaScript object">
      <span className={styles.kw}>const</span>{" "}
      <span className={styles.ident}>mihaela</span>{" "}
      <span className={styles.op}>=</span>{" "}
      <span className={styles.punct}>{"{"}</span>{"\n"}

{"  "}<span className={styles.comment}>{"// Frontend: I build"}</span>{"\n"}
{"  "}<span className={styles.prop}>builds</span><span className={styles.op}>:</span>{" "}
      <span className={styles.punct}>[</span>
      <StrArr items={["React & JavaScript", "HTML5 & CSS3", "Responsive Design", "REST APIs & JSON", "Git & GitHub", "Accessibility (WCAG)", "AI-assisted Development"]} />
      <span className={styles.punct}>{"],"}</span>{"\n"}

{"  "}<span className={styles.comment}>{"// Leadership: I lead"}</span>{"\n"}
{"  "}<span className={styles.prop}>leads</span><span className={styles.op}>:</span>{" "}
      <span className={styles.punct}>[</span>
      <StrArr items={["Team of 15+ engineers", "C++ & Linux systems", "Code review & standards", "Hiring & performance", "Cross-team coordination", "KPI tracking"]} />
      <span className={styles.punct}>{"],"}</span>{"\n"}

{"  "}<span className={styles.comment}>{"// Product: I align"}</span>{"\n"}
{"  "}<span className={styles.prop}>aligns</span><span className={styles.op}>:</span>{" "}
      <span className={styles.punct}>[</span>
      <StrArr items={["Agile / Scrum", "Product ownership", "Stakeholder management", "Risk & dependency mgmt", "Jira & Confluence", "Critical escalation"]} />
      <span className={styles.punct}>{"],"}</span>{"\n"}

{"  "}<span className={styles.prop}>speaks</span><span className={styles.op}>:</span>{" "}
      <span className={styles.punct}>{"{ "}</span>
      <span className={styles.prop}>Romanian</span><span className={styles.op}>:</span>{" "}<span className={styles.str}>&quot;C2&quot;</span>
      <span className={styles.punct}>, </span>
      <span className={styles.prop}>English</span><span className={styles.op}>:</span>{" "}<span className={styles.str}>&quot;C2&quot;</span>
      <span className={styles.punct}>, </span>
      <span className={styles.prop}>German</span><span className={styles.op}>:</span>{" "}<span className={styles.str}>&quot;A1/A2&quot;</span>
      <span className={styles.punct}>, </span>
      <span className={styles.prop}>Spanish</span><span className={styles.op}>:</span>{" "}<span className={styles.str}>&quot;A1&quot;</span>
      <span className={styles.punct}>{" },"}</span>{"\n"}

{"  "}<span className={styles.comment}>{"// yes, this portfolio was built with AI assistance"}</span>{"\n"}
{"  "}<span className={styles.comment}>{"// currently: open to new roles"}</span>{"\n"}
{"  "}<span className={styles.comment}>{"// last_deploy: \"March 2026\""}</span>{"\n"}
      <span className={styles.punct}>{"}"}</span><span className={styles.op}>;</span><span className={styles.codeCursor} aria-hidden="true" />
    </pre>
  );
}

export default function SkillsSection() {
  const [view, setView] = useState("code");
  const columns = ALL_COLUMNS;

  return (
    <SectionCard id="skills" title="What I bring">

      {/* Code block view */}
      <div className={styles.codeWrap}>
        <div className={styles.codeBar}>
          <span className={styles.codeDot} style={{ background: "#ff5f57" }} />
          <span className={styles.codeDot} style={{ background: "#febc2e" }} />
          <span className={styles.codeDot} style={{ background: "#28c840" }} />
          <span className={styles.codeFileName}>mihaela.js</span>
        </div>
        <CodeView />
      </div>

      {/* Toggle */}
      <div className={styles.toggleRow}>
        <span className={styles.comment}>
          {view === "code" ? "// ↓ rendered output" : "// ↑ view as code"}
        </span>
        <button
          className={styles.toggleBtn}
          onClick={() => setView(v => v === "code" ? "visual" : "code")}
        >
          {view === "code" ? "Show visual breakdown" : "Show as code"}
        </button>
      </div>

      {/* Visual cards */}
      {view === "visual" && (
        <div className={styles.grid}>
          {columns.map(({ accentColor, category, headline, desc, skills }) => (
            <div
              key={category}
              className={styles.capCard}
              style={{ "--card-accent": accentColor }}
            >
              <div>
                <span className={styles.capCategory}>{category}</span>
                <h3 className={styles.capHeadline}>{headline}</h3>
                <p className={styles.capDesc}>{desc}</p>
              </div>
              <div className={styles.chips}>
                {skills.map((s) => (
                  <span key={s} className={styles.chip}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Languages — always visible */}
      <div className={styles.languagesRow}>
        <h3 className={sc.subHeading}>Languages</h3>
        <div className={styles.langList}>
          {languages.map(({ lang, level }) => (
            <span key={lang} className={styles.langChip}>
              {lang} <span className={styles.langLevel}>{level}</span>
            </span>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
