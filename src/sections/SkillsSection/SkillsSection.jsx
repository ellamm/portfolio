import SectionCard from "../../components/SectionCard/SectionCard";
import styles from "./SkillsSection.module.css";
import sc from "../../components/SectionCard/SectionCard.module.css";

const COLUMNS = [
  {
    accentColor: "#7c3aed",
    category: "Frontend",
    headline: "I build",
    desc: "Modern, accessible interfaces with a focus on craft.",
    skills: ["React & JavaScript", "HTML5 & CSS3", "Responsive Design", "REST APIs & JSON", "Git & GitHub", "Accessibility (WCAG)"],
  },
  {
    accentColor: "#0284c7",
    category: "Leadership",
    headline: "I lead",
    desc: "Engineering teams across planning, delivery, and growth.",
    skills: ["Team of 15+ engineers", "C++ & Linux systems", "Code review & standards", "Hiring & performance", "Cross-team coordination", "KPI tracking"],
  },
  {
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

export default function SkillsSection() {
  return (
    <SectionCard id="skills" title="What I bring">
      <div className={styles.grid}>
        {COLUMNS.map(({ accentColor, category, headline, desc, skills }) => (
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
