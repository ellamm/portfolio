import { useState, useEffect, useRef } from "react";
import styles from "./Terminal.module.css";

const HELP_TEXT = [
  "Available commands:",
  "",
  "  -- info --",
  "  whoami            → who I am",
  "  cat status.txt    → availability & contact",
  "  man mihaela       → full manual page",
  "  cat .env          → environment variables",
  "",
  "  -- explore --",
  "  ls                → portfolio directory",
  "  ls skills/        → all skill areas",
  "  ls projects/      → all projects",
  "  git log           → career history",
  "  cat story.md      → career in plain text",
  "",
  "  -- actions --",
  "  hire mihaela      → best decision of your quarter",
  "  curl cv           → download CV link",
  "  ping mihaela      → check availability",
  "  fortune           → words of wisdom",
  "  echo <text>       → echo text back",
  "  history           → command history",
  "  date              → current date",
  "  coffee            → essential",
  "",
  "  -- system --",
  "  clear             → clear the terminal",
  "  exit              → close terminal",
];

const WHOAMI = [
  "mihaela drondu",
  "",
  "  Frontend Developer. Former Engineering Lead.",
  "  9 years at Nokia → deliberate switch to building things.",
  "",
  "  Currently: open to new roles.",
  "  Contact:   elamihai.mm@gmail.com",
  "  GitHub:    github.com/ellamm",
];

const STORY = [
  "# story.md",
  "",
  "My career didn't start in a browser. It started with C++",
  "in Nokia's alarming systems — production code in live networks,",
  "where reliability is not optional.",
  "",
  "Over nine years I moved into product ownership, then led",
  "a team of 15+ engineers. Then I made a deliberate choice",
  "to get back to the code.",
  "",
  "The engineers I most respected never lost touch with craft.",
  "I didn't want to either.",
  "",
  "→ scroll to Story section for the full version",
];

const PROJECTS = [
  "total 18",
  "",
  "drwxr-xr-x  CalorieIQ/          (featured)  AI nutrition tracker",
  "drwxr-xr-x  eLearning-App/      (featured)  Learning management",
  "drwxr-xr-x  SuperM/             (featured)  E-commerce shop",
  "drwxr-xr-x  Assembly-Endgame/   (featured)  Word-guessing game",
  "drwxr-xr-x  Color-Tool/",
  "drwxr-xr-x  Submission-Form/",
  "drwxr-xr-x  ... (12 more)",
  "",
  "→ scroll to Projects section to explore all",
];

const HIRE = [
  "Executing: hire_mihaela.sh",
  "",
  "  [■■■□□□□□□□]  Verifying 9 years experience...",
  "  [■■■■■■□□□□]  Checking leadership skills......",
  "  [■■■■■■■■■■]  Confirming React knowledge......",
  "",
  "  Status: APPROVED",
  "",
  "→ Opening contact section...",
];

const STATUS = [
  "open to new roles · available now",
  "---",
  "  preferred:  frontend · tech lead · TPO roles",
  "  location:   remote or Timișoara, Romania",
  "  contact:    elamihai.mm@gmail.com",
  "  linkedin:   linkedin.com/in/mihaela-mihai",
];

const SKILLS = [
  "drwxr-xr-x  frontend/",
  "  React & JavaScript   HTML5 & CSS3   Responsive Design",
  "  REST APIs & JSON     Git & GitHub   Accessibility (WCAG)",
  "  AI-assisted Development",
  "",
  "drwxr-xr-x  leadership/",
  "  Team of 15+ engineers   Code review & standards",
  "  Hiring & performance    Cross-team coordination   KPI tracking",
  "",
  "drwxr-xr-x  product/",
  "  Agile / Scrum   Product ownership   Stakeholder management",
  "  Risk & dependency mgmt  Jira & Confluence  Critical escalation",
];

