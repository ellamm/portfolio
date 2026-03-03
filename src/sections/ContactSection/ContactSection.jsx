import { useState } from "react";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import SectionCard from "../../components/SectionCard/SectionCard";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setFormState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formState;
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    window.location.href = `mailto:elamihai.mm@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <SectionCard id="contact">
      <h2 className={styles.title}>Let&apos;s Connect</h2>
      <p className={styles.intro}>
        Open to new opportunities, collaborations, or just a good conversation.
        Drop me a message or find me on the links below.
      </p>

      <div className={styles.grid}>

        {/* Left: form */}
        <div className={styles.formSide}>
          {sent ? (
            <div className={styles.thankYou}>
              <p>Thanks for reaching out — your email client should have opened.</p>
              <button className={styles.resetBtn} onClick={() => setSent(false)}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="contact-name" className={styles.label}>Name</label>
                <input id="contact-name" name="name" type="text" required
                  className={styles.input} value={formState.name}
                  onChange={handleChange} placeholder="Your name"
                  autoComplete="name" />
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-email" className={styles.label}>Email</label>
                <input id="contact-email" name="email" type="email" required
                  className={styles.input} value={formState.email}
                  onChange={handleChange} placeholder="your@email.com"
                  autoComplete="email" />
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-message" className={styles.label}>Message</label>
                <textarea id="contact-message" name="message" required rows={5}
                  className={styles.textarea} value={formState.message}
                  onChange={handleChange} placeholder="What would you like to discuss?" />
              </div>
              <button type="submit" className={styles.sendBtn}>
                <Mail size={16} aria-hidden="true" /> Send Message
              </button>
            </form>
          )}
        </div>

        {/* Right: CV + socials */}
        <div className={styles.infoSide}>

          <div className={styles.cvSection}>
            <h3 className={styles.subHeading}>Download CV</h3>
            <a href="/cvs/Mihaela_Drondu_f_cv.pdf" download className={styles.cvRow}>
              <div className={styles.cvRowLeft}>
                <Download size={15} aria-hidden="true" />
                <span>Frontend Developer CV</span>
              </div>
              <span className={styles.cvBadge}>PDF</span>
            </a>
            <a href="/cvs/Mihaela_Drondu_a_cv.pdf" download className={styles.cvRow}>
              <div className={styles.cvRowLeft}>
                <Download size={15} aria-hidden="true" />
                <span>Combined CV</span>
              </div>
              <span className={styles.cvBadge}>PDF</span>
            </a>
          </div>

          <div className={styles.socialsSection}>
            <h3 className={styles.subHeading}>Find me on</h3>
            <div className={styles.socialsStack}>
              <a href="https://www.linkedin.com/in/mihaela-mihai/" target="_blank"
                rel="noopener noreferrer" className={styles.socialRow} aria-label="LinkedIn">
                <Linkedin size={18} aria-hidden="true" />
                <span>linkedin.com/in/mihaela-mihai</span>
              </a>
              <a href="https://github.com/ellamm" target="_blank"
                rel="noopener noreferrer" className={styles.socialRow} aria-label="GitHub">
                <Github size={18} aria-hidden="true" />
                <span>github.com/ellamm</span>
              </a>
              <a href="mailto:elamihai.mm@gmail.com" className={styles.socialRow} aria-label="Email">
                <Mail size={18} aria-hidden="true" />
                <span>elamihai.mm@gmail.com</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </SectionCard>
  );
}
