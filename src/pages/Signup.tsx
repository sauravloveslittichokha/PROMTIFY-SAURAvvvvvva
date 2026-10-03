import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import Button from '../components/Button';
import logo from '../assets/logo.png';

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email format';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 8) newErrors.password = 'Must be at least 8 characters';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    navigate('/onboarding');
  };

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-surface-900 to-surface-950 flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-md text-center">
          <img src={logo} alt="NYS" className="h-16 w-auto mx-auto mb-8" />
          <h2 className="text-3xl font-bold text-surface-100 mb-4">
            Start Your Journey
          </h2>
          <p className="text-surface-400 leading-relaxed mb-8">
            Join a community of learners building real web development skills through guided projects and mentor feedback.
          </p>
          <div className="space-y-3 text-left max-w-xs mx-auto">
            {[
              'Structured learning roadmap',
              'Hands-on project building',
              'Personal mentor feedback',
              'Shareable portfolio',
            ].map(item => (
              <div key={item} className="flex items-center gap-3 text-sm text-surface-300">
                <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8 text-center">
            <img src={logo} alt="NYS" className="h-12 w-auto mx-auto mb-4" />
          </div>

          <h1 className="text-2xl font-bold text-surface-100 mb-1">Create account</h1>
          <p className="text-sm text-surface-500 mb-8">Start learning web development today.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-surface-300 mb-1.5">Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
                <input
                  id="name" type="text" placeholder="Your name"
                  value={form.name} onChange={e => updateField('name', e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 bg-surface-900 border ${errors.name ? 'border-error-500' : 'border-surface-700'} rounded-lg text-sm text-surface-100 placeholder-surface-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                />
              </div>
              {errors.name && <p className="text-xs text-error-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="signup-email" className="block text-sm font-medium text-surface-300 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
                <input
                  id="signup-email" type="email" placeholder="you@example.com"
                  value={form.email} onChange={e => updateField('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 bg-surface-900 border ${errors.email ? 'border-error-500' : 'border-surface-700'} rounded-lg text-sm text-surface-100 placeholder-surface-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                />
              </div>
              {errors.email && <p className="text-xs text-error-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="signup-password" className="block text-sm font-medium text-surface-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
                <input
                  id="signup-password" type={showPassword ? 'text' : 'password'} placeholder="Min. 8 characters"
                  value={form.password} onChange={e => updateField('password', e.target.value)}
                  className={`w-full pl-10 pr-10 py-2.5 bg-surface-900 border ${errors.password ? 'border-error-500' : 'border-surface-700'} rounded-lg text-sm text-surface-100 placeholder-surface-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500 hover:text-surface-300 cursor-pointer">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-error-500 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-surface-300 mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
                <input
                  id="confirm-password" type="password" placeholder="Repeat password"
                  value={form.confirmPassword} onChange={e => updateField('confirmPassword', e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 bg-surface-900 border ${errors.confirmPassword ? 'border-error-500' : 'border-surface-700'} rounded-lg text-sm text-surface-100 placeholder-surface-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                />
              </div>
              {errors.confirmPassword && <p className="text-xs text-error-500 mt-1">{errors.confirmPassword}</p>}
            </div>

            <Button type="submit" variant="accent" fullWidth size="lg" className="mt-2">
              Create Account
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-surface-800" />
            <span className="text-xs text-surface-600">or</span>
            <div className="flex-1 h-px bg-surface-800" />
          </div>

          <Button variant="outline" fullWidth onClick={() => navigate('/onboarding')}>
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </Button>

          <p className="text-center text-sm text-surface-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
