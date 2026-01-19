import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootEl = document.getElementById("root");

if (!rootEl) {
  document.body.innerHTML = "<pre style='color:white;padding:20px'>❌ #root not found</pre>";
} else {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <div style={{ padding: 20, color: "white" }}>✅ main.tsx mounted</div>
      <App />
    </React.StrictMode>
  );
}
