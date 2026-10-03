import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Circle, Clock, User, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import { projects } from '../data/mockData';

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <h2 className="text-xl font-bold text-surface-200">Project not found</h2>
        <Link to="/projects" className="text-primary-400 text-sm mt-2 inline-block">Back to Projects</Link>
      </div>
    );
  }

  const statusLabels: Record<string, { text: string; variant: 'success' | 'warning' | 'error' | 'info' | 'default' | 'accent' }> = {
    'not-started': { text: 'Not Started', variant: 'default' },
    'in-progress': { text: 'In Progress', variant: 'accent' },
    'submitted': { text: 'Submitted', variant: 'info' },
    'under-review': { text: 'Under Review', variant: 'info' },
    'revision-requested': { text: 'Revision Requested', variant: 'warning' },
    'approved': { text: 'Approved', variant: 'success' },
  };

  const status = statusLabels[project.status];

  return (
    <div className="animate-fade-in">
      <Link to="/projects" className="text-sm text-surface-500 hover:text-surface-300 transition-colors mb-4 inline-block">
        ← Back to Projects
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="p-6 rounded-xl border border-surface-800 bg-surface-900/50">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-surface-100 mb-2">{project.title}</h1>
                <p className="text-surface-400">{project.description}</p>
              </div>
              <Badge variant={status.variant} size="md">{status.text}</Badge>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map(t => (
                <Badge key={t} size="sm">{t}</Badge>
              ))}
            </div>

            <ProgressBar progress={project.progress} size="md" showLabel />
          </div>

          {/* Milestones */}
          <div className="p-6 rounded-xl border border-surface-800 bg-surface-900/50">
            <h3 className="font-semibold text-surface-100 mb-4">Milestones</h3>
            <div className="space-y-3">
              {project.milestones.map((m, i) => (
                <div key={m.id} className="flex items-center gap-3">
                  {m.completed ? (
                    <CheckCircle size={18} className="text-success-500 flex-shrink-0" />
                  ) : (
                    <Circle size={18} className="text-surface-600 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${m.completed ? 'text-surface-400 line-through' : 'text-surface-200'}`}>
                    {m.title}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <ProgressBar
                progress={(project.milestones.filter(m => m.completed).length / project.milestones.length) * 100}
                size="sm"
                showLabel
              />
            </div>
          </div>

          {/* Links */}
          {(project.githubUrl || project.liveUrl) && (
            <div className="p-6 rounded-xl border border-surface-800 bg-surface-900/50">
              <h3 className="font-semibold text-surface-100 mb-4">Project Links</h3>
              <div className="space-y-2">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 transition-colors">
                    <ExternalLink size={14} /> GitHub Repository
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 transition-colors">
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Actions */}
          <div className="p-5 rounded-xl border border-surface-800 bg-surface-900/50">
            {project.status === 'not-started' && (
              <Button variant="primary" fullWidth onClick={() => navigate(`/projects/${project.id}/submit`)}>
                Start Project
              </Button>
            )}
            {project.status === 'in-progress' && (
              <div className="space-y-2">
                <Button variant="secondary" fullWidth>Save Progress</Button>
                <Button variant="accent" fullWidth onClick={() => navigate(`/projects/${project.id}/submit`)}>
                  Submit for Review <ArrowRight size={14} />
                </Button>
              </div>
            )}
            {project.status === 'revision-requested' && (
              <Button variant="accent" fullWidth onClick={() => navigate(`/projects/${project.id}/submit`)}>
                Resubmit <ArrowRight size={14} />
              </Button>
            )}
            {project.status === 'approved' && (
              <div className="text-center">
                <CheckCircle size={24} className="text-success-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-success-500">Project Approved!</p>
                <p className="text-xs text-surface-500 mt-1">This project is part of your portfolio.</p>
              </div>
            )}
            {(project.status === 'submitted' || project.status === 'under-review') && (
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-primary-500/15 flex items-center justify-center mx-auto mb-2">
                  <Clock size={18} className="text-primary-400" />
                </div>
                <p className="text-sm font-semibold text-primary-400">Under Review</p>
                <p className="text-xs text-surface-500 mt-1">Your mentor is reviewing this project.</p>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-5 rounded-xl border border-surface-800 bg-surface-900/50 space-y-4">
            <div>
              <p className="text-xs text-surface-500 uppercase tracking-wider mb-1">Difficulty</p>
              <Badge variant={project.difficulty === 'Beginner' ? 'success' : project.difficulty === 'Intermediate' ? 'warning' : 'error'}>
                {project.difficulty}
              </Badge>
            </div>
            {project.deadline && (
              <div>
                <p className="text-xs text-surface-500 uppercase tracking-wider mb-1">Deadline</p>
                <p className="text-sm text-surface-300 flex items-center gap-1.5">
                  <Calendar size={14} /> {new Date(project.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            )}
            {project.mentorId && (
              <div>
                <p className="text-xs text-surface-500 uppercase tracking-wider mb-1">Mentor</p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center">
                    <User size={12} className="text-white" />
                  </div>
                  <span className="text-sm text-surface-300">Deep Review</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
