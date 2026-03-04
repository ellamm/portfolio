import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import styles from "./AppModal.module.css";

export default function AppModal({ app, onClose, children }) {
  // ESC to close
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return createPortal(
    <div
      className={styles.overlay}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={app.title}
      >
        <header className={styles.header}>
          <span className={styles.icon}>{app.icon}</span>
          <h2 className={styles.title}>{app.title}</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <X size={16} aria-hidden="true" />
          </button>
        </header>
        <div className={styles.body}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
