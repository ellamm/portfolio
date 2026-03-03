import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.copy}>
        &copy; {year} Mihaela Drondu. All rights reserved.
      </p>
    </footer>
  );
}
