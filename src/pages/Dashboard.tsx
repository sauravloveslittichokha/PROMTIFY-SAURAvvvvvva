import { Link } from 'react-router-dom';
import {
  ArrowRight, Flame, Calendar, BookOpen, CheckCircle, Circle, Clock
} from 'lucide-react';
import Button from '../components/Button';
import ProgressRing from '../components/ProgressRing';
import ProgressBar from '../components/ProgressBar';
import Badge from '../components/Badge';
import { currentUser, dailyGoals, skillProgress, courses } from '../data/mockData';

export default function Dashboard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const jsCourse = courses.find(c => c.id === 'javascript')!;
  const currentModule = jsCourse.modules.find(m => m.progress > 0 && m.progress < 100) || jsCourse.modules[1];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-surface-100 mb-1">
          {greeting}, {currentUser.name} 👋
        </h1>
        <p className="text-surface-500">
          Let's continue building your Web Development skills.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Overall Progress', value: `${currentUser.overallProgress}%`, sub: currentUser.path, color: 'text-primary-400' },
          { label: 'Current Streak', value: `${currentUser.streak} Days`, sub: 'Keep going!', icon: <Flame size={18} className="text-orange-400" />, color: 'text-orange-400' },
          { label: 'Lessons Done', value: '38', sub: 'of 94 total', color: 'text-success-500' },
          { label: 'Projects', value: '3', sub: '1 approved', color: 'text-accent-400' },
        ].map(stat => (
          <div key={stat.label} className="p-5 rounded-xl bg-surface-900/50 border border-surface-800">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-surface-500 uppercase tracking-wider">{stat.label}</p>
              {stat.icon}
            </div>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-surface-500 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-primary-600/10 to-accent-500/5 border border-primary-500/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-surface-500 uppercase tracking-wider mb-1">Continue Learning</p>
                <h2 className="text-xl font-bold text-surface-100 mb-1">{jsCourse.title}</h2>
                <p className="text-sm text-surface-400">{currentModule.title}</p>
              </div>
              <Badge variant="accent">{jsCourse.icon} In Progress</Badge>
            </div>

            <ProgressBar progress={jsCourse.progress} size="md" showLabel className="mb-5" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-surface-500">
                <span className="flex items-center gap-1.5">
                  <BookOpen size={14} /> {jsCourse.completedLessons}/{jsCourse.totalLessons} lessons
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} /> ~{jsCourse.estimatedHours}h total
                </span>
              </div>
              <Link to={`/lessons/${currentModule.lessons.find(l => !l.completed)?.id || currentModule.lessons[0].id}`}>
                <Button variant="primary" size="sm">
                  Continue Learning <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>

          {/* Daily Goals */}
          <div className="p-6 rounded-xl bg-surface-900/50 border border-surface-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-surface-100">Today's Goals</h3>
              <span className="text-sm text-surface-500">
                {dailyGoals.filter(g => g.completed).length} / {dailyGoals.length} completed
              </span>
            </div>
            <div className="space-y-3">
              {dailyGoals.map(goal => (
                <div key={goal.id} className="flex items-center gap-3">
                  {goal.completed ? (
                    <CheckCircle size={20} className="text-success-500 flex-shrink-0" />
                  ) : (
                    <Circle size={20} className="text-surface-600 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${goal.completed ? 'text-surface-400 line-through' : 'text-surface-200'}`}>
                    {goal.title}
                  </span>
                </div>
              ))}
            </div>
            <ProgressBar
              progress={(dailyGoals.filter(g => g.completed).length / dailyGoals.length) * 100}
              size="sm"
              className="mt-4"
            />
          </div>

          {/* Skill Progress */}
          <div className="p-6 rounded-xl bg-surface-900/50 border border-surface-800">
            <h3 className="font-semibold text-surface-100 mb-5">Skill Progress</h3>
            <div className="space-y-4">
              {skillProgress.map(skill => (
                <div key={skill.name} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-surface-300 w-20">{skill.name}</span>
                  <ProgressBar progress={skill.progress} color={skill.color} showLabel className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Progress Ring */}
          <div className="p-6 rounded-xl bg-surface-900/50 border border-surface-800 flex flex-col items-center">
            <ProgressRing progress={currentUser.overallProgress} />
            <p className="text-sm text-surface-400 mt-3">{currentUser.path}</p>
          </div>

          {/* Streak */}
          <div className="p-6 rounded-xl bg-surface-900/50 border border-surface-800 text-center">
            <div className="text-4xl mb-2">🔥</div>
            <p className="text-2xl font-bold text-surface-100">{currentUser.streak} Day Streak</p>
            <p className="text-sm text-surface-500 mt-1">Keep going!</p>
            <div className="flex justify-center gap-1.5 mt-4">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-md flex items-center justify-center text-xs ${
                    i < currentUser.streak ? 'bg-orange-500/20 text-orange-400' : 'bg-surface-800 text-surface-600'
                  }`}
                >
                  {i < currentUser.streak ? '✓' : '·'}
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming */}
          <div className="p-6 rounded-xl bg-surface-900/50 border border-surface-800">
            <h3 className="font-semibold text-surface-100 mb-4">Upcoming</h3>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-500/15 flex items-center justify-center flex-shrink-0">
                <Calendar size={18} className="text-primary-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-surface-200">Mentor Review</p>
                <p className="text-xs text-surface-500">Portfolio Website</p>
                <p className="text-xs text-surface-500 mt-1">Friday, 6:00 PM</p>
              </div>
            </div>
            <Link to="/feedback" className="block mt-4">
              <Button variant="outline" size="sm" fullWidth>View Details</Button>
            </Link>
          </div>

          {/* Recent Feedback */}
          <div className="p-6 rounded-xl bg-surface-900/50 border border-surface-800">
            <h3 className="font-semibold text-surface-100 mb-4">Recent Feedback</h3>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-surface-300">Weather Application</p>
              <Badge variant="warning" size="sm">Revision</Badge>
            </div>
            <p className="text-xs text-surface-500 mb-3">
              "Focus on the mobile experience and error handling before resubmitting."
            </p>
            <Link to="/feedback">
              <Button variant="ghost" size="sm">View Feedback <ArrowRight size={14} /></Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
