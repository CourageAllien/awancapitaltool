export default function StepIndicator({ currentStep, totalSteps }) {
  const progress = Math.min((currentStep / totalSteps) * 100, 100);

  return (
    <div className="w-full mb-8">
      {/* Mobile: simple progress bar */}
      <div className="sm:hidden">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-navy">
            {currentStep < totalSteps
              ? `Step ${currentStep + 1} of ${totalSteps}`
              : 'Almost there!'}
          </span>
          <span className="text-sm font-medium text-gold">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-gold-dark to-gold h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Desktop: numbered steps */}
      <div className="hidden sm:flex items-center justify-center">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                  transition-all duration-300 ease-in-out
                  ${
                    i < currentStep
                      ? 'bg-navy text-white shadow-md'
                      : i === currentStep
                        ? 'bg-gold text-navy ring-4 ring-gold/20 shadow-lg'
                        : 'bg-gray-200 text-gray-400'
                  }
                `}
              >
                {i < currentStep ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
            </div>
            {i < totalSteps - 1 && (
              <div
                className={`
                  w-10 lg:w-16 h-0.5 mx-1.5 transition-all duration-500 rounded-full
                  ${i < currentStep ? 'bg-navy' : 'bg-gray-200'}
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
