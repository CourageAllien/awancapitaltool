import { useState, useCallback } from 'react';
import StepIndicator from './components/StepIndicator';
import QuestionStep from './components/QuestionStep';
import LeadCapture from './components/LeadCapture';
import ResultsPage from './components/ResultsPage';
import { questions } from './data/questions';
import { matchLoan, calculateReadinessScore } from './data/loanMatcher';

const TOTAL_STEPS = questions.length;

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [leadInfo, setLeadInfo] = useState(null);
  const [phase, setPhase] = useState('questions'); // 'questions' | 'leadCapture' | 'results'

  const handleSelect = useCallback((value) => {
    const question = questions[currentStep];
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentStep < TOTAL_STEPS - 1) {
        setCurrentStep((s) => s + 1);
      } else {
        setPhase('leadCapture');
      }
    }, 300);
  }, [currentStep, answers]);

  const handleBack = useCallback(() => {
    if (phase === 'leadCapture') {
      setPhase('questions');
      setCurrentStep(TOTAL_STEPS - 1);
    } else if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  }, [phase, currentStep]);

  const handleLeadSubmit = useCallback((info) => {
    setLeadInfo(info);
    setPhase('results');
  }, []);

  const handleRestart = useCallback(() => {
    setCurrentStep(0);
    setAnswers({});
    setLeadInfo(null);
    setPhase('questions');
  }, []);

  const product = phase === 'results' ? matchLoan(answers) : null;
  const score = phase === 'results' ? calculateReadinessScore(answers) : 0;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-navy py-4 px-6 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
              AWAN <span className="text-gold">CAPITAL</span>
            </h1>
            <p className="text-gray-400 text-xs tracking-widest uppercase">Your Yes Lender</p>
          </div>
          {phase !== 'results' && (
            <div className="hidden sm:block text-right">
              <span className="text-gray-400 text-sm">Funding Match Tool</span>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {phase !== 'results' && (
            <StepIndicator
              currentStep={phase === 'leadCapture' ? TOTAL_STEPS : currentStep}
              totalSteps={TOTAL_STEPS}
            />
          )}

          {phase === 'questions' && (
            <QuestionStep
              key={currentStep}
              question={questions[currentStep].question}
              subtitle={questions[currentStep].subtitle}
              options={questions[currentStep].options}
              currentAnswer={answers[questions[currentStep].id]}
              onSelect={handleSelect}
              onBack={handleBack}
              stepIndex={currentStep}
            />
          )}

          {phase === 'leadCapture' && (
            <LeadCapture onSubmit={handleLeadSubmit} onBack={handleBack} />
          )}

          {phase === 'results' && product && (
            <ResultsPage
              product={product}
              score={score}
              leadInfo={leadInfo}
              onRestart={handleRestart}
            />
          )}
        </div>
      </main>
    </div>
  );
}
