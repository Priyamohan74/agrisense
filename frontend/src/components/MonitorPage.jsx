const SENSORS = [
  { icon: "🌡", label: "Soil Temperature", value: "28.4°C",        color: "var(--amber-600)" },
  { icon: "💧", label: "Soil Moisture",    value: "62%",           color: "var(--teal-600)" },
  { icon: "⚗️", label: "Soil pH",          value: "6.8",           color: "var(--green-600)" },
  { icon: "🌿", label: "Nitrogen (N)",     value: "Low — 12 kg/ha",color: "var(--red-600)" },
  { icon: "☀️", label: "Ambient Humidity", value: "72%",           color: "var(--amber-600)" },
  { icon: "💨", label: "Wind Speed",       value: "14 km/h",       color: "var(--gray-600)" },
];

const TASKS = [
  { when: "TODAY", color: "var(--red-400)",   bg: "var(--red-50)",   text: "Spray fungicide — Tomato Field 3" },
  { when: "MON",   color: "var(--amber-400)", bg: "var(--amber-50)", text: "Irrigation — Maize Field 1 & 2" },
  { when: "WED",   color: "var(--green-400)", bg: "var(--green-50)", text: "Fertilizer application — Soybean Field 5" },
  { when: "FRI",   color: "var(--teal-400)",  bg: "var(--teal-50)",  text: "Soil sample collection — All fields" },
];

const YIELDS = [
  { emoji: "🍅", crop: "Tomato",  val: "8.2t", note: "-12% (disease impact)", nc: "var(--red-600)" },
  { emoji: "🌽", crop: "Maize",   val: "6.7t", note: "+5% above avg",         nc: "var(--green-600)" },
  { emoji: "🌾", crop: "Wheat",   val: "5.4t", note: "On target",             nc: "var(--green-600)" },
  { emoji: "🫘", crop: "Soybean", val: "4.3t", note: "+2% above avg",         nc: "var(--green-600)" },
];

export default function MonitorPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: 1100, margin: "0 auto" }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 400, marginBottom: "1.5rem" }}>📡 Field Monitor</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
        {/* Sensors */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "1rem" }}>🌡 Soil &amp; Environment Sensors</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {SENSORS.map((s) => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "var(--gray-50)", borderRadius: "var(--radius-md)" }}>
                <span style={{ fontSize: 14 }}>{s.icon} {s.label}</span>
                <span style={{ fontWeight: 600, color: s.color, fontSize: 14 }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "1rem" }}>📅 Crop Calendar — Upcoming Tasks</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {TASKS.map((t) => (
              <div key={t.when} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 14px", background: t.bg, borderRadius: "var(--radius-md)" }}>
                <div style={{ background: t.color, color: "#fff", padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>{t.when}</div>
                <div style={{ fontSize: 13 }}>{t.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Yield */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
        <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "1rem" }}>📊 Yield Prediction — Current Season</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
          {YIELDS.map((y) => (
            <div key={y.crop} style={{ textAlign: "center", padding: "1.25rem 1rem", background: "var(--green-50)", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{y.emoji}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--green-600)" }}>{y.val}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>{y.crop}</div>
              <div style={{ fontSize: 11, color: y.nc, marginTop: 4, fontWeight: 500 }}>{y.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}