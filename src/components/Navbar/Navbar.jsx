import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav
      className={styles.navbar}
      aria-label="Main navigation"
    >
      <Link
        to="/"
        className={styles.brand}
        aria-label="Mihaela Drondu — home"
      >
        <span className={styles.brandMonogram} aria-hidden="true">MD</span>
        <span className={styles.brandName}>Mihaela Drondu</span>
      </Link>

      <div className={styles.navLinks}>
        <a href="/#main-content" className={styles.navLink}>
          Projects
        </a>
        <a
          href="mailto:elamihai.mm@gmail.com"
          className={styles.navLink}
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