const LS = [
  "total 9",
  "",
  "drwxr-xr-x  projects/",
  "drwxr-xr-x  skills/",
  "drwxr-xr-x  journey/",
  "drwxr-xr-x  contact/",
  "-rw-r--r--  story.md",
  "-rw-r--r--  status.txt",
  "-rw-r--r--  .env",
  "-rw-r--r--  README.md",
  "",
  "→ hire mihaela to unlock write permissions",
];

const GIT_LOG = [
  "commit a1f3c9e  (HEAD -> main)",
  "Author: Mihaela Drondu <elamihai.mm@gmail.com>",
  "Date:   2024",
  "",
  "    chore: frontend developer — open to new roles",
  "",
  "commit 8b2d401",
  "Date:   2022–2024",
  "",
  "    feat: engineering lead — team of 15+ · Nokia",
  "",
  "commit 3e7a812",
  "Date:   2019–2022",
  "",
  "    feat: technical product owner — agile · roadmaps · Nokia",
  "",
  "commit 0c4f119",
  "Date:   2015–2019",
  "",
  "    init: software engineer — C++ · live network systems · Nokia",
];

const GIT_STATUS = [
  "On branch main",
  "Your branch is up to date with 'origin/main'.",
  "",
  "nothing to commit, working tree clean",
  "",
  "  open to opportunities though. hint hint.",
];

const GIT_BLAME = [
  "git blame: all commits authored by Mihaela. No excuses.",
];

const MAN = [
  "MIHAELA(1)                 User Commands                 MIHAELA(1)",
  "",
  "NAME",
  "       mihaela - frontend developer, former engineering lead",
  "",
  "SYNOPSIS",
  "       hire mihaela [--remote] [--timisoara] [--asap]",
  "",
  "DESCRIPTION",
  "       9 years at Nokia building production software and leading",
  "       teams. Returned to hands-on development by deliberate choice.",
  "       Fluent in React, CSS, and making things that actually work.",
  "",
  "OPTIONS",
  "       --remote          preferred",
  "       --timisoara       also great",
  "       --tech-lead       yes please",
  "       --frontend        absolutely",
  "",
  "EXIT STATUS",
  "       0   hire mihaela executed successfully",
  "       1   you waited too long",
  "",
  "SEE ALSO",
  "       linkedin(1), github(1), cat(1) status.txt",
];

const ENV = [
  "# .env",
  "",
  "COFFEE_LEVEL=high",
  "BUGS_TODAY=0",
  "OPEN_TO_WORK=true",
  "YEARS_EXPERIENCE=9",
  "PREFERRED_STACK=React",
  "LOCATION=Timisoara,Romania",
  "REMOTE=true",
  "LEADERSHIP_MODE=available",
];

const PING = [
  "PING mihaela (elamihai.mm@gmail.com)",
  "",
  "64 bytes from mihaela: icmp_seq=1 ttl=64 time=0.1 ms",
  "64 bytes from mihaela: icmp_seq=2 ttl=64 time=0.1 ms",
  "64 bytes from mihaela: icmp_seq=3 ttl=64 time=0.1 ms",
  "",
  "--- mihaela ping statistics ---",
  "3 packets transmitted, 3 received, 0% packet loss",
  "",
  "Response is fast. Hire accordingly.",
];

const NPM_INSTALL = [
  "npm install mihaela",
  "",
  "added 1 package, 9 years of experience",
  "  + mihaela@latest",
  "",
  "  ✓ frontend skills",
  "  ✓ engineering leadership",
  "  ✓ product ownership",
  "  ✓ team management",
  "  ✓ caffeine dependency (peer dep)",
  "",
  "found 0 vulnerabilities",
  "Run 'hire mihaela' to activate.",
];

const CURL_CV = [
  "  % Total    % Received  Avg Speed",
  "100   142k  100   142k   9999 KB/s",
  "",
  "  Frontend CV:  /cvs/Mihaela_Drondu_f_cv.pdf",
  "  Combined CV:  /cvs/Mihaela_Drondu_a_cv.pdf",
  "",
  "→ right-click links above to download",
];

