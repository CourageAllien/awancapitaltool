import { useState, useEffect } from 'react';

export default function QuestionStep({ question, options, subtitle, onSelect, currentAnswer, onBack, stepIndex }) {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setAnimating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const timer = setTimeout(() => setAnimating(false), 50);
    return () => clearTimeout(timer);
  }, [question]);

  const hasOddOptions = options.length % 2 !== 0;

  return (
    <div
      className={`transition-all duration-400 ease-out ${
        animating ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'
      }`}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-2">
          {question}
        </h2>
        {subtitle && (
          <p className="text-gray-500 text-base md:text-lg">{subtitle}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {options.map((option, idx) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`option-card text-left flex items-center gap-4 ${
              currentAnswer === option.value ? 'selected' : ''
            } ${hasOddOptions && idx === options.length - 1 ? 'sm:col-span-2 sm:max-w-xs sm:mx-auto' : ''}`}
          >
            <span className="text-2xl flex-shrink-0">{option.icon}</span>
            <span className="font-medium text-navy text-base">{option.label}</span>
          </button>
        ))}
      </div>

      {stepIndex > 0 && (
        <div className="mt-8 text-center">
          <button onClick={onBack} className="btn-secondary text-sm">
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}
