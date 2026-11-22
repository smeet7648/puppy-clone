import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { SEO } from '../../components/common/SEO';

export const AdminLogin = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@teddypups.ae');
  const [password, setPassword] = useState('TeddyPups2026!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin/puppies" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/admin/puppies');
    } else {
      setError(res.message || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf8f2] flex items-center justify-center px-4 py-12">
      <SEO title="Admin Login | TeddyPups Dubai" />

      <div className="max-w-md w-full bg-white rounded-4xl p-8 sm:p-10 border border-honey/30 shadow-soft-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-honey/20 p-2 mx-auto mb-4 border border-honey/40 flex items-center justify-center">
            <img src="/logo.svg" alt="TeddyPups" className="w-full h-full object-contain" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa">
            TeddyPups Admin
          </h1>
          <p className="text-xs text-cocoa-soft mt-1 font-scrawl">
            Listing & concierge management portal
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-cocoa mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-cocoa-soft/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-milk border border-honey/30 text-sm focus:outline-none focus:ring-2 focus:ring-toffee text-cocoa"
                placeholder="admin@teddypups.ae"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-cocoa mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-cocoa-soft/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-milk border border-honey/30 text-sm focus:outline-none focus:ring-2 focus:ring-toffee text-cocoa"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-toffee hover:bg-toffee-deep text-milk font-bold text-sm shadow-lift transition flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {loading ? <span>Authenticating...</span> : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-honey/20 text-center">
          <p className="text-xs text-cocoa-soft/70">
            Demo Credentials Pre-filled: <br />
            <strong>admin@teddypups.ae</strong> / <strong>TeddyPups2026!</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