const FORTUNES = [
  "\"The best engineers I've worked with never stopped writing code.\"",
  "\"9 years of Nokia: where reliability isn't optional and neither is coffee.\"",
  "\"Leadership experience makes better engineers. Fight me.\"",
  "\"Available for remote work. Also available for great coffee conversations.\"",
  "\"Turned down a management track to write better React. No regrets.\"",
];

const NOT_FOUND = [
  (cmd) => `bash: ${cmd}: command not found  (try "help")`,
  (cmd) => `${cmd}: not a command. Points for creativity though.`,
  (cmd) => `Error 404: ${cmd} not found. Unlike my LinkedIn, which is very findable.`,
  (cmd) => `bash: ${cmd}: No such file or directory.`,
  (cmd) => `Unknown command. This isn't Stack Overflow — but "help" might save you.`,
  (cmd) => `${cmd}? I don't know her. Try "whoami" instead.`,
  (cmd) => `Command not found. You found this terminal though, so you're clearly resourceful.`,
];

const COMMANDS = {
  help: HELP_TEXT,
  whoami: WHOAMI,
  "cat story.md": STORY,
  "cat readme.md": STORY,
  "ls projects/": PROJECTS,
  "ls project/": PROJECTS,
  "cat status.txt": STATUS,
  "ls skills/": SKILLS,
  "ls skill/": SKILLS,
  ls: LS,
  "ls -la": LS,
  "ls -l": LS,
  pwd: ["/home/mihaela/portfolio"],
  "git log": GIT_LOG,
  "git status": GIT_STATUS,
  "git blame": GIT_BLAME,
  "man mihaela": MAN,
  "cat .env": ENV,
  ping: PING,
  "ping mihaela": PING,
  "npm install mihaela": NPM_INSTALL,
  "npm i mihaela": NPM_INSTALL,
  "curl cv": CURL_CV,
  "curl resume": CURL_CV,
  vim: ["vim: Entering normal mode...", "  (You are now stuck.)", "  Type :q! to escape. Or just close the terminal. We won't judge."],
  nano: ["GNU nano 6.0  — mihaela.txt", "  [ Loaded 9 years of experience ]", "  ^X Exit  ^O Write  ^G Help"],
  emacs: ["Welcome to GNU Emacs.", "  To exit: C-x C-c (or close the browser tab, that also works)", "  Loading mihaela.el... done. 9 dependencies resolved."],
  coffee: ["brew: coffee already installed.", "  Running at 94% capacity.", "  Upgrade with: hire mihaela --with-good-project"],
  "brew install coffee": ["brew: coffee already installed.", "  Running at 94% capacity.", "  Upgrade with: hire mihaela --with-good-project"],
};

