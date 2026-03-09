import { useState, useEffect } from "react";

const dknContext = {
  company: "DKN Hotels / DKN Ventures",
  contact: "Kiran Dahya",
  title: "Founder & CEO, DKN Ventures",
  location: "Irvine, CA",
  portfolio: "15+ managed properties across Southern California",
  brands: "Marriott, Hilton, IHG, Independent",
  activeProjects: "8 hotels in development or construction pipeline",
};

const questions = [
  {
    id: "dealType",
    label: "DEAL TYPE",
    question: "Which best describes your current capital need?",
    context: "Based on DKN's active pipeline of 8 projects in development & construction",
    options: [
      { label: "Ground-up hotel construction", icon: "🏗️", value: "construction", hint: "New build — TownePlace Suites–style projects" },
      { label: "Acquisition + repositioning", icon: "🏨", value: "acquisition", hint: "Buy & rebrand or upgrade existing asset" },
      { label: "PIP / brand-required renovation", icon: "🔨", value: "pip", hint: "Marriott, Hilton, IHG franchise compliance" },
      { label: "JV equity for a development deal", icon: "🤝", value: "jv", hint: "Looking for a capital partner on a larger deal" },
    ],
  },
  {
    id: "capitalStack",
    label: "CAPITAL STACK",
    question: "Where are you in the capital stack on this deal?",
    options: [
      { label: "Need the full debt solution", icon: "💼", value: "fulldebt", hint: "Senior loan only" },
      { label: "Have senior debt, need mezzanine/preferred equity", icon: "🧩", value: "mezz", hint: "Gap between bank loan and total cost" },
      { label: "Looking for a JV equity partner", icon: "🚀", value: "jvequity", hint: "Bring a co-investor to the deal" },
      { label: "Refinancing existing debt", icon: "🔄", value: "refi", hint: "Better rate or cash-out for next project" },
    ],
  },
  {
    id: "dealSize",
    label: "DEAL SIZE",
    question: "What's the total project cost?",
    context: "DKN's recent deals range from $5M boutique to $30M+ full-service",
    options: [
      { label: "$2M – $5M", icon: "💰", value: "small", hint: "Smaller select-service or renovation" },
      { label: "$5M – $15M", icon: "🏦", value: "mid", hint: "Standard select-service new build or acquisition" },
      { label: "$15M – $40M", icon: "📊", value: "large", hint: "Full-service, extended stay, or multi-property" },
      { label: "$40M+", icon: "🌐", value: "xlarge", hint: "Portfolio deal or large mixed-use development" },
    ],
  },
  {
    id: "timeline",
    label: "TIMELINE",
    question: "What's your close timeline for this deal?",
    options: [
      { label: "Under 30 days — urgent", icon: "⚡", value: "urgent", hint: "Acquisition under contract, need to move fast" },
      { label: "1–3 months", icon: "📅", value: "soon", hint: "In due diligence, permits in process" },
      { label: "3–6 months", icon: "🗓️", value: "flexible", hint: "Early design / pre-development phase" },
      { label: "Planning ahead (6+ months)", icon: "🔭", value: "planning", hint: "Building pipeline, not yet under contract" },
    ],
  },
  {
    id: "brand",
    label: "BRAND",
    question: "Is this a branded or independent property?",
    options: [
      { label: "Marriott flag (TownePlace, Courtyard, etc.)", icon: "🟠", value: "marriott", hint: "Marriott franchise or management agreement" },
      { label: "Hilton flag (Hampton, Homewood, etc.)", icon: "🔵", value: "hilton", hint: "Hilton brand or conversion" },
      { label: "IHG flag (Holiday Inn Express, etc.)", icon: "🟢", value: "ihg", hint: "IHG brand or conversion" },
      { label: "Independent / Boutique", icon: "⭐", value: "independent", hint: "No brand flag, or in process of selecting one" },
    ],
  },
  {
    id: "priority",
    label: "PRIORITY",
    question: "What matters most to you on this deal?",
    options: [
      { label: "Speed of execution", icon: "⚡", value: "speed", hint: "You need a lender who moves as fast as you do" },
      { label: "Highest leverage / LTV", icon: "📈", value: "leverage", hint: "Minimize equity out of pocket" },
      { label: "Competitive interest rate", icon: "📉", value: "rate", hint: "Long-term cost of capital matters most" },
      { label: "Flexible / creative structure", icon: "🎯", value: "creative", hint: "Deal has nuance that requires custom thinking" },
    ],
  },
];

