import { useState } from "react";
import Header from "./components/Header.jsx";
import Dashboard from "./components/Dashboard.jsx";
import DetectPage from "./components/DetectPage.jsx";
import MonitorPage from "./components/MonitorPage.jsx";
import ChatWidget from "./components/ChatWidget.jsx";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ flex: 1 }}>
        {activeTab === "dashboard" && <Dashboard setActiveTab={setActiveTab} />}
        {activeTab === "detect"    && <DetectPage />}
        {activeTab === "monitor"   && <MonitorPage />}
      </main>
      <ChatWidget />
      <footer style={{
        textAlign: "center", padding: "1.5rem", color: "var(--text-muted)",
        fontSize: "12px", borderTop: "1px solid var(--border)", marginTop: "2rem",
      }}>
        🌾 AgriSense v1.0 — Powered by Claude AI (Anthropic) · React + Express + Node.js
      </footer>
    </div>
  );
}