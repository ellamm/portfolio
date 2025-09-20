import styles from "./ColorTool.module.css";
import { useState, useMemo } from "react";
import {
  isValidHexColor,
  convertToSixLength,
  adjustBrightness,
  normalizeHex,
} from "../../utils/hexOperations.js";
export default function ColorTool() {
  const [hexColor, setHexColor] = useState("");
  const [percent, setPercent] = useState(0);
  const [isValidHex, setIsValidHex] = useState(true);
  const [usedColor, setUsedColor] = useState("");
  const [isDarken, setIsDarken] = useState(false);

  const alteredColor = useMemo(() => {
    if (!usedColor || !isValidHex) {
      return "";
    }

    return adjustBrightness(usedColor, isDarken ? -percent : percent);
  }, [usedColor, isValidHex, isDarken, percent]);

  function checkAndSetHexColor(e) {
    const inputValue = e.target.value;
    setHexColor(inputValue);

    if (inputValue === "") {
      setIsValidHex(true);
      setUsedColor("");
      return;
    }

    const cleanHex = normalizeHex(inputValue);
    let finalColor = cleanHex;

    if (cleanHex.length === 3) {
      finalColor = convertToSixLength(cleanHex);
    }

    const isValid = isValidHexColor(cleanHex);
    setIsValidHex(isValid);

    if (isValid) {
      setUsedColor(finalColor);
    } else {
      setUsedColor("");
    }
  }

  const toggleBtnStyle = isDarken
    ? `${styles.toggleBtn} ${styles.toggled}`
    : styles.toggleBtn;

  const toggleTextStyleDark = !isDarken
    ? `${styles.toggleName} ${styles.unselected}`
    : styles.toggleName;
  const toggleTextStyleLight = isDarken
    ? `${styles.toggleName} ${styles.unselected}`
    : styles.toggleName;

  return (
    <div
      className={styles.colorToolContainer}
      role="region"
      aria-labelledby="colorToolTitle"
    >
      <h2 id="colorToolTitle" className={styles.colorToolTitle}>
        Lighten/Darker Color
      </h2>

      <div className={styles.colorToolItemContainer}>
        <label htmlFor="hex" className={styles.colorToolLabel}>
          Color (Hex)
        </label>
        <input
          type="text"
          name="hex"
          id="hex"
          value={hexColor}
          placeholder="#000000"
          onChange={checkAndSetHexColor}
          className={styles.colorToolTextInput}
          aria-invalid={!isValidHex}
          aria-describedby={!isValidHex ? "hexError" : undefined}
        />
        {!isValidHex && (
          <p id="hexError" className={styles.colorToolErrorInput} role="alert">
            Please enter a valid hex color (e.g., #FF0000 or #fafafb)
          </p>
        )}
      </div>

      <div className={styles.toggleContainer}>
        <p className={toggleTextStyleLight}>Lighten</p>
        <div
          className={toggleBtnStyle}
          onClick={() => {
            setIsDarken(!isDarken);
          }}
          role="switch"
          aria-checked={isDarken}
          aria-label="Toggle between lighten and darken"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsDarken(!isDarken);
            }
          }}
        >
          <div className={styles.innerCircle}></div>
        </div>
        <p className={toggleTextStyleDark}>Darken</p>
      </div>

      <div className={styles.colorToolItemContainer}>
        <label htmlFor="colorToolSlider" className={styles.colorToolLabel}>
          {isDarken ? `Darker ${percent}%` : `Lighter ${percent}%`}
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={percent}
          onChange={(e) => setPercent(Number(e.target.value))}
          className={styles.colorToolSlider}
          id="colorToolSlider"
          name="colorToolSlider"
          style={{ "--value": percent + "%" }}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-label={
            isDarken
              ? `Darken color by ${percent} percent`
              : `Lighten color by ${percent} percent`
          }
        />
      </div>
      <div className={styles.colorToolItemContainer}>
        <label className={styles.colorToolLabel}>
          Input Color {usedColor && `#${usedColor}`}
        </label>
        <div
          className={styles.colorPreview}
          style={{
            backgroundColor:
              isValidHex && usedColor ? `#${usedColor}` : "#000000",
          }}
          role="img"
          aria-label={`Input color preview ${
            usedColor ? `#${usedColor}` : "black"
          }`}
        ></div>

        <label className={styles.colorToolLabel}>
          Altered Color {alteredColor && `#${alteredColor}`}
        </label>
        <div
          className={styles.colorPreview}
          style={{
            backgroundColor: alteredColor ? `#${alteredColor}` : "#000000",
          }}
          role="img"
          aria-label={`Altered color preview ${
            alteredColor ? `#${alteredColor}` : "black"
          }`}
        ></div>

        <div aria-live="polite" className="srOnly">
          {usedColor && isValidHex
            ? `Input color is #${usedColor}. Altered color is ${
                alteredColor ? `#${alteredColor}` : "not set"
              }.`
            : "No valid input color selected."}
        </div>
      </div>
    </div>
  );
}
