import React, { useState } from 'react'
import { ArrowRight, CheckCircle, Landmark, AlertTriangle, ShieldCheck } from 'lucide-react'

const Withdraw = () => {
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState('')
  const [bank, setBank] = useState({ name: '', account: '', bank: '' })

  const banks = ['Access Bank', 'GTBank', 'First Bank', 'UBA', 'Zenith Bank', 'Wema Bank', 'Kuda', 'OPay', 'PalmPay', 'Moniepoint']

  return (
    <div className="wd-page animate-slide-up">
      <h1>Withdraw Funds</h1>
      <p className="wd-sub">Transfer funds from your wallet to your bank account.</p>

      <div className="dep-progress">
        {['Amount', 'Bank Details', 'Confirm'].map((s, i) => (
          <div key={s} className={`dep-step ${step > i ? 'done' : ''} ${step === i + 1 ? 'active' : ''}`}>
            <div className="dep-step-num">{step > i + 1 ? <CheckCircle size={16} /> : i + 1}</div>
            <span>{s}</span>
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="dep-card glass animate-slide-up">
          <div className="wd-balance">
            <span className="wd-bal-label">Available Balance</span>
            <span className="wd-bal-val">₦245,600.00</span>
          </div>
          <h2>Withdrawal Amount</h2>
          <div className="dep-amount-wrap">
            <span className="dep-cur">₦</span>
            <input type="number" className="dep-amount-input" placeholder="0" value={amount} onChange={e => setAmount(e.target.value)} autoFocus />
          </div>
          <p className="dep-min">Minimum withdrawal: ₦1,000 · Max: ₦245,600</p>
          <div className="dep-quick">
            {[10000, 25000, 50000, 100000, 245600].map(v => (
              <button key={v} className="dep-quick-btn" onClick={() => setAmount(String(v))}>{v === 245600 ? 'Max' : `₦${v / 1000}k`}</button>
            ))}
          </div>
          <div className="dep-fee"><span>Processing fee</span><span>₦{amount ? Math.max(25, parseFloat(amount) * 0.01).toFixed(0) : '0'}</span></div>
          <div className="dep-fee total"><span>You'll receive</span><span className="fw">₦{amount ? (parseFloat(amount) - Math.max(25, parseFloat(amount) * 0.01)).toLocaleString() : '0'}</span></div>
          <button className="btn btn-primary w-full" disabled={!amount || parseFloat(amount) < 1000 || parseFloat(amount) > 245600} onClick={() => setStep(2)}>
            Continue <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="dep-card glass animate-slide-up">
          <h2>Bank Account Details</h2>
          <div className="wd-form">
            <div className="form-group">
              <label>Bank</label>
              <select className="select w-full" value={bank.bank} onChange={e => setBank(p => ({ ...p, bank: e.target.value }))}>
                <option value="">Select bank</option>
                {banks.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Account Number</label>
              <input type="text" className="input" maxLength={10} placeholder="0123456789" value={bank.account} onChange={e => setBank(p => ({ ...p, account: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Account Name</label>
              <input type="text" className="input" placeholder="Olawale Ogunbiyi" value={bank.name} onChange={e => setBank(p => ({ ...p, name: e.target.value }))} />
            </div>
            {bank.name && (
              <div className="wd-verified">
                <CheckCircle size={16} /> Account verified: <strong>{bank.name}</strong>
              </div>
            )}
          </div>
          <div className="dep-btns">
            <button className="btn btn-ghost" onClick={() => setStep(1)}>Back</button>
            <button className="btn btn-primary" disabled={!bank.bank || !bank.account || !bank.name} onClick={() => setStep(3)}>
              Continue <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="dep-card glass animate-slide-up" style={{ textAlign: 'center' }}>
          <div className="dep-success-icon"><Landmark size={32} /></div>
          <h2>Confirm Withdrawal</h2>
          <div className="dep-summary">
            <div className="dep-s-row"><span>Amount</span><span className="fw">₦{parseFloat(amount).toLocaleString()}</span></div>
            <div className="dep-s-row"><span>Fee</span><span>₦{Math.max(25, parseFloat(amount) * 0.01).toFixed(0)}</span></div>
            <div className="dep-s-row"><span>You'll receive</span><span className="fw green">₦{(parseFloat(amount) - Math.max(25, parseFloat(amount) * 0.01)).toLocaleString()}</span></div>
            <div className="dep-s-row"><span>Bank</span><span>{bank.bank}</span></div>
            <div className="dep-s-row"><span>Account</span><span>{bank.account} — {bank.name}</span></div>
          </div>
          <div className="wd-warning"><AlertTriangle size={14} /> Withdrawal typically processes within 1-24 hours.</div>
          <div className="dep-secure"><ShieldCheck size={14} /> Protected by NaijaPredict Security</div>
          <button className="btn btn-primary btn-lg w-full">Confirm Withdrawal</button>
          <button className="btn btn-ghost btn-sm" onClick={() => setStep(1)} style={{ marginTop: '0.75rem' }}>Start Over</button>
        </div>
      )}

      <style>{`
        .wd-page { max-width: 560px; margin: 0 auto; }
        .wd-page h1 { font-size: 2rem; margin-bottom: 0.3rem; }
        .wd-sub { color: var(--text-muted); margin-bottom: 2rem; }

        .wd-balance { text-align: center; padding: 1.25rem; background: linear-gradient(135deg, rgba(0,135,81,0.08), rgba(0,135,81,0.02)); border: 1px solid rgba(0,135,81,0.12); border-radius: 16px; margin-bottom: 2rem; }
        .wd-bal-label { font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block; }
        .wd-bal-val { font-size: 1.75rem; font-weight: 800; font-family: var(--font-display); }

        .wd-form { display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 1.5rem; }
        .wd-form .form-group label { display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.4rem; }
        .wd-form .select { padding: 0.65rem 2rem 0.65rem 0.75rem; font-size: 0.9rem; width: 100%; border-radius: var(--radius); }

        .wd-verified { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--accent-yes); background: rgba(0,200,83,0.06); padding: 0.75rem 1rem; border-radius: 10px; }

        .wd-warning { display: flex; align-items: center; justify-content: center; gap: 0.4rem; font-size: 0.8rem; color: var(--accent-yellow); background: rgba(255,214,0,0.06); padding: 0.75rem; border-radius: 10px; margin-bottom: 0.75rem; }
      `}</style>
    </div>
  )
}

export default Withdraw
