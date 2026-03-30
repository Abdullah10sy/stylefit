"use client";
import { useStore } from "@/app/store";
import { useState } from "react";
import { OUTFITS } from "@/lib/data";

export function Dashboard() {
  const { state, setState, showSection, toast } = useStore();
  const [loading, setLoading] = useState(false);

  const selectBodyType = (type: string) => {
    setState((s) => ({ ...s, bodyType: type }));
  };

  const toggleCat = (cat: string) => {
    const newCats = new Set(state.categories);
    if (newCats.has(cat)) {
      if (newCats.size > 1) {
        newCats.delete(cat);
      } else {
        return; // at least 1 category required
      }
    } else {
      newCats.add(cat);
    }
    setState((s) => ({ ...s, categories: newCats }));
  };

  const generateOutfits = async () => {
    if (!state.bodyType) {
      toast("⚠️ Please select your body type");
      return;
    }
    showSection("results");
    setLoading(true);
    
    // simulate loading
    await new Promise((r) => setTimeout(r, 1800));

    const outfits: any[] = [];
    state.categories.forEach((cat) => {
      const catData = (OUTFITS as any)[cat];
      if (!catData) return;
      const bodyOutfits = catData[state.bodyType!] || catData.medium || [];
      bodyOutfits.forEach((o: any) => outfits.push({ ...o, category: cat }));
    });

    const finalOutfits = outfits.length > 0 ? outfits : Object.values((OUTFITS as any).casual.medium).map((o: any) => ({ ...o, category: "casual" }));

    setState((s) => ({ ...s, currentOutfits: finalOutfits }));
    setLoading(false);
  };

  return (
    <section className={`section ${state.activeSection === 'dashboard' ? '' : 'hidden'}`} id="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="results-tag">✦ Personalize Your Style</div>
          <h2>Tell Us About <em>You</em></h2>
          <p>Our AI crafts outfits based on your unique body type and height</p>
        </div>
        <div className="dashboard-form">
          <div className="form-section">
            <span className="form-label">Your Body Type</span>
            <div className="body-type-grid">
              {['slim', 'medium', 'chubby'].map((bt) => (
                <div key={bt} className={`body-card ${state.bodyType === bt ? 'selected' : ''}`} onClick={() => selectBodyType(bt)}>
                  <div style={{fontSize: '2rem', marginBottom: '8px'}}>{bt === 'slim' ? '🐶' : bt === 'medium' ? '🦁' : '🐼'}</div>
                  <span className="body-name">{bt.charAt(0).toUpperCase() + bt.slice(1)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="form-section">
            <h3 className="form-label">Style Categories</h3>
            <div className="category-grid">
              {[
                { id: "casual", label: "👕 Casual" },
                { id: "formal", label: "👔 Formal" },
                { id: "party", label: "✨ Party" },
                { id: "sporty", label: "⚡ Sporty" },
                { id: "streetwear", label: "🧢 Streetwear" },
                { id: "ethnic", label: "🪔 Ethnic" },
              ].map((c) => (
                <div
                  key={c.id}
                  className={`cat-chip ${state.categories.has(c.id) ? "active" : ""}`}
                  onClick={() => toggleCat(c.id)}
                >
                  {c.label}
                </div>
              ))}
            </div>
          </div>
          <button className="btn-generate" onClick={generateOutfits}>
            <span className="btn-text-inner">✦ Generate My Outfits</span>
            <div className="btn-shimmer"></div>
          </button>
        </div>
      </div>
      {/* Loading Overlay */}
      {loading && (
        <div className="loading-state" style={{position: 'fixed', inset: 0, zIndex: 999, background: 'var(--page-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div className="loading-spinner"></div>
          <p className="loading-text">AI is crafting your outfits<span className="dots"></span></p>
        </div>
      )}
    </section>
  );
}
