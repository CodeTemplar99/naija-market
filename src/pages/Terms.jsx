import React from 'react'
import { FileText } from 'lucide-react'

const Terms = () => {
  return (
    <div className="terms-page animate-slide-up">
      <div className="terms-header">
        <FileText size={28} color="var(--primary-light)" />
        <div>
          <h1>Terms of Use</h1>
          <p className="terms-updated">Last updated: February 15, 2026</p>
        </div>
      </div>

      <div className="terms-body glass">
        <section className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using NaijaPredict ("the Platform"), you agree to be bound by these Terms of Use, our Privacy Policy, and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing the Platform.</p>
        </section>

        <section className="terms-section">
          <h2>2. Eligibility</h2>
          <p>You must be at least 18 years old and a resident of Nigeria or an eligible jurisdiction to use NaijaPredict. You must complete Know Your Customer (KYC) verification before trading. By creating an account, you represent that all information provided is accurate and current.</p>
        </section>

        <section className="terms-section">
          <h2>3. Account Responsibilities</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to notify NaijaPredict immediately of any unauthorized use. We reserve the right to suspend or terminate accounts that violate these terms.</p>
        </section>

        <section className="terms-section">
          <h2>4. Trading & Markets</h2>
          <p>NaijaPredict provides prediction markets where users can trade on the outcomes of real-world events. All trades are final once executed. Market resolution is determined by the rules stated on each market's detail page. NaijaPredict acts as a platform facilitator and does not guarantee the outcome of any market.</p>
          <ul>
            <li>Markets may be suspended or voided at NaijaPredict's discretion.</li>
            <li>In the event of a void market, all positions are refunded at cost.</li>
            <li>Manipulation or collusion will result in permanent account ban and forfeiture of funds.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>5. Deposits & Withdrawals</h2>
          <p>Deposits can be made via Paystack, Flutterwave, or direct bank transfer. Minimum deposit is ₦500. Withdrawals are processed to Nigerian bank accounts within 1-24 hours. NaijaPredict charges a processing fee as disclosed during the transaction flow.</p>
        </section>

        <section className="terms-section">
          <h2>6. Fees</h2>
          <p>NaijaPredict charges the following fees:</p>
          <ul>
            <li><strong>Deposit fee:</strong> 1-1.5% depending on payment method</li>
            <li><strong>Withdrawal fee:</strong> 1% (minimum ₦25)</li>
            <li><strong>Trading fee:</strong> No commission on trades. Revenue is generated from the spread.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>7. Intellectual Property</h2>
          <p>All content, design, branding, and technology on NaijaPredict is the intellectual property of NaijaPredict Ltd. Unauthorized reproduction, distribution, or reverse engineering of any part of the Platform is prohibited.</p>
        </section>

        <section className="terms-section">
          <h2>8. Disclaimer of Warranties</h2>
          <p>NaijaPredict is provided "as is" without any warranties of any kind, express or implied. We do not warrant that the Platform will be uninterrupted, error-free, or free from harmful components. Trading involves risk and you may lose your entire investment.</p>
        </section>

        <section className="terms-section">
          <h2>9. Limitation of Liability</h2>
          <p>NaijaPredict shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of the Platform, including loss of profits, data, or trading positions.</p>
        </section>

        <section className="terms-section">
          <h2>10. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes shall be resolved through binding arbitration in Lagos, Nigeria.</p>
        </section>

        <section className="terms-section">
          <h2>11. Contact</h2>
          <p>For questions about these Terms, contact us at <a href="mailto:legal@naijapredict.com" style={{ color: 'var(--primary-light)' }}>legal@naijapredict.com</a>.</p>
        </section>
      </div>

      <style>{`
        .terms-page { max-width: 800px; margin: 0 auto; }
        .terms-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
        .terms-header h1 { font-size: 2rem; }
        .terms-updated { font-size: 0.85rem; color: var(--text-muted); }

        .terms-body { padding: 2.5rem; border-radius: var(--radius-xl); }
        .terms-section { margin-bottom: 2.5rem; }
        .terms-section:last-child { margin-bottom: 0; }
        .terms-section h2 { font-size: 1.15rem; margin-bottom: 1rem; }
        .terms-section p { color: var(--text-muted); line-height: 1.7; margin-bottom: 0.75rem; }
        .terms-section ul { padding-left: 1.5rem; color: var(--text-muted); line-height: 1.8; margin-top: 0.5rem; }
        .terms-section li { margin-bottom: 0.25rem; }
      `}</style>
    </div>
  )
}

export default Terms