const loanProducts = {
  construction: {
    name: "Construction Financing",
    tagline: "Capital for ground-up hotel builds — sized for DKN's pipeline.",
    rate: "9% – 12%",
    ltv: "Up to 80% of cost",
    close: "21–45 days",
    term: "12–36 months",
    accentColor: "#7eb8d4",
    whyFit: "With 2 hotels under construction and 6 in design phase, DKN Ventures needs a lender that moves at development speed and understands branded hotel construction.",
    docs: ["Construction plans & permits", "Brand franchise agreement", "Cost breakdown by phase", "Sponsor financial statement", "Contractor credentials & bonds"],
    nextStep: "Share your project pro forma and permit status for a same-week term sheet.",
  },
  bridge: {
    name: "Bridge / Acquisition Loan",
    tagline: "Fast, flexible capital to close acquisitions before a permanent solution.",
    rate: "8.5% – 11.5%",
    ltv: "Up to 85%",
    close: "7–21 days",
    term: "6–24 months",
    accentColor: "#c9a84c",
    whyFit: "DKN Ventures' recent acquisition of the Residence Inn San Diego shows this is an active deal channel. Bridge financing lets you move fast on acquisitions without waiting for permanent debt.",
    docs: ["Purchase contract", "Property appraisal / broker opinion", "12 months trailing P&L", "Exit strategy", "Entity / ownership docs"],
    nextStep: "If you're under contract, Awan can issue a pre-approval within 24 hours.",
  },
  pip: {
    name: "Bridge / Renovation Loan (PIP)",
    tagline: "Dedicated capital for brand-mandated property improvement plans.",
    rate: "8.5% – 11%",
    ltv: "Up to 85%",
    close: "14–30 days",
    term: "12–24 months",
    accentColor: "#c9a84c",
    whyFit: "Marriott, Hilton, and IHG all mandate PIPs at varying intervals. With 15+ managed properties, DKN faces ongoing PIP requirements — and traditional banks are slow to fund them.",
    docs: ["Brand PIP scope of work", "Renovation budget", "Hotel P&L (trailing 12M)", "Franchise agreement", "Contractor bids"],
    nextStep: "Share the brand's PIP letter and renovation scope — Awan can structure around it.",
  },
  jv: {
    name: "Joint Venture / Preferred Equity",
    tagline: "Strategic capital partner for DKN Ventures' larger development pipeline.",
    rate: "10% – 14% preferred return",
    ltv: "Up to 90–95% of equity",
    close: "45–90 days",
    term: "Deal-specific",
    accentColor: "#c98b84",
    whyFit: "As DKN Ventures scales its development pipeline, JV equity structuring lets you do more deals with less capital out-of-pocket — and bring in a partner who understands Southern California hospitality.",
    docs: ["Investment / deal deck", "Pro forma financials", "Sponsor track record", "Entity structure", "Site control docs"],
    nextStep: "Tony can structure a preferred equity or JV position around your development timeline.",
  },
  fixed: {
    name: "Fixed / Permanent Rate Financing",
    tagline: "Stabilized asset refinancing to lock in long-term, competitive rates.",
    rate: "6.5% – 8.5%",
    ltv: "Up to 75%",
    close: "30–60 days",
    term: "5–25 years",
    accentColor: "#82c99a",
    whyFit: "Once a DKN property is stabilized post-renovation or construction, permanent financing replaces the bridge loan and locks in long-term fixed rates — freeing capital for the next deal.",
    docs: ["2 years tax returns", "Trailing 12M P&L and rent roll", "Current loan statements", "Personal financial statement", "Property photos"],
    nextStep: "Share the property's current debt and trailing income — Tony can run a comparison.",
  },
};

function matchLoan(answers) {
  if (answers.dealType === "jv" || answers.capitalStack === "jvequity") return "jv";
  if (answers.dealType === "construction") return "construction";
  if (answers.dealType === "pip") return "pip";
  if (answers.capitalStack === "refi") return "fixed";
  if (answers.dealType === "acquisition") return "bridge";
  return "bridge";
}

function calcScore(answers) {
  let score = 60;
  if (answers.dealSize === "mid" || answers.dealSize === "large") score += 15;
  if (answers.dealSize === "xlarge") score += 10;
  if (answers.timeline === "soon" || answers.timeline === "flexible") score += 10;
  if (answers.timeline === "urgent") score += 8;
  if (answers.brand !== "independent") score += 8;
  if (answers.capitalStack === "fulldebt") score += 5;
  return Math.min(score, 97);
}

