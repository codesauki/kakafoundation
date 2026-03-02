'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push('/admin');
    } else {
      setError('Invalid email or password.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-gradient flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-noise opacity-30" />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-teal-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-teal">
            <span className="font-display text-3xl font-bold text-white">K</span>
          </div>
          <h1 className="font-display text-2xl text-white font-semibold">
            Foundation Admin
          </h1>
          <p className="text-navy-300 text-sm mt-1">Kowa Namu Ne Foundation</p>
        </div>

        <div className="card p-8 shadow-navy-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kowanamunejoundation.org"
                className="w-full px-4 py-2.5 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-navy-800 placeholder-navy-400"
                disabled={loading}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-navy-800 placeholder-navy-400"
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-navy-100">
            <p className="text-center text-navy-500 text-xs">
              Default credentials for demo:
              <br />
              <span className="text-navy-600 font-mono">admin@kowanamunejoundation.org</span>
              <br />
              <span className="text-navy-600 font-mono">Admin@KNF2026!</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
