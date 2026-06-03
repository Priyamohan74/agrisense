const CROPS = [
  { emoji: "🍅", name: "Tomato",  status: "alert",   label: "⚠ Blight risk" },
  { emoji: "🌽", name: "Maize",   status: "healthy",  label: "✓ Healthy" },
  { emoji: "🌾", name: "Wheat",   status: "healthy",  label: "✓ Healthy" },
  { emoji: "🫑", name: "Pepper",  status: "risk",     label: "⚡ Monitor" },
  { emoji: "🥔", name: "Potato",  status: "risk",     label: "⚡ Monitor" },
  { emoji: "🫘", name: "Soybean", status: "healthy",  label: "✓ Healthy" },
];

const STATUS_COLOR = { healthy: "var(--green-600)", risk: "var(--amber-600)", alert: "var(--red-600)" };

const ALERTS = [
  { type: "danger", icon: "🚨", title: "Early Blight — Tomato (Field 3)", body: "Alternaria solani detected. Treat within 48 hours with copper-based fungicide." },
  { type: "warn",   icon: "⚠️", title: "High Humidity Warning", body: "Conditions favorable for fungal disease. Consider preventive spraying for pepper fields." },
  { type: "info",   icon: "💧", title: "Irrigation Reminder", body: "Maize fields due for irrigation in 2 days based on soil moisture data." },
];

const ALERT_BG = { danger: "var(--red-50)", warn: "var(--amber-50)", info: "var(--teal-50)" };

const WEATHER = [
  { day: "Today", icon: "⛅", temp: "34°C", info: "72% Humidity" },
  { day: "Mon",   icon: "🌧", temp: "28°C", info: "Rain 12mm" },
  { day: "Tue",   icon: "🌦", temp: "30°C", info: "65% Humidity" },
  { day: "Wed",   icon: "☀️", temp: "35°C", info: "48% Humidity" },
  { day: "Thu",   icon: "☀️", temp: "36°C", info: "45% Humidity" },
];

export default function Dashboard({ setActiveTab }) {
  return (
    <div>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, var(--green-600) 0%, var(--teal-400) 100%)",
        padding: "2.5rem 2rem", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "2rem", flexWrap: "wrap",
      }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 400, lineHeight: 1.2, marginBottom: 10 }}>
            Smart Crop Disease<br />Detection &amp; Monitoring
          </h1>
          <p style={{ fontSize: 14, opacity: 0.85, maxWidth: 420, lineHeight: 1.6 }}>
            Upload a leaf or crop image and get instant AI-powered diagnosis, treatment plans, and yield predictions.
          </p>
          <div style={{ display: "flex", gap: "1.5rem", marginTop: "1.5rem" }}>
            {[["47", "Diseases Detected"], ["94%", "Accuracy Rate"], ["12k+", "Fields Analyzed"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 28 }}>{n}</div>
                <div style={{ fontSize: 12, opacity: 0.75 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div onClick={() => setActiveTab("detect")} style={{
          background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: 16, padding: "1.5rem", textAlign: "center", minWidth: 220, cursor: "pointer",
        }}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>📸</div>
          <p style={{ fontSize: 13, opacity: 0.9, marginBottom: 14 }}>Photo of your crop leaves for instant diagnosis</p>
          <button style={{
            background: "#fff", color: "var(--green-600)", border: "none",
            padding: "9px 20px", borderRadius: 8, fontFamily: "var(--font-body)",
            fontWeight: 600, fontSize: 14, cursor: "pointer", width: "100%",
          }}>🔍 Analyze Crop Now</button>
        </div>
      </section>

      <div style={{ padding: "2rem", maxWidth: 1100, margin: "0 auto" }}>
        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: "2rem" }}>
          {[
            { label: "Healthy Fields", num: "8",    sub: "↑ 2 from last week", accent: "var(--green-400)" },
            { label: "At Risk",        num: "3",    sub: "Monitor closely",     accent: "var(--amber-400)" },
            { label: "Disease Alerts", num: "1",    sub: "Tomato blight",       accent: "var(--red-400)" },
            { label: "Est. Yield (t)", num: "24.6", sub: "Season forecast",     accent: "var(--teal-400)" },
          ].map((s) => (
            <div key={s.label} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)", padding: "1rem 1.25rem",
              borderTop: `3px solid ${s.accent}`,
            }}>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 30 }}>{s.num}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Two Column */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
          {/* Crops */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "1rem" }}>🌿 Monitored Crops</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {CROPS.map((c) => (
                <div key={c.name} style={{
                  background: "var(--gray-50)", borderRadius: "var(--radius-md)",
                  padding: "10px 8px", display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
                }}>
                  <span style={{ fontSize: 24 }}>{c.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: STATUS_COLOR[c.status] }}>{c.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "1rem" }}>🔔 Active Alerts</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {ALERTS.map((a) => (
                <div key={a.title} style={{
                  background: ALERT_BG[a.type], borderRadius: "var(--radius-md)",
                  padding: "10px 12px", display: "flex", gap: 10, fontSize: 13,
                }}>
                  <span style={{ fontSize: 18 }}>{a.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 2 }}>{a.title}</div>
                    <div style={{ color: "var(--text-muted)" }}>{a.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weather */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "1rem" }}>
            🌤 5-Day Forecast — Trichy Region
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
            {WEATHER.map((w) => (
              <div key={w.day} style={{ background: "var(--gray-50)", borderRadius: "var(--radius-md)", padding: "12px 8px", textAlign: "center", fontSize: 13 }}>
                <div style={{ fontWeight: 600, fontSize: 11, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6 }}>{w.day}</div>
                <div style={{ fontSize: 26, marginBottom: 4 }}>{w.icon}</div>
                <div style={{ fontWeight: 600 }}>{w.temp}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{w.info}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}