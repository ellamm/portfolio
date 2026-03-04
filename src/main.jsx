import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Easter egg for the curious
console.log(
  "%c👋 Hey, you opened the console.",
  "color: #6d28d9; font-size: 14px; font-weight: bold; font-family: monospace;"
);
console.log(
  "%c   I like you already.\n   → elamihai.mm@gmail.com",
  "color: #8b5cf6; font-size: 12px; font-family: monospace; line-height: 1.8;"
);
