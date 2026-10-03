import { Link } from 'react-router-dom';
import {
  CheckCircle, AlertTriangle, Lightbulb, MessageSquare,
  ArrowRight, User, Calendar, ExternalLink, Send
} from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { feedbacks } from '../data/mockData';

export default function FeedbackPage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-surface-100 mb-1">Feedback</h1>
        <p className="text-surface-500">Mentor reviews and feedback on your project submissions.</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 mb-8 max-w-xl">
        <div className="p-4 rounded-xl bg-surface-900/50 border border-surface-800 text-center">
          <p className="text-2xl font-bold text-surface-100">{feedbacks.length}</p>
          <p className="text-xs text-surface-500">Total Reviews</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-900/50 border border-surface-800 text-center">
          <p className="text-2xl font-bold text-success-500">{feedbacks.filter(f => f.status === 'approved').length}</p>
          <p className="text-xs text-surface-500">Approved</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-900/50 border border-surface-800 text-center">
          <p className="text-2xl font-bold text-warning-500">{feedbacks.filter(f => f.status === 'revision-requested').length}</p>
          <p className="text-xs text-surface-500">Revisions</p>
        </div>
      </div>

      {/* Feedback timeline */}
      <div className="relative max-w-3xl">
        {/* Vertical timeline line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-surface-800 hidden sm:block" />

        <div className="space-y-6">
          {feedbacks.map(fb => {
            const isApproved = fb.status === 'approved';

            return (
              <div key={fb.id} className="relative sm:pl-14">
                {/* Timeline dot */}
                <div className={`hidden sm:flex absolute left-0 top-5 w-10 h-10 rounded-full items-center justify-center border-2 z-10 ${
                  isApproved
                    ? 'bg-success-500/10 border-success-500/30'
                    : 'bg-warning-500/10 border-warning-500/30'
                }`}>
                  {isApproved ? (
                    <CheckCircle size={18} className="text-success-500" />
                  ) : (
                    <AlertTriangle size={18} className="text-warning-500" />
                  )}
                </div>

                {/* Card */}
                <div className="rounded-xl border border-surface-800 bg-surface-900/50 overflow-hidden">
                  {/* Header */}
                  <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-800/50">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare size={14} className="text-surface-500" />
                        <span className="text-xs text-surface-500 uppercase tracking-wider">Mentor Review</span>
                      </div>
                      <h3 className="text-lg font-semibold text-surface-100">{fb.projectTitle}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={isApproved ? 'success' : 'warning'} size="md">
                        {isApproved ? 'Approved' : 'Revision Requested'}
                      </Badge>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-5 py-5 space-y-5">
                    {/* Strengths */}
                    {fb.strengths.length > 0 && (
                      <div>
                        <p className="text-xs text-surface-500 uppercase tracking-wider mb-2.5">Strengths</p>
                        <div className="space-y-2">
                          {fb.strengths.map((s, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <CheckCircle size={15} className="text-success-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-surface-300">{s}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Improvements */}
                    {fb.improvements.length > 0 && (
                      <div>
                        <p className="text-xs text-surface-500 uppercase tracking-wider mb-2.5">Needs Improvement</p>
                        <div className="space-y-2">
                          {fb.improvements.map((item, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <AlertTriangle size={15} className="text-warning-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-surface-300">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggestions */}
                    {fb.suggestions.length > 0 && (
                      <div>
                        <p className="text-xs text-surface-500 uppercase tracking-wider mb-2.5">Suggestions</p>
                        <div className="space-y-2">
                          {fb.suggestions.map((sug, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <Lightbulb size={15} className="text-accent-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-surface-300">{sug}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Comment */}
                    <div className="p-4 rounded-lg bg-surface-950/50 border border-surface-800">
                      <p className="text-sm text-surface-300 italic leading-relaxed">
                        "{fb.comment}"
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-3.5 border-t border-surface-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-4 text-sm text-surface-500">
                      <span className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center">
                          <User size={12} className="text-white" />
                        </div>
                        {fb.mentorName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={13} />
                        {new Date(fb.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link to={`/projects/${fb.projectId}`}>
                        <Button variant="ghost" size="sm">
                          <ExternalLink size={13} /> View Project
                        </Button>
                      </Link>
                      {!isApproved && (
                        <Link to={`/projects/${fb.projectId}/submit`}>
                          <Button variant="primary" size="sm">
                            <Send size={13} /> Resubmit
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
