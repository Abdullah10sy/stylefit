"use client";
import React, { useState } from "react";
import { useStore } from "@/app/store";

export function Payment() {
  const { state, setState, showSection, toast } = useStore();
  const [method, setMethod] = useState("card");
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [processing, setProcessing] = useState(false);

  if (state.activeSection !== "payment") return null;

  const subtotal = state.cart.reduce((s, c) => s + (c.basePrice * (c.qty || 1)), 0);
  const shipping = subtotal > 1000 ? 0 : 99;
  const total = subtotal + shipping - discount;

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "STYLE20" && discount === 0) {
      setDiscount(Math.round(subtotal * 0.20));
      toast("🎉 Coupon applied! 20% off");
    } else if (discount > 0) {
      toast("⚠️ Coupon already applied");
    } else {
      toast("❌ Invalid coupon code");
    }
  };

  const processPayment = () => {
    if (state.cart.length === 0) {
      toast("⚠️ Your cart is empty");
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      const oid = "SF-" + Math.random().toString(36).substr(2, 8).toUpperCase();
      setOrderId(oid);
      setSuccess(true);
      setState(s => ({ ...s, cart: [] }));
      localStorage.setItem("sf_cart", JSON.stringify([]));
      toast("🎉 Order confirmed! " + oid);
      setProcessing(false);
    }, 2000);
  };

  return (
    <section className="section" id="payment">
      <div className="payment-container">
        {!success ? (
          <>
            <div className="payment-header">
              <button className="btn-ghost" onClick={() => showSection("cart")} style={{ marginBottom: "16px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                ← Back to Cart
              </button>
              <h2>Complete Your <em>Order</em></h2>
              <p style={{ color: "var(--muted)" }}>Secure checkout — your payment is encrypted</p>
            </div>
            
            <div className="payment-grid">
              <div className="payment-left">
                <div className="payment-form-section">
                  <h3>💳 Payment Method</h3>
                  <div className="payment-methods">
                    <button className={`pay-method-btn ${method === 'card' ? 'active' : ''}`} onClick={() => setMethod('card')}>💳 Card</button>
                    <button className={`pay-method-btn ${method === 'upi' ? 'active' : ''}`} onClick={() => setMethod('upi')}>📱 UPI</button>
                    <button className={`pay-method-btn ${method === 'netbanking' ? 'active' : ''}`} onClick={() => setMethod('netbanking')}>🏦 Net Banking</button>
                    <button className={`pay-method-btn ${method === 'cod' ? 'active' : ''}`} onClick={() => setMethod('cod')}>💵 COD</button>
                  </div>
                  
                  {method === "card" && (
                    <div id="pay-card-fields">
                      <div className="form-row-full">
                        <label className="pay-label">Card Number</label>
                        <div className="card-input-row">
                          <input className="pay-input" placeholder="1234 5678 9012 3456" type="text" maxLength={19} />
                        </div>
                      </div>
                    </div>
                  )}

                  {method === "cod" && (
                    <div style={{ padding: "20px", background: "rgba(241,196,61,0.1)", border: "1px solid rgba(241,196,61,0.3)", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                      <div style={{ fontSize: "2rem", marginBottom: "8px" }}>💵</div>
                      <p style={{ fontSize: "0.9rem", color: "var(--ink-light)" }}>Pay in cash when your order arrives.</p>
                    </div>
                  )}

                  <div className="security-badges">
                    <div className="sec-badge">🔒 256-bit SSL</div>
                    <div className="sec-badge">✅ PCI DSS Secure</div>
                  </div>
                </div>
              </div>

              <div className="order-summary">
                <h3>🛍️ Order Summary</h3>
                <div className="order-items">
                  {state.cart.map((item, i) => (
                    <div key={i} className="order-item">
                      <div className="order-item-img" style={{ background: item.bg }}>{item.emoji}</div>
                      <div>
                        <div className="order-item-name">{item.name}</div>
                        <div className="order-item-qty">Qty: {item.qty}</div>
                      </div>
                      <div className="order-item-price">₹{(item.basePrice * (item.qty || 1)).toLocaleString("en-IN")}</div>
                    </div>
                  ))}
                </div>
                
                <div className="coupon-row">
                  <input className="coupon-input" placeholder="Promo code (STYLE20)" value={couponCode} onChange={e => setCouponCode(e.target.value)} disabled={discount > 0} />
                  <button className="coupon-apply-btn" onClick={applyCoupon}>Apply</button>
                </div>
                
                <div className="order-totals">
                  <div className="order-total-row"><span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
                  <div className="order-total-row"><span>Delivery</span><span>{shipping === 0 ? "FREE" : "₹" + shipping}</span></div>
                  {discount > 0 && <div className="order-total-row" style={{ color: "var(--emerald)" }}><span>Promo</span><span>−₹{discount.toLocaleString("en-IN")}</span></div>}
                  <div className="order-total-row final"><span>Total</span><span>₹{total.toLocaleString("en-IN")}</span></div>
                </div>
                
                <button className="pay-now-btn" onClick={processPayment} disabled={processing}>
                  <span style={{ position: "relative", zIndex: 1 }}>{processing ? 'Processing...' : '🔒 Pay Now — ₹' + total.toLocaleString("en-IN")}</span>
                  {!processing && <div className="btn-shimmer"></div>}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="payment-success">
            <div style={{ position: "relative", display: "inline-block" }}>
              <div className="success-circle">✓</div>
            </div>
            <h2 className="success-title">Order Placed!</h2>
            <p className="success-sub">Your style is on its way. You'll receive a confirmation SMS shortly with tracking details.</p>
            <div className="order-id-pill">#{orderId}</div>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => { setSuccess(false); showSection("results"); }} style={{ padding: "12px 28px" }}>Browse More Outfits</button>
              <button className="btn-ghost" onClick={() => { setSuccess(false); showSection("saved"); }} style={{ padding: "12px 28px" }}>View Saved</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
