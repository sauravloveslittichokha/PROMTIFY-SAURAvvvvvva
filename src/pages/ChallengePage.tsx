import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, Check, CheckCircle2, ChevronDown, Clock, Code2, FileCode2,
  Lightbulb, LoaderCircle, Menu, Monitor, Play, RotateCcw, Send,
  Terminal, Trophy, Zap,
} from 'lucide-react';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { challenges } from '../data/mockData';

type OutputLine = {
  text: string;
  type: 'success' | 'error' | 'muted';
};

const challengeRequirements: Record<string, string[]> = {
  ch1: [
    'Create a responsive navigation bar',
    'Add a logo or brand element',
    'Include at least four navigation links',
    'Implement a mobile hamburger menu',
    'Add smooth menu transitions',
    'Use semantic HTML elements',
  ],
  ch2: [
    'Filter products under the target price',
    'Sort matching products by rating',
    'Transform the results into display data',
    'Render each matching product',
    'Show a useful empty state',
    'Keep the solution reusable',
  ],
  ch3: [
    'Create semantic dashboard regions',
    'Use CSS Grid for the page layout',
    'Add a sidebar, header, and main area',
    'Arrange widgets with consistent spacing',
    'Add responsive breakpoints',
    'Prevent horizontal overflow',
  ],
  ch4: [
    'Request data in the required sequence',
    'Handle each asynchronous response',
    'Use async/await or a Promise chain',
    'Show a loading state while waiting',
    'Handle failed requests gracefully',
    'Render the final result clearly',
  ],
  ch5: [
    'Use semantic form controls',
    'Validate the email address',
    'Check password strength',
    'Confirm matching passwords',
    'Show helpful inline feedback',
    'Prevent invalid form submission',
  ],
};

const challengeHints: Record<string, string[]> = {
  ch1: [
    'Use flexbox to keep the brand and navigation items aligned.',
    'At 768px, hide the full link row and reveal a menu button.',
    'Toggle an aria-expanded state and animate the menu visibility.',
  ],
  ch2: [
    'Filter the array before sorting so unrelated products stay untouched.',
    'Use a copied array when sorting to avoid mutating the source data.',
    'Handle an empty result set separately from a failed operation.',
  ],
  ch3: [
    'Name grid areas first to make the page structure easy to reason about.',
    'Use minmax(0, 1fr) for flexible columns that should not overflow.',
    'Collapse the sidebar and widgets into a single column on small screens.',
  ],
  ch4: [
    'Await each request before starting the next one in the chain.',
    'Wrap asynchronous work in try/catch and keep loading state separate.',
    'Give the user a useful fallback when any request fails.',
  ],
  ch5: [
    'Validate fields as they change, but keep the submit action as a final check.',
    'Pair each error message with its input using aria-describedby.',
    'Use the browser validity API for common input formats.',
  ],
};