function ScoreGauge({ score, color }) {
  const [d, setD] = useState(0);
  useEffect(() => {
    let s = 0;
    const iv = setInterval(() => {
      s += 1.5;
      if (s >= score) { setD(score); clearInterval(iv); } else setD(Math.round(s));
    }, 18);
    return () => clearInterval(iv);
  }, [score]);

  const r = 52, circ = 2 * Math.PI * r;
  const offset = circ - (d / 100) * circ * 0.75;
  const label = score >= 85 ? "Strong Deal Candidate" : score >= 70 ? "Well-Qualified" : "Good Fit";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <svg width="130" height="85" viewBox="0 0 130 85">
        <circle cx="65" cy="72" r={r} fill="none" stroke="#1a2744" strokeWidth="9"
          strokeDasharray={circ} strokeDashoffset={circ * 0.25}
          strokeLinecap="round" transform="rotate(-225 65 72)" />
        <circle cx="65" cy="72" r={r} fill="none" stroke={color} strokeWidth="9"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-225 65 72)"
          style={{ transition: "stroke-dashoffset 0.03s linear" }} />
        <text x="65" y="70" textAnchor="middle" fill="white" fontSize="22"
          fontWeight="700" fontFamily="'Playfair Display', serif">{d}</text>
        <text x="65" y="82" textAnchor="middle" fill="#5566aa" fontSize="9"
          fontFamily="'DM Sans', sans-serif">/ 100</text>
      </svg>
      <span style={{ color, fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em" }}>
        {label}
      </span>
    </div>
  );
}

