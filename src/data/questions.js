export const questions = [
  {
    id: 'projectType',
    question: 'What best describes your project?',
    subtitle: 'This helps us match the right funding structure.',
    options: [
      { value: 'purchase', label: 'Real Estate Purchase', icon: '🏢' },
      { value: 'renovation', label: 'Renovation / Reposition', icon: '🔨' },
      { value: 'construction', label: 'New Construction', icon: '🏗️' },
      { value: 'growth', label: 'Business Growth', icon: '📈' },
    ],
  },
  {
    id: 'propertyType',
    question: 'What type of property or business?',
    subtitle: 'Different asset classes unlock different programs.',
    options: [
      { value: 'hotel', label: 'Hotel / Hospitality', icon: '🏨' },
      { value: 'commercial', label: 'Commercial Real Estate', icon: '🏬' },
      { value: 'smallBusiness', label: 'Small Business', icon: '💼' },
      { value: 'multifamily', label: 'Multifamily', icon: '🏘️' },
      { value: 'cannabis', label: 'Cannabis', icon: '🌿' },
    ],
  },
  {
    id: 'fundingAmount',
    question: 'How much funding are you looking for?',
    subtitle: 'An estimate is fine — we\'ll refine this together.',
    options: [
      { value: 'under500k', label: 'Under $500K', icon: '💵' },
      { value: '500kTo2m', label: '$500K – $2M', icon: '💰' },
      { value: '2mTo10m', label: '$2M – $10M', icon: '🏦' },
      { value: 'over10m', label: '$10M+', icon: '🏛️' },
    ],
  },
  {
    id: 'timeline',
    question: "What's your timeline to close?",
    subtitle: 'Speed matters — some of our programs close in under 2 weeks.',
    options: [
      { value: 'asap', label: 'ASAP (< 30 days)', icon: '⚡' },
      { value: '1to3months', label: '1 – 3 months', icon: '📅' },
      { value: '3to6months', label: '3 – 6 months', icon: '🗓️' },
      { value: 'flexible', label: 'Flexible', icon: '🕐' },
    ],
  },
  {
    id: 'situation',
    question: "What's your current situation?",
    subtitle: 'Be honest — we specialize in creative solutions.',
    options: [
      { value: 'strong', label: 'Strong credit + assets', icon: '✅' },
      { value: 'creative', label: 'Need creative structuring', icon: '🧩' },
      { value: 'equity', label: 'Equity partner needed', icon: '🤝' },
      { value: 'firstTime', label: 'First-time borrower', icon: '🆕' },
    ],
  },
  {
    id: 'priority',
    question: 'What matters most to you?',
    subtitle: 'This shapes how we structure your deal.',
    options: [
      { value: 'speed', label: 'Speed', icon: '🚀' },
      { value: 'rate', label: 'Rate', icon: '📉' },
      { value: 'flexibility', label: 'Flexibility', icon: '🔄' },
      { value: 'ltv', label: 'Loan-to-Value Ratio', icon: '📊' },
    ],
  },
];