const challengePageSpacingStyles = `
  main:has(#challenge-page) > div { padding: 1rem; padding-top: 4rem; }
  #challenge-page [class~="p-4"] { padding: 1rem; }
  #challenge-page [class~="p-5"] { padding: 1.25rem; }
  #challenge-page [class~="p-6"] { padding: 1.5rem; }
  #challenge-page [class~="p-3"] { padding: 0.75rem; }
  #challenge-page [class~="p-1.5"] { padding: 0.375rem; }
  #challenge-page [class~="px-1"] { padding-left: 0.25rem; padding-right: 0.25rem; }
  #challenge-page [class~="px-1.5"] { padding-left: 0.375rem; padding-right: 0.375rem; }
  #challenge-page [class~="px-2"] { padding-left: 0.5rem; padding-right: 0.5rem; }
  #challenge-page [class~="px-2.5"] { padding-left: 0.625rem; padding-right: 0.625rem; }
  #challenge-page [class~="px-3"] { padding-left: 0.75rem; padding-right: 0.75rem; }
  #challenge-page [class~="px-4"] { padding-left: 1rem; padding-right: 1rem; }
  #challenge-page [class~="px-5"] { padding-left: 1.25rem; padding-right: 1.25rem; }
  #challenge-page [class~="px-6"] { padding-left: 1.5rem; padding-right: 1.5rem; }
  #challenge-page [class~="py-0.5"] { padding-top: 0.125rem; padding-bottom: 0.125rem; }
  #challenge-page [class~="py-1"] { padding-top: 0.25rem; padding-bottom: 0.25rem; }
  #challenge-page [class~="py-1.5"] { padding-top: 0.375rem; padding-bottom: 0.375rem; }
  #challenge-page [class~="py-2"] { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  #challenge-page [class~="py-2.5"] { padding-top: 0.625rem; padding-bottom: 0.625rem; }
  #challenge-page [class~="py-3"] { padding-top: 0.75rem; padding-bottom: 0.75rem; }
  #challenge-page [class~="py-4"] { padding-top: 1rem; padding-bottom: 1rem; }
  #challenge-page [class~="py-5"] { padding-top: 1.25rem; padding-bottom: 1.25rem; }
  #challenge-page [class~="py-8"] { padding-top: 2rem; padding-bottom: 2rem; }
  #challenge-page [class~="py-10"] { padding-top: 2.5rem; padding-bottom: 2.5rem; }
  #challenge-page [class~="pb-2"] { padding-bottom: 0.5rem; }
  #challenge-page [class~="mb-2"] { margin-bottom: 0.5rem; }
  #challenge-page [class~="mb-3"] { margin-bottom: 0.75rem; }
  #challenge-page [class~="mb-4"] { margin-bottom: 1rem; }
  #challenge-page [class~="mt-0.5"] { margin-top: 0.125rem; }
  #challenge-page [class~="mt-1"] { margin-top: 0.25rem; }
  #challenge-page [class~="mt-2"] { margin-top: 0.5rem; }
  #challenge-page [class~="mt-3"] { margin-top: 0.75rem; }
  #challenge-page [class~="mt-4"] { margin-top: 1rem; }
  #challenge-page [class~="mt-6"] { margin-top: 1.5rem; }
  #challenge-page [class~="mx-auto"] { margin-left: auto; margin-right: auto; }
  #challenge-page [class~="mx-1"] { margin-left: 0.25rem; margin-right: 0.25rem; }
  #challenge-page [class~="ml-auto"] { margin-left: auto; }
  #challenge-page [class~="mr-2"] { margin-right: 0.5rem; }
  #challenge-page .space-y-6 > :not(:first-child) { margin-top: 1.5rem; }
  #challenge-page .space-y-4 > :not(:first-child) { margin-top: 1rem; }
  #challenge-page .space-y-3 > :not(:first-child) { margin-top: 0.75rem; }
  #challenge-page .space-y-2.5 > :not(:first-child) { margin-top: 0.625rem; }
  #challenge-page .space-y-2 > :not(:first-child) { margin-top: 0.5rem; }
  #challenge-page .space-y-1.5 > :not(:first-child) { margin-top: 0.375rem; }
  #challenge-page .space-y-1 > :not(:first-child) { margin-top: 0.25rem; }
  #challenge-page .rounded-md.border { padding: 0.125rem 0.5rem; }
  @media (min-width: 640px) {
    #challenge-page [class~="sm:p-5"] { padding: 1.25rem; }
    #challenge-page [class~="sm:p-6"] { padding: 1.5rem; }
    #challenge-page [class~="sm:px-4"] { padding-left: 1rem; padding-right: 1rem; }
    #challenge-page [class~="sm:px-5"] { padding-left: 1.25rem; padding-right: 1.25rem; }
    #challenge-page [class~="sm:px-6"] { padding-left: 1.5rem; padding-right: 1.5rem; }
    #challenge-page [class~="sm:py-2"] { padding-top: 0.5rem; padding-bottom: 0.5rem; }
    #challenge-page .rounded-md.border { padding: 0.125rem 0.5rem; }
  }
  @media (min-width: 1024px) {
    main:has(#challenge-page) > div { padding: 2rem 2.5rem 2.5rem; }
  }
`;

const buildStarterCode = (challengeId: string, title: string) => {
  if (challengeId === 'ch1') {
    return `// Challenge: ${title}\n// Build a responsive, accessible navigation bar.\n\nconst links = ['About', 'Work', 'Resources', 'Contact'];\n\nfunction createNavbar() {\n  const nav = document.createElement('nav');\n  nav.className = 'navbar';\n  nav.setAttribute('aria-label', 'Main navigation');\n\n  const brand = document.createElement('a');\n  brand.className = 'navbar__brand';\n  brand.href = '/';\n  brand.textContent = 'Northstar';\n\n  // TODO: Render links and a mobile menu button.\n  nav.appendChild(brand);\n  return nav;\n}\n\nconsole.log('Navigation ready:', createNavbar());`;
  }

  return `// Challenge: ${title}\n// Add your solution below.\n\nfunction solveChallenge(input) {\n  // TODO: Implement your approach.\n  return input;\n}\n\nconsole.log(solveChallenge([]));`;
};

