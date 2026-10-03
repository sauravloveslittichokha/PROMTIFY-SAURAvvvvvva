import { Link } from 'react-router-dom';
import { CheckCircle, Lock, ArrowRight, BookOpen, FolderKanban, Zap } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import Badge from '../components/Badge';
import { roadmapNodes, currentUser } from '../data/mockData';

export default function Roadmap() {
  const completedCount = roadmapNodes.filter(n => n.status === 'completed').length;
  const totalCount = roadmapNodes.length;

  return (
    <div className="animate-fade-in w-full min-w-0">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-surface-50 mb-2">Web Development Roadmap</h1>
        <p className="text-surface-400 text-lg mb-6">
          Your structured path from beginner to full-stack developer.
        </p>

        {/* Overall progress */}
        <div className="flex w-full flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl bg-surface-900/60 border border-surface-800">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-surface-300">Overall Progress</span>
              <span className="text-sm font-bold text-primary-400">{currentUser.overallProgress}%</span>
            </div>
            <ProgressBar progress={currentUser.overallProgress} size="md" />
          </div>
          <div className="flex items-center gap-4 text-sm text-surface-400 sm:border-l sm:border-surface-800 sm:pl-4">
            <div className="text-center">
              <p className="text-xl font-bold text-surface-100">{completedCount}</p>
              <p className="text-xs text-surface-500">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-surface-100">{totalCount - completedCount}</p>
              <p className="text-xs text-surface-500">Remaining</p>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap timeline */}
      <div className="relative w-full min-w-0 pl-9 sm:pl-10">
        {/* Vertical connector line */}
        <div className="absolute left-3 sm:left-4 top-7 bottom-7 w-0.5 bg-gradient-to-b from-success-500/40 via-accent-400/40 to-surface-800/40 rounded-full" />

        <div className="w-full space-y-3">
          {roadmapNodes.map((node) => {
            const isCompleted = node.status === 'completed';
            const isCurrent = node.status === 'current';
            const isLocked = node.status === 'locked';

            return (
              <div key={node.id} className="relative min-w-0">
                <div className="absolute -left-6 top-[34px] h-0.5 w-6 bg-surface-700" />
                {/* Connector dot on timeline */}
                <div className="absolute -left-6 top-7 -translate-x-1/2 z-10">
                  <div className={`w-3.5 h-3.5 rounded-full border-2 ${
                    isCompleted ? 'bg-success-500 border-success-400'
                    : isCurrent ? 'bg-accent-400 border-accent-300 shadow-[0_0_8px_rgba(251,191,36,0.4)]'
                    : 'bg-surface-800 border-surface-700'
                  }`} />
                </div>

                {/* Card */}
                <Link
                  to={!isLocked ? `/courses/${node.courseId}` : '#'}
                  className={`block w-full min-w-0 rounded-xl border transition-all duration-200 ${
                    isCompleted
                      ? 'border-success-500/20 bg-success-500/[0.03] hover:border-success-500/40 hover:-translate-y-0.5'
                    : isCurrent
                      ? 'border-accent-400/30 bg-accent-500/[0.04] hover:border-accent-400/50 hover:-translate-y-0.5 ring-1 ring-accent-400/10'
                    : 'border-surface-800 bg-surface-900/30 opacity-60 cursor-default'
                  }`}
                  onClick={isLocked ? (e) => e.preventDefault() : undefined}
                >
                  <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center gap-3 sm:gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isCompleted ? 'bg-success-500/10 border border-success-500/20'
                      : isCurrent ? 'bg-accent-400/10 border border-accent-400/20'
                      : 'bg-surface-800/50 border border-surface-700'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle size={22} className="text-success-500" />
                      ) : isLocked ? (
                        <Lock size={18} className="text-surface-600" />
                      ) : (
                        <Zap size={20} className="text-accent-400" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1.5">
                        <h3 className={`text-base sm:text-lg font-semibold leading-snug ${
                          isLocked ? 'text-surface-500' : 'text-surface-100'
                        }`}>
                          {node.title}
                        </h3>
                        {isCurrent && <Badge variant="accent">Current</Badge>}
                        {isCompleted && <Badge variant="success">Complete</Badge>}
                        {isLocked && <Badge>Locked</Badge>}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-surface-500">
                        <span className="flex items-center gap-1.5">
                          <BookOpen size={14} />
                          {node.lessons} lessons
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FolderKanban size={14} />
                          {node.projects} project{node.projects !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>

                    {/* Progress + Action */}
                    {!isLocked && (
                      <div className="flex items-center gap-4 md:gap-5 w-full min-w-0 md:w-64 lg:w-72 md:flex-shrink-0">
                        <div className="flex-1">
                          <ProgressBar progress={node.progress} size="sm" showLabel />
                        </div>
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isCompleted ? 'bg-success-500/10 text-success-500'
                          : 'bg-primary-500/10 text-primary-400'
                        }`}>
                          <ArrowRight size={18} />
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
