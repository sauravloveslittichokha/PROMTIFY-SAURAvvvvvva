import { Link } from 'react-router-dom';
import { Clock, ArrowRight, CheckCircle, Lock } from 'lucide-react';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import { courses } from '../data/mockData';

export default function Courses() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-surface-100 mb-1">Courses</h1>
        <p className="text-surface-500">Master web development step by step.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map(course => (
          <Link
            key={course.id}
            to={course.status !== 'locked' ? `/courses/${course.id}` : '#'}
            className={`group p-5 rounded-xl border transition-all duration-200 ${
              course.status === 'locked'
                ? 'border-surface-800 bg-surface-900/30 opacity-60 cursor-default'
                : 'border-surface-800 bg-surface-900/50 hover:border-primary-500/30 hover:-translate-y-1 cursor-pointer'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{course.icon}</span>
              {course.status === 'completed' && <CheckCircle size={20} className="text-success-500" />}
              {course.status === 'locked' && <Lock size={18} className="text-surface-600" />}
              {course.status === 'in-progress' && <Badge variant="accent">In Progress</Badge>}
              {course.status === 'available' && <Badge variant="info">Available</Badge>}
            </div>

            <h3 className="text-lg font-semibold text-surface-100 mb-1 group-hover:text-primary-400 transition-colors">
              {course.title}
            </h3>
            <p className="text-sm text-surface-500 mb-4 line-clamp-2">{course.description}</p>

            <div className="flex items-center gap-3 text-xs text-surface-500 mb-3">
              <span>{course.totalLessons} lessons</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {course.estimatedHours}h</span>
            </div>

            {course.status !== 'locked' && (
              <ProgressBar progress={course.progress} size="sm" showLabel />
            )}

            {course.status !== 'locked' && (
              <div className="mt-4 flex items-center gap-1 text-sm text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {course.status === 'completed' ? 'Review' : 'Continue'} <ArrowRight size={14} />
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
