import { Link } from 'react-router-dom';
import {
  ArrowRight, Play, BookOpen, Code, FolderCheck, MessageSquare, Award,
  MonitorX, UserX, Compass, Clock, CheckCircle, AlertTriangle, Lightbulb,
  ExternalLink, Globe, MessageCircle, Users, ChevronRight
} from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import logo from '../assets/logo.png';

export default function Landing() {
  return (
    <div className="bg-surface-950">
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/6 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-surface-950)_70%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Copy */}
            <div className="animate-fade-in">
              <Badge variant="accent" size="md" className="mb-6">
                ✦ Project-Based Learning Platform
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-50 leading-[1.1] tracking-tight mb-6">
                Learn Web Development.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
                  Build Real Skills.
                </span>
              </h1>
              <p className="text-lg text-surface-400 leading-relaxed mb-8 max-w-lg">
                A guided learning platform where you learn, practice, build projects, receive mentor feedback, and create proof of your skills.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/signup">
                  <Button variant="accent" size="lg">
                    Start Learning <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/roadmap">
                  <Button variant="outline" size="lg">
                    Explore Roadmap
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12 pt-8 border-t border-surface-800/50">
                {[
                  { value: '10+', label: 'Courses' },
                  { value: '50+', label: 'Challenges' },
                  { value: '1:1', label: 'Mentorship' },
                ].map(stat => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold text-surface-100">{stat.value}</p>
                    <p className="text-sm text-surface-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Learning Journey Visual */}
            <div className="hidden lg:block animate-slide-up">
              <div className="relative">
                {/* Journey steps */}
                <div className="space-y-4">
                  {[
                    { icon: BookOpen, label: 'Learn', desc: 'Interactive lessons', color: 'text-primary-400', bg: 'bg-primary-500/10', border: 'border-primary-500/20' },
                    { icon: Code, label: 'Practice', desc: 'Hands-on challenges', color: 'text-accent-400', bg: 'bg-accent-500/10', border: 'border-accent-500/20' },
                    { icon: FolderCheck, label: 'Build', desc: 'Real-world projects', color: 'text-success-500', bg: 'bg-success-500/10', border: 'border-success-500/20' },
                    { icon: MessageSquare, label: 'Get Reviewed', desc: 'Mentor feedback', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
                    { icon: Award, label: 'Prove Skills', desc: 'Portfolio & proof', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
                  ].map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <div
                        key={step.label}
                        className={`flex items-center gap-4 p-4 rounded-xl border ${step.border} ${step.bg} backdrop-blur-sm transition-transform duration-300 hover:translate-x-2`}
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        <div className={`w-10 h-10 rounded-lg ${step.bg} flex items-center justify-center`}>
                          <Icon size={20} className={step.color} />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-surface-100">{step.label}</p>
                          <p className="text-sm text-surface-500">{step.desc}</p>
                        </div>
                        <ChevronRight size={16} className="text-surface-600" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-20 lg:py-28 border-t border-surface-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-100 mb-4">
              Traditional Online Learning Is Broken
            </h2>
            <p className="text-surface-400 max-w-2xl mx-auto">
              Most platforms leave learners watching videos without real skills to show for it.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Play, title: 'Passive Learning', desc: 'Watching videos without enough hands-on practice.', color: 'text-error-500' },
              { icon: UserX, title: 'No Personal Feedback', desc: 'Learners struggle without meaningful code reviews.', color: 'text-warning-500' },
              { icon: Compass, title: 'Lost Direction', desc: "Learners don't know what to learn next.", color: 'text-primary-400' },
              { icon: Clock, title: 'Low Accountability', desc: 'Without structure, learners lose consistency.', color: 'text-purple-400' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="p-6 rounded-xl bg-surface-900/50 border border-surface-800 hover:border-surface-700 transition-colors">
                  <Icon size={24} className={`${item.color} mb-4`} />
                  <h3 className="text-lg font-semibold text-surface-100 mb-2">{item.title}</h3>
                  <p className="text-sm text-surface-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 lg:py-28 border-t border-surface-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-100 mb-4">
              How It Works
            </h2>
            <p className="text-surface-400 max-w-xl mx-auto">
              A structured learning loop that builds real, demonstrable skills.
            </p>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-surface-700 to-transparent -translate-y-1/2" />

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
              {[
                { num: '01', title: 'Learn', icon: BookOpen, color: 'from-primary-500 to-primary-600' },
                { num: '02', title: 'Practice', icon: Code, color: 'from-accent-500 to-accent-600' },
                { num: '03', title: 'Build', icon: FolderCheck, color: 'from-success-500 to-success-600' },
                { num: '04', title: 'Get Reviewed', icon: MessageSquare, color: 'from-purple-500 to-purple-600' },
                { num: '05', title: 'Prove Your Skills', icon: Award, color: 'from-orange-500 to-orange-600' },
              ].map(step => {
                const Icon = step.icon;
                return (
                  <div key={step.num} className="relative flex flex-col items-center text-center group">
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    <span className="text-xs font-mono text-surface-600 mb-1">{step.num}</span>
                    <h3 className="text-base font-semibold text-surface-100">{step.title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP PREVIEW */}
      <section className="py-20 lg:py-28 border-t border-surface-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-100 mb-4">
              Your Learning Roadmap
            </h2>
            <p className="text-surface-400 max-w-xl mx-auto">
              A clear path from beginner to full stack developer.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-3 lg:gap-4">
            {['HTML', 'CSS', 'JavaScript', 'React', 'Backend', 'Full Stack'].map((tech, i) => (
              <div key={tech} className="flex items-center gap-3 lg:gap-4">
                <div className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 cursor-default ${
                  i === 0 ? 'bg-primary-600 text-white' :
                  i === 1 ? 'bg-primary-600/80 text-white' :
                  i === 2 ? 'bg-accent-500 text-surface-950' :
                  'bg-surface-800 text-surface-300 border border-surface-700'
                }`}>
                  {tech}
                </div>
                {i < 5 && (
                  <ArrowRight size={16} className="text-surface-600 hidden lg:block" />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/roadmap">
              <Button variant="outline">
                View Full Roadmap <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* MENTORSHIP SECTION */}
      <section id="mentorship" className="py-20 lg:py-28 border-t border-surface-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-surface-100 mb-4">
                Real Mentor Feedback
              </h2>
              <p className="text-surface-400 leading-relaxed mb-6">
                Every project you submit gets reviewed by experienced developers. No automated grading — real, actionable feedback to help you improve.
              </p>
              <Link to="/signup">
                <Button variant="primary">
                  Get Started <ArrowRight size={16} />
                </Button>
              </Link>
            </div>

            {/* Feedback Card */}
            <div className="bg-surface-900 border border-surface-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs text-surface-500 uppercase tracking-wider mb-1">Project Review</p>
                  <h3 className="text-lg font-semibold text-surface-100">Portfolio Website</h3>
                </div>
                <Badge variant="success">Approved</Badge>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="text-success-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-surface-300">Semantic HTML structure</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="text-success-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-surface-300">Component organization</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <AlertTriangle size={16} className="text-warning-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-surface-300">Improve mobile responsiveness</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Lightbulb size={16} className="text-accent-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-surface-300">Consider CSS Grid for the project section</span>
                </div>
              </div>

              <div className="pt-4 border-t border-surface-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary-600 flex items-center justify-center">
                    <span className="text-xs font-medium text-white">D</span>
                  </div>
                  <span className="text-sm text-surface-400">Deep Review</span>
                </div>
                <button className="text-sm text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1 cursor-pointer">
                  View Full Feedback <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="py-20 lg:py-28 border-t border-surface-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-100 mb-4">
              Build Real Projects
            </h2>
            <p className="text-surface-400 max-w-xl mx-auto">
              Not toy examples — build production-quality projects that demonstrate your skills.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Portfolio Website', diff: 'Beginner', skills: ['HTML', 'CSS', 'JS'], progress: 100 },
              { title: 'Weather Application', diff: 'Intermediate', skills: ['JS', 'APIs', 'CSS'], progress: 72 },
              { title: 'Task Manager', diff: 'Intermediate', skills: ['JS', 'DOM', 'Storage'], progress: 35 },
              { title: 'Full Stack App', diff: 'Advanced', skills: ['React', 'Node', 'DB'], progress: 0 },
            ].map(project => (
              <div key={project.title} className="p-5 rounded-xl bg-surface-900/50 border border-surface-800 hover:border-surface-700 transition-all duration-300 hover:-translate-y-1 group">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={project.diff === 'Beginner' ? 'success' : project.diff === 'Intermediate' ? 'warning' : 'error'}>
                    {project.diff}
                  </Badge>
                  {project.progress === 100 && <CheckCircle size={16} className="text-success-500" />}
                </div>
                <h3 className="text-base font-semibold text-surface-100 mb-2 group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.skills.map(s => (
                    <span key={s} className="text-xs text-surface-500 bg-surface-800 px-2 py-0.5 rounded">
                      {s}
                    </span>
                  ))}
                </div>
                <ProgressBar progress={project.progress} size="sm" showLabel />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section className="py-20 lg:py-28 border-t border-surface-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Portfolio Preview */}
            <div className="order-2 lg:order-1 bg-surface-900 border border-surface-800 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-surface-800">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-accent-400 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">S</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-surface-100">Saurav</h3>
                    <p className="text-sm text-surface-400">Web Developer</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-5">
                  <p className="text-xs text-surface-500 uppercase tracking-wider mb-3">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {['HTML', 'CSS', 'JavaScript', 'React', 'Git'].map(s => (
                      <span key={s} className="px-3 py-1 text-xs font-medium bg-surface-800 text-surface-300 rounded-lg border border-surface-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-xs text-surface-500 uppercase tracking-wider mb-3">Projects</p>
                  <div className="space-y-2">
                    {['Portfolio Website', 'Weather App', 'Task Manager'].map(p => (
                      <div key={p} className="flex items-center gap-2 text-sm text-surface-300">
                        <FolderCheck size={14} className="text-success-500" />
                        {p}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-surface-500 uppercase tracking-wider mb-3">Achievements</p>
                  <div className="flex gap-3">
                    {['🚀', '🔥', '⚡'].map((a, i) => (
                      <div key={i} className="w-10 h-10 rounded-lg bg-surface-800 flex items-center justify-center text-lg">
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-surface-100 mb-4">
                Proof of Your Skills
              </h2>
              <p className="text-surface-400 leading-relaxed mb-6">
                Build a portfolio that shows what you can actually do — not just certificates, but real projects with mentor-approved code.
              </p>
              <Link to="/signup">
                <Button variant="primary">
                  Start Building Your Portfolio <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 border-t border-surface-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-100 mb-6">
            Stop Just Watching.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
              Start Building.
            </span>
          </h2>
          <p className="text-lg text-surface-400 mb-8 max-w-lg mx-auto">
            Join learners who are building real projects, getting real feedback, and creating real proof of their skills.
          </p>
          <Link to="/signup">
            <Button variant="accent" size="lg">
              Start Your Journey <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-surface-800 bg-surface-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Logo & description */}
            <div className="col-span-2 md:col-span-1">
              <img src={logo} alt="NYS" className="h-10 w-auto mb-4" />
              <p className="text-sm text-surface-500 leading-relaxed">
                Learn web development by building real projects with mentor guidance.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-surface-200 mb-4">Product</h4>
              <ul className="space-y-2.5">
                {['Courses', 'Roadmap', 'Projects', 'Mentorship'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm text-surface-500 hover:text-surface-300 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-surface-200 mb-4">Resources</h4>
              <ul className="space-y-2.5">
                {['Documentation', 'Help Center', 'Community', 'Blog'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm text-surface-500 hover:text-surface-300 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-surface-200 mb-4">Connect</h4>
              <div className="flex gap-3">
                {[Globe, MessageCircle, Users].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-lg bg-surface-900 border border-surface-800 flex items-center justify-center text-surface-500 hover:text-surface-300 hover:border-surface-700 transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-surface-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-surface-600">© 2026 Not Your School. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-surface-600 hover:text-surface-400 transition-colors">Privacy</a>
              <a href="#" className="text-xs text-surface-600 hover:text-surface-400 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
