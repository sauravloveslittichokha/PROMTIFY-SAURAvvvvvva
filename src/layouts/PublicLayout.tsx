import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-surface-950">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
}
