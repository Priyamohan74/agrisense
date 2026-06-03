import { useState, useRef } from "react";
import axios from "axios";

const SEV_STYLE = {
  High:   { bg: "var(--red-50)",   color: "var(--red-600)" },
  Medium: { bg: "var(--amber-50)", color: "var(--amber-600)" },
  Low:    { bg: "var(--green-50)", color: "var(--green-600)" },
  None:   { bg: "var(--green-50)", color: "var(--green-600)" },
};

export default function DetectPage() {
  const [preview,  setPreview]  = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [result,   setResult]   = useState(null);
  const [error,    setError]    = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef(null);

  async function handleFile(file) {
    if (!file || !file.type.startsWith("image/")) {
      setError("Please upload a valid image file (JPG, PNG, or WEBP).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await axios.post("/api/detect", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 30000,
      });
      if (data.success) setResult(data.data);
      else throw new Error(data.error || "Detection failed");
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Analysis failed. Check your API key.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setPreview(null); setResult(null); setError(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  const sev = result ? (SEV_STYLE[result.severity] || SEV_STYLE.Low) : null;

  return (
    <div style={{ padding: "2rem", maxWidth: 860, margin: "0 auto" }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 400, marginBottom: "1.5rem" }}>
        🔬 Crop Disease Detection
      </h2>

      {/* Upload Zone */}
      {!preview && (
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
          style={{
            border: `2px dashed ${dragging ? "var(--green-400)" : "var(--green-100)"}`,
            borderRadius: "var(--radius-lg)", padding: "3rem 2rem", textAlign: "center",
            cursor: "pointer", background: dragging ? "#E3F0D3" : "var(--green-50)", transition: "all 0.2s",
          }}
        >
          <input ref={fileRef} type="file" accept="image/*" onChange={(e) => handleFile(e.target.files[0])} style={{ display: "none" }} />
          <div style={{ fontSize: 56, marginBottom: 16 }}>📷</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--green-600)", marginBottom: 8 }}>
            Upload Crop or Leaf Image
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
            Click to select or drag &amp; drop · JPG, PNG, WEBP · Max 10MB
          </p>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div style={{ position: "relative", marginBottom: "1.5rem" }}>
          <img src={preview} alt="Uploaded crop" style={{ width: "100%", maxHeight: 300, objectFit: "cover", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }} />
          <button onClick={reset} style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", borderRadius: 20, padding: "4px 12px", fontSize: 12, cursor: "pointer" }}>
            ✕ New Image
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
          <div style={{ width: 48, height: 48, border: "3px solid var(--green-100)", borderTopColor: "var(--green-400)", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>Analyzing with Claude Vision AI...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{ background: "var(--red-50)", border: "1px solid var(--red-100)", borderRadius: "var(--radius-md)", padding: "1rem 1.25rem", color: "var(--red-600)", fontSize: 14, marginTop: "1rem" }}>
          ⚠️ {error}
        </div>
      )}

      {/* Result */}
      {result && !loading && (
        <div className="fadeUp" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem", marginTop: "1.5rem" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: "1.25rem", paddingBottom: "1.25rem", borderBottom: "1px solid var(--border)", flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 24 }}>{result.disease}</div>
              {result.scientificName !== "N/A" && (
                <div style={{ fontSize: 13, color: "var(--text-muted)", fontStyle: "italic", marginTop: 2 }}>{result.scientificName}</div>
              )}
            </div>
            <span style={{ background: sev.bg, color: sev.color, padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
              {result.severity} Severity
            </span>
            <div style={{ minWidth: 180 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>
                <span>AI Confidence</span><span style={{ fontWeight: 600 }}>{result.confidence}%</span>
              </div>
              <div style={{ background: "var(--gray-50)", borderRadius: 6, height: 8, overflow: "hidden" }}>
                <div style={{ width: `${result.confidence}%`, height: "100%", background: "var(--green-400)", borderRadius: 6, animation: "barGrow 0.8s ease" }} />
              </div>
            </div>
          </div>

          {/* Chips */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: "1.25rem" }}>
            {[["Crop Type", result.cropType], ["Disease Stage", result.stage], ["Spread Risk", result.spreadRisk]].map(([label, val]) => (
              <div key={label} style={{ background: "var(--gray-50)", borderRadius: "var(--radius-md)", padding: "12px 14px" }}>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: 4 }}>{label}</div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{val}</div>
              </div>
            ))}
          </div>

          {/* Symptoms */}
          {result.symptoms?.length > 0 && (
            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: 8 }}>🔍 Observed Symptoms</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {result.symptoms.map((s, i) => (
                  <span key={i} style={{ background: "var(--amber-50)", color: "var(--amber-600)", fontSize: 12, padding: "3px 10px", borderRadius: 12, fontWeight: 500 }}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* AI Analysis */}
          <div style={{ background: "var(--green-50)", borderLeft: "3px solid var(--green-400)", borderRadius: "0 var(--radius-md) var(--radius-md) 0", padding: "1rem 1.25rem", fontSize: 14, lineHeight: 1.7, marginBottom: "1.25rem" }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--green-600)", marginBottom: 8 }}>🤖 Claude AI Expert Analysis</div>
            {result.analysis}
          </div>

          {/* Treatments */}
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: 10 }}>💊 Recommended Treatment Plan</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {result.treatments?.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "10px 14px", fontSize: 14 }}>
                <div style={{ background: "var(--green-600)", color: "#fff", width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                {t}
              </div>
            ))}
          </div>

          {/* Organic */}
          {result.organicAlternative && (
            <div style={{ marginTop: "1rem", background: "var(--teal-50)", borderRadius: "var(--radius-md)", padding: "10px 14px", fontSize: 13, color: "var(--teal-600)" }}>
              🌿 <strong>Organic alternative:</strong> {result.organicAlternative}
            </div>
          )}
        </div>
      )}
    </div>
  );
}