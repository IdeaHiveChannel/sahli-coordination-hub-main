import React, { ReactNode, useState } from 'react';
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
  ChevronDown,
  Menu,
  X,
  ChevronRight,
  Bell
} from 'lucide-react';
import { storageService } from '@/lib/storageService';

interface AdminLayoutProps {
  children: ReactNode;
}

interface NavItem {
  label: string;
  icon?: ReactNode;
  path: string;
  badge?: number;
  subItems?: NavItem[];
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { dir } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = authService.getCurrentUser();
  const [pendingAppsCount, setPendingAppsCount] = useState(0);

  const refreshBadgeCount = React.useCallback(() => {
    const count = storageService.getApplications().filter(a => a.status === 'Pending' || a.status === 'More Info Required').length;
    setPendingAppsCount(count);
  }, []);

  React.useEffect(() => {
    refreshBadgeCount();
    
    // Listen for storage changes
    window.addEventListener('storage', refreshBadgeCount);
    
    // Refresh when location changes (in case of local navigation updates)
    refreshBadgeCount();
  }, [location, refreshBadgeCount]);

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/admin/dashboard' },
    { 
      label: 'Requests', 
      icon: <ClipboardList size={18} />, 
      path: '/admin/requests',
      subItems: [
        { label: 'New', path: '/admin/requests?filter=New' },
        { label: 'In Progress', path: '/admin/requests?filter=In+Progress' },
        { label: 'Completed', path: '/admin/requests?filter=Completed' },
      ]
    },
    { 
      label: 'Providers', 
      icon: <Users size={18} />, 
      path: '/admin/providers',
      badge: pendingAppsCount > 0 ? pendingAppsCount : undefined,
      subItems: [
        { label: 'Applications', path: '/admin/provider-applications', badge: pendingAppsCount > 0 ? pendingAppsCount : undefined },
        { label: 'Active', path: '/admin/providers?filter=Active' },
        { label: 'Paused / Removed', path: '/admin/providers?filter=Paused' },
      ]
    },
    { 
      label: 'Coordination', 
      icon: <Radio size={18} />, 
      path: '/admin/broadcast-queue',
      subItems: [
        { label: 'Broadcast Queue', path: '/admin/broadcast-queue' },
        { label: 'Provider Responses', path: '/admin/provider-responses' },
        { label: 'Manual Assignment', path: '/admin/manual-assignment' },
      ]
    },
    { 
      label: 'Communication', 
      icon: <MessageSquare size={18} />, 
      path: '/admin/communication-history',
      subItems: [
        { label: 'Message Templates', path: '/admin/message-templates' },
        { label: 'Broadcast History', path: '/admin/communication-history' },
      ]
    },
    { label: 'Services', icon: <Wrench size={18} />, path: '/admin/services' },
    { label: 'Areas', icon: <MapPin size={18} />, path: '/admin/areas' },
    { label: 'Feedback & Audits', icon: <ShieldCheck size={18} />, path: '/admin/feedback-audits' },
    { label: 'Settings', icon: <SettingsIcon size={18} />, path: '/admin/settings' },
  ];

  const isActive = (item: NavItem) => {
    if (item.path.includes('?')) {
      if (location.pathname + location.search === item.path) return true;
    } else {
      if (location.pathname === item.path) return true;
    }

    // Check sub-items
    if (item.subItems) {
      return item.subItems.some((sub: NavItem) => {
        if (sub.path.includes('?')) {
          return location.pathname + location.search === sub.path;
        }
        return location.pathname === sub.path;
      });
    }

    return false;
  };

  const NavContent = ({ mobile = false }: { mobile?: boolean }) => (
    <nav className={`flex-1 overflow-y-auto ${mobile ? 'p-6' : 'p-3'} space-y-2 custom-scrollbar`}>
      {navItems.map((item) => {
        const active = isActive(item);
        return (
          <div key={item.label} className="space-y-1">
            <Link
              to={item.path}
              onClick={() => mobile && setIsMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-3 md:py-2.5 rounded-2xl md:rounded-xl transition-all active:scale-[0.98] ${
                active
                  ? 'bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/20'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-4 md:gap-3 flex-1 min-w-0">
                <span className={active ? 'text-primary' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span className={`${mobile ? 'text-sm' : 'text-[11px]'} font-black uppercase tracking-wider truncate`}>
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1 text-[9px] font-black text-white shadow-lg shadow-red-200">
                    {item.badge}
                  </span>
                )}
                {item.subItems && (
                  <ChevronRight size={14} className={`opacity-40 transition-transform ${active ? 'rotate-90' : ''}`} />
                )}
              </div>
            </Link>
            
            {item.subItems && (
              <div className={`ml-8 flex flex-col gap-1 border-l-2 border-slate-100 pl-4 py-2 ${active ? 'block' : 'hidden md:flex'}`}>
                {item.subItems.map((sub: NavItem) => {
                  const subActive = isActive(sub);
                  return (
                    <Link
                      key={sub.label}
                      to={sub.path}
                      onClick={() => mobile && setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between py-2 text-[11px] font-bold uppercase tracking-widest transition-all active:scale-95 ${
                        subActive ? 'text-primary' : 'text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      <span className="truncate">{sub.label}</span>
                      {sub.badge && (
                        <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-600 px-1 text-[8px] font-black text-white ml-2">
                          {sub.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50" dir={dir}>
      {/* Hide standard header on mobile to provide more space for admin UI */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Mobile Admin Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 z-[90]">
        <div className="flex items-center gap-3">
          <Link to="/" className="w-8 h-8 flex items-center justify-center">
            <img src="/logos/SahlLogo3.png" alt="Logo" className="w-full h-full object-contain" />
          </Link>
          <div className="h-4 w-px bg-slate-100" />
          <h1 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Control Panel</h1>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-900 active:scale-90 transition-transform"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="flex flex-1 md:pt-16 pt-16">
        {/* Desktop Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-100 hidden md:flex flex-col sticky top-16 h-[calc(100vh-64px)] overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Admin Control Panel</h2>
            {user && (
              <div className="mt-2 flex flex-col gap-1">
                <span className="text-xs font-bold text-slate-600 truncate">{user.email}</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-primary px-2 py-0.5 bg-primary/10 rounded-full w-fit">
                  {user.role}
                </span>
              </div>
            )}
          </div>
          
          <NavContent />

          <div className="p-4 border-t border-slate-100">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest py-3 rounded-xl transition-all border border-red-100 active:scale-95"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            <div
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-in fade-in duration-300"
            />
            <aside
              className={`absolute inset-y-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-[85%] max-w-[320px] bg-white flex flex-col shadow-xl animate-in slide-in-from-${dir === 'rtl' ? 'right' : 'left'} duration-300`}
            >
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Control Panel</h2>
                  {user && (
                    <div className="mt-1 flex flex-col">
                      <span className="text-sm font-black text-slate-900 truncate">{user.email.split('@')[0]}</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-primary">{user.role}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 active:scale-90 transition-transform"
                >
                  <X size={20} />
                </button>
              </div>

              <NavContent mobile />

              <div className="p-6 border-t border-slate-100">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 bg-red-50 text-red-600 text-xs font-black uppercase tracking-widest py-4 rounded-2xl transition-all border border-red-100 active:scale-95"
                >
                  <LogOut size={18} />
                  Logout Session
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto max-h-[calc(100vh-64px)] scroll-smooth bg-slate-50/50">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
