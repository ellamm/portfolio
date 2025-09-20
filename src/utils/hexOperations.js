export function normalizeHex(hex) {
  return hex.replace(/^#/, "").toUpperCase();
}

export function isValidHexColor(hex) {
  const hexRegex = /^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/;
  return hexRegex.test(hex);
}

export function convertToSixLength(hex) {
  const cleanHex = normalizeHex(hex);
  return cleanHex.length === 3
    ? cleanHex
        .split("")
        .map((hex) => hex + hex)
        .join("")
    : cleanHex;
}

export function convertHexToRGB(hex) {
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
}

export function convertRGBToHex(r, g, b) {
  return [r, g, b]
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

export function adjustBrightness(hex, percent) {
  const { r, b, g } = convertHexToRGB(hex);
  const factor = percent / 100;

  return convertRGBToHex(
    adjustColor(r, factor),
    adjustColor(g, factor),
    adjustColor(b, factor)
  );
}

function adjustColor(color, factor) {
  if (factor >= 0) {
    return Math.min(255, Math.round(color + (255 - color) * factor));
  }
  return Math.max(0, Math.round(color * (1 + factor)));
}
