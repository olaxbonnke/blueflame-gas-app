'use client';

import { useState, useEffect } from 'react';
import { Search, UserPlus, Loader2, Trash2, Shield, ShieldCheck, RefreshCw, Mail, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';

const ROLES = ['Main Admin', 'Regional Admin', 'Sub-Admin'];

const ROLE_STYLE: Record<string, string> = {
  'Main Admin': 'bg-blueflame/20 text-blueflame border border-blueflame/30',
  'Regional Admin': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
  'Sub-Admin': 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
};

function initials(name: string) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

// ─── Invite Form ─────────────────────────────────────────────────────────────
function InviteForm({ onInvited }: { onInvited: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Sub-Admin');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  const handleInvite = async () => {
    if (!name.trim() || !email.trim()) {
      alert('Please fill in both name and email.');
      return;
    }
    setLoading(true);

    // 1. Add the user to our admin_users table
    const { error: dbError } = await supabase
      .from('admin_users')
      .insert([{ name: name.trim(), email: email.trim().toLowerCase(), role, status: 'Invited' }]);

    if (dbError) {
      alert('Failed to add user: ' + dbError.message);
      setLoading(false);
      return;
    }

    // 2. Send a magic link so they can log in
    await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
        shouldCreateUser: true,
      },
    });

    setStatus('sent');
    setName(''); setEmail(''); setRole('Sub-Admin');
    setTimeout(() => { setStatus('idle'); onInvited(); }, 2500);
    setLoading(false);
  };

  return (
    <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="bg-[#121212] rounded-xl border border-white/5 overflow-hidden shadow-xl">
      <div className="p-5 border-b border-white/5 flex items-center gap-3 bg-black/20">
        <UserPlus className="text-blueflame w-5 h-5" />
        <h3 className="text-base font-bold text-white">Invite Admin / Sub-Admin</h3>
      </div>

      {status === 'sent' ? (
        <div className="p-6 flex items-center gap-3 text-emerald-400">
          <CheckCircle className="w-5 h-5" />
          <p className="font-semibold">Invite sent! They'll receive a login link by email.</p>
        </div>
      ) : (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Full Name</label>
            <input className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:border-blueflame focus:ring-1 focus:ring-blueflame outline-none transition-colors placeholder:text-gray-600"
              placeholder="e.g. Sarah Wilson" type="text" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input className="w-full bg-black/50 border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-white text-sm focus:border-blueflame focus:ring-1 focus:ring-blueflame outline-none transition-colors placeholder:text-gray-600"
                placeholder="sarah@yourcompany.com" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</label>
            <select className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:border-blueflame outline-none appearance-none"
              value={role} onChange={e => setRole(e.target.value)}>
              {ROLES.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="sm:col-span-3 flex justify-end">
            <button onClick={handleInvite} disabled={loading}
              className="bg-blueflame hover:bg-blueflame-dark text-white font-bold py-2.5 px-6 rounded-lg transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(10,160,235,0.3)] disabled:opacity-50 text-sm">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
              {loading ? 'Sending Invite...' : 'Send Invite Link'}
            </button>
          </div>
        </div>
      )}
    </motion.section>
  );
}

// ─── Users Table ──────────────────────────────────────────────────────────────
function UsersTable({ refresh }: { refresh: number }) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchUsers(); }, [refresh]);

  const fetchUsers = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('admin_users')
      .select('*')
      .neq('role', 'developer')   // developer rows are permanently hidden
      .order('created_at', { ascending: false });
    if (data) setUsers(data);
    setLoading(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Remove "${name}" from the admin team? They will lose dashboard access.`)) return;
    const { error } = await supabase.from('admin_users').delete().eq('id', id);
    if (!error) setUsers(u => u.filter(x => x.id !== id));
    else alert('Remove failed: ' + error.message);
  };

  const handleRoleChange = async (id: string, newRole: string) => {
    const { error } = await supabase.from('admin_users').update({ role: newRole }).eq('id', id);
    if (!error) setUsers(u => u.map(x => x.id === id ? { ...x, role: newRole } : x));
    else alert('Role update failed: ' + error.message);
  };

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      className="bg-[#121212] rounded-xl border border-white/5 shadow-xl overflow-hidden flex flex-col flex-1">
      <div className="p-5 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-black/20">
        <div>
          <h3 className="text-base font-bold text-white">Admin Team</h3>
          <p className="text-xs text-gray-500 mt-0.5">{users.length} {users.length === 1 ? 'member' : 'members'} with dashboard access</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input className="w-full pl-9 pr-4 py-2 bg-black/50 border border-white/10 rounded-lg text-sm text-white focus:border-blueflame focus:ring-1 focus:ring-blueflame outline-none placeholder:text-gray-500"
              placeholder="Search by name or email..." type="text" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button onClick={fetchUsers} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors" title="Refresh">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        {loading ? (
          <div className="flex justify-center items-center py-16"><Loader2 className="w-7 h-7 text-blueflame animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            <ShieldCheck className="w-10 h-10 mx-auto mb-3 text-gray-700" />
            <p className="text-sm">{search ? 'No admins match your search.' : 'No admins yet. Invite someone above.'}</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-black/40 text-gray-400 uppercase text-[10px] tracking-wider font-bold border-b border-white/5">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Added</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(user => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blueflame/10 border border-blueflame/20 flex items-center justify-center text-blueflame font-bold text-xs shrink-0">
                        {initials(user.name || '?')}
                      </div>
                      <span className="font-medium text-white text-sm">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-400 text-sm">{user.email}</td>
                  <td className="px-5 py-4">
                    <select
                      value={user.role}
                      onChange={e => handleRoleChange(user.id, e.target.value)}
                      className={`text-[10px] font-bold px-2 py-1 rounded-full ${ROLE_STYLE[user.role] || 'bg-white/10 text-gray-400'} bg-transparent appearance-none cursor-pointer outline-none`}
                    >
                      {ROLES.map(r => <option key={r} className="bg-[#121212] text-white">{r}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${user.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'}`}>
                      {user.status || 'Invited'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-xs">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => handleDelete(user.id, user.name)}
                      className="p-2 text-gray-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Remove admin"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function UserManagementPage() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="flex flex-col h-full space-y-6 max-w-6xl mx-auto w-full">
      <header>
        <h2 className="text-2xl font-bold text-white tracking-tight">User Management</h2>
        <p className="text-gray-500 text-sm mt-1">
          Control who has access to this admin dashboard. Invite staff by email — they receive a magic login link. Change their role or remove access anytime.
        </p>
      </header>

      <InviteForm onInvited={() => setRefresh(r => r + 1)} />
      <UsersTable refresh={refresh} />
    </div>
  );
}