export default function Terminal({ isOpen, onClose, onHire }) {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState([
    { type: "system", text: 'mihaela@portfolio — type "help" for commands' },
    { type: "system", text: "" },
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const notFoundIdxRef = useRef(0);
  const fortuneIdxRef = useRef(0);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const runCommand = (cmd) => {
    const raw = cmd.trim();
    const lower = raw.toLowerCase();
    const withInput = (prev) => [...prev, { type: "cmd", text: raw }];

    if (!raw) {
      setLines((prev) => withInput(prev));
      return;
    }

    if (lower === "clear") {
      setLines([{ type: "system", text: 'Type "help" for commands.' }]);
      return;
    }

    if (lower === "exit") {
      setLines((prev) => [...withInput(prev), { type: "result", text: "Goodbye." }]);
      setTimeout(onClose, 400);
      return;
    }

    // hire mihaela (with or without sudo)
    if (lower === "hire mihaela" || lower === "sudo hire mihaela") {
      const sudoLines = lower.startsWith("sudo ")
        ? [{ type: "result", text: "[sudo] password for recruiter: ••••••••" }, { type: "result", text: "" }]
        : [];
      setLines((prev) => [
        ...withInput(prev),
        ...sudoLines,
        ...HIRE.map((t) => ({ type: "result", text: t })),
      ]);
      setTimeout(() => { onHire?.(); onClose(); }, 1600);
      return;
    }

    // sudo alone (not sudo hire)
    if (lower.startsWith("sudo ")) {
      setLines((prev) => [
        ...withInput(prev),
        { type: "err", text: "sudo: nice try. You don't have root here." },
      ]);
      return;
    }

    // rm -rf variants
    if (lower.startsWith("rm ")) {
      setLines((prev) => [
        ...withInput(prev),
        { type: "err", text: "rm: permission denied. This portfolio stays." },
        { type: "result", text: "  (nice try though)" },
      ]);
      return;
    }

    // echo
    if (lower.startsWith("echo ")) {
      const arg = raw.slice(5).replace(/^["']|["']$/g, "");
      setLines((prev) => [
        ...withInput(prev),
        { type: "result", text: arg },
      ]);
      return;
    }

    // history
    if (lower === "history") {
      const histLines = cmdHistory.length === 0
        ? [{ type: "result", text: "  (no commands yet)" }]
        : cmdHistory
            .slice()
            .reverse()
            .map((c, i) => ({ type: "result", text: `  ${String(i + 1).padStart(3)}  ${c}` }));
      setLines((prev) => [...withInput(prev), ...histLines]);
      return;
    }

    // date
    if (lower === "date") {
      setLines((prev) => [
        ...withInput(prev),
        { type: "result", text: new Date().toDateString() },
      ]);
      return;
    }

    // fortune
    if (lower === "fortune") {
      const line = FORTUNES[fortuneIdxRef.current % FORTUNES.length];
      fortuneIdxRef.current += 1;
      setLines((prev) => [
        ...withInput(prev),
        { type: "result", text: line },
      ]);
      return;
    }

    // static commands
    const result = COMMANDS[lower];
    if (result) {
      setLines((prev) => [
        ...withInput(prev),
        ...result.map((t) => ({ type: "result", text: t })),
      ]);
      return;
    }

    // rotating not-found
    const fn = NOT_FOUND[notFoundIdxRef.current % NOT_FOUND.length];
    notFoundIdxRef.current += 1;
    setLines((prev) => [
      ...withInput(prev),
      { type: "err", text: fn(raw) },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCmdHistory((h) => [input, ...h]);
    setHistIdx(-1);
    runCommand(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(idx);
      setInput(cmdHistory[idx] ?? "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx === -1 ? "" : cmdHistory[idx]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true" aria-label="Terminal">
      <div className={styles.terminal} onClick={(e) => e.stopPropagation()}>

        {/* macOS-style title bar */}
        <div className={styles.titleBar}>
          <button className={`${styles.dot} ${styles.dotRed}`} onClick={onClose} aria-label="Close terminal" />
          <span className={`${styles.dot} ${styles.dotYellow}`} aria-hidden="true" />
          <span className={`${styles.dot} ${styles.dotGreen}`} aria-hidden="true" />
          <span className={styles.titleText}>mihaela@portfolio — bash</span>
        </div>

        {/* Output area */}
        <div className={styles.outputArea} role="log" aria-live="polite">
          {lines.map((line, i) => (
            <div key={i} className={`${styles.line} ${styles[line.type]}`}>
              {line.type === "cmd" && (
                <span className={styles.promptInline} aria-hidden="true">mihaela@portfolio:~$ </span>
              )}
              {line.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input row */}
        <form className={styles.inputRow} onSubmit={handleSubmit}>
          <span className={styles.prompt} aria-hidden="true">mihaela@portfolio:~$</span>
          <input
            ref={inputRef}
            className={styles.inputField}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal command input"
          />
        </form>
      </div>
    </div>
  );
}
