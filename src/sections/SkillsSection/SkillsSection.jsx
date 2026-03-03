import {
  Code2, Palette, GitBranch, Globe, Accessibility, Database,
  Users, ClipboardList, BarChart2, Flag, Cpu, Layers,
  Route, MessageSquare, AlertCircle,
} from "lucide-react";
import SectionCard from "../../components/SectionCard/SectionCard";
import styles from "./SkillsSection.module.css";

const frontendSkills = [
  { Icon: Code2,        label: "React & JavaScript (ES6+)" },
  { Icon: Palette,      label: "HTML5, CSS3 & Responsive Design" },
  { Icon: Layers,       label: "Component-Based Architecture" },
  { Icon: Globe,        label: "REST APIs & JSON" },
  { Icon: GitBranch,    label: "Git & GitHub" },
  { Icon: Accessibility,label: "Accessibility (ARIA, WCAG)" },
];

const leadershipSkills = [
  { Icon: Users,        label: "Team Management (15+ engineers)" },
  { Icon: Cpu,          label: "C++ & Linux Engineering" },
  { Icon: Code2,        label: "Code Review & Standards" },
  { Icon: BarChart2,    label: "KPI Tracking & Reporting" },
  { Icon: MessageSquare,label: "Cross-team Coordination" },
  { Icon: Flag,         label: "Hiring & Performance Reviews" },
];

const pmSkills = [
  { Icon: Route,         label: "Agile / Scrum" },
  { Icon: ClipboardList, label: "Product Ownership & Backlog" },
  { Icon: AlertCircle,   label: "Critical Issue Escalation" },
  { Icon: MessageSquare, label: "Stakeholder Management" },
  { Icon: Database,      label: "Jira & Confluence" },
  { Icon: BarChart2,     label: "Risk & Dependency Management" },
];

const COLUMNS = [
  { title: "Frontend Development", Icon: Code2,        skills: frontendSkills  },
  { title: "Technical Leadership",  Icon: Users,        skills: leadershipSkills },
  { title: "PM & Agile",            Icon: ClipboardList, skills: pmSkills        },
];

const languages = [
  { lang: "English",  level: "C2"    },
  { lang: "Romanian", level: "C2"    },
  { lang: "German",   level: "A1/A2" },
  { lang: "Spanish",  level: "A1"    },
];

export default function SkillsSection() {
  return (
    <SectionCard id="skills">
      <h2 className={styles.title}>Skills</h2>
      <div className={styles.grid}>
        {COLUMNS.map(({ title, Icon, skills }) => (
          <div key={title} className={styles.col}>
            <h3 className={styles.colTitle}>
              <Icon size={15} aria-hidden="true" />
              {title}
            </h3>
            <ul className={styles.list}>
              {skills.map(({ Icon: SkillIcon, label }) => (
                <li key={label} className={styles.item}>
                  <SkillIcon size={13} aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.languagesRow}>
        <h3 className={styles.langTitle}>Languages</h3>
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
