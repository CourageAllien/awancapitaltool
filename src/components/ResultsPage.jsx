import { useEffect, useState, useRef } from 'react';
import { getScoreLabel } from '../data/loanMatcher';

function ScoreGauge({ score }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [dashOffset, setDashOffset] = useState(212);
  const arcLength = 212;
  const label = getScoreLabel(score);

  useEffect(() => {
    const targetOffset = arcLength - (score / 100) * arcLength;
    const timer = setTimeout(() => setDashOffset(targetOffset), 200);

    let frame;
    let start = null;
    const duration = 1200;

    function animate(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) frame = requestAnimationFrame(animate);
    }

    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [score]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-52 h-36">
        <svg viewBox="0 0 120 80" className="w-full h-full overflow-visible">
          <path
            d="M 10 70 A 50 50 0 1 1 110 70"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M 10 70 A 50 50 0 1 1 110 70"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${arcLength} 400`}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
          />
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b0923e" />
              <stop offset="50%" stopColor="#c9a84c" />
              <stop offset="100%" stopColor="#d4b96a" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <span className="text-5xl font-extrabold text-navy leading-none">{animatedScore}</span>
          <span className="text-sm text-gray-400 font-medium mt-1">out of 100</span>
        </div>
      </div>
      <span className="text-lg font-bold text-gold mt-2">{label}</span>
    </div>
  );
}

function TermCard({ label, value, icon }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-xs uppercase tracking-wider text-gray-400 mb-1 font-medium">{label}</div>
      <div className="text-base font-bold text-navy leading-snug">{value}</div>
    </div>
  );
}

function AnimatedSection({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  );
}

export default function ResultsPage({ product, score, leadInfo, onRestart }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div>
      {/* Personalized header */}
      <AnimatedSection delay={100}>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            <span>✨</span> Your Personalized Funding Roadmap
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-navy mb-2 leading-tight">
            Based on your answers, here's Tony's<br className="hidden md:block" /> recommendation for {leadInfo.name}
          </h1>
          <p className="text-gray-500 text-lg">Tailored by Awan Capital — <em>Your Yes Lender</em></p>
        </div>
      </AnimatedSection>

      {/* Recommended Product */}
      <AnimatedSection delay={300}>
        <div className="max-w-2xl mx-auto mb-10">
          <div className="bg-white rounded-2xl border-2 border-gold shadow-lg shadow-gold/5 p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-gold/10 rounded-xl p-3 flex-shrink-0">
                <span className="text-3xl">🏆</span>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-gold font-semibold mb-1">Recommended Product</div>
                <h2 className="text-xl md:text-2xl font-bold text-navy">{product.name}</h2>
                <p className="text-gray-600 mt-2 leading-relaxed">{product.description}</p>
              </div>
            </div>
            <div className="bg-navy/5 rounded-lg p-4 mt-4">
              <p className="text-navy font-medium text-sm leading-relaxed">
                <span className="text-gold font-bold">Why this fits you:</span>{' '}
                {product.whyFit}
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Estimated Terms */}
      <AnimatedSection delay={500}>
        <div className="max-w-2xl mx-auto mb-10">
          <h3 className="text-lg font-bold text-navy mb-4 text-center">Estimated Terms</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <TermCard label="Rate Range" value={product.rateRange} icon="📉" />
            <TermCard label="Max LTV" value={product.maxLTV} icon="📊" />
            <TermCard label="Close Time" value={product.closeTime} icon="⚡" />
            <TermCard label="Term" value={product.term} icon="📅" />
          </div>
        </div>
      </AnimatedSection>

      {/* Funding Readiness Score */}
      <AnimatedSection delay={700}>
        <div className="max-w-md mx-auto mb-10">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <h3 className="text-lg font-bold text-navy mb-6">Funding Readiness Score</h3>
            <ScoreGauge score={score} />
            <p className="text-gray-400 text-sm mt-5">
              Based on your credit profile, timeline, and deal structure.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Required Docs */}
      <AnimatedSection delay={900}>
        <div className="max-w-2xl mx-auto mb-10">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <h3 className="text-lg font-bold text-navy mb-5">
              📋 What You'll Need to Get Started
            </h3>
            <ul className="space-y-3">
              {product.docs.map((doc, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-gold/10 text-gold rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-gray-700 leading-relaxed">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection delay={1100}>
        <div className="max-w-2xl mx-auto mb-6">
          <div className="bg-navy rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gold" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-gold" />
            </div>
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Ready to move forward?
              </h3>
              <p className="text-gray-300 text-lg mb-6">
                Tony reviews your profile personally — no bots, no runaround.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:tony@awancapital.com?subject=Funding%20Inquiry%20from%20the%20Match%20Tool&body=Hi%20Tony%2C%20I%20just%20completed%20the%20Awan%20Capital%20Funding%20Match%20Tool%20and%20would%20love%20to%20discuss%20my%20results."
                  className="btn-primary text-center text-lg inline-block"
                >
                  Talk to Tony →
                </a>
                <button
                  onClick={onRestart}
                  className="border-2 border-gray-500 text-gray-300 font-medium px-6 py-3 rounded-lg
                             transition-all duration-300 hover:border-white hover:text-white"
                >
                  Start Over
                </button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer tagline */}
      <AnimatedSection delay={1300}>
        <div className="text-center py-6">
          <p className="text-gray-400 text-sm">
            <span className="font-semibold text-navy">Awan Capital</span> — Your Yes Lender
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
