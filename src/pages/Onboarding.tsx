import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import Button from '../components/Button';
import logo from '../assets/logo.png';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({
    level: '',
    goals: [] as string[],
    path: '',
  });

  const steps = [
    {
      title: "What's your current level?",
      subtitle: 'This helps us personalize your learning path.',
      options: [
        { value: 'beginner', label: 'Beginner', desc: 'New to web development' },
        { value: 'some-experience', label: 'Some Experience', desc: 'Know some HTML/CSS basics' },
        { value: 'intermediate', label: 'Intermediate', desc: 'Built a few projects' },
      ],
    },
    {
      title: 'What do you want to achieve?',
      subtitle: 'Select all that apply.',
      options: [
        { value: 'learn-webdev', label: 'Learn Web Development', desc: 'Master frontend & backend' },
        { value: 'build-projects', label: 'Build Projects', desc: 'Create real-world applications' },
        { value: 'internship', label: 'Prepare for Internship', desc: 'Get internship-ready skills' },
        { value: 'job-ready', label: 'Become Job Ready', desc: 'Full stack career preparation' },
      ],
    },
    {
      title: 'Choose your path',
      subtitle: 'You can switch later.',
      options: [
        { value: 'frontend', label: 'Frontend', desc: 'HTML, CSS, JavaScript, React' },
        { value: 'fullstack', label: 'Full Stack', desc: 'Frontend + Backend + Database' },
      ],
    },
  ];

  const currentStep = steps[step];
  const canProceed =
    step === 0 ? !!selections.level :
    step === 1 ? selections.goals.length > 0 :
    !!selections.path;

  const handleSelect = (value: string) => {
    if (step === 0) setSelections({ ...selections, level: value });
    else if (step === 1) {
      setSelections({
        ...selections,
        goals: selections.goals.includes(value)
          ? selections.goals.filter(g => g !== value)
          : [...selections.goals, value],
      });
    }
    else if (step === 2) setSelections({ ...selections, path: value });
  };

  const isSelected = (value: string) => {
    if (step === 0) return selections.level === value;
    if (step === 1) return selections.goals.includes(value);
    return selections.path === value;
  };

  const handleFinish = () => {
    localStorage.setItem('nys-onboarding', JSON.stringify(selections));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <img src={logo} alt="NYS" className="h-10 w-auto" />
        <div className="flex items-center gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i <= step ? 'w-8 bg-primary-500' : 'w-4 bg-surface-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg animate-fade-in" key={step}>
          <div className="text-center mb-10">
            <p className="text-xs font-mono text-surface-600 mb-2">
              Step {step + 1} of {steps.length}
            </p>
            <h1 className="text-3xl font-bold text-surface-100 mb-3">
              {currentStep.title}
            </h1>
            <p className="text-surface-400">
              {currentStep.subtitle}
            </p>
          </div>

          <div className="space-y-3 mb-10">
            {currentStep.options.map(option => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left cursor-pointer ${
                  isSelected(option.value)
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-surface-800 bg-surface-900/50 hover:border-surface-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected(option.value) ? 'border-primary-500 bg-primary-500' : 'border-surface-600'
                }`}>
                  {isSelected(option.value) && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div>
                  <p className="font-medium text-surface-100">{option.label}</p>
                  <p className="text-sm text-surface-500">{option.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            {step > 0 ? (
              <Button variant="ghost" onClick={() => setStep(step - 1)}>
                <ChevronLeft size={18} /> Back
              </Button>
            ) : <div />}

            {step < steps.length - 1 ? (
              <Button variant="primary" onClick={() => setStep(step + 1)} disabled={!canProceed}>
                Continue <ChevronRight size={18} />
              </Button>
            ) : (
              <Button variant="accent" onClick={handleFinish} disabled={!canProceed}>
                <Sparkles size={18} /> Build My Learning Path
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
