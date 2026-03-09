'use client';

import { useState } from 'react';
import { Home, Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const BRANCH_DATA = [
  { id: 1, name: 'Lagos Hub', address: '123 Ikorodu Road, Lagos, Nigeria', phone: '+234 801 234 5678', status: 'active', statusColor: 'emerald' },
  { id: 2, name: 'Abuja Station', address: 'Plot 456 Garki Area 11, Abuja', phone: '+234 802 345 6789', status: 'active', statusColor: 'emerald' },
  { id: 3, name: 'Port Harcourt Depot', address: '789 Trans Amadi Industrial Layout, PH', phone: '+234 803 456 7890', status: 'maintenance', statusColor: 'amber' },
  { id: 4, name: 'Kano Warehouse', address: 'Plot 22 Murtala Mohammed Way, Kano', phone: '+234 804 567 8901', status: 'upcoming', statusColor: 'gray' },
];

export default function BranchManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(BRANCH_DATA[0]);

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Home className="w-4 h-4" />
          <span>Admin</span>
          <span>/</span>
          <span className="text-white font-medium">Branch Management</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input 
              className="pl-10 pr-4 py-2 bg-[#121212] border border-white/10 rounded-lg text-sm w-64 focus:ring-1 focus:ring-blueflame focus:border-blueflame outline-none text-white transition-all placeholder:text-gray-500" 
              placeholder="Search branches..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="bg-blueflame hover:bg-blueflame-dark text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blueflame/20 flex-1 sm:flex-none">
            <Plus className="w-4 h-4" />
            Add New Branch
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-1 mb-2">
        <h2 className="text-2xl font-bold tracking-tight">Manage Locations</h2>
        <p className="text-gray-400 text-sm">Oversee and edit your gas distribution hubs and regional stations across the network.</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} delay={0} className="bg-[#121212] p-4 rounded-xl border border-white/5 shadow-sm">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Branches</p>
          <p className="text-2xl font-bold mt-1 text-white">12</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} delay={0.1} className="bg-[#121212] p-4 rounded-xl border border-white/5 shadow-sm">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Active Hubs</p>
          <p className="text-2xl font-bold mt-1 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">8</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} delay={0.2} className="bg-[#121212] p-4 rounded-xl border border-white/5 shadow-sm">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Under Maintenance</p>
          <p className="text-2xl font-bold mt-1 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">2</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} delay={0.3} className="bg-[#121212] p-4 rounded-xl border border-white/5 shadow-sm">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Upcoming</p>
          <p className="text-2xl font-bold mt-1 text-blueflame drop-shadow-[0_0_8px_rgba(10,160,235,0.5)]">2</p>
        </motion.div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        
        {/* Table Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} delay={0.4} className="lg:col-span-2 bg-[#121212] border border-white/5 rounded-xl overflow-hidden shadow-xl flex flex-col h-full">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="bg-black/40">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-white/5">Branch Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-white/5">Full Address</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-white/5">Phone Number</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-white/5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {BRANCH_DATA.map((branch) => (
                  <tr 
                    key={branch.id} 
                    className={`transition-colors cursor-pointer ${selectedBranch.id === branch.id ? 'bg-white/5' : 'hover:bg-white/[0.02]'}`}
                    onClick={() => setSelectedBranch(branch)}
                  >
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          branch.statusColor === 'emerald' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' :
                          branch.statusColor === 'amber' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]' :
                          'bg-gray-500 shadow-[0_0_8px_rgba(107,114,128,0.8)]'
                        }`}></div>
                        <span className="font-semibold text-white">{branch.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-gray-400 text-sm max-w-[200px] xl:max-w-[250px] truncate" title={branch.address}>
                      {branch.address}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-gray-300 text-sm font-medium">
                      {branch.phone}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-500 hover:text-blueflame hover:bg-blueflame/10 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors" onClick={(e) => e.stopPropagation()}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-white/5 bg-black/20 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <p className="text-xs text-gray-500">Showing 1-4 of 12 locations</p>
            <div className="flex gap-2">
              <button disabled className="p-2 border border-white/10 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent hover:bg-white/5 transition-colors text-white">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-white">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Detail/Edit Panel */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} delay={0.5} className="lg:col-span-1 bg-[#121212] border border-white/5 rounded-xl p-6 shadow-xl h-fit sticky top-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-white">Edit {selectedBranch.name}</h3>
            {selectedBranch.statusColor === 'emerald' && (
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full uppercase tracking-wider border border-emerald-500/20">Active</span>
            )}
            {selectedBranch.statusColor === 'amber' && (
              <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-xs font-bold rounded-full uppercase tracking-wider border border-amber-500/20">Maint</span>
            )}
            {selectedBranch.statusColor === 'gray' && (
              <span className="px-3 py-1 bg-gray-500/10 text-gray-400 text-xs font-bold rounded-full uppercase tracking-wider border border-gray-500/20">Soon</span>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Branch Name</label>
              <input 
                className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-blueflame focus:border-blueflame outline-none transition-colors" 
                type="text" 
                defaultValue={selectedBranch.name} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Phone Number</label>
              <input 
                className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-blueflame focus:border-blueflame outline-none transition-colors" 
                type="text" 
                defaultValue={selectedBranch.phone} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Full Address</label>
              <textarea 
                className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-blueflame focus:border-blueflame outline-none transition-colors resize-none" 
                rows={2}
                defaultValue={selectedBranch.address} 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">GPS Lat</label>
                <input 
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-blueflame focus:border-blueflame outline-none transition-colors text-sm" 
                  type="text" 
                  defaultValue="6.5244° N" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">GPS Lng</label>
                <input 
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-blueflame focus:border-blueflame outline-none transition-colors text-sm" 
                  type="text" 
                  defaultValue="3.3792° E" 
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
            <button className="px-4 py-2 bg-transparent hover:bg-white/5 border border-white/10 text-sm font-medium text-gray-300 rounded-lg transition-colors w-full sm:w-auto">
              Discard
            </button>
            <button className="bg-blueflame px-6 py-2 text-sm font-bold text-white rounded-lg shadow-[0_0_15px_rgba(10,160,235,0.3)] hover:shadow-[0_0_25px_rgba(10,160,235,0.5)] transition-all w-full sm:w-auto">
              Save Changes
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
