const TABS = [
  { id: "dashboard", label: "📊 Dashboard" },
  { id: "detect",    label: "🔬 Detect Disease" },
  { id: "monitor",   label: "📡 Field Monitor" },
];

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header style={{
      background: "var(--green-600)", padding: "0 2rem",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 60, position: "sticky", top: 0, zIndex: 100,
      boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
    }}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "#fff", display: "flex", alignItems: "center", gap: 10 }}>
        🌾 AgriSense
      </div>
      <nav style={{ display: "flex", gap: 4 }}>
        {TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            background: activeTab === tab.id ? "rgba(255,255,255,0.2)" : "none",
            border: "none",
            color: activeTab === tab.id ? "#fff" : "rgba(255,255,255,0.7)",
            fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500,
            padding: "6px 14px", borderRadius: "var(--radius-sm)", cursor: "pointer",
          }}>
            {tab.label}
          </button>
        ))}
      </nav>
      <div style={{
        background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 12,
        padding: "4px 12px", borderRadius: 20, display: "flex", alignItems: "center", gap: 6,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green-100)", animation: "pulse 2s infinite", display: "inline-block" }} />
        AI Online
      </div>
    </header>
  );
}