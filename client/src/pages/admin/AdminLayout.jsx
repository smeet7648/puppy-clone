import React from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Dog, Heart, HelpCircle, MessageSquare, Settings as SettingsIcon, LogOut, ExternalLink, Inbox } from 'lucide-react';

export const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Puppies Manager', path: '/admin/puppies', icon: Dog },
    { name: 'Enquiries Inbox', path: '/admin/enquiries', icon: Inbox },
    { name: 'Happy Families', path: '/admin/happy-families', icon: Heart },
    { name: 'FAQs', path: '/admin/faqs', icon: HelpCircle },
    { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
    { name: 'Site Settings', path: '/admin/settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-[#fcf8f2] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-cocoa text-milk flex-shrink-0 p-5 flex flex-col justify-between">
        <div>
          {/* Brand */}
          <div className="flex items-center gap-3 pb-6 border-b border-milk/15">
            <div className="w-10 h-10 rounded-full bg-honey/20 p-1 border border-honey/40 overflow-hidden">
              <img src="/logo.svg" alt="" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-milk block leading-tight">
                TeddyPups
              </span>
              <span className="text-[10px] text-honey font-scrawl">Admin Control Panel</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-6 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition ${
                      isActive
                        ? 'bg-toffee text-milk shadow-lift'
                        : 'text-milk/75 hover:bg-milk/10 hover:text-milk'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User profile & actions */}
        <div className="pt-6 border-t border-milk/15 space-y-3">
          <div className="text-xs text-milk/70">
            <span className="block font-bold text-milk">{admin?.name || 'Concierge Admin'}</span>
            <span className="text-[11px] truncate block">{admin?.email}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              target="_blank"
              className="flex-1 flex items-center justify-center gap-1.5 bg-milk/10 hover:bg-milk/20 text-milk text-xs py-2 rounded-xl transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1 bg-red-900/40 hover:bg-red-800 text-red-200 text-xs px-3 py-2 rounded-xl transition"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
