import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return (
    <div style={{ padding: 40, color: "white" }}>
      <h1 style={{ fontSize: 40, fontWeight: 900 }}>Mounted ✅</h1>
      <p>If you see this, React is running. Problem is inside your components.</p>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
