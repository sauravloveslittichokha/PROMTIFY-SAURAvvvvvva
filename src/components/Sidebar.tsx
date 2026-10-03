import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Map, BookOpen, Swords, FolderKanban,
  MessageSquare, BarChart3, Briefcase, Settings,
  ChevronLeft, ChevronRight, LogOut, User, X, Menu
} from 'lucide-react';
import logo from '../assets/logo.png';

interface SidebarProps {
  isMentor?: boolean;
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ isMentor = false, collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const studentLinks = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Map, label: 'Roadmap', href: '/roadmap' },
    { icon: BookOpen, label: 'Courses', href: '/courses' },
    { icon: Swords, label: 'Challenges', href: '/challenges/ch1' },
    { icon: FolderKanban, label: 'Projects', href: '/projects' },
    { icon: MessageSquare, label: 'Feedback', href: '/feedback' },
    { icon: BarChart3, label: 'Progress', href: '/progress' },
    { icon: Briefcase, label: 'Portfolio', href: '/portfolio' },
  ];

  const mentorLinks = [
    { icon: LayoutDashboard, label: 'Overview', href: '/mentor' },
    { icon: MessageSquare, label: 'Reviews', href: '/mentor/reviews' },
    { icon: FolderKanban, label: 'Projects', href: '/projects' },
    { icon: BarChart3, label: 'Analytics', href: '/progress' },
  ];

  const links = isMentor ? mentorLinks : studentLinks;
  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');

  const navContent = (isMobile: boolean) => (
    <>
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-surface-800/50 flex-shrink-0">
        <Link to={isMentor ? '/mentor' : '/dashboard'} className="flex items-center gap-2 overflow-hidden">
          <img src={logo} alt="NYS" className="h-9 w-auto flex-shrink-0" />
        </Link>
        {isMobile && (
          <button onClick={onMobileClose} className="p-1 text-surface-400 hover:text-surface-200 cursor-pointer" aria-label="Close sidebar">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {links.map(link => {
            const Icon = link.icon;
            const active = isActive(link.href);
            const showLabel = isMobile || !collapsed;
            return (
              <li key={link.href}>
                <Link
                  to={link.href}
                  onClick={isMobile ? onMobileClose : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    active
                      ? 'bg-primary-600/15 text-primary-400'
                      : 'text-surface-400 hover:text-surface-200 hover:bg-surface-800/60'
                  }`}
                  title={!showLabel ? link.label : undefined}
                >
                  <Icon size={20} className={`flex-shrink-0 ${active ? 'text-primary-400' : 'text-surface-500 group-hover:text-surface-300'}`} />
                  {showLabel && <span>{link.label}</span>}
                  {active && showLabel && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t border-surface-800/50 flex-shrink-0">
        {(isMobile || !collapsed) && (
          <Link
            to="/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-surface-400 hover:text-surface-200 hover:bg-surface-800/60 transition-colors"
          >
            <Settings size={20} className="text-surface-500" />
            <span>Settings</span>
          </Link>
        )}

        {/* Profile */}
        <div className={`flex items-center gap-3 px-3 py-3 mt-1 rounded-lg bg-surface-900/50 ${!isMobile && collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
            <User size={16} className="text-white" />
          </div>
          {(isMobile || !collapsed) && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-surface-200 truncate">{isMentor ? 'Deep Review' : 'Saurav'}</p>
              <p className="text-xs text-surface-500 truncate">{isMentor ? 'Mentor' : 'Student'}</p>
            </div>
          )}
          {(isMobile || !collapsed) && (
            <button onClick={() => navigate('/')} className="p-1 text-surface-500 hover:text-surface-300 transition-colors cursor-pointer" title="Sign out">
              <LogOut size={16} />
            </button>
          )}
        </div>

        {/* Collapse button - desktop only */}
        {!isMobile && (
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center mt-2 p-2 text-surface-500 hover:text-surface-300 hover:bg-surface-800 rounded-lg transition-colors cursor-pointer"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar — sticky, in flex flow */}
      <aside
        className={`hidden lg:flex sticky top-0 h-screen flex-shrink-0 bg-surface-950 border-r border-surface-800 flex-col z-40 transition-all duration-300 ${
          collapsed ? 'w-[72px]' : 'w-[240px]'
        }`}
      >
        {navContent(false)}
      </aside>

      {/* Mobile sidebar — overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={onMobileClose} />
          <aside className="relative w-[260px] h-full bg-surface-950 border-r border-surface-800 flex flex-col z-10 animate-slide-in-right">
            {navContent(true)}
          </aside>
        </div>
      )}
    </>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-surface-900 border border-surface-800 rounded-lg text-surface-400 hover:text-surface-200 transition-colors cursor-pointer"
      aria-label="Open menu"
    >
      <Menu size={20} />
    </button>
  );
}
