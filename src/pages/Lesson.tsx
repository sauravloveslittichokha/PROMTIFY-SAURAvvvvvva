import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, CheckCircle, Circle, Play, RotateCcw,
  Send, BookOpen, Code, Monitor, Terminal
} from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { courses } from '../data/mockData';

export default function Lesson() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('js');
  const [previewTab, setPreviewTab] = useState<'preview' | 'console'>('preview');
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  // Find lesson across all courses
  const { lesson, course, allLessons, lessonIndex } = useMemo(() => {
    for (const c of courses) {
      const all = c.modules.flatMap(m => m.lessons);
      const idx = all.findIndex(l => l.id === lessonId);
      if (idx !== -1) return { lesson: all[idx], course: c, allLessons: all, lessonIndex: idx };
    }
    return { lesson: null, course: null, allLessons: [], lessonIndex: -1 };
  }, [lessonId]);

  const [codeState, setCodeState] = useState({
    html: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Practice</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n  <p id="output"></p>\n  <script src="script.js"></script>\n</body>\n</html>`,
    css: `body {\n  font-family: sans-serif;\n  padding: 20px;\n  background: #1a1a2e;\n  color: #eee;\n}\n\nh1 {\n  color: #fbbf24;\n}`,
    js: `// Practice: Function Declarations\n\nfunction greet(name) {\n  return "Hello, " + name + "!";\n}\n\nfunction calculateArea(width, height = 1) {\n  return width * height;\n}\n\nconsole.log(greet("Saurav"));\nconsole.log("Area:", calculateArea(5, 3));`,
  });

  if (!lesson || !course) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-surface-200">Lesson not found</h2>
        <Link to="/courses" className="text-primary-400 text-sm mt-2 inline-block">Back to Courses</Link>
      </div>
    );
  }

  const prevLesson = lessonIndex > 0 ? allLessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < allLessons.length - 1 ? allLessons[lessonIndex + 1] : null;

  const handleRun = () => {
    setPreviewTab('console');
    try {
      const logs: string[] = [];
      const mockConsole = { log: (...args: unknown[]) => logs.push(args.map(String).join(' ')) };
      const fn = new Function('console', codeState.js);
      fn(mockConsole);
      setConsoleOutput(logs.length > 0 ? logs : ['(no output)']);
    } catch (err: unknown) {
      setConsoleOutput([`Error: ${err instanceof Error ? err.message : String(err)}`]);
    }
  };

  const handleReset = () => {
    setCodeState({
      ...codeState,
      js: `// Practice: Function Declarations\n\nfunction greet(name) {\n  return "Hello, " + name + "!";\n}\n\nconsole.log(greet("Saurav"));`,
    });
    setConsoleOutput([]);
  };

  const handleComplete = () => {
    setCompleted(true);
  };

  // Render lesson content as simple formatted text
  const renderContent = () => {
    const content = lesson.content;
    if (!content) {
      return (
        <div className="prose-custom">
          <h2>{lesson.title}</h2>
          <p>This lesson covers <strong>{lesson.title}</strong> in the {course.title} course.</p>
          <p>Use the code editor on the right to practice the concepts. Try modifying the code and clicking <strong>Run</strong> to see the results.</p>
          <h3>Key Concepts</h3>
          <ul>
            <li>Understanding the fundamentals of {lesson.title.toLowerCase()}</li>
            <li>Writing clean, readable code</li>
            <li>Practice with real examples</li>
          </ul>
          <h3>Try It Yourself</h3>
          <p>Modify the starter code in the editor and experiment with different approaches.</p>
        </div>
      );
    }

    // Simple markdown-ish rendering
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBuffer: string[] = [];

    lines.forEach((line, i) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${i}`} className="bg-surface-950 border border-surface-800 rounded-lg p-4 text-sm font-mono text-surface-300 overflow-x-auto my-4">
              <code>{codeBuffer.join('\n')}</code>
            </pre>
          );
          codeBuffer = [];
        }
        inCodeBlock = !inCodeBlock;
        return;
      }
      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      if (line.startsWith('# '))
        elements.push(<h2 key={i} className="text-xl font-bold text-surface-100 mt-6 mb-3">{line.slice(2)}</h2>);
      else if (line.startsWith('## '))
        elements.push(<h3 key={i} className="text-lg font-semibold text-surface-100 mt-5 mb-2">{line.slice(3)}</h3>);
      else if (line.startsWith('### '))
        elements.push(<h4 key={i} className="text-base font-semibold text-surface-200 mt-4 mb-2">{line.slice(4)}</h4>);
      else if (line.startsWith('- '))
        elements.push(<li key={i} className="text-surface-300 ml-4 mb-1 list-disc">{line.slice(2)}</li>);
      else if (line.trim() === '')
        elements.push(<div key={i} className="h-2" />);
      else {
        // Handle inline code with backticks
        const parts = line.split(/(`[^`]+`)/g);
        elements.push(
          <p key={i} className="text-surface-300 leading-relaxed mb-2">
            {parts.map((part, pi) =>
              part.startsWith('`') && part.endsWith('`')
                ? <code key={pi} className="px-1.5 py-0.5 bg-surface-800 rounded text-primary-400 text-sm font-mono">{part.slice(1, -1)}</code>
                : <span key={pi}>{part.replace(/\*\*([^*]+)\*\*/g, '$1')}</span>
            )}
          </p>
        );
      }
    });

    return <div>{elements}</div>;
  };

  return (
    <div className="animate-fade-in -m-6 lg:-m-8 flex flex-col h-screen">
      {/* Lesson Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface-900 border-b border-surface-800 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link to={`/courses/${course.id}`} className="text-surface-500 hover:text-surface-300 transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <div>
            <p className="text-xs text-surface-500">{course.title}</p>
            <h1 className="text-sm font-semibold text-surface-100">{lesson.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={lesson.type === 'interactive' ? 'accent' : 'info'} size="sm">
            {lesson.type}
          </Badge>
          <span className="text-xs text-surface-500">{lesson.duration}</span>

          {completed ? (
            <Badge variant="success" size="sm">✓ Completed</Badge>
          ) : (
            <Button variant="primary" size="sm" onClick={handleComplete}>
              <CheckCircle size={14} /> Mark Complete
            </Button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Lesson sidebar - lesson list */}
        <div className="hidden xl:block w-56 border-r border-surface-800 bg-surface-950 overflow-y-auto flex-shrink-0">
          <div className="p-3">
            <p className="text-xs font-medium text-surface-500 uppercase tracking-wider px-2 mb-2">Lessons</p>
            {allLessons.map((l, i) => (
              <Link
                key={l.id}
                to={`/lessons/${l.id}`}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-colors ${
                  l.id === lessonId
                    ? 'bg-primary-600/15 text-primary-400'
                    : 'text-surface-400 hover:text-surface-200 hover:bg-surface-800/50'
                }`}
              >
                {l.completed ? (
                  <CheckCircle size={12} className="text-success-500 flex-shrink-0" />
                ) : (
                  <Circle size={12} className="text-surface-600 flex-shrink-0" />
                )}
                <span className="truncate">{l.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Lesson Content */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Reading pane */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-surface-800 min-h-[200px] lg:min-h-0">
            <div className="max-w-2xl">
              {renderContent()}
            </div>
          </div>

          {/* Code Editor pane */}
          <div className="flex-1 flex flex-col bg-surface-950 min-h-[300px] lg:min-h-0">
            {/* Editor tabs */}
            <div className="flex items-center justify-between px-3 py-1.5 bg-surface-900 border-b border-surface-800 flex-shrink-0">
              <div className="flex">
                {(['html', 'css', 'js'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      activeTab === tab ? 'bg-surface-800 text-surface-100' : 'text-surface-500 hover:text-surface-300'
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <Button variant="ghost" size="sm" onClick={handleReset}><RotateCcw size={14} /> Reset</Button>
                <Button variant="primary" size="sm" onClick={handleRun}><Play size={14} /> Run</Button>
                <Button variant="accent" size="sm" onClick={handleComplete}><Send size={14} /> Submit</Button>
              </div>
            </div>

            {/* Code textarea */}
            <div className="flex-1 overflow-hidden">
              <textarea
                value={codeState[activeTab]}
                onChange={e => setCodeState({ ...codeState, [activeTab]: e.target.value })}
                className="w-full h-full p-4 bg-surface-950 text-surface-200 font-mono text-sm resize-none focus:outline-none leading-6"
                spellCheck={false}
              />
            </div>

            {/* Preview / Console */}
            <div className="border-t border-surface-800 flex-shrink-0">
              <div className="flex items-center px-3 py-1 bg-surface-900 border-b border-surface-800">
                <button
                  onClick={() => setPreviewTab('preview')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer flex items-center gap-1 ${
                    previewTab === 'preview' ? 'bg-surface-800 text-surface-200' : 'text-surface-500'
                  }`}
                >
                  <Monitor size={12} /> Preview
                </button>
                <button
                  onClick={() => setPreviewTab('console')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer flex items-center gap-1 ${
                    previewTab === 'console' ? 'bg-surface-800 text-surface-200' : 'text-surface-500'
                  }`}
                >
                  <Terminal size={12} /> Console
                </button>
              </div>

              <div className="h-32 overflow-y-auto p-3 bg-surface-950">
                {previewTab === 'console' ? (
                  consoleOutput.length > 0 ? (
                    <div className="space-y-1">
                      {consoleOutput.map((line, i) => (
                        <div key={i} className={`text-xs font-mono ${line.startsWith('Error') ? 'text-error-500' : 'text-surface-300'}`}>
                          <span className="text-surface-600 mr-2">{'>'}</span>{line}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-surface-600">Click "Run" to execute your code</p>
                  )
                ) : (
                  <div className="text-xs text-surface-500 flex items-center justify-center h-full">
                    <div className="text-center">
                      <Monitor size={20} className="mx-auto mb-1 text-surface-600" />
                      <p>Click "Run" to see preview</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface-900 border-t border-surface-800 flex-shrink-0">
        {prevLesson ? (
          <Link to={`/lessons/${prevLesson.id}`}>
            <Button variant="ghost" size="sm"><ChevronLeft size={14} /> {prevLesson.title}</Button>
          </Link>
        ) : <div />}
        {nextLesson ? (
          <Link to={`/lessons/${nextLesson.id}`}>
            <Button variant="ghost" size="sm">{nextLesson.title} <ChevronRight size={14} /></Button>
          </Link>
        ) : (
          <Link to={`/courses/${course.id}`}>
            <Button variant="primary" size="sm">Back to Course <ChevronRight size={14} /></Button>
          </Link>
        )}
      </div>
    </div>
  );
}
