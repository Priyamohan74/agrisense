import { useState, useRef, useEffect } from "react";
import axios from "axios";

const SUGGESTIONS = [
  "How do I treat tomato early blight?",
  "Best time to irrigate in Tamil Nadu?",
  "What causes yellow leaves in rice?",
];

export default function ChatWidget() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Vanakkam! 🌾 I'm AgriBot. Ask me anything about crop diseases, soil health, or irrigation." },
  ]);
  const [input,   setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function send(text) {
    const q = text || input.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setLoading(true);
    try {
      const { data } = await axios.post("/api/chat", { question: q });
      setMessages((m) => [...m, { role: "assistant", text: data.answer }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: "Sorry, I couldn't connect. Check the backend server is running." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button onClick={() => setOpen((o) => !o)} title="Ask AgriBot" style={{
        position: "fixed", bottom: 24, right: 24, width: 56, height: 56,
        borderRadius: "50%", background: "var(--green-600)", border: "none",
        color: "#fff", fontSize: 24, cursor: "pointer",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)", zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {open ? "✕" : "🤖"}
      </button>

      {open && (
        <div style={{
          position: "fixed", bottom: 90, right: 24, width: 340, maxHeight: 500,
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)", boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
          zIndex: 199, display: "flex", flexDirection: "column", overflow: "hidden",
          animation: "fadeUp 0.25s ease",
        }}>
          <div style={{ background: "var(--green-600)", color: "#fff", padding: "12px 16px", fontWeight: 600, fontSize: 14 }}>
            🤖 AgriBot AI Assistant
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                background: m.role === "user" ? "var(--green-600)" : "var(--gray-50)",
                color: m.role === "user" ? "#fff" : "var(--text-primary)",
                padding: "8px 12px",
                borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                maxWidth: "82%", fontSize: 13, lineHeight: 1.5,
              }}>
                {m.text}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: "flex-start", background: "var(--gray-50)", padding: "8px 14px", borderRadius: "12px 12px 12px 2px", fontSize: 13, color: "var(--text-muted)", fontStyle: "italic" }}>
                Thinking...
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          {messages.length <= 1 && (
            <div style={{ padding: "0 12px 8px", display: "flex", flexDirection: "column", gap: 4 }}>
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)} style={{
                  background: "var(--green-50)", border: "1px solid var(--green-100)",
                  borderRadius: 8, padding: "6px 10px", fontSize: 12,
                  color: "var(--green-600)", cursor: "pointer", textAlign: "left",
                  fontFamily: "var(--font-body)",
                }}>
                  {s}
                </button>
              ))}
            </div>
          )}
          <div style={{ padding: "10px 12px", borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about crops, diseases..."
              style={{ flex: 1, border: "1px solid var(--border)", borderRadius: 8, padding: "7px 10px", fontSize: 13, fontFamily: "var(--font-body)", outline: "none", background: "var(--bg)" }}
            />
            <button onClick={() => send()} disabled={!input.trim() || loading} style={{
              background: "var(--green-600)", color: "#fff", border: "none",
              borderRadius: 8, padding: "0 14px", cursor: "pointer", fontSize: 14,
              opacity: (!input.trim() || loading) ? 0.5 : 1,
            }}>↑</button>
          </div>
        </div>
      )}
    </>
  );
}