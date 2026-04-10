'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const TractorScene = dynamic(() => import('./TractorScene'), { ssr: false });

const AMOUNTS = [5, 10, 25, 50, 100];

export default function DonationForm() {
  const [selected, setSelected] = useState<number | null>(25);
  const [custom, setCustom] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const finalAmount = custom ? parseFloat(custom) : selected;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalAmount || finalAmount <= 0) return;
    setSubmitted(true);
  };

  return (
    <div className="donation-wrapper">
      {/* 3D tractor canvas */}
      <div className="tractor-viewport">
        <TractorScene />
        <div className="tractor-overlay-text">
          <span className="tractor-label">FIELD-3</span>
          <span className="tractor-sub">autonomous dev unit</span>
        </div>
      </div>

      {/* Form panel */}
      <div className="form-panel">
        {submitted ? (
          <div className="thank-you">
            <div className="ty-icon">🚜</div>
            <h3>Transazione simulata completata</h3>
            <p className="ty-amount">€{finalAmount?.toFixed(2)}</p>
            <p className="ty-tagline">— virtuale, ma sentito —</p>
            <p className="ty-message">
              {name || 'Amico'}, grazie di cuore per il pensiero.
              Purtroppo questi €{finalAmount?.toFixed(2)} esistono solo nel metaverso,
              quindi il trattore è ancora fermo in mezzo al campo.
            </p>
            <p className="ty-subtext">
              Se fossero stati soldi veri, oggi il motore sarebbe acceso —
              anche se le ruote girerebbero comunque nel verso sbagliato. 🌾
            </p>
            <button className="btn-reset" onClick={() => { setSubmitted(false); setCustom(''); setName(''); setEmail(''); }}>
              Dona di nuovo (sempre gratis)
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="form-inner">
            <div className="form-header">
              <span className="form-tag">// SUPPORTA IL TEAM</span>
              <h2 className="form-title">Dona carburante<br />alla macchina</h2>
              <p className="form-desc">
                Ogni contributo ci permette di continuare a costruire prodotti che contano.
              </p>
            </div>

            {/* Amount grid */}
            <div className="amount-section">
              <label className="field-label">Importo</label>
              <div className="amounts-grid">
                {AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    className={`amount-btn ${selected === amt && !custom ? 'active' : ''}`}
                    onClick={() => { setSelected(amt); setCustom(''); }}
                  >
                    €{amt}
                  </button>
                ))}
              </div>
              <div className="custom-input-wrap">
                <span className="euro-sign">€</span>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="Importo personalizzato"
                  value={custom}
                  onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
                  className="custom-input"
                />
              </div>
            </div>

            {/* Fields */}
            <div className="fields-section">
              <div className="field-group">
                <label className="field-label">Nome</label>
                <input
                  type="text"
                  placeholder="Il tuo nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-input"
                  required
                />
              </div>
              <div className="field-group">
                <label className="field-label">Email</label>
                <input
                  type="email"
                  placeholder="La tua email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-input"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={!finalAmount || finalAmount <= 0}
            >
              <span>Dona ora</span>
              <span className="btn-amount">{finalAmount ? `€${finalAmount}` : '--'}</span>
            </button>

            <p className="form-note">Pagamento sicuro e criptato · No spam, mai.</p>
          </form>
        )}
      </div>

      <style jsx>{`
        .donation-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 640px;
          border: 1px solid rgba(0, 255, 136, 0.12);
          border-radius: 2px;
          overflow: hidden;
          background: #050c09;
        }

        /* ── Tractor side ── */
        .tractor-viewport {
          position: relative;
          background: radial-gradient(ellipse at 50% 60%, #001a0f 0%, #050c09 70%);
          min-height: 400px;
        }

        .tractor-overlay-text {
          position: absolute;
          top: 24px;
          left: 28px;
          pointer-events: none;
        }

        .tractor-label {
          display: block;
          font-family: var(--font-mono, monospace);
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          color: #00ff88;
          opacity: 0.9;
        }

        .tractor-sub {
          display: block;
          font-family: var(--font-mono, monospace);
          font-size: 0.55rem;
          letter-spacing: 0.15em;
          color: rgba(0, 255, 136, 0.4);
          margin-top: 2px;
        }

        /* ── Form side ── */
        .form-panel {
          padding: 48px 40px;
          display: flex;
          align-items: center;
          background: #06100c;
          border-left: 1px solid rgba(0, 255, 136, 0.08);
        }

        .form-inner {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* Header */
        .form-header {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-tag {
          font-family: var(--font-mono, monospace);
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          color: #00ff88;
          opacity: 0.7;
        }

        .form-title {
          font-size: 1.9rem;
          font-weight: 300;
          line-height: 1.15;
          color: #e8f5ef;
          letter-spacing: -0.02em;
        }

        .form-desc {
          font-size: 0.82rem;
          color: rgba(200, 230, 215, 0.45);
          line-height: 1.6;
          max-width: 340px;
        }

        /* Amount */
        .amount-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .field-label {
          font-family: var(--font-mono, monospace);
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          color: rgba(0, 255, 136, 0.55);
          text-transform: uppercase;
        }

        .amounts-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 6px;
        }

        .amount-btn {
          padding: 10px 4px;
          background: rgba(0, 255, 136, 0.04);
          border: 1px solid rgba(0, 255, 136, 0.15);
          color: rgba(200, 240, 220, 0.7);
          font-size: 0.82rem;
          font-family: var(--font-mono, monospace);
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 2px;
        }

        .amount-btn:hover {
          background: rgba(0, 255, 136, 0.1);
          border-color: rgba(0, 255, 136, 0.4);
          color: #00ff88;
        }

        .amount-btn.active {
          background: rgba(0, 255, 136, 0.12);
          border-color: #00ff88;
          color: #00ff88;
          box-shadow: 0 0 12px rgba(0, 255, 136, 0.15);
        }

        .custom-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .euro-sign {
          position: absolute;
          left: 12px;
          color: rgba(0, 255, 136, 0.5);
          font-family: var(--font-mono, monospace);
          font-size: 0.82rem;
          pointer-events: none;
        }

        .custom-input {
          width: 100%;
          background: rgba(0, 255, 136, 0.03);
          border: 1px solid rgba(0, 255, 136, 0.12);
          border-radius: 2px;
          padding: 10px 12px 10px 28px;
          color: #c8f0d8;
          font-family: var(--font-mono, monospace);
          font-size: 0.82rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .custom-input:focus {
          border-color: rgba(0, 255, 136, 0.5);
          background: rgba(0, 255, 136, 0.06);
        }

        .custom-input::placeholder {
          color: rgba(200, 240, 220, 0.2);
        }

        /* Fields */
        .fields-section {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .text-input {
          background: rgba(0, 255, 136, 0.03);
          border: 1px solid rgba(0, 255, 136, 0.12);
          border-radius: 2px;
          padding: 11px 14px;
          color: #c8f0d8;
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .text-input:focus {
          border-color: rgba(0, 255, 136, 0.45);
          background: rgba(0, 255, 136, 0.05);
        }

        .text-input::placeholder {
          color: rgba(200, 240, 220, 0.2);
        }

        /* Submit */
        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          background: rgba(0, 255, 136, 0.1);
          border: 1px solid rgba(0, 255, 136, 0.35);
          border-radius: 2px;
          color: #00ff88;
          font-size: 0.9rem;
          font-family: var(--font-mono, monospace);
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.25s;
        }

        .submit-btn:hover:not(:disabled) {
          background: rgba(0, 255, 136, 0.18);
          border-color: #00ff88;
          box-shadow: 0 0 24px rgba(0, 255, 136, 0.2);
        }

        .submit-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .btn-amount {
          font-weight: 600;
          font-size: 1rem;
        }

        .form-note {
          font-size: 0.68rem;
          color: rgba(200, 240, 220, 0.2);
          text-align: center;
          font-family: var(--font-mono, monospace);
          letter-spacing: 0.05em;
        }

        /* Thank you */
        .thank-you {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          text-align: center;
        }

        .ty-icon {
          font-size: 2.5rem;
          color: #00ff88;
          animation: spin 8s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .thank-you h3 {
          font-size: 1.3rem;
          font-weight: 300;
          color: #e8f5ef;
          letter-spacing: 0.05em;
        }

        .ty-amount {
          font-family: var(--font-mono, monospace);
          font-size: 2rem;
          color: #00ff88;
          font-weight: 600;
        }

        .ty-tagline {
          font-family: var(--font-mono, monospace);
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          color: rgba(0, 255, 136, 0.45);
          margin-top: -4px;
        }

        .ty-message {
          font-size: 0.82rem;
          color: rgba(200, 240, 220, 0.5);
          max-width: 300px;
          line-height: 1.7;
        }

        .ty-subtext {
          font-size: 0.78rem;
          color: rgba(200, 240, 220, 0.32);
          max-width: 300px;
          line-height: 1.7;
          font-style: italic;
        }

        .btn-reset {
          margin-top: 8px;
          padding: 10px 20px;
          background: transparent;
          border: 1px solid rgba(0, 255, 136, 0.25);
          color: rgba(0, 255, 136, 0.6);
          font-family: var(--font-mono, monospace);
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 2px;
        }

        .btn-reset:hover {
          border-color: #00ff88;
          color: #00ff88;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .donation-wrapper {
            grid-template-columns: 1fr;
          }
          .tractor-viewport {
            min-height: 280px;
          }
          .form-panel {
            padding: 32px 24px;
          }
          .form-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
