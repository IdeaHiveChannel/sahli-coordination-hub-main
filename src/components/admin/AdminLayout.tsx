import React, { ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '../layout/Header';
import { authService } from '@/lib/authService';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  LogOut, 
  LayoutDashboard, 
  ClipboardList, 
  Users, 
  Radio, 
  MessageSquare, 
  Settings as SettingsIcon,
  ShieldCheck,
  MapPin,
  Wrench,
  ChevronDown
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { dir } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={14} />, path: '/admin/dashboard' },
    { 
      label: 'Requests', 
      icon: <ClipboardList size={14} />, 
      path: '/admin/requests',
      subItems: [
        { label: 'New', path: '/admin/requests?filter=New' },
        { label: 'In Progress', path: '/admin/requests?filter=In+Progress' },
        { label: 'Completed', path: '/admin/requests?filter=Completed' },
      ]
    },
    { 
      label: 'Providers', 
      icon: <Users size={14} />, 
      path: '/admin/providers',
      subItems: [
        { label: 'Applications', path: '/admin/provider-applications' },
        { label: 'Active', path: '/admin/providers?filter=Active' },
        { label: 'Paused / Removed', path: '/admin/providers?filter=Paused' },
      ]
    },
    { 
      label: 'Coordination', 
      icon: <Radio size={14} />, 
      path: '/admin/broadcast-queue',
      subItems: [
        { label: 'Broadcast Queue', path: '/admin/broadcast-queue' },
        { label: 'Provider Responses', path: '/admin/provider-responses' },
        { label: 'Manual Assignment', path: '/admin/manual-assignment' },
      ]
    },
    { 
      label: 'Communication', 
      icon: <MessageSquare size={14} />, 
      path: '/admin/communication-history',
      subItems: [
        { label: 'Message Templates', path: '/admin/message-templates' },
        { label: 'Broadcast History', path: '/admin/communication-history' },
      ]
    },
    { label: 'Services', icon: <Wrench size={14} />, path: '/admin/services' },
    { label: 'Areas', icon: <MapPin size={14} />, path: '/admin/areas' },
    { label: 'Feedback & Audits', icon: <ShieldCheck size={14} />, path: '/admin/feedback-audits' },
    { label: 'Settings', icon: <SettingsIcon size={14} />, path: '/admin/settings' },
  ];

  const isActive = (path: string) => {
    if (path.includes('?')) {
      return location.pathname + location.search === path;
    }
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50" dir={dir}>
      <Header />
      <div className="flex flex-1 pt-16">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col">
          <div className="p-4 border-b border-slate-800 bg-slate-950/40">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Admin Control Panel</h2>
            {user && (
              <div className="mt-2 flex flex-col gap-1">
                <span className="text-xs font-bold text-slate-300">{user.email}</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-primary px-2 py-0.5 bg-primary/10 rounded-full w-fit">
                  {user.role}
                </span>
              </div>
            )}
          </div>
          
          <nav className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
            {navItems.map((item) => (
              <div key={item.label} className="space-y-1">
                <Link
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2 rounded-md transition-all ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_-3px_rgba(234,179,8,0.2)]'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive(item.path) ? 'text-primary' : 'text-slate-500'}>
                      {item.icon}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider">{item.label}</span>
                  </div>
                  {item.subItems && <ChevronDown size={10} className="opacity-40" />}
                </Link>
                
                {item.subItems && (
                  <div className="ml-9 flex flex-col gap-1 border-l border-slate-800 pl-3 py-1">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.path}
                        className={`text-[10px] font-medium transition-colors py-1 ${
                          isActive(sub.path) ? 'text-primary font-bold' : 'text-slate-500 hover:text-primary'
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-800">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-950/30 hover:bg-red-900/40 text-red-400 text-[10px] font-black uppercase tracking-widest py-2.5 rounded-md transition-all border border-red-900/20"
            >
              <LogOut size={12} />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto max-h-[calc(100vh-64px)] scroll-smooth">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
