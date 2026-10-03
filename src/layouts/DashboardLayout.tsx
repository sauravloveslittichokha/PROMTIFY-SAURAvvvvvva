import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar, { MobileMenuButton } from '../components/Sidebar';
import Toast from '../components/Toast';
import { useToast } from '../hooks';
import { AppContext } from '../contexts/AppContext';

interface DashboardLayoutProps {
  isMentor?: boolean;
}

export default function DashboardLayout({ isMentor = false }: DashboardLayoutProps) {
  const { toasts, addToast, removeToast } = useToast();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AppContext.Provider value={{ addToast }}>
      <div className="min-h-screen bg-surface-950 lg:flex">
        <Sidebar
          isMentor={isMentor}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
        <MobileMenuButton onClick={() => setMobileOpen(true)} />

        <main className="flex-1 min-w-0 min-h-screen">
          <div className="p-4 pt-16 lg:pt-8 lg:px-10 lg:pb-10 w-full">
            <Outlet />
          </div>
        </main>
        <Toast toasts={toasts} onRemove={removeToast} />
      </div>
    </AppContext.Provider>
  );
}
