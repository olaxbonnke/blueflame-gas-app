'use client';

import { useState } from 'react';
import { Search, Bell, HelpCircle, Plus, TrendingUp, Globe, MapPin, Edit, Trash2, Map } from 'lucide-react';
import { motion } from 'framer-motion';

const SUBADMINS_DATA = [
  { 
    id: 1, 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ98hUU4U68xd3s9UAQA5YxL3Pwq74PXGu2vSrCaaNMR5nhSO02Nz0YvWXhO7MPC3kD5CU6G_BegeLGlQHApHRf_Y3ewWT_8gUr1BxGhSlwL30YbYFAnQo7xuC6J4_gV_OU2xZFrtcrKht6DO8OKsLPbJBIc4GroHPt9OyWWQud0G3CuF6YHI91JRLYLtxUszM-SE--g5OMivnc9ygkNk7mW_st87MwZtLVuDKxEgRm7SfUIACy2fLuyoBl3YbUi2t9LVJ6T1KIh4',
    name: 'Alex Rivera', 
    email: 'alex.r@system.com', 
    role: 'Main Admin', 
    roleType: 'main',
    location: 'Global Headquarters', 
    locationType: 'global',
    status: 'Active', 
    statusColor: 'emerald' 
  },
  { 
    id: 2, 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdU0ukVFQjas6CWtM69nv0tealvD8hrKxt26O_O1fnCDT6MZklaj2bGI6QgRQjoEBu9SKgHGLo93CgQaj0pg51eo5qntLl6paajg5D2voqzZAWoa89EgY2UbNQQEbwLm5TJYCdGpH5rH2XFmuKEe2S-QPlCmO8gMW9VROpS-g-v1xfLsnUgFMkAXxhWrZ3lbSaHn9QammHvKXk1MSWOMC-HO9vt5zQgmH87x0Yt94CTc-yRIbDEsP5cNMpUw4N5hepUNhn4fhbK2k',
    name: 'Sarah Chen', 
    email: 's.chen@corp.io', 
    role: 'Regional Admin', 
    roleType: 'regional',
    location: 'North America (West)', 
    locationType: 'regional',
    status: 'Active', 
    statusColor: 'emerald' 
  },
  { 
    id: 3, 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjobgXEsBoa15OOfdw-8Vvozvk9vCpaLXR5ykDwsfitecf9x6v2QC30je3kyYxDNl0FNR0o7Ja_HP0uQ9oEztlqz_QKCtMnWZ5NrVsR7NduFZcsn3t5TwCJzmtTNvXV7t_S29A0-nQRkETFeOcGy-Wd5XcIwjtr0tikpEcVpnbM_mijA-Y5nFVDbks55QzeFAc5GrKlwJR_xF_fQ9eW-c0YJiH3-2ruG8szoiY-90pU3tvQFADJPNkdQcwR4Tn-nBaJHspRQEEdBk',
    name: 'Marcus Thorne', 
    email: 'm.thorne@system.com', 
    role: 'Regional Admin', 
    roleType: 'regional',
    location: 'Europe Central', 
    locationType: 'regional',
    status: 'Inactive', 
    statusColor: 'gray' 
  },
  { 
    id: 4, 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMGlAH2lV5CxD2XN8u-bkQnDar6laPrWoKWpyuC_8tK9udbvbm_TIMSj7xStzrppd_ZlwYUxZaRYB7HdftAah7woXJrNmKTo_npDdned4w9gNIdUl5iymLnjkP1ueR1fjEYFfC6ezUzoW2hCLLyKfNLxwVkQIANu5ugFhFRtGCCiwz-gfPtdXTsFJZplSNjIqbZNmyI8grDV7NI4Y9xym8F2bZ_wCONBL-uuuPY3i8oVF_WbHUnV3Mn8EqX2eL8mlyAJgVzQuVgzY',
    name: 'Elena Rodriguez', 
    email: 'elena.rod@system.com', 
    role: 'Regional Admin', 
    roleType: 'regional',
    location: 'Asia Pacific (Tokyo)', 
    locationType: 'regional',
    status: 'Active', 
    statusColor: 'emerald' 
  },
];

