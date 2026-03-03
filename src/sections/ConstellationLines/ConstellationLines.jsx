import { memo } from "react";
import styles from "./ConstellationLines.module.css";

// 6-pointed star polygon centered at (0, 0)
function starPts(r) {
  const ri = r * 0.42;
  const p = [];
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6 - Math.PI / 2;
    const R = i % 2 === 0 ? r : ri;
    p.push(`${(Math.cos(a) * R).toFixed(3)},${(Math.sin(a) * R).toFixed(3)}`);
  }
  return p.join(" ");
}

const STAR_SM = starPts(0.50);   // regular node star
const STAR_LG = starPts(1.05);   // sparkle terminal star

// Detect reduced motion preference once at module load time
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 10 constellations spread across the full viewport (viewBox 0 0 100 100)
const CONSTELLATIONS = [
  {
    // A: top-right — irregular pentagon + diagonal
    lines: [[72,6,82,3],[82,3,91,8],[91,8,88,19],[88,19,77,22],[77,22,72,6],[82,3,88,19]],
    nodes: [{cx:72,cy:6},{cx:82,cy:3},{cx:91,cy:8},{cx:88,cy:19},{cx:77,cy:22}],
    sparkles: [{cx:82,cy:3,d:"0s"},{cx:91,cy:8,d:"0.7s"}],
  },
  {
    // B: top-left — scalene triangle
    lines: [[6,7,17,4],[17,4,12,15],[12,15,6,7]],
    nodes: [{cx:6,cy:7},{cx:17,cy:4},{cx:12,cy:15}],
    sparkles: [{cx:6,cy:7,d:"0.3s"},{cx:17,cy:4,d:"1.1s"}],
  },
  {
    // C: top-center — Cassiopeia W shape
    lines: [[40,6,44,2],[44,2,50,6],[50,6,56,2],[56,2,60,6]],
    nodes: [{cx:40,cy:6},{cx:44,cy:2},{cx:50,cy:6},{cx:56,cy:2},{cx:60,cy:6}],
    sparkles: [{cx:44,cy:2,d:"0.5s"},{cx:56,cy:2,d:"1.3s"},{cx:40,cy:6,d:"2.0s"}],
  },
  {
    // D: mid-left — dipper handle (L + hook)
    lines: [[3,40,8,36],[8,36,14,38],[14,38,18,44],[18,44,14,50]],
    nodes: [{cx:3,cy:40},{cx:8,cy:36},{cx:14,cy:38},{cx:18,cy:44},{cx:14,cy:50}],
    sparkles: [{cx:3,cy:40,d:"0.9s"},{cx:14,cy:50,d:"1.7s"}],
  },
  {
    // E: mid-right — chevron + pointer
    lines: [[86,40,93,45],[93,45,86,50],[93,45,98,48]],
    nodes: [{cx:86,cy:40},{cx:93,cy:45},{cx:86,cy:50},{cx:98,cy:48}],
    sparkles: [{cx:86,cy:40,d:"0.2s"},{cx:86,cy:50,d:"1.0s"},{cx:98,cy:48,d:"1.8s"}],
  },
  {
    // F: bottom-left — Big Dipper
    lines: [[7,76,14,73],[14,73,20,77],[20,77,24,74],[24,74,22,82],[22,82,22,90]],
    nodes: [{cx:7,cy:76},{cx:14,cy:73},{cx:20,cy:77},{cx:24,cy:74},{cx:22,cy:82},{cx:22,cy:90}],
    sparkles: [{cx:7,cy:76,d:"0.6s"},{cx:22,cy:90,d:"1.4s"}],
  },
  {
    // G: bottom-right — arrowhead + tail
    lines: [[78,80,85,76],[85,76,82,86],[82,86,78,80],[78,80,74,84]],
    nodes: [{cx:78,cy:80},{cx:85,cy:76},{cx:82,cy:86},{cx:74,cy:84}],
    sparkles: [{cx:85,cy:76,d:"0.4s"},{cx:74,cy:84,d:"1.2s"}],
  },
  {
    // H: bottom-center — Orion belt + sword
    lines: [[44,92,50,90],[50,90,56,92],[50,90,50,97]],
    nodes: [{cx:44,cy:92},{cx:50,cy:90},{cx:56,cy:92},{cx:50,cy:97}],
    sparkles: [{cx:44,cy:92,d:"0.8s"},{cx:56,cy:92,d:"1.6s"},{cx:50,cy:97,d:"0.1s"}],
  },
  {
    // I: upper-mid — cross / plus
    lines: [[28,22,36,22],[32,18,32,26]],
    nodes: [{cx:28,cy:22},{cx:32,cy:18},{cx:36,cy:22},{cx:32,cy:26}],
    sparkles: [{cx:28,cy:22,d:"1.5s"},{cx:36,cy:22,d:"0.3s"},{cx:32,cy:18,d:"2.1s"}],
  },
  {
    // J: mid-center-right — diamond / rhombus
    lines: [[68,55,73,51],[73,51,78,55],[78,55,73,59],[73,59,68,55]],
    nodes: [{cx:68,cy:55},{cx:73,cy:51},{cx:78,cy:55},{cx:73,cy:59}],
    sparkles: [{cx:73,cy:51,d:"0.6s"},{cx:73,cy:59,d:"1.9s"}],
  },
];

