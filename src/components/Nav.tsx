"use client";
import { useStore } from "@/app/store";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export function Nav() {
  const { state, setState, showSection, toast } = useStore();
  const loggedIn = !!state.user;

  const toggleTheme = () => {
    const newDark = !state.isDark;
    setState((s) => ({ ...s, isDark: newDark }));
    document.documentElement.setAttribute('data-theme', newDark ? 'dark' : 'light');
    localStorage.setItem('sf_theme', newDark ? 'dark' : 'light');
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch(err) {
      console.error("Sign out error", err);
    }
    setState((s) => ({ ...s, user: null }));
    showSection('hero');
    toast('👋 Signed out successfully');
  };

  return (
    <nav className="nav" id="nav">
      <div className="nav-inner">
        <div className="logo" onClick={() => showSection('hero')}>
          <span className="logo-icon">✦</span>
          <span>StyleAi</span>
        </div>
        <div className="nav-links" id="nav-links">
          <button className="nav-link" onClick={() => showSection('hero')}>Home</button>
          {loggedIn && (
            <>
              <button className="nav-link" onClick={() => showSection('dashboard')}>Dashboard</button>
              <button className="nav-link" onClick={() => showSection('results')}>My Outfits</button>
              <button className="nav-link" onClick={() => showSection('saved')}>
                Saved {state.savedLooks.length > 0 && <span className="saved-count-badge">{state.savedLooks.length}</span>}
              </button>
            </>
          )}
        </div>
        <div className="nav-actions">
          {loggedIn && (
            <>
              <button className="search-nav-btn" onClick={() => {}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                Search outfits...
              </button>
              <button className="cart-nav-btn" onClick={() => showSection('cart')}>
                🛒 Cart
                {state.cart.length > 0 && <span className="cart-badge">{state.cart.reduce((a,c)=>a+(c.qty||1),0)}</span>}
              </button>
            </>
          )}
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
            {state.isDark ? '☀️' : '🌙'}
          </button>
          {!loggedIn && (
            <div id="nav-right">
              <button className="btn-ghost" onClick={() => showSection('login')}>Sign In</button>
              <button className="btn-primary" onClick={() => showSection('login')}>Get Started</button>
            </div>
          )}
          {loggedIn && (
            <div className="nav-user">
              <span className="user-email" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)' }}>{state.user.email}</span>
              <button className="btn-ghost" onClick={logout}>Sign Out</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
