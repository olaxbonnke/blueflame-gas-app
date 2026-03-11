'use client';

import { useState } from 'react';
import { Settings, LogOut, User, Shield, Info, AlertTriangle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

function RevokeAccess() {
  const [confirm, setConfirm] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRevoke = async () => {
    if (confirm !== 'REVOKE') return;
    setLoading(true);

    // 1. Delete ALL non-super-admin users from whitelist
    await supabase.from('admin_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // 2. Sign out current session
    await supabase.auth.signOut();

    // 3. Open pre-filled email to developer
    const subject = encodeURIComponent('BlueFlame Gas — Super Admin Revoked Access');
    const body = encodeURIComponent(
      'Hi Developer,\n\nThe Super Admin has revoked all access on the BlueFlame Gas admin dashboard.\n\n' +
      'All admin users have been removed. The dashboard is now locked.\n\n' +
      'Please set up a new Super Admin account before re-enabling logins.\n\nTimestamp: ' + new Date().toISOString()
    );
    window.open(`mailto:olaitan.bonnke@gmail.com?subject=${subject}&body=${body}`);

    router.push('/admin?revoked=1');
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
      className="bg-rose-950/20 border border-rose-500/20 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 p-5 text-left hover:bg-rose-500/5 transition-colors">
        <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
        <div>
          <h3 className="font-bold text-rose-400">Danger Zone — Revoke Super Admin Access</h3>
          <p className="text-xs text-gray-500 mt-0.5">Removes ALL admin users and locks the dashboard. Developer will be notified.</p>
        </div>
      </button>

      {open && (
        <div className="px-5 pb-6 space-y-4 border-t border-rose-500/10">
          <div className="mt-4 bg-rose-500/10 border border-rose-500/20 rounded-lg p-4 space-y-2">
            <p className="font-bold text-rose-300 text-sm">⚠️ This action will:</p>
            <ul className="list-disc pl-4 text-xs space-y-1 text-rose-400">
              <li>Delete ALL admin users from the whitelist</li>
              <li>Sign you out immediately</li>
              <li>Send an automatic email to the developer</li>
              <li>Lock the dashboard — no one can log in until a new admin is set up by the developer</li>
            </ul>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Type REVOKE to confirm</label>
            <input
              className="w-full bg-black/50 border border-rose-500/30 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-rose-500 placeholder:text-gray-600"
              placeholder="REVOKE"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
            />
          </div>
          <button
            onClick={handleRevoke}
            disabled={confirm !== 'REVOKE' || loading}
            className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <AlertTriangle className="w-4 h-4" />}
            {loading ? 'Revoking...' : 'Revoke All Access & Lock Dashboard'}
          </button>
        </div>
      )}
    </motion.div>
  );
}

export default function SettingsPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
  };

  return (
    <div className="flex flex-col h-full space-y-8 max-w-4xl mx-auto w-full">
      <div className="mb-2">
        <h2 className="text-3xl font-black text-white tracking-tight mb-2">Admin Settings</h2>
        <p className="text-gray-400 text-lg">Manage your account preferences and secure session.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[#121212] border border-white/5 rounded-xl p-6 shadow-xl h-fit border-t-4 border-t-blueflame">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
            <div className="w-16 h-16 rounded-full bg-blueflame/10 flex items-center justify-center border border-blueflame/20 text-blueflame">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Your Profile</h3>
              <p className="text-sm text-gray-400">Manage your personal admin details.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Access Level</span>
              <span className="px-2.5 py-1 rounded bg-blueflame/10 text-blueflame font-bold border border-blueflame/20 uppercase tracking-wider text-[10px]">Active Session</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed italic bg-black/40 p-3 rounded-lg border border-white/5">
              Profile editing is managed through your email authentication provider.
            </p>
          </div>
        </motion.div>

        {/* Security Card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[#121212] border border-white/5 rounded-xl p-6 shadow-xl h-fit border-t-4 border-t-rose-500/50">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20 text-rose-500">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Security & Session</h3>
              <p className="text-sm text-gray-400">Safely end your connection.</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-3 bg-rose-500/5 border border-rose-500/10 p-4 rounded-lg">
              <Info className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <p className="text-sm text-rose-200/70 leading-relaxed">
                Always log out if using a shared or public device to prevent unauthorized access.
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-bold transition-all shadow-[0_0_15px_rgba(244,63,94,0.3)]"
            >
              <LogOut className="w-5 h-5" />
              Log out of Admin Dashboard
            </button>
          </div>
        </motion.div>
      </div>

      {/* Danger Zone — full width */}
      <RevokeAccess />
    </div>
  );
}
