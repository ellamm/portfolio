import { Github, Mail, Linkedin } from "lucide-react";
import styles from "./CTASection.module.css";
import buttonStyles from "../../../../styles/Button.module.css";
export default function CTASection() {
  return (
    <section className={styles.cta} aria-labelledby="cta-title">
      <h2 id="cta-title">💡 Let’s Build Something Together</h2>
      <p className={styles.ctaText}>
        This portfolio combines <strong>interactive mini-apps</strong> you can
        launch instantly and <strong>external projects</strong> with live demos
        & open-source code. Each project highlights my skills in{" "}
        <strong>frontend development</strong>
      </p>

      <div className={styles.ctaButtons}>
        <a
          href="https://github.com/ellamm"
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonStyles.button} ${buttonStyles["button--github"]}`}
        >
          <Github size={18} /> View My GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/mihaela-mihai/"
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonStyles.button} ${buttonStyles["button--linkedin"]}`}
        >
          <Linkedin size={18} /> Connect on LinkedIn
        </a>
        <a
          href="mailto:elamihai.mm@gmail.com"
          className={`${buttonStyles.button} ${buttonStyles["button--contact"]}`}
        >
          <Mail size={18} /> Contact Me
        </a>
      </div>

      <p className={styles.credit}>
        Built with ❤️ by <strong>Mihaela Drondu</strong> ·{" "}
        {new Date().getFullYear()}
      </p>
    </section>
  );
}