export default function LeadMagnet() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [animDir, setAnimDir] = useState("in");
  const [hovered, setHovered] = useState(null);

  const total = questions.length;
  const isQ = step >= 1 && step <= total;
  const currentQ = isQ ? questions[step - 1] : null;

  const fade = {
    opacity: animDir === "in" ? 1 : 0,
    transform: animDir === "in" ? "translateY(0)" : "translateY(14px)",
    transition: "opacity 0.22s ease, transform 0.22s ease",
  };

  function advance(cb) {
    setAnimDir("out");
    setTimeout(() => { cb(); setAnimDir("in"); }, 230);
  }

  function selectAnswer(val) {
    setSelected(val);
    setTimeout(() => {
      const newAnswers = { ...answers, [currentQ.id]: val };
      setAnswers(newAnswers);
      advance(() => { setSelected(null); setStep(s => s + 1); });
    }, 140);
  }

  const loanKey = step > total ? matchLoan(answers) : null;
  const loan = loanKey ? loanProducts[loanKey] : null;
  const score = loanKey ? calcScore(answers) : 0;
  const progress = isQ ? ((step - 1) / total) * 100 : step > total ? 100 : 0;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #080f1e 0%, #0d1628 50%, #0a1020 100%)",
      fontFamily: "'DM Sans', sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "0 16px 60px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .lm-opt { background: rgba(255,255,255,0.02); border: 1.5px solid rgba(255,255,255,0.07);
          border-radius: 14px; padding: 16px 18px; cursor: pointer;
          transition: all 0.16s ease; display: flex; align-items: flex-start; gap: 14px;
          width: 100%; text-align: left; }
        .lm-opt:hover { border-color: rgba(201,168,76,0.5); background: rgba(201,168,76,0.04); transform: translateX(3px); }
        .lm-opt.sel { border-color: #c9a84c; background: rgba(201,168,76,0.08);
          box-shadow: 0 0 0 3px rgba(201,168,76,0.1); }
        .lm-cta { background: linear-gradient(135deg, #c9a84c, #e8c96c);
          color: #080f1e; border: none; border-radius: 12px; padding: 15px 32px;
          font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700;
          cursor: pointer; transition: all 0.2s; letter-spacing: 0.02em; }
        .lm-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(201,168,76,0.3); }
        .lm-tag { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08); border-radius: 99px;
          padding: 5px 12px; font-size: 11px; color: #8899bb; letter-spacing: 0.06em; }
        .lm-chip { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px; padding: 7px 12px; font-size: 12.5px; color: #7788bb; }
        .lm-term-box { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 16px; }
        .lm-why-box { background: rgba(201,168,76,0.05); border: 1px solid rgba(201,168,76,0.15);
          border-radius: 14px; padding: 20px 18px; }
      `}</style>

      {/* HEADER */}
      <div style={{ width: "100%", maxWidth: 600, padding: "28px 0 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <div style={{ color: "#c9a84c", fontSize: 10, letterSpacing: "0.18em", fontWeight: 600, textTransform: "uppercase", marginBottom: 3 }}>
              Awan Capital × DKN Hotels
            </div>
            <div style={{ color: "#334466", fontSize: 11 }}>Personalized Funding Analysis</div>
          </div>
          {isQ && (
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#c9a84c", fontSize: 13, fontWeight: 600 }}>{step}<span style={{ color: "#334466" }}> / {total}</span></div>
              <div style={{ color: "#334466", fontSize: 10, marginTop: 2, letterSpacing: "0.08em" }}>
                {currentQ?.label}
              </div>
            </div>
          )}
        </div>

        {step > 0 && step <= total + 1 && (
          <div style={{ height: 2, background: "rgba(255,255,255,0.05)", borderRadius: 99, marginBottom: 32, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${progress}%`,
              background: "linear-gradient(90deg, #c9a84c, #e8c96c)",
              borderRadius: 99, transition: "width 0.4s ease",
            }} />
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div style={{ width: "100%", maxWidth: 600, ...fade }}>

        {/* INTRO */}
        {step === 0 && (
          <div style={{ paddingTop: 12 }}>
            <div style={{ marginBottom: 28, display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span className="lm-tag"><span style={{ width: 5, height: 5, borderRadius: "50%", background: "#c9a84c", display: "inline-block" }} />Irvine, CA</span>
              <span className="lm-tag">🏨 15+ Properties</span>
              <span className="lm-tag">🏗️ 8 Projects in Pipeline</span>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif", color: "white",
              fontSize: "clamp(26px, 5vw, 40px)", lineHeight: 1.2, marginBottom: 18, fontWeight: 700
            }}>
              Kiran, find the right<br />
              <span style={{ color: "#c9a84c", fontStyle: "italic" }}>capital structure</span><br />
              for DKN's next deal.
            </h1>

            <p style={{ color: "#5566aa", fontSize: 15, lineHeight: 1.75, marginBottom: 10, maxWidth: 480 }}>
              Awan Capital works with Southern California hotel owners and developers — from bridge loans and PIP financing to construction debt and JV equity.
            </p>
            <p style={{ color: "#4455aa", fontSize: 14, lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
              Answer 6 questions about your current deal and get a personalized recommendation — matched to DKN's brand relationships, deal size, and pipeline stage.
            </p>

            <button className="lm-cta" onClick={() => advance(() => setStep(1))} style={{ fontSize: 16, padding: "17px 44px", marginBottom: 20 }}>
              Analyze My Deal →
            </button>
            <div style={{ color: "#223355", fontSize: 12 }}>2 minutes · Built around DKN's actual deal profile</div>

            {/* DKN profile card */}
            <div style={{
              marginTop: 40, background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "20px 18px"
            }}>
              <div style={{ color: "#334466", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
                DKN Ventures Profile
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  ["Founded", "1984 · Dahya Family"],
                  ["HQ", "Irvine, California"],
                  ["Portfolio", "15+ CA Properties"],
                  ["Brands", "Marriott · Hilton · IHG"],
                  ["Active Pipeline", "8 Projects"],
                  ["Recent Deal", "Residence Inn SD"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ color: "#334466", fontSize: 10, letterSpacing: "0.08em", marginBottom: 3 }}>{k}</div>
                    <div style={{ color: "#8899cc", fontSize: 13, fontWeight: 500 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* QUESTIONS */}
        {isQ && currentQ && (
          <div>
            {currentQ.context && (
              <div style={{ color: "#445577", fontSize: 12, marginBottom: 16, fontStyle: "italic", lineHeight: 1.5 }}>
                💡 {currentQ.context}
              </div>
            )}
            <h2 style={{
              fontFamily: "'Playfair Display', serif", color: "white",
              fontSize: "clamp(19px, 3.5vw, 26px)", lineHeight: 1.3, marginBottom: 24, fontWeight: 700
            }}>
              {currentQ.question}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {currentQ.options.map(opt => (
                <button
                  key={opt.value}
                  className={`lm-opt${selected === opt.value ? " sel" : ""}`}
                  onClick={() => selectAnswer(opt.value)}
                  onMouseEnter={() => setHovered(opt.value)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span style={{ fontSize: 20, marginTop: 1 }}>{opt.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      color: selected === opt.value ? "#e8c96c" : "white",
                      fontSize: 14, fontWeight: 600, marginBottom: 3
                    }}>
                      {opt.label}
                    </div>
                    <div style={{ color: "#445577", fontSize: 12, lineHeight: 1.4 }}>{opt.hint}</div>
                  </div>
                  {selected === opt.value && (
                    <span style={{ color: "#c9a84c", fontSize: 16, marginTop: 2 }}>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULTS */}
        {step > total && loan && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ color: "#c9a84c", fontSize: 10, letterSpacing: "0.18em", fontWeight: 600, textTransform: "uppercase", marginBottom: 12 }}>
                Tony's Recommendation for DKN Ventures
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif", color: "white",
                fontSize: "clamp(22px, 4vw, 34px)", lineHeight: 1.2, marginBottom: 10
              }}>
                {loan.name}
              </h2>
              <p style={{ color: "#5566aa", fontSize: 14, lineHeight: 1.7 }}>{loan.tagline}</p>
            </div>

            {/* Score + Terms */}
            <div style={{
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16, padding: "22px 20px", marginBottom: 14,
              display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap", justifyContent: "center"
            }}>
              <ScoreGauge score={score} color={loan.accentColor} />
              <div style={{ flex: 1, minWidth: 180 }}>
                <div style={{ color: "#334466", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Deal Readiness Score</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[["Rate", loan.rate], ["Max LTV", loan.ltv], ["Close", loan.close], ["Term", loan.term]].map(([k, v]) => (
                    <div key={k} className="lm-term-box">
                      <div style={{ color: "#334466", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>{k}</div>
                      <div style={{ color: loan.accentColor, fontSize: 13, fontWeight: 600 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Why DKN fits */}
            <div className="lm-why-box" style={{ marginBottom: 14 }}>
              <div style={{ color: "#c9a84c", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
                Why this fits DKN
              </div>
              <p style={{ color: "#8899bb", fontSize: 14, lineHeight: 1.7 }}>{loan.whyFit}</p>
            </div>

            {/* Docs */}
            <div style={{
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14, padding: "18px", marginBottom: 24
            }}>
              <div style={{ color: "#334466", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
                What Awan will need from DKN
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {loan.docs.map(d => <span key={d} className="lm-chip">📄 {d}</span>)}
              </div>
            </div>

            {/* Next step */}
            <div style={{ color: "#445577", fontSize: 13, marginBottom: 16, lineHeight: 1.6, padding: "0 4px" }}>
              <span style={{ color: "#c9a84c" }}>Next step: </span>{loan.nextStep}
            </div>

            {/* CTA */}
            <div style={{
              background: "linear-gradient(135deg, rgba(201,168,76,0.07), rgba(201,168,76,0.03))",
              border: "1px solid rgba(201,168,76,0.2)", borderRadius: 16,
              padding: "28px 22px", textAlign: "center"
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 21, marginBottom: 8 }}>
                Ready to talk, Kiran?
              </div>
              <p style={{ color: "#5566aa", fontSize: 14, lineHeight: 1.65, marginBottom: 24, maxWidth: 420, margin: "0 auto 24px" }}>
                Tony reviews every deal personally. Awan Capital is based in Orange County — same market as DKN. A 20-minute call could open the door on your next project.
              </p>
              <a href={`mailto:info@awancapital.com?subject=DKN Ventures – ${loan.name} Inquiry&body=Hi Tony,%0A%0AThis is Kiran Dahya from DKN Ventures. I completed the Awan Capital Funding Match tool and my recommended product is: ${loan.name}%0A%0ADeal Readiness Score: ${score}/100%0A%0ALooking forward to connecting.%0A%0A– Kiran`}
                style={{ textDecoration: "none", display: "block" }}>
                <button className="lm-cta" style={{ width: "100%", fontSize: 15, marginBottom: 14 }}>
                  Send to Tony at Awan Capital →
                </button>
              </a>
              <div style={{ color: "#2d3f55", fontSize: 12 }}>
                Or call: +1 (949) 887-2107 · info@awancapital.com
              </div>
            </div>

            <button
              onClick={() => advance(() => { setStep(0); setAnswers({}); setSelected(null); })}
              style={{ background: "none", border: "none", color: "#334466", fontSize: 13, cursor: "pointer", width: "100%", marginTop: 20, padding: "8px" }}
            >
              ← Start over with a different deal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
