import React from 'react'
import { Link } from 'react-router-dom'
import { Globe, Users, Shield, Zap, Target, TrendingUp, Award, ArrowRight } from 'lucide-react'

const About = () => {
  const stats = [
    { val: '₦485M+', label: 'Total Volume Traded' },
    { val: '68,000+', label: 'Active Traders' },
    { val: '200+', label: 'Markets Resolved' },
    { val: '99.9%', label: 'Platform Uptime' },
  ]

  const values = [
    { icon: Shield, title: 'Transparency', desc: 'Every market has clear resolution rules. All trades are public. No hidden fees.' },
    { icon: Target, title: 'Accuracy', desc: 'Our markets aggregate collective intelligence to produce the most accurate forecasts.' },
    { icon: Users, title: 'Community', desc: 'Built by Nigerians, for Nigerians. We prioritize events that matter to our users.' },
    { icon: Zap, title: 'Speed', desc: 'Instant trade execution and settlement. Deposit and withdraw in minutes.' },
  ]

  const team = [
    { name: 'Adebayo Ogunlesi', role: 'CEO & Co-Founder', bio: 'Former fintech lead at Paystack. Stanford MBA.' },
    { name: 'Ngozi Okafor', role: 'CTO & Co-Founder', bio: '10+ years building trading systems. Ex-Binance.' },
    { name: 'Emeka Uzor', role: 'Head of Markets', bio: 'Former analyst at CBN. Economics PhD, UNILAG.' },
    { name: 'Fatima Bello', role: 'Head of Compliance', bio: 'Legal expert in Nigerian fintech regulation.' },
  ]

  return (
    <div className="about-page animate-slide-up">
      {/* Hero */}
      <div className="ab-hero">
        <span className="ab-pill"><Globe size={14} /> About NaijaPredict</span>
        <h1>The Future of<br /><span className="grad-text">Prediction Markets</span><br />in Nigeria</h1>
        <p className="ab-hero-desc">NaijaPredict is Nigeria's first prediction market platform. We harness the wisdom of crowds to create the most accurate forecasts on politics, sports, crypto, and the economy.</p>
      </div>

      {/* Stats */}
      <div className="ab-stats">
        {stats.map((s, i) => (
          <div key={i} className="ab-stat glass">
            <span className="ab-stat-val">{s.val}</span>
            <span className="ab-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div className="ab-section glass">
        <h2>Our Mission</h2>
        <p>To democratize information by creating a transparent marketplace where anyone can trade on the probability of real-world events. We believe that prediction markets produce better forecasts than polls, pundits, or algorithms — because they put real skin in the game.</p>
        <p>NaijaPredict was built in Lagos, Nigeria, with a deep understanding of the events, culture, and economy that matter most to Nigerians. We're not just importing a Western model — we're building something uniquely Nigerian.</p>
      </div>

      {/* Values */}
      <div className="ab-values">
        <h2>Our Values</h2>
        <div className="ab-values-grid">
          {values.map((v, i) => (
            <div key={i} className="ab-value-card glass">
              <div className="ab-value-icon"><v.icon size={22} /></div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="ab-section">
        <h2>Leadership Team</h2>
        <div className="ab-team-grid">
          {team.map((t, i) => (
            <div key={i} className="ab-team-card glass">
              <div className="ab-team-avatar">{t.name.split(' ').map(n => n[0]).join('')}</div>
              <h3>{t.name}</h3>
              <span className="ab-team-role">{t.role}</span>
              <p className="ab-team-bio">{t.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="ab-cta glass">
        <h2>Start Predicting Today</h2>
        <p>Join 68,000+ Nigerians already trading on NaijaPredict.</p>
        <Link to="/" className="btn btn-primary btn-lg">Explore Markets <ArrowRight size={18} /></Link>
      </div>

      <style>{`
        .about-page { max-width: 1000px; margin: 0 auto; }

        .ab-hero { text-align: center; padding: 3rem 0; margin-bottom: 3rem; }
        .ab-pill { display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(0,135,81,0.08); border: 1px solid rgba(0,135,81,0.15); padding: 0.35rem 1rem; border-radius: 100px; font-size: 0.75rem; font-weight: 700; color: var(--primary-light); margin-bottom: 1.5rem; }
        .ab-hero h1 { font-size: 3.5rem; line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: -0.03em; }
        .ab-hero-desc { max-width: 600px; margin: 0 auto; font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; }

        .ab-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 3rem; }
        .ab-stat { padding: 1.5rem; border-radius: var(--radius-lg); text-align: center; }
        .ab-stat-val { display: block; font-size: 1.75rem; font-weight: 800; font-family: var(--font-display); margin-bottom: 0.25rem; }
        .ab-stat-label { font-size: 0.7rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; }

        .ab-section { padding: 2.5rem; border-radius: var(--radius-xl); margin-bottom: 2.5rem; }
        .ab-section h2 { font-size: 1.5rem; margin-bottom: 1.5rem; }
        .ab-section p { color: var(--text-muted); line-height: 1.7; margin-bottom: 1rem; }

        .ab-values { margin-bottom: 2.5rem; }
        .ab-values h2 { font-size: 1.5rem; margin-bottom: 1.5rem; }
        .ab-values-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
        .ab-value-card { padding: 1.75rem; border-radius: var(--radius-lg); }
        .ab-value-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(0,135,81,0.08); display: flex; align-items: center; justify-content: center; color: var(--primary-light); margin-bottom: 1rem; }
        .ab-value-card h3 { font-size: 1rem; margin-bottom: 0.5rem; }
        .ab-value-card p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; }

        .ab-team-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.25rem; }
        .ab-team-card { padding: 1.75rem; border-radius: var(--radius-lg); text-align: center; }
        .ab-team-avatar { width: 56px; height: 56px; border-radius: 50%; background: var(--surface-light); border: 2px solid var(--border); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.9rem; margin: 0 auto 1rem; }
        .ab-team-card h3 { font-size: 1rem; margin-bottom: 0.2rem; }
        .ab-team-role { font-size: 0.75rem; color: var(--primary-light); font-weight: 700; display: block; margin-bottom: 0.5rem; }
        .ab-team-bio { font-size: 0.8rem; color: var(--text-muted); line-height: 1.4; }

        .ab-cta { text-align: center; padding: 3rem; border-radius: var(--radius-xl); margin-bottom: 2rem; }
        .ab-cta h2 { margin-bottom: 0.5rem; }
        .ab-cta p { color: var(--text-muted); margin-bottom: 1.5rem; }

        @media (max-width: 768px) {
          .ab-hero h1 { font-size: 2.5rem; }
          .ab-stats { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  )
}

export default About
