import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.container} role="main" aria-labelledby="error-title">
      <h1 className={styles.code} id="error-title" aria-label="Error 404">
        404
      </h1>
      <h2 className={styles.message}>Page Not Found</h2>
      <p className={styles.description}>
        Oops! The page you're looking for doesn't exist. It might have been
        moved, deleted, or you entered the wrong URL.
      </p>
      <Link to="/" className={styles.homeBtn} aria-label="Return to homepage">
        {" "}
        ⬅ Back to Home
      </Link>

      <div className={styles.animation} aria-hidden="true">
        <div className={styles.errorIcon}>🤖</div>
      </div>
    </div>
  );
}
