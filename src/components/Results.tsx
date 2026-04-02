"use client";
import React, { useState } from "react";
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && outfit.image && (
        <div 
          style={{
            position: 'fixed', inset: 0, zIndex: 9999, 
            background: 'rgba(0,0,0,0.85)', display: 'flex', 
            justifyContent: 'center', alignItems: 'center', padding: '20px', cursor: 'zoom-out'
          }}
          onClick={closeModal}
        >
          <div style={{ position: 'relative', maxWidth: '100%', maxHeight: '100%' }}>
            <img 
              src={outfit.image} 
              alt={outfit.name} 
              style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', cursor: 'default' }}
              onClick={(e) => e.stopPropagation()} 
            />
            <button 
              onClick={closeModal}
              style={{
                position: 'absolute', top: '-15px', right: '-15px', 
                background: 'white', color: 'black', border: 'none', 
                borderRadius: '50%', width: '36px', height: '36px', 
                cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <div className={`outfit-card ${isCompareSelected ? "compare-selected" : ""}`} onClick={openModal}>
      <div className="card-image" style={{ background: outfit.bg || "linear-gradient(135deg,#e8f5f0,#d0eae0)", position: "relative" }}>
        {outfit.image ? (
          <img src={outfit.image} alt={outfit.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", position: "absolute", inset: 0 }} />
        ) : (
          <div className="card-image-emoji">{outfit.emoji || "👗"}</div>
        )}
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
    </>
  );
}

export function Results() {
  const { state, setState } = useStore();
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const getOccasion = (cat: string) => {
    switch(cat) {
      case 'formal': return 'Perfect for key meetings, weddings, and upscale events.';
      case 'party': return 'Ideal for night outs, evening dates, and exclusive lounges.';
      case 'sporty': return 'Best for gym sessions, outdoor runs, and active weekends.';
      case 'streetwear': return 'City explorations, concerts, and casual hangouts.';
      case 'ethnic': return 'Festivals, traditional ceremonies, and cultural events.';
      case 'casual': default: return 'Great for weekend brunches, casual Fridays, and errands.';
    }
  };

  const getEnvironment = (cat: string) => {
    switch(cat) {
      case 'formal': return 'Climate-controlled indoors, prestigious venues.';
      case 'party': return 'Dimly lit interiors, moody lighting.';
      case 'sporty': return 'Outdoors, breathable for high activity.';
      case 'streetwear': return 'Urban streets, versatile for shifting weather.';
      case 'ethnic': return 'Indoors or outdoors depending on fabric weight.';
      case 'casual': default: return 'All-purpose, comfortable in mild weather.';
    }
  };

  const doCompare = () => {
    if (state.compareList.length < 2) return;
    setCompareModalOpen(true);
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

        {compareModalOpen && state.compareList.length === 2 && (
          <div 
            style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}
            onClick={() => setCompareModalOpen(false)}
          >
            {(() => {
              const a = state.currentOutfits[state.compareList[0]];
              const b = state.currentOutfits[state.compareList[1]];
              return (
                <div 
                  style={{ background: 'var(--page-bg)', width: '100%', maxWidth: '900px', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}
                  onClick={e => e.stopPropagation()}
                >
                  <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)' }}>
                    <h3 style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'var(--font-display)' }}>✨ AI Comparison Analysis</h3>
                    <button onClick={() => setCompareModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--ink)' }}>✕</button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', overflowY: 'auto' }}>
                    <div style={{ padding: '24px', borderRight: '1px solid var(--border)' }}>
                      <div style={{ height: '260px', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px', position: 'relative' }}>
                        {a.image ? <img src={a.image} style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center'}}/> : <div style={{background:a.bg, width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'4rem'}}>{a.emoji}</div>}
                      </div>
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--ink)' }}>{a.name}</h4>
                      <div style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '20px' }}>{a.price}</div>
                      
                      <div style={{ marginBottom: '16px' }}>
                        <strong style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--emerald)', marginBottom: '4px' }}>Style Benefit</strong>
                        <p style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{a.why}</p>
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <strong style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--emerald)', marginBottom: '4px' }}>Occasion</strong>
                        <p style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{getOccasion(a.category || 'casual')}</p>
                      </div>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--emerald)', marginBottom: '4px' }}>Environment</strong>
                        <p style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{getEnvironment(a.category || 'casual')}</p>
                      </div>
                    </div>

                    <div style={{ padding: '24px' }}>
                      <div style={{ height: '260px', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px', position: 'relative' }}>
                        {b.image ? <img src={b.image} style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center'}}/> : <div style={{background:b.bg, width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'4rem'}}>{b.emoji}</div>}
                      </div>
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--ink)' }}>{b.name}</h4>
                      <div style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '20px' }}>{b.price}</div>
                      
                      <div style={{ marginBottom: '16px' }}>
                        <strong style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '4px' }}>Style Benefit</strong>
                        <p style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{b.why}</p>
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <strong style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '4px' }}>Occasion</strong>
                        <p style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{getOccasion(b.category || 'casual')}</p>
                      </div>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '4px' }}>Environment</strong>
                        <p style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{getEnvironment(b.category || 'casual')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}
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
