"use client";
import React from 'react';
import { useStore } from "@/app/store";

export function Hero() {
  const { state, showSection } = useStore();
  const loggedIn = !!state.user;

  return (
    <section className="section" id="hero">
      <div className="hero-bg">
        <div className="hero-orb orb-1"></div>
        <div className="hero-orb orb-2"></div>
        <div className="hero-orb orb-3"></div>
        <div className="hero-grid"></div>
        {/* Add particles loop */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="particle" style={{
            width: `${4 + Math.random() * 8}px`,
            height: `${4 + Math.random() * 8}px`,
            background: ['var(--emerald)', 'var(--terra)', 'var(--gold)'][Math.floor(Math.random() * 3)],
            left: `${Math.random() * 100}%`,
            animationDuration: `${8 + Math.random() * 12}s`,
            animationDelay: `${Math.random() * 8}s`,
            opacity: 0.3
          }}></div>
        ))}
      </div>
      <div className="hero-content">
        <br />
        <div className="hero-badge">✦ AI-Powered Personal Styling</div>
        <h1 className="hero-title">Outfits That Fit<br /><em>Your Body,</em><br /><span className="title-outline">Perfectly.</span></h1>
        <p className="hero-sub">Stop guessing what to wear. Our AI analyzes your body type and height to recommend outfits that flatter, elevate, and express who you truly are.</p>
        <div className="hero-cta">
          <button className="btn-hero" onClick={() => showSection(loggedIn ? 'dashboard' : 'login')}>
            <span>{loggedIn ? 'Go to Dashboard' : 'Get Started'}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>
        {!loggedIn && <p className="hero-note">Join in seconds with Google or Email.</p>}
        <div className="hero-stats">
          <div className="stat"><span className="stat-num">50K+</span><span className="stat-label">Styled Users</span></div>
          <div className="stat-divider"></div>
          <div className="stat"><span className="stat-num">500+</span><span className="stat-label">Outfit Combos</span></div>
          <div className="stat-divider"></div>
          <div className="stat"><span className="stat-num">4.9★</span><span className="stat-label">User Rating</span></div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="fashion-cards">
          <div className="fashion-card fc-1">
            <div className="fc-img" style={{ background: 'linear-gradient(135deg,#0D5C4B22,#D9770622)' }}><span style={{ fontSize: '2.8rem' }}>👔</span></div>
            <div className="fc-info"><span className="fc-tag">Casual</span><span className="fc-name">Relaxed Linen Set</span></div>
          </div>
          <div className="fashion-card fc-2">
            <div className="fc-img" style={{ background: 'linear-gradient(135deg,#D9770622,#F1C43D22)' }}><span style={{ fontSize: '2.8rem' }}>🧥</span></div>
            <div className="fc-info"><span className="fc-tag">Formal</span><span className="fc-name">Power Suit Look</span></div>
          </div>
          <div className="fashion-card fc-3">
            <div className="fc-img" style={{ background: 'linear-gradient(135deg,#F1C43D22,#0D5C4B22)' }}><span style={{ fontSize: '2.8rem' }}>✨</span></div>
            <div className="fc-info"><span className="fc-tag">Party</span><span className="fc-name">Evening Glam</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="logo"><span className="logo-icon">✦</span><span>StyleAi</span></div>
          <p>Dressing well is a form of good manners. We make it effortless.</p>
          <div className="social-links">
            <a href="https://x.com/realstyleai?s=21" className="social-link">𝕏</a>
            <a href="https://pin.it/2peyEiS5d" className="social-link">📌</a>
            <a href="https://www.instagram.com/real_styleai?igsh=MWMwNWpsOWw1Znc0Yg==" className="social-link">📷</a>
          </div>
        </div>
        <div className="footer-links">
          <div className="footer-col"><h4>Product</h4><a href="/how-it-works">How It Works</a><a href="/style-guide">Style Guide</a><a href="/categories">Categories</a><a href="/premium">Premium</a></div>
          <div className="footer-col"><h4>Company</h4><a href="/about">About Us</a><a href="/blog">Blog</a><a href="/careers">Careers</a><a href="/press">Press</a></div>
          <div className="footer-col"><h4>Legal</h4><a href="/privacy-policy">Privacy Policy</a><a href="/terms">Terms</a><a href="/cookie-policy">Cookie Policy</a><a href="/contact">Contact</a></div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 StyleAi. All rights reserved.Abuu Pvt Lmt</p>
        <p>Made with ✦ for fashion lovers everywhere</p>
      </div>
    </footer>
  );
}