export default function SubAdminManagementPage() {
  const [activeTab, setActiveTab] = useState('All Admins');

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-4 flex-1">
          <Search className="text-gray-500 w-5 h-5 hidden sm:block" />
          <input 
            className="bg-transparent border-none focus:ring-0 text-sm w-full max-w-xs outline-none text-white placeholder:text-gray-500 transition-colors" 
            placeholder="Search admins or locations..." 
            type="text"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="relative p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-blueflame rounded-full ring-2 ring-[#0a0a0a]"></span>
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Breadcrumbs & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-white">Sub-Admin Management</h2>
          <p className="text-gray-400 text-sm">Manage roles and location assignments for your administrative team.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-blueflame hover:bg-blueflame-dark text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-[0_0_20px_rgba(10,160,235,0.3)] hover:shadow-[0_0_25px_rgba(10,160,235,0.5)] w-full sm:w-auto">
          <Plus className="w-5 h-5" />
          <span>Create New Sub-Admin</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} delay={0} className="bg-[#121212] border border-white/5 p-6 rounded-xl shadow-xl hover:border-blueflame/30 transition-colors">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Admins</p>
          <div className="flex items-end justify-between mt-2">
            <span className="text-3xl font-black text-white">24</span>
            <span className="text-emerald-400 text-xs font-bold flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              <TrendingUp className="w-3 h-3" /> +12%
            </span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} delay={0.1} className="bg-[#121212] border border-white/5 p-6 rounded-xl shadow-xl hover:border-white/20 transition-colors">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Main Admins</p>
          <div className="flex items-end justify-between mt-2">
            <span className="text-3xl font-black text-white">6</span>
            <span className="text-gray-400 text-xs font-bold">25% of total</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} delay={0.2} className="bg-[#121212] border border-white/5 p-6 rounded-xl shadow-xl hover:border-white/20 transition-colors">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Active Locations</p>
          <div className="flex items-end justify-between mt-2">
            <span className="text-3xl font-black text-white">18</span>
            <span className="text-gray-400 text-xs font-bold">Global Coverage</span>
          </div>
        </motion.div>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-white/10 flex gap-6 overflow-x-auto no-scrollbar">
        {['All Admins', 'Main Admins', 'Regional Admins', 'Archived'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-1 border-b-2 text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === tab 
                ? 'border-blueflame text-blueflame drop-shadow-[0_0_8px_rgba(10,160,235,0.8)]' 
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Admin Table */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} delay={0.3} className="bg-[#121212] border border-white/5 rounded-xl overflow-hidden shadow-xl flex-1 flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="bg-black/40">
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Admin Details</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Assigned Location</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {SUBADMINS_DATA.map((admin) => (
                <tr key={admin.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-black/50 overflow-hidden flex items-center justify-center border border-white/10 group-hover:border-blueflame/50 transition-colors">
                        <img alt={admin.name} src={admin.image} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-white group-hover:text-blueflame transition-colors">{admin.name}</p>
                        <p className="text-xs text-gray-500">{admin.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {admin.roleType === 'main' ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blueflame/10 text-blueflame border border-blueflame/20">
                        {admin.role}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#1e1e1e] text-gray-300 border border-white/10">
                        {admin.role}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      {admin.locationType === 'global' ? <Globe className="w-4 h-4 text-blueflame" /> : <MapPin className="w-4 h-4" />}
                      <span className="text-sm">{admin.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        admin.statusColor === 'emerald' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-gray-500 shadow-[0_0_8px_rgba(107,114,128,0.8)]'
                      }`}></span>
                      <span className={`text-sm font-medium ${admin.statusColor === 'emerald' ? 'text-white' : 'text-gray-500'}`}>{admin.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-blueflame hover:bg-blueflame/10 rounded-lg transition-all" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-black/20">
          <p className="text-sm text-gray-500 font-medium">Showing 1 to 4 of 24 results</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-lg border border-white/10 text-sm font-bold hover:bg-white/5 transition-colors text-gray-400">Previous</button>
            <button className="w-8 py-1 rounded-lg border border-blueflame/30 text-sm font-bold shadow-[0_0_10px_rgba(10,160,235,0.3)] bg-blueflame/20 text-blueflame">1</button>
            <button className="w-8 py-1 rounded-lg border border-white/10 text-sm font-bold hover:bg-white/5 transition-colors text-white">2</button>
            <button className="w-8 py-1 rounded-lg border border-white/10 text-sm font-bold hover:bg-white/5 transition-colors text-white">3</button>
            <button className="px-3 py-1 rounded-lg border border-white/10 text-sm font-bold hover:bg-white/5 transition-colors text-gray-400">Next</button>
          </div>
        </div>
      </motion.div>

      {/* Regional Map View (Mini) */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} delay={0.4} className="bg-[#121212] border border-white/5 rounded-xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white">Location Distribution</h3>
            <p className="text-sm text-gray-500">Visual overview of admin assignments by region.</p>
          </div>
          <button className="text-blueflame text-sm font-bold hover:underline">View Map Fullscreen</button>
        </div>
        <div className="relative h-64 w-full bg-black/20 flex items-center justify-center">
          <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://placeholder.pics/svg/300')" }}></div>
          <div className="relative z-10 text-center space-y-2 flex flex-col items-center">
            <Map className="w-10 h-10 text-blueflame drop-shadow-[0_0_15px_rgba(10,160,235,0.6)]" />
            <p className="text-gray-400 font-medium">Interactive Regional Map</p>
            <div className="flex gap-6 mt-4 opacity-70">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blueflame shadow-[0_0_8px_rgba(10,160,235,0.8)]"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-white">Main Hubs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-500 shadow-[0_0_8px_rgba(107,114,128,0.8)]"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-white">Regional Offices</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
