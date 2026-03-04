import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.copy}>
        Built with React, caffeine, and 9 years of engineering opinions.
        &copy; {year} Mihaela Drondu.
      </p>
    </footer>
  );
}
