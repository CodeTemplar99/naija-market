import React, { useState } from 'react'
import { HelpCircle, Search, MessageSquare, Mail, ChevronDown, ChevronUp } from 'lucide-react'

const HelpCenter = () => {
  const [openFaq, setOpenFaq] = useState(null)

  const faqs = [
    { q: 'How do I start trading on NaijaPredict?', a: 'Create an account, complete KYC verification, deposit funds via Paystack or Flutterwave, then browse markets and place your first trade by selecting Yes or No on any active market.' },
    { q: 'How are markets resolved?', a: 'Each market has resolution rules clearly stated on its detail page. Resolution is determined by official sources (e.g., CBN press releases, FIFA standings). Once resolved, payouts are instant.' },
    { q: 'What are the fees?', a: 'Deposit fees range from 1-1.5% depending on payment method. Withdrawal fee is 1% (min ₦25). Trading has no commission — you only pay the spread.' },
    { q: 'How do I withdraw my winnings?', a: 'Go to Withdraw in your profile, enter the amount, provide your Nigerian bank details, and confirm. Withdrawals are processed within 1-24 hours.' },
    { q: 'Is NaijaPredict legal in Nigeria?', a: 'NaijaPredict operates as a prediction market platform. We comply with all applicable regulations. Please review our Terms of Use for full legal information.' },
    { q: 'What happens if a market is voided?', a: 'If a market is voided (e.g., event cancelled), all participants receive a full refund of their positions.' },
    { q: 'Can I create my own market?', a: 'Market creation is coming soon. Currently, markets are created by the NaijaPredict team and verified community creators.' },
    { q: 'How does the leaderboard work?', a: 'The leaderboard ranks traders by total profit. Rankings update in real-time. Top traders earn badges and may qualify for exclusive bonuses.' },
  ]

  const categories = [
    { name: 'Account & KYC', count: 12 },
    { name: 'Trading', count: 18 },
    { name: 'Deposits & Withdrawals', count: 15 },
    { name: 'Market Resolution', count: 8 },
    { name: 'Technical Issues', count: 6 },
    { name: 'API & Integrations', count: 9 },
  ]

  return (
    <div className="help-page animate-slide-up">
      <div className="help-hero">
        <h1>How can we help?</h1>
        <div className="help-search">
          <Search size={18} />
          <input type="text" placeholder="Search for answers..." className="help-search-input" />
        </div>
      </div>

      {/* Categories */}
      <div className="help-cats">
        {categories.map((c, i) => (
          <div key={i} className="help-cat glass">
            <h3>{c.name}</h3>
            <span className="help-cat-count">{c.count} articles</span>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="help-faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="help-faq-list">
          {faqs.map((f, i) => (
            <div key={i} className={`faq-item glass ${openFaq === i ? 'open' : ''}`}>
              <button className="faq-toggle" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{f.q}</span>
                {openFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {openFaq === i && <p className="faq-answer">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="help-contact glass">
        <h2>Still need help?</h2>
        <p>Our support team is available 24/7 to assist you.</p>
        <div className="help-contact-btns">
          <a href="mailto:support@naijapredict.com" className="btn btn-primary"><Mail size={16} /> Email Support</a>
          <button className="btn btn-ghost"><MessageSquare size={16} /> Live Chat</button>
        </div>
      </div>

      <style>{`
        .help-page { max-width: 900px; margin: 0 auto; }

        .help-hero { text-align: center; margin-bottom: 3rem; }
        .help-hero h1 { font-size: 2.5rem; margin-bottom: 1.5rem; }
        .help-search { display: flex; align-items: center; gap: 0.6rem; max-width: 500px; margin: 0 auto; background: var(--surface-light); border: 1px solid var(--border); padding: 0.75rem 1.25rem; border-radius: 14px; }
        .help-search-input { background: none; border: none; color: var(--text); font-size: 1rem; outline: none; width: 100%; font-family: var(--font-main); }

        .help-cats { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 3rem; }
        .help-cat { padding: 1.5rem; border-radius: var(--radius-lg); cursor: pointer; transition: all 0.15s; }
        .help-cat:hover { border-color: var(--primary); transform: translateY(-2px); }
        .help-cat h3 { font-size: 0.95rem; margin-bottom: 0.3rem; }
        .help-cat-count { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }

        .help-faq-section { margin-bottom: 3rem; }
        .help-faq-section h2 { font-size: 1.5rem; margin-bottom: 1.5rem; }
        .help-faq-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .faq-item { border-radius: 14px; overflow: hidden; }
        .faq-toggle { display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 1.25rem; background: none; border: none; color: var(--text); font-weight: 700; font-size: 0.95rem; text-align: left; cursor: pointer; font-family: var(--font-main); gap: 1rem; }
        .faq-answer { padding: 0 1.25rem 1.25rem; font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; }

        .help-contact { text-align: center; padding: 3rem 2rem; border-radius: var(--radius-xl); }
        .help-contact h2 { margin-bottom: 0.5rem; }
        .help-contact p { color: var(--text-muted); margin-bottom: 1.5rem; }
        .help-contact-btns { display: flex; gap: 0.75rem; justify-content: center; }
      `}</style>
    </div>
  )
}

export default HelpCenter
