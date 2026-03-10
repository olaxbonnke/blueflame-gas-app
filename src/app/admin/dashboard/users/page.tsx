'use client';

import { useState } from 'react';
import { Search, Bell, UserPlus, Save, Download, Edit, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ADMINS_DATA: any[] = [];

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col h-full space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">User Management</h2>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input 
              className="pl-10 pr-4 py-2 bg-[#121212] border border-white/10 rounded-lg text-sm w-64 focus:ring-1 focus:ring-blueflame focus:border-blueflame outline-none text-white transition-all placeholder:text-gray-500" 
              placeholder="Search admins..." 
              type="text"
            />
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#121212] border border-white/10 text-gray-400 hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blueflame rounded-full border border-[#0a0a0a]"></span>
          </button>
        </div>
      </header>

      {/* Add New Admin Section */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#121212] rounded-xl border border-white/5 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-white/5 flex items-center gap-3 bg-black/20">
          <UserPlus className="text-blueflame w-6 h-6" />
          <h3 className="text-lg font-bold text-white">Add New Admin / Sub-Admin</h3>
        </div>
        <form className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400">Full Name</label>
            <input 
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-blueflame focus:ring-1 focus:ring-blueflame outline-none transition-colors" 
              placeholder="e.g. Sarah Wilson" 
              type="text"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400">Email Address</label>
            <input 
               className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-blueflame focus:ring-1 focus:ring-blueflame outline-none transition-colors" 
              placeholder="sarah@blueflame.com" 
              type="email"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400">Admin Role</label>
            <select className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-blueflame focus:ring-1 focus:ring-blueflame outline-none transition-colors appearance-none">
              <option>Main Admin</option>
              <option>Regional Admin</option>
              <option>Sub-Admin</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400">Location Assignment</label>
            <select className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-blueflame focus:ring-1 focus:ring-blueflame outline-none transition-colors appearance-none">
              <option>Global Headquarters</option>
              <option>North Region</option>
              <option>South Region</option>
              <option>East Coast</option>
            </select>
          </div>
          <div className="lg:col-span-4 flex justify-end mt-2">
            <button className="bg-blueflame hover:bg-blueflame-dark text-white font-bold py-2.5 px-8 rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(10,160,235,0.3)] hover:shadow-[0_0_25px_rgba(10,160,235,0.5)] w-full sm:w-auto" type="button">
              <Save className="w-5 h-5" />
              Create Admin Account
            </button>
          </div>
        </form>
      </motion.section>

      {/* Admins List Table */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#121212] rounded-xl border border-white/5 shadow-xl overflow-hidden flex flex-col flex-1">
        <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-black/20">
          <div>
            <h3 className="text-lg font-bold text-white">Active Administrators</h3>
            <p className="text-sm text-gray-500 mt-1">Showing 5 currently active user profiles</p>
          </div>
          <div className="relative flex-1 w-full sm:w-auto sm:max-w-md xl:mx-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input 
              className="w-full pl-10 pr-4 py-2 bg-black/50 border border-white/10 rounded-lg text-sm text-white focus:border-blueflame focus:ring-1 focus:ring-blueflame outline-none transition-colors placeholder:text-gray-500" 
              placeholder="Search admins..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center gap-2 text-sm font-semibold text-blueflame hover:bg-blueflame/10 px-4 py-2 rounded-lg transition-colors border border-blueflame/20 w-full sm:w-auto">
            <Download className="w-4 h-4" />
            Export List
          </button>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left">
            <thead className="bg-black/40 text-gray-400 uppercase text-[11px] tracking-widest font-bold border-b border-white/5">
              <tr>
                <th className="px-6 py-4">Admin Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Assigned Location</th>
                <th className="px-6 py-4">Last Active</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {ADMINS_DATA.length === 0 ? (
                 <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No users found.</td></tr>
              ) : ADMINS_DATA.map((admin) => (
                <tr key={admin.id} className="hover:bg-white/5 transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center font-bold text-sm ${admin.color} group-hover:border-blueflame/30 transition-colors`}>
                        {admin.initials}
                      </div>
                      <span className="font-medium text-white group-hover:text-blueflame transition-colors">{admin.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{admin.email}</td>
                  <td className="px-6 py-4">
                    {admin.role === 'Main' ? (
                      <span className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-blueflame/20 text-blueflame border border-blueflame/30 uppercase tracking-tighter">Main</span>
                    ) : (
                      <span className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-tighter">Regional</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-300 text-sm font-medium">{admin.location}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{admin.lastActive}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-500 hover:text-blueflame hover:bg-blueflame/10 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-black/20 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>Showing 5 of 12 admins</p>
          <div className="flex gap-2">
            <button disabled className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 hover:bg-white/5 transition-colors disabled:opacity-30 disabled:hover:bg-transparent text-white">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blueflame text-white font-bold shadow-[0_0_10px_rgba(10,160,235,0.4)]">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-white">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-white">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-white">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
