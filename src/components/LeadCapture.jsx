import { useState, useEffect } from 'react';

export default function LeadCapture({ onSubmit, onBack }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  function validate() {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Please enter your name';
    if (!email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    setTouched({ name: true, email: true });

    if (Object.keys(newErrors).length === 0) {
      onSubmit({ name: name.trim(), email: email.trim() });
    }
  }

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  }

  return (
    <div className="transition-all duration-400 ease-out animate-[fadeIn_0.4s_ease-out]">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-4">
          <span className="text-3xl">🔓</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-2">
          Almost there — unlock your results
        </h2>
        <p className="text-gray-500 text-base md:text-lg max-w-md mx-auto">
          Tony personally reviews every submission. Enter your info to see your personalized funding roadmap.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-navy mb-1.5">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleBlur('name')}
            placeholder="e.g. Ramesh Shah"
            className={`
              w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
              focus:outline-none focus:ring-0
              ${
                touched.name && errors.name
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-gray-200 focus:border-gold'
              }
            `}
          />
          {touched.name && errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
            placeholder="ramesh@example.com"
            className={`
              w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
              focus:outline-none focus:ring-0
              ${
                touched.email && errors.email
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-gray-200 focus:border-gold'
              }
            `}
          />
          {touched.email && errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <button type="submit" className="btn-primary w-full text-center text-lg">
          See My Funding Roadmap →
        </button>

        <button
          type="button"
          onClick={onBack}
          className="btn-secondary w-full text-center text-sm"
        >
          ← Back
        </button>
      </form>
    </div>
  );
}
