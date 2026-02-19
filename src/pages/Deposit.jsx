import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Wallet, CreditCard, Landmark, Smartphone, ShieldCheck, ArrowRight, CheckCircle } from 'lucide-react'

const Deposit = () => {
  const [step, setStep] = useState(1)
  const [method, setMethod] = useState('')
  const [amount, setAmount] = useState('')

  const methods = [
    { id: 'paystack', name: 'Paystack', desc: 'Cards, bank transfer, USSD', icon: CreditCard, badge: 'Instant' },
    { id: 'flutterwave', name: 'Flutterwave', desc: 'Cards, mobile money, bank', icon: Smartphone, badge: 'Instant' },
    { id: 'bank', name: 'Bank Transfer', desc: 'Direct to NaijaPredict account', icon: Landmark, badge: '1-24h' },
  ]

  const handleContinue = () => {
    if (step === 1 && method) setStep(2)
    else if (step === 2 && amount && parseFloat(amount) >= 500) setStep(3)
  }

  return (
    <div className="dep-page animate-slide-up">
      <h1>Deposit Funds</h1>
      <p className="dep-sub">Add money to your NaijaPredict wallet.</p>

      {/* Progress */}
      <div className="dep-progress">
        {['Method', 'Amount', 'Confirm'].map((s, i) => (
          <div key={s} className={`dep-step ${step > i ? 'done' : ''} ${step === i + 1 ? 'active' : ''}`}>
            <div className="dep-step-num">{step > i + 1 ? <CheckCircle size={16} /> : i + 1}</div>
            <span>{s}</span>
          </div>
        ))}
      </div>

      {/* Step 1: Method */}
      {step === 1 && (
        <div className="dep-card glass animate-slide-up">
          <h2>Select Payment Method</h2>
          <div className="method-list">
            {methods.map(m => (
              <button key={m.id} className={`method-item ${method === m.id ? 'selected' : ''}`} onClick={() => setMethod(m.id)}>
                <m.icon size={20} />
                <div className="method-info">
                  <span className="method-name">{m.name}</span>
                  <span className="method-desc">{m.desc}</span>
                </div>
                <span className="method-badge">{m.badge}</span>
              </button>
            ))}
          </div>
          <button className="btn btn-primary w-full" disabled={!method} onClick={handleContinue}>Continue <ArrowRight size={16} /></button>
        </div>
      )}

      {/* Step 2: Amount */}
      {step === 2 && (
        <div className="dep-card glass animate-slide-up">
          <h2>Enter Amount</h2>
          <div className="dep-amount-wrap">
            <span className="dep-cur">₦</span>
            <input type="number" className="dep-amount-input" placeholder="0" value={amount} onChange={e => setAmount(e.target.value)} autoFocus />
          </div>
          <p className="dep-min">Minimum deposit: ₦500</p>
          <div className="dep-quick">
            {[5000, 10000, 25000, 50000, 100000].map(v => (
              <button key={v} className="dep-quick-btn" onClick={() => setAmount(String(v))}>₦{(v / 1000)}k</button>
            ))}
          </div>
          <div className="dep-fee">
            <span>Processing fee</span>
            <span>₦{amount ? Math.max(50, parseFloat(amount) * 0.015).toFixed(0) : '0'}</span>
          </div>
          <div className="dep-fee total">
            <span>You'll receive</span>
            <span className="fw">₦{amount ? (parseFloat(amount)).toLocaleString() : '0'}</span>
          </div>
          <div className="dep-btns">
            <button className="btn btn-ghost" onClick={() => setStep(1)}>Back</button>
            <button className="btn btn-primary" disabled={!amount || parseFloat(amount) < 500} onClick={handleContinue}>Continue <ArrowRight size={16} /></button>
          </div>
        </div>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && (
        <div className="dep-card glass animate-slide-up" style={{ textAlign: 'center' }}>
          <div className="dep-success-icon"><Wallet size={32} /></div>
          <h2>Confirm Deposit</h2>
          <div className="dep-summary">
            <div className="dep-s-row"><span>Method</span><span className="fw">{methods.find(m => m.id === method)?.name}</span></div>
            <div className="dep-s-row"><span>Amount</span><span className="fw">₦{parseFloat(amount).toLocaleString()}</span></div>
            <div className="dep-s-row"><span>Fee</span><span>₦{Math.max(50, parseFloat(amount) * 0.015).toFixed(0)}</span></div>
          </div>
          <div className="dep-secure"><ShieldCheck size={14} /> Secured by {methods.find(m => m.id === method)?.name}</div>
          <button className="btn btn-primary btn-lg w-full">Pay ₦{parseFloat(amount).toLocaleString()}</button>
          <button className="btn btn-ghost btn-sm" onClick={() => setStep(1)} style={{ marginTop: '0.75rem' }}>Start Over</button>
        </div>
      )}

      <style>{`
        .dep-page { max-width: 560px; margin: 0 auto; }
        .dep-page h1 { font-size: 2rem; margin-bottom: 0.3rem; }
        .dep-sub { color: var(--text-muted); margin-bottom: 2rem; }

        .dep-progress { display: flex; gap: 1rem; margin-bottom: 2rem; }
        .dep-step { display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-weight: 600; font-size: 0.85rem; }
        .dep-step.active { color: var(--primary-light); }
        .dep-step.done { color: var(--accent-yes); }
        .dep-step-num { width: 28px; height: 28px; border-radius: 50%; border: 2px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; }
        .dep-step.active .dep-step-num { border-color: var(--primary); background: rgba(0,135,81,0.1); color: var(--primary-light); }
        .dep-step.done .dep-step-num { border-color: var(--accent-yes); background: rgba(0,200,83,0.1); }

        .dep-card { padding: 2rem; border-radius: var(--radius-xl); }
        .dep-card h2 { font-size: 1.15rem; margin-bottom: 1.5rem; }

        .method-list { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
        .method-item { display: flex; align-items: center; gap: 1rem; padding: 1.25rem; border-radius: 14px; border: 1px solid var(--border); background: var(--surface-light); cursor: pointer; transition: all 0.15s; text-align: left; font-family: var(--font-main); color: var(--text); }
        .method-item:hover { border-color: var(--primary); }
        .method-item.selected { border-color: var(--primary); background: rgba(0,135,81,0.06); }
        .method-info { flex: 1; }
        .method-name { display: block; font-weight: 700; font-size: 0.95rem; }
        .method-desc { font-size: 0.75rem; color: var(--text-muted); }
        .method-badge { font-size: 0.65rem; font-weight: 800; background: rgba(0,200,83,0.1); color: var(--accent-yes); padding: 0.2rem 0.5rem; border-radius: 6px; }

        .dep-amount-wrap { display: flex; align-items: center; justify-content: center; gap: 0.25rem; margin-bottom: 0.5rem; }
        .dep-cur { font-size: 2rem; font-weight: 800; color: var(--text-muted); }
        .dep-amount-input { background: none; border: none; color: var(--text); font-size: 3rem; font-weight: 800; width: 200px; outline: none; text-align: center; font-family: var(--font-display); }
        .dep-min { font-size: 0.75rem; color: var(--text-muted); text-align: center; margin-bottom: 1.5rem; }

        .dep-quick { display: flex; gap: 0.4rem; justify-content: center; margin-bottom: 2rem; flex-wrap: wrap; }
        .dep-quick-btn { background: var(--surface-light); border: 1px solid var(--border); color: var(--text); padding: 0.4rem 0.85rem; border-radius: 8px; font-weight: 700; font-size: 0.8rem; cursor: pointer; font-family: var(--font-main); }
        .dep-quick-btn:hover { border-color: var(--primary); }

        .dep-fee { display: flex; justify-content: space-between; padding: 0.75rem 0; font-size: 0.85rem; color: var(--text-muted); border-top: 1px solid var(--border); }
        .dep-fee.total { font-weight: 700; color: var(--text); }

        .dep-btns { display: flex; gap: 0.75rem; margin-top: 1.5rem; }
        .dep-btns .btn { flex: 1; }

        .dep-success-icon { width: 64px; height: 64px; border-radius: 50%; background: rgba(0,135,81,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: var(--primary-light); }
        .dep-summary { margin: 1.5rem 0; text-align: left; }
        .dep-s-row { display: flex; justify-content: space-between; padding: 0.7rem 0; border-bottom: 1px solid var(--border); font-size: 0.9rem; }
        .dep-secure { display: flex; align-items: center; justify-content: center; gap: 0.4rem; font-size: 0.75rem; color: var(--text-muted); margin: 1.5rem 0; }
      `}</style>
    </div>
  )
}

export default Deposit
