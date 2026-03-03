import SectionCard from "../../components/SectionCard/SectionCard";
import styles from "./StorySection.module.css";

export default function StorySection() {
  return (
    <SectionCard id="story" title="My Story">

      <div className={styles.body}>
        <p className={styles.para}>
          My career didn't start in a browser and isn't a straight line to
          frontend. I started it writing C++ code for Nokia's alarming systems
          — production software running in live networks, where reliability is
          not optional. Over nine years, I moved from engineering into Agile
          product ownership and eventually led a team of 15+ engineers.
        </p>

        <p className={styles.para}>
          Then I made a deliberate choice to take a break and experiment again
          with hands-on building — not because management wasn't fulfilling,
          but because the engineers I most respected never lost touch with the
          code. So I dove into modern frontend and AI-assisted development,
          mostly for the joy of it —
          experimenting with tools, building things that interest me, and
          staying close to the craft while I figure out where I want to go next.
        </p>

        <blockquote className={styles.callout}>
          <span className={styles.calloutBar} aria-hidden="true" />
          <p>
            What I bring that a bootcamp graduate cannot: I've sat on both
            sides of the code review. I know what "production-ready" actually
            means, and I know how to work across engineering, product, and
            business stakeholder layers simultaneously. That's not a gap in my
            profile — it's the whole point.
          </p>
        </blockquote>
      </div>
    </SectionCard>
  );
}
