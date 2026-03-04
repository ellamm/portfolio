import { useState } from "react";
import { Download, Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import SectionCard from "../../components/SectionCard/SectionCard";
import styles from "./ContactSection.module.css";

const SOCIALS = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    handle: "linkedin.com/in/mihaela-mihai",
    href: "https://www.linkedin.com/in/mihaela-mihai/",
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    handle: "elamihai.mm@gmail.com",
    href: "mailto:elamihai.mm@gmail.com",
    external: false,
  },
  {
    icon: Github,
    label: "GitHub",
    handle: "github.com/ellamm",
    href: "https://github.com/ellamm",
    external: true,
  },
];

const CVS = [
  {
    label: "Frontend Developer",
    href: "/cvs/Mihaela_Drondu_f_cv.pdf",
    style: { "--cv-accent": "var(--color-accent)", "--cv-bg": "var(--accent-tint-bg)", "--cv-border": "var(--accent-tint-border)" },
  },
  {
    label: "Tech Manager",
    href: "/cvs/Mihaela_Drondu_m_cv.pdf",
    style: { "--cv-accent": "#0284c7", "--cv-bg": "rgba(2,132,199,0.08)", "--cv-border": "rgba(2,132,199,0.20)" },
  },
];

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setFormState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mojngqgd", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setStatus("sent");
        setFormState({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <SectionCard id="contact" title="Let's Connect" compact>

      <div className={styles.availableChip} aria-label="Availability status">
        <span className={styles.availableDot} aria-hidden="true" />
        Available now · open to new roles
      </div>

      <div className={styles.layout}>

        {/* Left — reach out actions */}
        <div className={styles.reachSide}>
          <p className={styles.reachIntro}>
            Open to new opportunities, collaborations, or just a good conversation. Drop me a message or find me on the links below.
          </p>

          <div className={styles.socialCards}>
            {SOCIALS.map(({ icon: Icon, label, handle, href, external }) => (
              <a
                key={label}
                href={href}
                className={styles.socialCard}
                aria-label={label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <Icon size={18} className={styles.socialIcon} aria-hidden="true" />
                <span className={styles.socialText}>
                  <span className={styles.socialLabel}>{label}</span>
                  <span className={styles.socialHandle}>{handle}</span>
                </span>
                <ArrowUpRight size={14} className={styles.socialArrow} aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className={styles.cvBlock}>
            <span className={styles.cvHeading}>Download CV</span>
            <div className={styles.cvButtons}>
              {CVS.map(({ label, href, style }) => (
                <a key={label} href={href} download className={styles.cvBtn} style={style}>
                  <Download size={13} aria-hidden="true" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} aria-hidden="true" />

        {/* Right — form */}
        <div className={styles.formSide}>
          <span className={styles.formHeading}>Send a message</span>

          {status === "sent" ? (
            <div className={styles.thankYou}>
              <p>Message sent — I&apos;ll get back to you soon!</p>
              <button className={styles.resetBtn} onClick={() => setStatus("idle")}>
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.fieldRow}>
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
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-message" className={styles.label}>Message</label>
                <textarea id="contact-message" name="message" required rows={5}
                  className={styles.textarea} value={formState.message}
                  onChange={handleChange} placeholder="What would you like to discuss?" />
              </div>
              {status === "error" && (
                <p className={styles.errorMsg}>Something went wrong. Please try again.</p>
              )}
              <button type="submit" className={styles.sendBtn} disabled={status === "sending"}>
                <Mail size={16} aria-hidden="true" />
                {status === "sending" ? "Pushing to production…" : "Send Message"}
              </button>
            </form>
          )}
        </div>

      </div>
    </SectionCard>
  );
}
