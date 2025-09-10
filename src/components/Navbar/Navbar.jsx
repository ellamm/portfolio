import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav
      className={styles.navbar}
      role="navigation"
      aria-label="Main navigation"
    >
      <Link
        to="/"
        className={styles.homeLink}
        aria-label="Navigate to home page"
        aria-current={location.pathname === "/" ? "page" : undefined}
      >
        <span>
          <Home size={18} />
        </span>
        <span>Home</span>
      </Link>
    </nav>
  );
}
