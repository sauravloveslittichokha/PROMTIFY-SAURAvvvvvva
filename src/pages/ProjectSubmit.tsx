import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Circle, Send, Clock, ExternalLink } from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { projects } from '../data/mockData';

export default function ProjectSubmit() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === projectId);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    githubUrl: project?.githubUrl || '',
    liveUrl: project?.liveUrl || '',
    description: '',
    checklist: [false, false, false, false, false],
  });

  const checklistItems = [
    'All requirements are implemented',
    'Code is clean and well-commented',
    'Project works on mobile devices',
    'No console errors',
    'README is complete',
  ];

  if (!project) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <h2 className="text-xl font-bold text-surface-200">Project not found</h2>
        <Link to="/projects" className="text-primary-400 text-sm mt-2 inline-block">Back to Projects</Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="animate-fade-in max-w-lg mx-auto text-center py-16">
        <div className="w-16 h-16 rounded-2xl bg-primary-500/15 flex items-center justify-center mx-auto mb-6">
          <Send size={28} className="text-primary-400" />
        </div>
        <h1 className="text-2xl font-bold text-surface-100 mb-3">Submitted for Mentor Review</h1>
        <p className="text-surface-400 mb-2">Your project "{project.title}" has been submitted.</p>
        <Badge variant="info" size="md" className="mb-8">
          <Clock size={14} /> Under Review
        </Badge>
        <div className="space-y-3">
          <Link to={`/projects/${project.id}`}>
            <Button variant="primary" fullWidth>View Project</Button>
          </Link>
          <Link to="/feedback">
            <Button variant="outline" fullWidth>Go to Feedback</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <Link to={`/projects/${project.id}`} className="text-sm text-surface-500 hover:text-surface-300 transition-colors mb-4 inline-block">
        ← Back to Project
      </Link>

      <h1 className="text-2xl font-bold text-surface-100 mb-1">Submit Project</h1>
      <p className="text-surface-400 mb-8">{project.title}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-surface-300 mb-1.5">GitHub Repository URL</label>
          <div className="relative">
            <ExternalLink size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
            <input
              type="url"
              placeholder="https://github.com/username/project"
              value={form.githubUrl}
              onChange={e => setForm({ ...form, githubUrl: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-surface-900 border border-surface-700 rounded-lg text-sm text-surface-100 placeholder-surface-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-300 mb-1.5">Live Demo URL (optional)</label>
          <div className="relative">
            <ExternalLink size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
            <input
              type="url"
              placeholder="https://your-project.vercel.app"
              value={form.liveUrl}
              onChange={e => setForm({ ...form, liveUrl: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-surface-900 border border-surface-700 rounded-lg text-sm text-surface-100 placeholder-surface-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-300 mb-1.5">Description</label>
          <textarea
            placeholder="Describe your approach, challenges faced, and what you learned..."
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2.5 bg-surface-900 border border-surface-700 rounded-lg text-sm text-surface-100 placeholder-surface-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-300 mb-3">Submission Checklist</label>
          <div className="space-y-2.5">
            {checklistItems.map((item, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer group">
                <button
                  type="button"
                  onClick={() => {
                    const newChecklist = [...form.checklist];
                    newChecklist[i] = !newChecklist[i];
                    setForm({ ...form, checklist: newChecklist });
                  }}
                  className="flex-shrink-0 cursor-pointer"
                >
                  {form.checklist[i] ? (
                    <CheckCircle size={18} className="text-success-500" />
                  ) : (
                    <Circle size={18} className="text-surface-600 group-hover:text-surface-400" />
                  )}
                </button>
                <span className={`text-sm ${form.checklist[i] ? 'text-surface-400' : 'text-surface-300'}`}>
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <Button type="submit" variant="accent" fullWidth size="lg">
            <Send size={16} /> Submit for Review
          </Button>
        </div>
      </form>
    </div>
  );
}