function ChallengeWorkspace({
  challengeId,
  completedChallengeIds,
  onChallengeSubmitted,
}: {
  challengeId: string | undefined;
  completedChallengeIds: Set<string>;
  onChallengeSubmitted: (id: string) => void;
}) {
  const challenge = challenges.find(item => item.id === challengeId) ?? challenges[0];
  const requirements = challengeRequirements[challenge.id] ?? challengeRequirements.ch1;
  const hints = challengeHints[challenge.id] ?? challengeHints.ch1;
  const starterCode = buildStarterCode(challenge.id, challenge.title);
  const [code, setCode] = useState(starterCode);
  const [checkedRequirements, setCheckedRequirements] = useState<boolean[]>(() =>
    Array(requirements.length).fill(challenge.completed || completedChallengeIds.has(challenge.id)),
  );
  const [isHintsOpen, setIsHintsOpen] = useState(false);
  const [visibleHintCount, setVisibleHintCount] = useState(0);
  const [activeTab, setActiveTab] = useState<'preview' | 'console'>('preview');
  const [consoleOutput, setConsoleOutput] = useState<OutputLine[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditorLoading, setIsEditorLoading] = useState(true);
  const [runCount, setRunCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const actionTimer = useRef<number | null>(null);

  const completedCount = checkedRequirements.filter(Boolean).length;
  const progress = Math.round((completedCount / requirements.length) * 100);
  const isSubmitted = challenge.completed || completedChallengeIds.has(challenge.id);
  const diffColor = {
    Easy: 'success',
    Medium: 'warning',
    Hard: 'error',
  } as const;

  useEffect(() => {
    const editorTimer = window.setTimeout(() => setIsEditorLoading(false), 240);
    return () => window.clearTimeout(editorTimer);
  }, []);

  useEffect(() => () => {
    if (actionTimer.current !== null) window.clearTimeout(actionTimer.current);
  }, []);

  const toggleRequirement = (index: number) => {
    setCheckedRequirements(current => current.map((checked, itemIndex) =>
      itemIndex === index ? !checked : checked,
    ));
  };

  const handleRun = () => {
    if (isRunning || isSubmitting) return;
    setIsRunning(true);
    setActiveTab('console');
    setConsoleOutput([{ text: 'Starting preview run…', type: 'muted' }]);
    actionTimer.current = window.setTimeout(() => {
      if (!code.trim()) {
        setConsoleOutput([{ text: 'Error: Add some code before running this solution.', type: 'error' }]);
      } else {
        setRunCount(count => count + 1);
        setConsoleOutput([
          { text: 'Code executed successfully', type: 'success' },
          { text: 'No syntax errors detected (mock run)', type: 'success' },
          { text: 'Preview refreshed with the latest solution.', type: 'muted' },
        ]);
      }
      setIsRunning(false);
    }, 650);
  };

  const handleSubmit = () => {
    if (isRunning || isSubmitting || isSubmitted) return;
    if (!code.trim()) {
      setActiveTab('console');
      setConsoleOutput([{ text: 'Error: Add a solution before submitting.', type: 'error' }]);
      return;
    }

    setIsSubmitting(true);
    setActiveTab('console');
    setConsoleOutput([{ text: 'Checking your solution…', type: 'muted' }]);
    actionTimer.current = window.setTimeout(() => {
      setCheckedRequirements(Array(requirements.length).fill(true));
      setRunCount(count => count + 1);
      setConsoleOutput([
        { text: 'Challenge submitted successfully', type: 'success' },
        { text: 'All challenge checks passed (mock validation)', type: 'success' },
      ]);
      onChallengeSubmitted(challenge.id);
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 850);
  };

  const handleReset = () => {
    setCode(starterCode);
    setConsoleOutput([]);
    setActiveTab('preview');
  };

  return (
    <div id="challenge-page" className="animate-fade-in w-full min-w-0 space-y-6">
      <header className="space-y-4">
        <Link
          to="/challenges/ch1"
          className="inline-flex items-center gap-2 text-sm font-medium text-surface-400 transition-colors hover:text-surface-100"
        >
          <ArrowLeft size={16} /> Back to Challenges
        </Link>

        <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
          <div className="min-w-0 max-w-4xl">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-400">
              <Code2 size={14} /> Interactive challenge
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-surface-50 sm:text-3xl">{challenge.title}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-surface-400 sm:text-base">{challenge.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <Badge variant={diffColor[challenge.difficulty]}>{challenge.difficulty}</Badge>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-surface-400">
                <Clock size={14} /> {challenge.estimatedTime}
              </span>
              <span className="mx-1 hidden h-4 w-px bg-surface-800 sm:block" />
              {challenge.skills.map(skill => <Badge key={skill} size="sm">{skill}</Badge>)}
            </div>
          </div>

          {isSubmitted && (
            <div className="flex shrink-0 items-center gap-3 rounded-xl border border-success-500/20 bg-success-500/[0.06] px-4 py-3 animate-scale-in">
              <CheckCircle2 size={20} className="text-success-500" />
              <div>
                <p className="text-sm font-semibold text-success-400">Challenge complete</p>
                <p className="text-xs text-surface-500">Your progress is saved for this session.</p>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(260px,0.78fr)_minmax(0,1.55fr)] xl:gap-6">
        <aside className="min-w-0 space-y-4">
          <section className="rounded-xl border border-surface-800 bg-surface-900/50 p-4 sm:p-5">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-surface-500">Your checklist</p>
                <h2 className="mt-1 text-base font-semibold text-surface-100">Challenge requirements</h2>
              </div>
              <span className="rounded-lg border border-surface-700 bg-surface-950 px-2.5 py-1 text-xs font-semibold tabular-nums text-surface-300">
                {completedCount} / {requirements.length}
              </span>
            </div>

            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-medium text-surface-400">Challenge progress</span>
                <span className="font-semibold tabular-nums text-primary-400">{progress}%</span>
              </div>
              <div
                className="h-2 overflow-hidden rounded-full bg-surface-800"
                role="progressbar"
                aria-label="Challenge requirements completed"
                aria-valuemin={0}
                aria-valuemax={requirements.length}
                aria-valuenow={completedCount}
              >
                <div
                  className="h-full rounded-full bg-primary-500 transition-[width] duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <ul className="space-y-1.5">
              {requirements.map((requirement, index) => {
                const isChecked = checkedRequirements[index];
                return (
                  <li key={requirement}>
                    <button
                      type="button"
                      aria-pressed={isChecked}
                      onClick={() => toggleRequirement(index)}
                      className={`group flex w-full items-start gap-3 rounded-lg px-2.5 py-2.5 text-left text-sm transition-all duration-200 hover:bg-surface-800/70 active:scale-[0.99] ${
                        isChecked ? 'text-surface-500' : 'text-surface-300'
                      }`}
                    >
                      <span className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border transition-all duration-200 ${
                        isChecked
                          ? 'scale-100 border-success-500 bg-success-500 text-surface-950'
                          : 'border-surface-600 bg-surface-950 text-transparent group-hover:border-primary-400'
                      }`}>
                        <Check size={12} strokeWidth={3} className={isChecked ? 'animate-scale-in' : ''} />
                      </span>
                      <span className={`leading-5 transition-all duration-200 ${isChecked ? 'text-surface-500 line-through decoration-surface-600' : ''}`}>
                        {requirement}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="overflow-hidden rounded-xl border border-surface-800 bg-surface-900/50">
            <button
              type="button"
              aria-expanded={isHintsOpen}
              onClick={() => {
                setIsHintsOpen(open => !open);
                if (!isHintsOpen && visibleHintCount === 0) setVisibleHintCount(1);
              }}
              className="flex w-full items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-surface-800/40 sm:p-5"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent-400/15 bg-accent-400/10 text-accent-400">
                  <Lightbulb size={17} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-surface-100">Hints</span>
                  <span className="mt-0.5 block text-xs text-surface-500">{isHintsOpen ? 'A nudge, not the answer' : 'Need help?'}</span>
                </span>
              </span>
              <ChevronDown size={17} className={`shrink-0 text-surface-500 transition-transform duration-300 ${isHintsOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isHintsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <div className="space-y-3 border-t border-surface-800 px-4 py-4 sm:px-5">
                  <ol className="space-y-2.5">
                    {hints.slice(0, visibleHintCount).map((hint, index) => (
                      <li key={hint} className="flex gap-2.5 text-sm leading-5 text-surface-400 animate-fade-in">
                        <span className="mt-0.5 text-xs font-semibold tabular-nums text-accent-400">0{index + 1}</span>
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ol>
                  {visibleHintCount < hints.length ? (
                    <button
                      type="button"
                      onClick={() => setVisibleHintCount(count => Math.min(count + 1, hints.length))}
                      className="text-xs font-semibold text-primary-400 transition-colors hover:text-primary-300"
                    >
                      Reveal hint {visibleHintCount + 1} of {hints.length}
                    </button>
                  ) : (
                    <p className="text-xs text-surface-600">That’s all the hints for this challenge.</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-surface-800 bg-surface-900/50 p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-surface-500">Keep learning</p>
                <h2 className="mt-1 text-sm font-semibold text-surface-100">Other challenges</h2>
              </div>
              <Zap size={16} className="text-accent-400" />
            </div>
            <nav aria-label="Other challenges" className="space-y-1">
              {challenges.map(item => {
                const isCurrent = item.id === challenge.id;
                const isComplete = item.completed || completedChallengeIds.has(item.id);
                return (
                  <Link
                    key={item.id}
                    to={`/challenges/${item.id}`}
                    aria-current={isCurrent ? 'page' : undefined}
                    className={`group flex min-w-0 items-center gap-2.5 rounded-lg border px-2.5 py-2.5 text-sm transition-all duration-200 hover:-translate-y-px ${
                      isCurrent
                        ? 'border-primary-500/25 bg-primary-600/10 text-primary-300'
                        : 'border-transparent text-surface-400 hover:border-surface-700 hover:bg-surface-800/60 hover:text-surface-100'
                    }`}
                  >
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                      isComplete ? 'bg-success-500/10 text-success-500'
                      : isCurrent ? 'bg-primary-500/15 text-primary-400'
                      : 'bg-surface-800 text-surface-500 group-hover:text-surface-300'
                    }`}>
                      {isComplete ? <CheckCircle2 size={15} /> : isCurrent ? <Code2 size={15} /> : <Zap size={14} />}
                    </span>
                    <span className="min-w-0 flex-1 truncate">{item.title}</span>
                    <span className={`shrink-0 text-[10px] font-semibold uppercase tracking-wide ${
                      isComplete ? 'text-success-500' : isCurrent ? 'text-primary-400' : 'text-surface-600'
                    }`}>
                      {isComplete ? 'Done' : isCurrent ? 'Current' : 'Open'}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </section>
        </aside>

        <section className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-surface-800 bg-surface-900/40 shadow-xl shadow-black/10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-800 bg-surface-900 px-3 py-2.5 sm:px-4">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary-500/15 bg-primary-500/10 text-primary-400">
                <FileCode2 size={16} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-surface-200">solution.js</p>
                <p className="text-[10px] text-surface-600">JavaScript · UTF-8</p>
              </div>
              <span className="hidden rounded border border-surface-700 px-1.5 py-0.5 text-[10px] font-semibold text-surface-500 sm:inline-flex">JS</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span title="Reset to starter code">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  disabled={isRunning || isSubmitting}
                  className="!px-2.5 active:scale-[0.97]"
                >
                  <RotateCcw size={14} /> Reset
                </Button>
              </span>
              <span title="Run your solution">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleRun}
                  disabled={isRunning || isSubmitting}
                  className="active:scale-[0.97]"
                >
                  {isRunning ? <LoaderCircle size={14} className="animate-spin" /> : <Play size={14} />}
                  {isRunning ? 'Running' : 'Run'}
                </Button>
              </span>
              <span title={isSubmitted ? 'Challenge completed' : 'Submit your solution'}>
                <Button
                  variant="accent"
                  size="sm"
                  onClick={handleSubmit}
                  disabled={isSubmitting || isRunning || isSubmitted}
                  className="active:scale-[0.97]"
                >
                  {isSubmitting ? <LoaderCircle size={14} className="animate-spin" /> : isSubmitted ? <CheckCircle2 size={14} /> : <Send size={14} />}
                  <span>{isSubmitting ? 'Submitting' : isSubmitted ? 'Submitted' : 'Submit'}</span>
                </Button>
              </span>
            </div>
          </div>

          <div className="relative">
            {isEditorLoading ? (
              <div className="flex h-[48vh] min-h-[340px] max-h-[560px] items-center justify-center bg-surface-950 text-sm text-surface-500" role="status">
                <LoaderCircle size={17} className="mr-2 animate-spin text-primary-400" /> Preparing editor…
              </div>
            ) : (
              <textarea
                value={code}
                onChange={event => setCode(event.target.value)}
                aria-label="Challenge solution editor"
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                className="block h-[48vh] min-h-[340px] max-h-[560px] w-full resize-y bg-surface-950 px-4 py-5 font-mono text-[13px] leading-6 text-surface-200 caret-primary-400 outline-none transition-colors placeholder:text-surface-700 focus:ring-1 focus:ring-inset focus:ring-primary-500/30 sm:px-6 sm:text-sm"
              />
            )}
          </div>

          <div className="flex items-center justify-between border-t border-surface-800 bg-surface-900/80 px-4 py-2 text-[10px] text-surface-600 sm:px-5">
            <span>{code.split('\n').length} lines</span>
            <span className="inline-flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${isRunning || isSubmitting ? 'animate-pulse bg-accent-400' : 'bg-success-500'}`} />
              {isRunning ? 'Running' : isSubmitting ? 'Submitting' : 'Ready'}
            </span>
          </div>

          <div className="border-t border-surface-800">
            <div className="flex items-center gap-1 border-b border-surface-800 bg-surface-900 px-3 py-2" role="tablist" aria-label="Output panels">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'preview'}
                onClick={() => setActiveTab('preview')}
                className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  activeTab === 'preview' ? 'bg-surface-800 text-surface-100 shadow-sm' : 'text-surface-500 hover:bg-surface-800/60 hover:text-surface-300'
                }`}
              >
                <Monitor size={14} /> Preview
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'console'}
                onClick={() => setActiveTab('console')}
                className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  activeTab === 'console' ? 'bg-surface-800 text-surface-100 shadow-sm' : 'text-surface-500 hover:bg-surface-800/60 hover:text-surface-300'
                }`}
              >
                <Terminal size={14} /> Console
                {consoleOutput.some(line => line.type === 'error') && <span className="h-1.5 w-1.5 rounded-full bg-error-500" />}
              </button>
              {runCount > 0 && <span className="ml-auto text-[10px] text-surface-600">Run #{runCount}</span>}
            </div>

            <div className="min-h-[230px] bg-surface-950 p-3 sm:p-4" role="tabpanel">
              {activeTab === 'preview' ? (
                <div className="animate-fade-in">
                  <div className="mb-3 flex items-center justify-between gap-3 px-1">
                    <div className="flex items-center gap-2 text-xs text-surface-400">
                      <span className="h-2 w-2 rounded-full bg-success-500" />
                      Live preview
                    </div>
                    <span className="text-[10px] text-surface-600">{runCount > 0 ? 'Updated just now' : 'Starter preview'}</span>
                  </div>
                  <div className="overflow-hidden rounded-lg border border-surface-700 bg-surface-100 text-slate-900 shadow-lg">
                    <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-3 py-2">
                      <span className="h-2 w-2 rounded-full bg-rose-400" />
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <div className="mx-auto max-w-[55%] truncate rounded bg-white px-3 py-0.5 text-[10px] text-slate-400 shadow-sm">preview.local/{challenge.id}</div>
                    </div>
                    <div className="min-h-[190px] p-4 sm:p-6">
                      <nav className="flex items-center justify-between gap-4 rounded-xl bg-slate-950 px-4 py-3 text-white shadow-md sm:px-5" aria-label="Preview navigation">
                        <a href="#preview-home" className="flex shrink-0 items-center gap-2 text-sm font-bold tracking-tight">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-500 text-xs font-black">N</span>
                          Northstar
                        </a>
                        <div className="hidden items-center gap-5 text-xs font-medium text-slate-300 sm:flex">
                          <a href="#preview-about" className="transition-colors hover:text-white">About</a>
                          <a href="#preview-work" className="transition-colors hover:text-white">Work</a>
                          <a href="#preview-resources" className="transition-colors hover:text-white">Resources</a>
                          <a href="#preview-contact" className="transition-colors hover:text-white">Contact</a>
                        </div>
                        <button type="button" aria-label="Open preview navigation menu" className="rounded-md p-1.5 text-slate-200 transition-colors hover:bg-slate-800 sm:hidden">
                          <Menu size={18} />
                        </button>
                        <a href="#preview-start" className="hidden shrink-0 rounded-md bg-primary-500 px-3 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-primary-400 sm:inline-flex">Get started</a>
                      </nav>
                      <div className="mx-auto max-w-xl py-8 text-center sm:py-10">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-600">A clearer way to build</p>
                        <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Make room for what’s next.</h3>
                        <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-slate-500">A responsive navigation experience, ready to connect people with your best work.</p>
                        <a href="#preview-explore" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5">Explore the workspace <ArrowLeft size={13} className="rotate-180" /></a>
                      </div>
                    </div>
                  </div>
                  {runCount === 0 && <p className="mt-3 text-center text-[11px] text-surface-600">Run your solution to refresh this preview.</p>}
                </div>
              ) : (
                <div className="min-h-[198px] animate-fade-in font-mono text-xs">
                  <div className="mb-3 flex items-center justify-between border-b border-surface-800 pb-2 text-[10px] text-surface-600">
                    <span>MOCK CONSOLE</span>
                    {isRunning || isSubmitting ? <span className="text-accent-400">Working…</span> : <span>{consoleOutput.length ? 'Process finished' : 'Waiting for run'}</span>}
                  </div>
                  {isRunning || isSubmitting ? (
                    <div className="flex items-center gap-2 py-3 text-surface-400" role="status">
                      <LoaderCircle size={14} className="animate-spin text-primary-400" />
                      {isSubmitting ? 'Submitting your challenge…' : 'Running your solution…'}
                    </div>
                  ) : consoleOutput.length > 0 ? (
                    <div className="space-y-2" aria-live="polite">
                      {consoleOutput.map((line, index) => (
                        <p key={`${line.text}-${index}`} className={`flex items-start gap-2 ${
                          line.type === 'error' ? 'text-error-500' : line.type === 'success' ? 'text-success-500' : 'text-surface-400'
                        }`}>
                          <span className="select-none text-surface-700">{line.type === 'error' ? '×' : line.type === 'success' ? '✓' : '›'}</span>
                          <span>{line.text}</span>
                        </p>
                      ))}
                    </div>
                  ) : (
                    <div className="flex min-h-[145px] flex-col items-center justify-center gap-2 text-center">
                      <Terminal size={19} className="text-surface-700" />
                      <p className="text-xs text-surface-500">Console is ready</p>
                      <p className="font-sans text-[11px] text-surface-600">Run your solution to see output and validation feedback.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <Modal isOpen={showSuccess} onClose={() => setShowSuccess(false)} size="sm" title="Challenge submitted">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 animate-scale-in items-center justify-center rounded-full border border-success-500/20 bg-success-500/10 text-success-500">
            <Trophy size={26} />
          </div>
          <h2 className="text-lg font-bold text-surface-100">Great work!</h2>
          <p className="mt-2 text-sm leading-6 text-surface-400">Your solution passed the challenge. You’ve completed <span className="font-medium text-surface-200">{challenge.title}</span>.</p>
          <Button variant="primary" size="md" onClick={() => setShowSuccess(false)} className="mt-6 w-full justify-center">
            Continue learning <CheckCircle2 size={16} />
          </Button>
        </div>
      </Modal>
      <style>{challengePageSpacingStyles}</style>
    </div>
  );
}

export default function ChallengePage() {
  const { challengeId } = useParams();
  const [completedChallengeIds, setCompletedChallengeIds] = useState<Set<string>>(() =>
    new Set(challenges.filter(challenge => challenge.completed).map(challenge => challenge.id)),
  );

  const markChallengeComplete = (id: string) => {
    setCompletedChallengeIds(current => new Set(current).add(id));
  };

  return (
    <ChallengeWorkspace
      key={challengeId ?? 'default'}
      challengeId={challengeId}
      completedChallengeIds={completedChallengeIds}
      onChallengeSubmitted={markChallengeComplete}
    />
  );
}