// Scattered lone stars for depth
const LONE_STARS = [
  {cx:30,cy:10,d:"0.4s",dur:"2.1s"},
  {cx:60,cy:5, d:"1.2s",dur:"2.5s"},
  {cx:95,cy:14,d:"0.8s",dur:"1.9s"},
  {cx:5, cy:20,d:"1.6s",dur:"2.3s"},
  {cx:40,cy:18,d:"0.2s",dur:"2.0s"},
  {cx:75,cy:32,d:"2.0s",dur:"2.6s"},
  {cx:95,cy:62,d:"0.5s",dur:"1.8s"},
  {cx:5, cy:65,d:"1.3s",dur:"2.2s"},
  {cx:35,cy:68,d:"0.9s",dur:"2.4s"},
  {cx:63,cy:72,d:"1.7s",dur:"2.1s"},
  {cx:45,cy:85,d:"0.3s",dur:"2.5s"},
  {cx:70,cy:88,d:"2.2s",dur:"1.9s"},
  {cx:10,cy:93,d:"1.0s",dur:"2.3s"},
  {cx:90,cy:90,d:"0.7s",dur:"2.0s"},
  {cx:50,cy:48,d:"1.5s",dur:"2.6s"},
  {cx:25,cy:52,d:"0.6s",dur:"1.8s"},
  {cx:65,cy:28,d:"1.8s",dur:"2.4s"},
  {cx:85,cy:68,d:"0.2s",dur:"2.2s"},
  {cx:38,cy:35,d:"2.4s",dur:"2.0s"},
  {cx:55,cy:62,d:"1.1s",dur:"2.5s"},
];

export default memo(function ConstellationLines() {
  return (
    <svg
      className={styles.svg}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {CONSTELLATIONS.map((c, ci) => (
        <g key={ci}>
          {/* Connection lines */}
          {c.lines.map(([x1, y1, x2, y2], li) => (
            <line
              key={li}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(255,255,255,0.38)"
              strokeWidth="0.22"
              strokeLinecap="round"
            />
          ))}

          {/* Regular node stars — small, gentle pulse */}
          {c.nodes.map((n, ni) => {
            const dur = `${2.0 + ((ci + ni) * 0.28) % 1.2}s`;
            const begin = `${((ci * 0.4 + ni * 0.22) % 2.4).toFixed(2)}s`;
            return (
              <g key={ni} transform={`translate(${n.cx},${n.cy})`}>
                <polygon points={STAR_SM} fill="rgba(255,255,255,0.65)">
                  {!reducedMotion && (
                    <animateTransform attributeName="transform" type="scale"
                      values="0.8;1.18;0.8" dur={dur} begin={begin}
                      repeatCount="indefinite" additive="replace" />
                  )}
                  {!reducedMotion && (
                    <animate attributeName="opacity" values="0.4;0.75;0.4"
                      dur={dur} begin={begin} repeatCount="indefinite" />
                  )}
                </polygon>
              </g>
            );
          })}

          {/* Sparkle terminal stars — larger, brighter, strong glow pulse */}
          {c.sparkles.map((s, si) => (
            <g key={si}>
              {/* Expanding outer glow ring */}
              <circle cx={s.cx} cy={s.cy} r="2.4" fill="rgba(255,255,255,0.06)">
                {!reducedMotion && <animate attributeName="r"       values="1.8;3.8;1.8" dur="2.4s" begin={s.d} repeatCount="indefinite" />}
                {!reducedMotion && <animate attributeName="opacity" values="0.04;0.15;0.04" dur="2.4s" begin={s.d} repeatCount="indefinite" />}
              </circle>
              {/* Inner glow */}
              <circle cx={s.cx} cy={s.cy} r="1.1" fill="rgba(255,255,255,0.14)">
                {!reducedMotion && <animate attributeName="opacity" values="0.08;0.26;0.08" dur="2.4s" begin={s.d} repeatCount="indefinite" />}
              </circle>
              {/* Bright star shape */}
              <g transform={`translate(${s.cx},${s.cy})`}>
                <polygon points={STAR_LG} fill="rgba(255,255,255,0.95)">
                  {!reducedMotion && (
                    <animateTransform attributeName="transform" type="scale"
                      values="0.72;1.28;0.72" dur="2.4s" begin={s.d}
                      repeatCount="indefinite" additive="replace" />
                  )}
                  {!reducedMotion && (
                    <animate attributeName="opacity" values="0.65;1;0.65" dur="2.4s" begin={s.d}
                      repeatCount="indefinite" />
                  )}
                </polygon>
              </g>
            </g>
          ))}
        </g>
      ))}

      {/* Scattered lone stars */}
      {LONE_STARS.map((s, i) => (
        <g key={i} transform={`translate(${s.cx},${s.cy})`}>
          <polygon points={STAR_SM} fill="rgba(255,255,255,0.48)">
            {!reducedMotion && (
              <animateTransform attributeName="transform" type="scale"
                values="0.7;1.2;0.7" dur={s.dur} begin={s.d}
                repeatCount="indefinite" additive="replace" />
            )}
            {!reducedMotion && (
              <animate attributeName="opacity" values="0.28;0.62;0.28"
                dur={s.dur} begin={s.d} repeatCount="indefinite" />
            )}
          </polygon>
        </g>
      ))}
    </svg>
  );
});
