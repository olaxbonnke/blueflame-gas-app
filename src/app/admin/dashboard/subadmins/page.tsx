'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, Shield, Globe, MapPin, Trash2, Mail, Loader2, UserPlus, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';

export default function SubAdminManagementPage() {
  const [whitelist, setWhitelist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isAdding, setIsAdding] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('regional_admin');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchWhitelist();
  }, []);

  const fetchWhitelist = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('whitelisted_emails')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (data) setWhitelist(data);
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!newEmail || !newEmail.includes('@')) {
      alert("Please enter a valid email address");
      return;
    }
    
    setIsSaving(true);
    
    // Get current user id to set as added_by
    const { data: { session } } = await supabase.auth.getSession();
    
    const { data, error } = await supabase.from('whitelisted_emails').insert([{
      email: newEmail.toLowerCase().trim(),
      role: newRole,
      added_by: session?.user?.id
    }]).select().single();

    if (!error && data) {
      setWhitelist([data, ...whitelist]);
      setIsAdding(false);
      setNewEmail('');
      setNewRole('regional_admin');
    } else {
      alert("Failed to add sub-admin. They might already be on the list.");
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string, email: string) => {
    if (confirm(`Are you sure you want to revoke access for ${email}?`)) {
      const { error } = await supabase.from('whitelisted_emails').delete().eq('id', id);
      if (!error) {
        setWhitelist(whitelist.filter(w => w.id !== id));
      } else {
        alert("Failed to remove sub-admin.");
      }
    }
  };

  const filteredAdmins = whitelist.filter(w => 
    w.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-4 flex-1">
          <Search className="text-gray-500 w-5 h-5 hidden sm:block" />
          <input 
            className="bg-transparent border-none focus:ring-0 text-sm w-full max-w-xs outline-none text-white placeholder:text-gray-500 transition-colors" 
            placeholder="Search email addresses..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* Breadcrumbs & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-white">Sub-Admin Whitelist</h2>
          <p className="text-gray-400 text-sm">Securely invite team members by whitelisting their Google accounts.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center justify-center gap-2 bg-blueflame hover:bg-blueflame-dark text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-[0_0_20px_rgba(10,160,235,0.3)] hover:shadow-[0_0_25px_rgba(10,160,235,0.5)] w-full sm:w-auto"
        >
          <UserPlus className="w-5 h-5" />
          <span>Invite Sub-Admin</span>
        </button>
      </div>

      {isAdding && (
         <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#121212] border border-blueflame/30 p-6 rounded-xl shadow-xl shadow-blueflame/5">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-lg text-white flex items-center gap-2">
                 <Shield className="w-5 h-5 text-blueflame" /> Whitelist New Account
               </h3>
               <button onClick={() => setIsAdding(false)} className="text-gray-500 hover:text-white p-1">
                 <X className="w-5 h-5" />
               </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
               <div className="md:col-span-1 space-y-2">
                 <label className="text-sm font-medium text-gray-400">Google Email Address</label>
                 <div className="relative">
                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                   <input 
                     type="email" 
                     value={newEmail}
                     onChange={(e) => setNewEmail(e.target.value)}
                     className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-white focus:ring-1 focus:ring-blueflame focus:border-blueflame outline-none transition-colors"
                     placeholder="colleague@gmail.com"
                   />
                 </div>
               </div>
               
               <div className="md:col-span-1 space-y-2">
                 <label className="text-sm font-medium text-gray-400">Admin Role</label>
                 <select 
                   value={newRole}
                   onChange={(e) => setNewRole(e.target.value)}
                   className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:ring-1 focus:ring-blueflame outline-none appearance-none"
                 >
                   <option value="regional_admin">Regional Admin (Standard)</option>
                   <option value="main_admin">Main Admin (Full Access)</option>
                 </select>
               </div>
               
               <div className="md:col-span-1">
                 <button 
                   onClick={handleAdd}
                   disabled={isSaving}
                   className="w-full bg-blueflame disabled:opacity-50 py-2.5 text-sm font-bold text-white rounded-lg transition-all flex items-center justify-center gap-2"
                 >
                   {isSaving ? <Loader2 className="w-4 h-4 animate-spin"/> : <Plus className="w-4 h-4" />}
                   Confirm Whitelist
                 </button>
               </div>
            </div>
         </motion.div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#121212] border border-white/5 p-6 rounded-xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blueflame/5 rounded-bl-full"></div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider relative z-10">Total Whitelisted</p>
          <div className="flex items-end justify-between mt-2 relative z-10">
            <span className="text-3xl font-black text-white">{whitelist.length}</span>
            <span className="text-gray-400 text-xs font-bold">Authorized Accounts</span>
          </div>
        </div>
        
        <div className="bg-[#121212] border border-white/5 p-6 rounded-xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blueflame/5 rounded-bl-full"></div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider relative z-10">Security Status</p>
          <div className="flex items-end justify-between mt-2 relative z-10">
             <span className="text-3xl font-black text-emerald-500">Secure</span>
             <span className="text-gray-400 text-xs font-bold">Highlander OAuth Enforced</span>
          </div>
        </div>
      </div>

      {/* Admin Table */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-blueflame animate-spin" />
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#121212] border border-white/5 rounded-xl overflow-hidden shadow-xl flex-1 flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="bg-black/40">
                <tr className="border-b border-white/5">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Role Assigned</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date Added</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredAdmins.length === 0 ? (
                   <tr>
                     <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No whitelisted emails found.</td>
                   </tr>
                ) : (
                  filteredAdmins.map((admin) => (
                    <tr key={admin.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-blueflame/10 flex items-center justify-center border border-blueflame/20">
                              <Mail className="w-4 h-4 text-blueflame" />
                           </div>
                           <span className="font-medium text-white">{admin.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {admin.role === 'main_admin' ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blueflame/10 text-blueflame border border-blueflame/20">
                            Main Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#1e1e1e] text-gray-300 border border-white/10">
                            Regional Admin
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-400">
                           {new Date(admin.created_at).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleDelete(admin.id, admin.email)}
                          className="p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all" title="Revoke Access"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
