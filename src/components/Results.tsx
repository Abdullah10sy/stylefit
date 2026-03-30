"use client";
import React from "react";
import { useStore } from "@/app/store";
import { Outfit, CAT_META } from "@/lib/data";

export function OutfitCard({ outfit, index, isSaved, isCompareSelected }: { outfit: Outfit, index: number, isSaved: boolean, isCompareSelected: boolean }) {
  const { state, setState, toast } = useStore();
  const catMeta = CAT_META[outfit.category || "casual"] || CAT_META.casual;

  const toggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isAlreadySaved = state.savedLooks.some(s => s.name === outfit.name);
    let newSaved = [...state.savedLooks];
    if (isAlreadySaved) {
      newSaved = newSaved.filter(s => s.name !== outfit.name);
      toast("💔 Removed from saved looks");
    } else {
      newSaved.push(outfit);
      toast("❤️ Saved to your looks!");
    }
    setState(s => ({ ...s, savedLooks: newSaved }));
    localStorage.setItem("sf_saved", JSON.stringify(newSaved));
  };

  const addToCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!state.compareMode) return;
    const isAlreadyIn = state.compareList.includes(index);
    let newList = [...state.compareList];
    if (isAlreadyIn) {
      newList = newList.filter((i) => i !== index);
    } else {
      if (newList.length >= 2) {
        toast("⚠️ Only 2 outfits can be compared");
        return;
      }
      newList.push(index);
    }
    setState((s) => ({ ...s, compareList: newList }));
  };

  const addToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newCart = [...state.cart];
    const existingIdx = newCart.findIndex(c => c.name === outfit.name);
    if (existingIdx >= 0) {
      newCart[existingIdx] = { ...newCart[existingIdx], qty: (newCart[existingIdx].qty || 1) + 1 };
      toast(`🛒 Added another "${outfit.name}"`);
    } else {
      newCart.push({ ...outfit, qty: 1 });
      toast("🛒 Added to cart!");
    }
    setState(s => ({ ...s, cart: newCart }));
    localStorage.setItem("sf_cart", JSON.stringify(newCart));
  };

  const openModal = () => {
    // simplified modal for now, omitted for brevity but can add an overlay
    toast(`👀 Viewing ${outfit.name}`);
  };

  return (
    <div className={`outfit-card ${isCompareSelected ? "compare-selected" : ""}`} onClick={openModal}>
      <div className="card-image" style={{ background: outfit.bg || "linear-gradient(135deg,#e8f5f0,#d0eae0)" }}>
        <div className="card-image-emoji">{outfit.emoji || "👗"}</div>
        <div className="card-actions">
          <button className="card-action-btn" onClick={toggleSave} title="Save look">
            {isSaved ? "❤️" : "🤍"}
          </button>
          <button className={`card-action-btn card-compare-btn ${isCompareSelected ? "active" : ""}`} onClick={addToCompare} title="Compare">
            ⚖️
          </button>
        </div>
        <div className="card-badge" style={{ background: catMeta.bg, color: catMeta.color }}>
          {catMeta.label}
        </div>
      </div>
      <div className="card-body">
        <div className="card-category" style={{ color: catMeta.color }}>{catMeta.label}</div>
        <div className="card-name">{outfit.name}</div>
        <div className="card-why">{outfit.why}</div>
        <div className="card-colors">
          {(outfit.colors || []).map((c, i) => (
            <div key={i} className="card-color-dot" style={{ background: c }}></div>
          ))}
        </div>
        <div className="card-footer">
          <div className="card-price">{outfit.price || "₹3,000–₹8,000"}</div>
          <div className="card-cta">
            <button className="card-cart-btn" onClick={addToCart}>🛒 Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Results() {
  const { state, setState } = useStore();

  const doCompare = () => {
    // simplified compare modal pop up
    if (state.compareList.length < 2) return;
    const [a, b] = [state.currentOutfits[state.compareList[0]], state.currentOutfits[state.compareList[1]]];
    alert(`Comparing: ${a.name} vs ${b.name}`);
  };

  if (state.activeSection !== "results") return null;

  return (
    <section className="section" id="results">
      <div className="results-container">
        <div className="results-header">
          <div className="results-tag">✦ AI-Curated For You</div>
          <h2>Your <em>Perfect</em> Outfits</h2>
          <p id="results-subtitle">Based on your {state.bodyType || "selected"} body type — {state.currentOutfits.length} outfits curated</p>
          <div className="results-actions">
            <button className={`btn-compare-mode ${state.compareMode ? 'active':''}`} onClick={() => setState(s => ({ ...s, compareMode: !s.compareMode, compareList: [] }))}>
              ⚖️ Compare
            </button>
          </div>
        </div>
        
        {state.compareMode && (
          <div className="compare-bar" id="compare-bar">
            <span>⚖️ Select 2 outfits to compare side-by-side</span>
            <div id="compare-names">
              {state.compareList.map(i => <span key={i} className="compare-name-tag">{state.currentOutfits[i]?.name}</span>)}
            </div>
            <button className="btn-do-compare" onClick={doCompare} disabled={state.compareList.length < 2}>Compare Now</button>
            <button className="btn-text" onClick={() => setState(s => ({ ...s, compareMode: false, compareList: [] }))}>Cancel</button>
          </div>
        )}

        <div className="outfit-grid">
          {state.currentOutfits.map((o, i) => (
            <OutfitCard 
              key={i} 
              index={i} 
              outfit={o} 
              isSaved={state.savedLooks.some(s => s.name === o.name)}
              isCompareSelected={state.compareList.includes(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Saved() {
  const { state, showSection } = useStore();
  
  if (state.activeSection !== "saved") return null;

  return (
    <section className="section" id="saved">
      <div className="results-container">
        <div className="results-header">
          <div className="results-tag">❤️ Your Collection</div>
          <h2>Saved <em>Looks</em></h2>
          <p>Outfits you've loved and saved for later</p>
        </div>
        
        {state.savedLooks.length === 0 ? (
          <div className="saved-empty">
            <div style={{fontSize: "4rem", marginBottom: "16px"}}>🤍</div>
            <h3 style={{fontFamily: "var(--font-display)", fontSize: "1.6rem", marginBottom: "8px"}}>No saved looks yet</h3>
            <p style={{color: "var(--muted)"}}>Tap the ❤️ on any outfit card to save it here</p>
            <button className="btn-primary" onClick={() => showSection("results")} style={{marginTop: "24px", padding: "12px 28px", borderRadius: "100px"}}>Browse Outfits</button>
          </div>
        ) : (
          <div className="outfit-grid">
            {state.savedLooks.map((o, i) => (
              <OutfitCard 
                key={`saved-${i}`} 
                index={i} 
                outfit={o} 
                isSaved={true}
                isCompareSelected={false}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
