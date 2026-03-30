"use client";
import { useStore } from "@/app/store";

export function CartDrawer() {
  const { state, setState, showSection, toast } = useStore();

  const changeQty = (idx: number, delta: number) => {
    const newCart = [...state.cart];
    newCart[idx].qty = Math.max(1, (newCart[idx].qty || 1) + delta);
    setState((s) => ({ ...s, cart: newCart }));
    localStorage.setItem("sf_cart", JSON.stringify(newCart));
  };

  const removeFromCart = (idx: number) => {
    const newCart = [...state.cart];
    newCart.splice(idx, 1);
    setState((s) => ({ ...s, cart: newCart }));
    localStorage.setItem("sf_cart", JSON.stringify(newCart));
    toast("🗑️ Removed from cart");
  };

  const goToCheckout = () => {
    // simplified close cart
    setState(s => ({ ...s, activeSection: "payment" }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const subtotal = state.cart.reduce((s, c) => s + (c.basePrice * (c.qty || 1)), 0);
  const shipping = subtotal > 1000 ? 0 : 99;
  const total = subtotal + shipping;

  // Render modal style drawer only if active / triggered
  // For simplicity, we just render if activeSection === "cart" or handle it purely as modal
  if (state.activeSection !== "cart") return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => showSection("results")}></div>
      <div className="cart-drawer" style={{ right: 0, transform: 'translateX(0)' }}>
        <div className="cart-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="cart-title">Your Cart</span>
            <span className="cart-count-pill">{state.cart.reduce((a,c)=>a+(c.qty||1),0)} items</span>
          </div>
          <button className="cart-close" onClick={() => showSection("results")}>✕</button>
        </div>
        
        <div className="cart-items">
          {state.cart.length === 0 ? (
            <div className="cart-empty" style={{ display: "flex" }}>
              <div className="cart-empty-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Add some outfits to get started</p>
              <button className="btn-primary" onClick={() => showSection("results")} style={{ marginTop: "8px" }}>Browse Outfits</button>
            </div>
          ) : (
            state.cart.map((item, i) => (
              <div key={i} className="cart-item">
                <div className="cart-item-img" style={{ background: item.bg || "#e8f5f0" }}>{item.emoji || "👗"}</div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-meta">{item.top}</div>
                  <div className="cart-item-controls">
                    <button className="qty-btn" onClick={() => changeQty(i, -1)}>−</button>
                    <span className="qty-value">{item.qty}</span>
                    <button className="qty-btn" onClick={() => changeQty(i, 1)}>+</button>
                    <button className="cart-item-remove" onClick={() => removeFromCart(i)}>✕ Remove</button>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
                  <div className="cart-item-price">₹{(item.basePrice * (item.qty || 1)).toLocaleString("en-IN")}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {state.cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="cart-summary-row"><span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
              <div className="cart-summary-row"><span>Delivery</span><span>{shipping === 0 ? "FREE" : "₹" + shipping}</span></div>
              <div className="cart-summary-row total"><span>Total</span><span>₹{total.toLocaleString("en-IN")}</span></div>
            </div>
            <button className="cart-checkout-btn" onClick={goToCheckout}>
              <span>🔒 Proceed to Checkout</span>
              <span id="cart-checkout-amount" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>₹{total.toLocaleString("en-IN")}</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
