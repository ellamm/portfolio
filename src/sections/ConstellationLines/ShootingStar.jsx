import { useState, useEffect } from "react";
import styles from "./ShootingStar.module.css";

// Fires a cluster of 3-4 tiny meteors from a random upper-left area
export default function ShootingStar() {
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    const fire = () => {
      const count = 3 + Math.floor(Math.random() * 2); // 3 or 4
      const baseLeft = 8 + Math.random() * 45;
      const baseTop  = 3 + Math.random() * 14;

      const batch = Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        left: `${baseLeft + i * 6 + Math.random() * 3}%`,
        top:  `${baseTop  + i * 2 + Math.random() * 2}%`,
        delay: i * 75 + Math.random() * 40,
        size: 45 + Math.random() * 30,  // 45–75px
      }));

      setMeteors(batch);
      setTimeout(() => setMeteors([]), 1400);
    };

    const initial  = setTimeout(fire, 2000);
    const interval = setInterval(fire, 15000);
    return () => { clearTimeout(initial); clearInterval(interval); };
  }, []);

  return (
    <>
      {meteors.map(({ id, left, top, delay, size }) => (
        <div
          key={id}
          className={styles.meteor}
          style={{ top, left, animationDelay: `${delay}ms`, width: size }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
