const products = {
  bridge: {
    name: 'Bridge / Renovation Loan',
    description:
      'Short-term financing designed for property renovations and repositioning. Perfect for investors who need fast capital to transform underperforming assets.',
    whyFit:
      'Your renovation project and timeline align perfectly with our bridge program — built for speed and flexibility.',
    rateRange: '8.5% – 12%',
    closeTime: '10 – 21 days',
    maxLTV: 'Up to 85% LTV (of as-completed value)',
    term: '12 – 36 months',
    docs: [
      'Property appraisal or broker opinion of value',
      'Renovation scope of work & budget',
      'Personal financial statement',
      'Entity documents (LLC/Corp)',
    ],
  },
  construction: {
    name: 'Ground-Up Construction Loan',
    description:
      'Full-scale construction financing from the ground up. Includes draw schedules, inspections, and interest reserves.',
    whyFit:
      'New construction projects need specialized draw-based financing — this program is built exactly for that.',
    rateRange: '9% – 13%',
    closeTime: '30 – 45 days',
    maxLTV: 'Up to 75% LTC (of total project cost)',
    term: '18 – 36 months',
    docs: [
      'Architectural plans & permits',
      'General contractor agreement & budget',
      'Environmental Phase I report',
      'Personal financial statement & entity docs',
    ],
  },
  fixedRate: {
    name: 'Fixed Rate Term Loan',
    description:
      'Long-term stabilized financing with predictable payments. Ideal for cash-flowing properties and seasoned operators.',
    whyFit:
      'With strong fundamentals and a focus on favorable rates, a fixed-rate term loan gives you the stability and predictability you need.',
    rateRange: '5.5% – 8%',
    closeTime: '30 – 60 days',
    maxLTV: 'Up to 80% LTV',
    term: '5 – 30 years',
    docs: [
      'Trailing 12-month P&L and rent roll',
      'Property appraisal',
      'Tax returns (2 years)',
      'Personal financial statement',
    ],
  },
  sba: {
    name: 'SBA 7(a) / 504 Loan',
    description:
      'Government-backed small business loans with competitive rates and long terms. Great for owner-occupied commercial properties and business expansion.',
    whyFit:
      'SBA programs are purpose-built for small business growth — lower down payments and extended terms to help you scale.',
    rateRange: '6% – 9%',
    closeTime: '45 – 90 days',
    maxLTV: 'Up to 90% LTV',
    term: '10 – 25 years',
    docs: [
      'Business plan or expansion summary',
      'Business & personal tax returns (3 years)',
      'Year-to-date financials',
      'SBA application forms (provided by us)',
    ],
  },
  equity: {
    name: 'JV Equity / Preferred Equity',
    description:
      'Institutional-level joint venture or preferred equity partnerships for large-scale projects. Awan connects you with capital partners for deals that need more than debt.',
    whyFit:
      'For projects at this scale, an equity partnership provides the capital stack flexibility that traditional debt alone can\'t offer.',
    rateRange: '12% – 18% (preferred return)',
    closeTime: '30 – 60 days',
    maxLTV: 'Up to 95% of total capitalization',
    term: '2 – 5 years',
    docs: [
      'Full project proforma & financial model',
      'Sponsor track record & resume',
      'Market study / feasibility analysis',
      'Entity structure & operating agreement',
    ],
  },
  cannabis: {
    name: 'Cannabis Industry Financing',
    description:
      'Specialized lending for licensed cannabis operators. Awan works with lenders who understand the industry and its unique compliance requirements.',
    whyFit:
      'Cannabis operators need lenders who understand the space — our program is designed specifically for licensed operations.',
    rateRange: '10% – 15%',
    closeTime: '21 – 45 days',
    maxLTV: 'Up to 70% LTV',
    term: '12 – 60 months',
    docs: [
      'State & local cannabis licenses',
      'Business financials & tax returns',
      'Property lease or ownership docs',
      'Compliance documentation',
    ],
  },
};

export function matchLoan(answers) {
  const { projectType, propertyType, fundingAmount, timeline, situation, priority } = answers;

  if (propertyType === 'cannabis') {
    return products.cannabis;
  }

  if (projectType === 'construction') {
    return products.construction;
  }

  if (situation === 'equity' || fundingAmount === 'over10m') {
    return products.equity;
  }

  if (projectType === 'renovation' || (timeline === 'asap' && projectType === 'purchase')) {
    return products.bridge;
  }

  if (
    propertyType === 'smallBusiness' ||
    (projectType === 'growth' && fundingAmount !== 'over10m')
  ) {
    return products.sba;
  }

  return products.fixedRate;
}

export function calculateReadinessScore(answers) {
  let score = 50;

  // Credit & assets strength
  if (answers.situation === 'strong') score += 20;
  else if (answers.situation === 'creative') score += 10;
  else if (answers.situation === 'equity') score += 8;
  else if (answers.situation === 'firstTime') score += 0;

  // Timeline clarity (decisive borrowers score higher)
  if (answers.timeline === 'asap') score += 15;
  else if (answers.timeline === '1to3months') score += 12;
  else if (answers.timeline === '3to6months') score += 8;
  else if (answers.timeline === 'flexible') score += 5;

  // Funding range signals deal readiness
  if (answers.fundingAmount === '2mTo10m') score += 10;
  else if (answers.fundingAmount === 'over10m') score += 8;
  else if (answers.fundingAmount === '500kTo2m') score += 7;
  else if (answers.fundingAmount === 'under500k') score += 5;

  // Property type specificity
  if (answers.propertyType === 'hotel') score += 5;
  else if (answers.propertyType === 'commercial') score += 5;
  else if (answers.propertyType === 'multifamily') score += 5;
  else if (answers.propertyType === 'smallBusiness') score += 3;
  else if (answers.propertyType === 'cannabis') score += 2;

  return Math.min(score, 98);
}

export function getScoreLabel(score) {
  if (score >= 85) return 'Excellent Match';
  if (score >= 70) return 'Strong Candidate';
  if (score >= 55) return 'Good Potential';
  return 'Let\'s Talk';
}
