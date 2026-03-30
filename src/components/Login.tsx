"use client";
import React, { useState } from 'react';
import { useStore } from "@/app/store";
import { auth } from "@/lib/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";

export function Login() {
  const { state, setState, showSection, toast } = useStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast('⚠️ Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        toast('🎉 Account created successfully!');
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        toast('✅ Signed in successfully!');
      }
      
      const user = userCredential.user;
      setState(s => ({ ...s, user: { email: user.email, uid: user.uid, phone: null } }));
      setTimeout(() => showSection('dashboard'), 500);
      
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') toast('❌ Email already in use. Please sign in.');
      else if (error.code === 'auth/wrong-password') toast('❌ Incorrect password.');
      else if (error.code === 'auth/user-not-found') toast('❌ No account found with this email.');
      else toast('❌ Error: ' + (error.message || 'Authentication failed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      toast('✅ Google Sign-In successful!');
      setState(s => ({ ...s, user: { email: user.email, uid: user.uid, phone: null } }));
      setTimeout(() => showSection('dashboard'), 500);
      
    } catch (error: any) {
      console.error(error);
      toast('❌ Google Sign-In closed or failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={`section ${state.activeSection === 'login' ? '' : 'hidden'}`} id="login">
      <div className="auth-container">
        <div className="auth-card" style={{ maxWidth: '420px' }}>
          <div className="auth-header">
            <div className="auth-icon" style={{ background: 'var(--emerald)', color: '#fff' }}>✦</div>
            <h2>{isSignUp ? 'Create an Account' : 'Welcome Back'}</h2>
            <p>{isSignUp ? 'Join StyleAi to discover your perfect look' : 'Enter your details to access your dashboard'}</p>
          </div>
          
          <div className="auth-body">
            <button 
              className="btn-full google-btn" 
              onClick={handleGoogleAuth} 
              disabled={isLoading}
              style={{ background: '#fff', color: '#333', border: '1px solid #ddd', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div className="auth-divider" style={{ display: 'flex', alignItems: 'center', textAlign: 'center', color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
              <span style={{ flex: 1, borderBottom: '1px solid var(--border)' }}></span>
              <span style={{ padding: '0 10px' }}>or {isSignUp ? 'sign up' : 'sign in'} with email</span>
              <span style={{ flex: 1, borderBottom: '1px solid var(--border)' }}></span>
            </div>

            <form onSubmit={handleEmailAuth}>
              <div className="input-group" style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  placeholder="you@example.com" 
                  style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--border)', background: 'var(--page-bg)', fontSize: '1rem', outline: 'none', transition: 'var(--t)' }}
                  required
                />
              </div>

              <div className="input-group" style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder="••••••••" 
                  style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--border)', background: 'var(--page-bg)', fontSize: '1rem', outline: 'none', transition: 'var(--t)' }}
                  required
                  minLength={6}
                />
              </div>

              <button className="btn-full" type="submit" disabled={isLoading} style={{ width: '100%' }}>
                {isLoading ? 'Processing...' : (isSignUp ? 'Sign Up →' : 'Sign In →')}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: 'var(--ink-light)' }}>
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <button 
                onClick={() => setIsSignUp(!isSignUp)} 
                type="button"
                style={{ background: 'none', border: 'none', color: 'var(--emerald)', fontWeight: 600, cursor: 'pointer', padding: 0 }}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
            
            <p className="auth-note" style={{ marginTop: '24px' }}>By continuing, you agree to our <a href="#">Terms</a> & <a href="#">Privacy Policy</a></p>
          </div>
        </div>
      </div>
    </section>
  );
}
