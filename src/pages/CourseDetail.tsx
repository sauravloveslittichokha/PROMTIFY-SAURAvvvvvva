import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Circle, Clock, BookOpen, PlayCircle } from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import { courses } from '../data/mockData';

export default function CourseDetail() {
  const { courseId } = useParams();
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="animate-fade-in text-center py-20">
        <h2 className="text-xl font-bold text-surface-200">Course not found</h2>
        <Link to="/courses" className="text-primary-400 hover:text-primary-300 text-sm mt-2 inline-block">
          Back to Courses
        </Link>
      </div>
    );
  }

  const nextLesson = course.modules
    .flatMap(m => m.lessons)
    .find(l => !l.completed);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <Link to="/courses" className="text-sm text-surface-500 hover:text-surface-300 transition-colors mb-3 inline-block">
          ← Back to Courses
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{course.icon}</span>
              <h1 className="text-2xl font-bold text-surface-100">{course.title}</h1>
            </div>
            <p className="text-surface-400 max-w-2xl">{course.description}</p>
          </div>
          {nextLesson && (
            <Link to={`/lessons/${nextLesson.id}`}>
              <Button variant="primary">
                Continue Learning <ArrowRight size={16} />
              </Button>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-6 mt-5 text-sm text-surface-500">
          <span className="flex items-center gap-1.5"><BookOpen size={14} /> {course.totalLessons} lessons</span>
          <span className="flex items-center gap-1.5"><Clock size={14} /> {course.estimatedHours} hours</span>
          <span>{course.completedLessons} completed</span>
        </div>

        <ProgressBar progress={course.progress} size="md" showLabel className="mt-4 max-w-xl" />
      </div>

      {/* Modules */}
      <div className="space-y-4">
        {course.modules.map((module, mi) => (
          <div key={module.id} className="rounded-xl border border-surface-800 bg-surface-900/50 overflow-hidden">
            <div className="px-5 py-4 flex items-center justify-between border-b border-surface-800/50">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-surface-600 w-8">M{mi + 1}</span>
                <h3 className="font-semibold text-surface-100">{module.title}</h3>
                {module.progress === 100 && <Badge variant="success" size="sm">Done</Badge>}
              </div>
              <span className="text-xs text-surface-500">{module.progress}%</span>
            </div>

            <div className="divide-y divide-surface-800/30">
              {module.lessons.map(lesson => (
                <Link
                  key={lesson.id}
                  to={`/lessons/${lesson.id}`}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-surface-800/30 transition-colors"
                >
                  {lesson.completed ? (
                    <CheckCircle size={18} className="text-success-500 flex-shrink-0" />
                  ) : (
                    <Circle size={18} className="text-surface-600 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${lesson.completed ? 'text-surface-400' : 'text-surface-200'}`}>
                      {lesson.title}
                    </p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-surface-600 flex items-center gap-1">
                        {lesson.type === 'interactive' ? <PlayCircle size={10} /> : <BookOpen size={10} />}
                        {lesson.type}
                      </span>
                      <span className="text-xs text-surface-600">{lesson.duration}</span>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-surface-700" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
