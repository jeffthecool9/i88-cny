console.log("✅ main.tsx loaded");

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootEl = document.getElementById("root");

if (!rootEl) {
  document.body.innerHTML =
    "<pre style='color:white;padding:20px'>❌ #root not found</pre>";
} else {
  try {
    console.log("✅ about to render <App />");
    ReactDOM.createRoot(rootEl).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("❌ render crashed:", err);
    rootEl.innerHTML =
      "<pre style='color:white;padding:20px;white-space:pre-wrap'>❌ App crashed:\n\n" +
      String(err) +
      "</pre>";
  }
}
