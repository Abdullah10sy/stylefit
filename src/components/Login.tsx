"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useStore } from "@/app/store";
import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export function Login() {
  const { state, setState, showSection, toast } = useStore();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [isSending, setIsSending] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(0);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const sendOTP = async () => {
    if (phone.length < 7) {
      toast('⚠️ Please enter a valid phone number');
      return;
    }
    const fullPhone = countryCode + phone;
    setIsSending(true);
    
    try {
      if (!(window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          'size': 'invisible'
        });
      }

      const confirmationResult = await signInWithPhoneNumber(auth, fullPhone, (window as any).recaptchaVerifier);
      (window as any).confirmationResult = confirmationResult;
      
      setState(s => ({ ...s, phone: fullPhone }));
      setStep(2);
      toast('📱 OTP sent to ' + fullPhone);
      setTimer(30);
      setTimeout(() => inputsRef.current[0]?.focus(), 100);
    } catch (error: any) {
      console.error(error);
      toast('❌ Error: ' + (error.message || 'Could not send OTP'));
      // Fallback for demo
      setState(s => ({ ...s, phone: fullPhone }));
      setStep(2);
      setTimer(30);
      setTimeout(() => inputsRef.current[0]?.focus(), 100);
    } finally {
      setIsSending(false);
    }
  };

  const handleOtpInput = (val: string, index: number) => {
    const clean = val.replace(/\\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = clean;
    setOtp(newOtp);

    if (clean && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
    
    if (newOtp.join('').length === 6) {
      verifyOTP(newOtp.join(''));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputsRef.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const verifyOTP = async (otpValue: string) => {
    if (otpValue.length < 6) return;
    toast('🔄 Verifying...');
    
    const confirmationResult = (window as any).confirmationResult;
    if (!confirmationResult) {
      // Demo logic
      if (otpValue === '123456') {
        setState(s => ({ ...s, user: { phone: state.phone } }));
        toast('✅ Verified! Welcome to StyleFit AI');
        setTimeout(() => showSection('dashboard'), 500);
      } else {
        toast('❌ Invalid OTP. Use 123456 for demo');
        setOtp(['', '', '', '', '', '']);
        inputsRef.current[0]?.focus();
      }
      return;
    }

    try {
      const result = await confirmationResult.confirm(otpValue);
      setState(s => ({ ...s, user: { phone: state.phone, uid: result.user.uid } }));
      toast('✅ Verified! Welcome to StyleFit AI');
      setTimeout(() => showSection('dashboard'), 500);
    } catch (error) {
      toast('❌ Wrong OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputsRef.current[0]?.focus();
    }
  };

  return (
    <section className={`section ${state.activeSection === 'login' ? '' : 'hidden'}`} id="login">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon">📱</div>
            <h2>Welcome to StyleFit</h2>
            <p>Enter your phone number to continue</p>
          </div>
          
          {step === 1 ? (
            <div id="step-phone">
              <div className="input-group">
                <label>Phone Number</label>
                <div className="phone-input-wrap">
                  <select className="country-code" value={countryCode} onChange={e => setCountryCode(e.target.value)}>
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+971">🇦🇪 +971</option>
                  </select>
                  <input className="phone-input" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter phone number" maxLength={12} />
                </div>
              </div>
              <button className="btn-full" onClick={sendOTP} disabled={isSending}>
                {isSending ? 'Sending...' : 'Send OTP →'}
              </button>
              <p className="auth-note">By continuing, you agree to our <a href="#">Terms</a> & <a href="#">Privacy Policy</a></p>
              <div className="auth-features">
                <div className="af-item">🔒 Secure</div>
                <div className="af-item">⚡ Instant</div>
                <div className="af-item">✦ No Password</div>
              </div>
            </div>
          ) : (
            <div id="step-otp">
              <div className="otp-hint">OTP sent to <strong>{state.phone}</strong></div>
              <div className="otp-inputs">
                {otp.map((d, i) => (
                  <input 
                    key={i}
                    ref={el => { inputsRef.current[i] = el; }}
                    className={`otp-box ${d ? 'filled' : ''}`}
                    type="text" 
                    maxLength={1} 
                    inputMode="numeric"
                    value={d}
                    onChange={e => handleOtpInput(e.target.value, i)}
                    onKeyDown={e => handleKeyDown(e, i)}
                    onClick={e => (e.target as HTMLInputElement).select()}
                  />
                ))}
              </div>
              <div className="otp-demo-hint"><span className="hint-badge">Demo</span>Use OTP: <strong>123456</strong></div>
              <div className="resend-row">
                Didn't receive? <button className="resend-link" onClick={sendOTP} disabled={timer > 0}>Resend OTP</button> 
                {timer > 0 && <span>({timer}s)</span>}
              </div>
              <button className="back-link" onClick={() => setStep(1)}>← Change number</button>
            </div>
          )}
          
        </div>
      </div>
      <div id="recaptcha-container"></div>
    </section>
  );
}
