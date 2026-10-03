import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, Eye } from 'lucide-react';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import { projects } from '../data/mockData';

export default function Projects() {
  const statusLabels: Record<string, { text: string; variant: 'success' | 'warning' | 'error' | 'info' | 'default' | 'accent' }> = {
    'not-started': { text: 'Not Started', variant: 'default' },
    'in-progress': { text: 'In Progress', variant: 'accent' },
    'submitted': { text: 'Submitted', variant: 'info' },
    'under-review': { text: 'Under Review', variant: 'info' },
    'revision-requested': { text: 'Revision Requested', variant: 'warning' },
    'approved': { text: 'Approved', variant: 'success' },
  };

  const diffColors: Record<string, 'success' | 'warning' | 'error'> = {
    Beginner: 'success',
    Intermediate: 'warning',
    Advanced: 'error',
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-surface-100 mb-1">Projects</h1>
        <p className="text-surface-500">Build real-world projects to prove your skills.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map(project => {
          const status = statusLabels[project.status];
          return (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="group p-5 rounded-xl border border-surface-800 bg-surface-900/50 hover:border-primary-500/30 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <Badge variant={diffColors[project.difficulty]}>{project.difficulty}</Badge>
                <Badge variant={status.variant} size="sm">{status.text}</Badge>
              </div>

              <h3 className="text-lg font-semibold text-surface-100 mb-2 group-hover:text-primary-400 transition-colors">
                {project.title}
              </h3>

              <p className="text-sm text-surface-500 mb-4 line-clamp-2">{project.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.technologies.map(t => (
                  <span key={t} className="text-xs text-surface-500 bg-surface-800 px-2 py-0.5 rounded">{t}</span>
                ))}
              </div>

              <ProgressBar progress={project.progress} size="sm" showLabel />

              {project.status === 'approved' && (
                <div className="mt-3 flex items-center gap-1 text-xs text-success-500">
                  <CheckCircle size={12} /> Mentor Approved
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
