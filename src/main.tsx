import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = document.getElementById("root");

if (!root) {
  document.body.innerHTML =
    "<pre style='color:white;padding:20px'>❌ #root not found</pre>";
} else {
  try {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    root.innerHTML =
      "<pre style='color:white;padding:20px;white-space:pre-wrap'>❌ App crashed:\n\n" +
      String(err) +
      "</pre>";
  }
}
