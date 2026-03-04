import { useState, useEffect } from "react";
import styles from "./MiniTerminal.module.css";

const LINES = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "Mihaela Drondu — Frontend Dev & Team Lead" },
  { type: "cmd", text: "cat status.txt" },
  { type: "out", text: "open to new roles · available now" },
  { type: "cmd", text: "ls skills/" },
  { type: "out", text: "React  CSS  Leadership  AI  C++" },
];

const PROMPT = "~/portfolio $";

export default function MiniTerminal({ onOpen }) {
  const [started, setStarted] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started || done) return;
    const line = LINES[lineIdx];
    if (!line) { setDone(true); return; }

    if (line.type === "out") {
      const t = setTimeout(() => { setLineIdx(i => i + 1); setCharIdx(0); }, 200);
      return () => clearTimeout(t);
    }

    if (charIdx < line.text.length) {
      const t = setTimeout(() => setCharIdx(i => i + 1), 48);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setLineIdx(i => i + 1); setCharIdx(0); }, 380);
      return () => clearTimeout(t);
    }
  }, [started, lineIdx, charIdx, done]);

  const visibleLines = LINES.slice(0, lineIdx);
  const currentLine = LINES[lineIdx];

  return (
    <div
      className={styles.terminal}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpen(); }}
      aria-label="Open interactive terminal"
    >
      <div className={styles.titleBar}>
        <span className={styles.dot} style={{ background: "#ff5f57" }} />
        <span className={styles.dot} style={{ background: "#febc2e" }} />
        <span className={styles.dot} style={{ background: "#28c840" }} />
        <span className={styles.title}>mihaela.sh</span>
      </div>

      <div className={styles.body}>
        {!started && (
          <div className={styles.line}>
            <span className={styles.prompt}>{PROMPT}</span>
            <span className={styles.cursor}>▋</span>
          </div>
        )}

        {visibleLines.map((line, i) => (
          <div key={i} className={styles.line}>
            {line.type === "cmd" && (
              <>
                <span className={styles.prompt}>{PROMPT}</span>
                <span className={styles.cmd}>{line.text}</span>
              </>
            )}
            {line.type === "out" && (
              <span className={styles.out}>{line.text}</span>
            )}
          </div>
        ))}

        {started && !done && currentLine?.type === "cmd" && (
          <div className={styles.line}>
            <span className={styles.prompt}>{PROMPT}</span>
            <span className={styles.cmd}>{currentLine.text.slice(0, charIdx)}</span>
            <span className={styles.cursor}>▋</span>
          </div>
        )}

        {done && (
          <>
            <div className={styles.line}>
              <span className={styles.prompt}>{PROMPT}</span>
              <span className={styles.cursor}>▋</span>
            </div>
            <p className={styles.tryHint}>// click or press / to interact</p>
          </>
        )}
      </div>
    </div>
  );
}
