'use client';

import { useEffect, useRef, useState } from 'react';

const GOAL = 2000;
const CURRENT = 847;

export default function DonationProgress() {
  const [animated, setAnimated] = useState(0);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const duration = 1800;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            setAnimated(ease * (CURRENT / GOAL) * 100);
            setCount(Math.round(ease * CURRENT));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const pct = (CURRENT / GOAL) * 100;

  return (
    <div ref={ref} className="progress-wrap">
      <div className="progress-header">
        <div className="progress-left">
          <span className="progress-label">// OBIETTIVO MENSILE</span>
          <span className="progress-current">€{count.toLocaleString('it-IT')}</span>
        </div>
        <div className="progress-right">
          <span className="progress-goal-label">GOAL</span>
          <span className="progress-goal">€{GOAL.toLocaleString('it-IT')}</span>
        </div>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${animated}%` }}
        >
          <div className="progress-glow" />
        </div>
        <div
          className="progress-thumb"
          style={{ left: `${animated}%` }}
        />
      </div>

      <div className="progress-footer">
        <span className="progress-pct">{pct.toFixed(0)}% raggiunto</span>
        <span className="progress-backers">23 sostenitori questo mese</span>
      </div>

      <style jsx>{`
        .progress-wrap {
          padding: 28px 32px;
          border: 1px solid rgba(0, 255, 136, 0.1);
          background: rgba(0, 255, 136, 0.02);
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 36px;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .progress-left, .progress-right {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .progress-right { align-items: flex-end; }

        .progress-label {
          font-family: var(--font-mono, monospace);
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          color: rgba(0, 255, 136, 0.45);
        }

        .progress-current {
          font-family: var(--font-mono, monospace);
          font-size: 1.9rem;
          font-weight: 600;
          color: #00ff88;
          line-height: 1;
          text-shadow: 0 0 24px rgba(0, 255, 136, 0.4);
        }

        .progress-goal-label {
          font-family: var(--font-mono, monospace);
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          color: rgba(208, 232, 221, 0.25);
        }

        .progress-goal {
          font-family: var(--font-mono, monospace);
          font-size: 1rem;
          color: rgba(208, 232, 221, 0.4);
        }

        .progress-track {
          position: relative;
          height: 3px;
          background: rgba(0, 255, 136, 0.08);
          border-radius: 0;
        }

        .progress-fill {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          background: linear-gradient(90deg, rgba(0, 255, 136, 0.4), #00ff88);
          transition: width 0.05s linear;
          overflow: visible;
        }

        .progress-glow {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translate(50%, -50%);
          width: 16px;
          height: 16px;
          background: radial-gradient(circle, rgba(0, 255, 136, 0.5) 0%, transparent 70%);
          border-radius: 50%;
        }

        .progress-thumb {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 6px;
          height: 6px;
          background: #00ff88;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(0, 255, 136, 0.8);
          transition: left 0.05s linear;
        }

        .progress-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .progress-pct {
          font-family: var(--font-mono, monospace);
          font-size: 0.65rem;
          color: rgba(0, 255, 136, 0.6);
          letter-spacing: 0.1em;
        }

        .progress-backers {
          font-family: var(--font-mono, monospace);
          font-size: 0.6rem;
          color: rgba(208, 232, 221, 0.25);
          letter-spacing: 0.08em;
        }
      `}</style>
    </div>
  );
}
