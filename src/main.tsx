import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

console.log("✅ main.tsx loaded");

const el = document.getElementById("root");

if (!el) {
  document.body.innerHTML =
    "<pre style='color:white;padding:20px'>❌ #root not found</pre>";
} else {
  try {
    console.log("✅ mounting App...");
    createRoot(el).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err: any) {
    console.error("❌ App crashed:", err);
    el.innerHTML =
      "<pre style='color:white;padding:20px;white-space:pre-wrap'>❌ App crashed:\n\n" +
      String(err?.stack || err) +
      "</pre>";
  }
}
