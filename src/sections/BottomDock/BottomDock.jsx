import { House, BookOpen, Route, Layers, FolderOpen, Mail } from "lucide-react";
import styles from "./BottomDock.module.css";

const DOCK_ITEMS = [
  { id: "hero",     label: "Home",       Icon: House      },
  { id: "story",    label: "Story",      Icon: BookOpen   },
  { id: "journey",  label: "My Journey", Icon: Route      },
  { id: "skills",   label: "Skills",     Icon: Layers     },
  { id: "projects", label: "Projects",   Icon: FolderOpen },
  { id: "contact",  label: "Contact",    Icon: Mail       },
];

export default function BottomDock({ activeSection, embedded = false }) {
  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`${styles.dock} ${embedded ? styles.dockEmbedded : ""}`}
      aria-label="Main navigation"
    >
      {DOCK_ITEMS.map(({ id, label, Icon }) => {
        const isActive = activeSection === id;
        return (
          <button
            key={id}
            className={`${styles.dockBtn} ${isActive ? styles.active : ""}`}
            onClick={() => handleClick(id)}
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon size={20} aria-hidden="true" />
            <span className={styles.label}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
