import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, ChevronLeft, CheckCircle } from 'lucide-react'

const Signup = () => {
  const [step, setStep] = useState(1)
  const [show, setShow] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', agree: false })
  const u = (k, v) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <div className="auth-logo">NP</div>
          <span className="auth-logo-text">Naija<span className="prim">Predict</span></span>
        </div>
        <div className="auth-hero">
          <h1>Start<br /><span className="grad-text">Predicting.</span></h1>
          <p>Join 68,000+ Nigerians already trading on the outcomes of real-world events.</p>
          <div className="onboard-steps">
            {['Create Account', 'Verify Email', 'Start Trading'].map((s, i) => (
              <div key={i} className={`ob-step ${step > i + 1 ? 'done' : ''} ${step === i + 1 ? 'active' : ''}`}>
                <div className="ob-step-circle">{step > i + 1 ? <CheckCircle size={16} /> : i + 1}</div>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          {step === 1 && (
            <>
              <h2>Create your account</h2>
              <p className="auth-sub">Get started in under 2 minutes</p>

              <div className="auth-social-row">
                <button className="auth-social">
                  <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                  Google
                </button>
                <button className="auth-social">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
                  GitHub
                </button>
              </div>

              <div className="auth-divider"><span>or continue with email</span></div>

              <form className="auth-form" onSubmit={e => { e.preventDefault(); setStep(2); }}>
                <div className="af-group">
                  <label>Full Name</label>
                  <div className="af-input-wrap"><User size={16} className="af-icon" /><input type="text" className="input" placeholder="Olawale Ogunbiyi" value={form.name} onChange={e => u('name', e.target.value)} required /></div>
                </div>
                <div className="af-group">
                  <label>Email Address</label>
                  <div className="af-input-wrap"><Mail size={16} className="af-icon" /><input type="email" className="input" placeholder="you@example.com" value={form.email} onChange={e => u('email', e.target.value)} required /></div>
                </div>
                <div className="af-group">
                  <label>Phone Number</label>
                  <div className="af-input-wrap"><Phone size={16} className="af-icon" /><input type="tel" className="input" placeholder="+234 812 345 6789" value={form.phone} onChange={e => u('phone', e.target.value)} required /></div>
                </div>
                <div className="af-group">
                  <label>Password</label>
                  <div className="af-input-wrap">
                    <Lock size={16} className="af-icon" />
                    <input type={show ? 'text' : 'password'} className="input" placeholder="Min. 8 characters" value={form.password} onChange={e => u('password', e.target.value)} required minLength={8} />
                    <button type="button" className="af-eye" onClick={() => setShow(!show)}>{show ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                  </div>
                </div>
                <label className="af-check">
                  <input type="checkbox" checked={form.agree} onChange={e => u('agree', e.target.checked)} required />
                  <span>I agree to the <Link to="/terms">Terms of Use</Link> and Privacy Policy</span>
                </label>
                <button type="submit" className="btn btn-primary btn-lg w-full">Create Account <ArrowRight size={18} /></button>
              </form>

              <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
            </>
          )}

          {step === 2 && (
            <div className="verify-step">
              <div className s="verify-icon"><Mail size={40} /></div>
              <h2>Verify your email</h2>
              <p className="auth-sub">We've sent a 6-digit code to <strong>{form.email || 'your email'}</strong></p>
              <div className="otp-row">
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <input key={i} type="text" maxLength={1} className="otp-input" />
                ))}
              </div>
              <button className="btn btn-primary btn-lg w-full" onClick={() => setStep(3)}>Verify <ArrowRight size={18} /></button>
              <p className="auth-sub" style={{ marginTop: '1rem', textAlign: 'center' }}>Didn't receive it? <a href="#" style={{ color: 'var(--primary-light)', fontWeight: 700 }}>Resend code</a></p>
            </div>
          )}

          {step === 3 && (
            <div className="verify-step" style={{ textAlign: 'center' }}>
              <div className="success-icon" style={{ margin: '0 auto 1.5rem' }}><CheckCircle size={48} /></div>
              <h2>Welcome to NaijaPredict! 🎉</h2>
              <p className="auth-sub">Your account is ready. Start exploring markets and making your first prediction.</p>
              <Link to="/" className="btn btn-primary btn-lg w-full" style={{ marginBottom: '0.75rem' }}>Explore Markets <ArrowRight size={18} /></Link>
              <Link to="/deposit" className="btn btn-ghost w-full">Deposit Funds</Link>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .auth-page { display: flex; min-height: 100vh; }
        .auth-left { flex: 1; background: linear-gradient(135deg, #0a1a12, #051a0f); display: flex; flex-direction: column; justify-content: center; padding: 4rem; position: relative; overflow: hidden; }
        .auth-left::before { content: ''; position: absolute; width: 300px; height: 300px; background: radial-gradient(circle, rgba(0,135,81,0.15), transparent); top: 20%; right: -50px; border-radius: 50%; }
        .auth-brand { display: flex; align-items: center; gap: 0.7rem; margin-bottom: 3rem; }
        .auth-logo { width: 36px; height: 36px; background: var(--primary); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8rem; color: white; }
        .auth-logo-text { font-family: var(--font-display); font-size: 1.4rem; font-weight: 700; color: white; }
        .prim { color: var(--primary-light); }
        .auth-hero h1 { font-size: 3.5rem; color: white; line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: -0.03em; }
        .auth-hero p { color: rgba(255,255,255,0.6); font-size: 1.1rem; line-height: 1.6; max-width: 400px; margin-bottom: 2.5rem; }

        .onboard-steps { display: flex; flex-direction: column; gap: 1rem; }
        .ob-step { display: flex; align-items: center; gap: 0.75rem; color: rgba(255,255,255,0.3); font-weight: 700; font-size: 0.9rem; }
        .ob-step.active { color: white; }
        .ob-step.done { color: var(--accent-yes); }
        .ob-step-circle { width: 32px; height: 32px; border-radius: 50%; border: 2px solid currentColor; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; }

        .auth-right { width: 520px; display: flex; align-items: center; justify-content: center; padding: 2rem; background: var(--bg); overflow-y: auto; }
        .auth-card { width: 100%; max-width: 400px; }
        .auth-card h2 { font-size: 1.75rem; margin-bottom: 0.3rem; }
        .auth-sub { color: var(--text-muted); margin-bottom: 2rem; }

        .auth-social-row { display: flex; gap: 0.75rem; margin-bottom: 1.5rem; }
        .auth-social { flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.6rem; padding: 0.75rem; border-radius: var(--radius); border: 1px solid var(--border); background: var(--surface-light); color: var(--text); font-weight: 700; font-size: 0.85rem; cursor: pointer; font-family: var(--font-main); transition: border-color 0.15s; }
        .auth-social:hover { border-color: var(--primary); }

        .auth-divider { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
        .auth-divider::before, .auth-divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }
        .auth-divider span { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; white-space: nowrap; }

        .auth-form { display: flex; flex-direction: column; gap: 1.1rem; margin-bottom: 1.5rem; }
        .af-group label { display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.4rem; }
        .af-input-wrap { position: relative; }
        .af-icon { position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .af-input-wrap .input { padding-left: 2.5rem; padding-right: 2.5rem; }
        .af-eye { position: absolute; right: 0.85rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-muted); cursor: pointer; }
        .af-check { display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.8rem; color: var(--text-muted); cursor: pointer; }
        .af-check input { margin-top: 0.15rem; }
        .af-check a { color: var(--primary-light); font-weight: 700; }

        .auth-switch { font-size: 0.85rem; color: var(--text-muted); text-align: center; }
        .auth-switch a { color: var(--primary-light); font-weight: 700; }

        .verify-step { padding-top: 1rem; }
        .verify-icon { width: 72px; height: 72px; border-radius: 50%; background: rgba(0,135,81,0.1); display: flex; align-items: center; justify-content: center; color: var(--primary-light); margin-bottom: 1.5rem; }
        .otp-row { display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 2rem; }
        .otp-input { width: 48px; height: 56px; border-radius: var(--radius); border: 1px solid var(--border); background: var(--surface-light); color: var(--text); text-align: center; font-size: 1.5rem; font-weight: 800; outline: none; font-family: var(--font-main); }
        .otp-input:focus { border-color: var(--primary); }

        .success-icon { width: 72px; height: 72px; border-radius: 50%; background: rgba(0,200,83,0.1); display: flex; align-items: center; justify-content: center; color: var(--accent-yes); }

        @media (max-width: 900px) {
          .auth-page { flex-direction: column; }
          .auth-left { padding: 2rem; min-height: auto; }
          .auth-hero h1 { font-size: 2.5rem; }
          .auth-right { width: 100%; }
        }
      `}</style>
    </div>
  )
}

export default Signup
