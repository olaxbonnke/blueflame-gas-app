'use client';

import { useState } from 'react';
import { Search, Bell, Calendar, User, MapPin, History, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ACTIVITY_DATA: any[] = [];

export default function ActivityLogPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2 text-white">
          <History className="text-blueflame w-6 h-6" />
          <h2 className="text-2xl font-bold tracking-tight">System Logs</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input 
              className="pl-10 pr-4 py-2 bg-[#121212] border border-white/10 rounded-full text-sm w-64 focus:ring-1 focus:ring-blueflame focus:border-blueflame outline-none text-white transition-all placeholder:text-gray-500" 
              placeholder="Search activities..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-[#121212] border border-white/10 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-blueflame rounded-full border border-[#0a0a0a]"></span>
          </button>
        </div>
      </header>

      {/* Title & Summary */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">Admin Activity Log</h1>
          <p className="text-gray-400 mt-2 max-w-xl text-sm">
            Real-time chronological record of administrative actions, price adjustments, and system security events across all sectors.
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
          <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#121212] border border-white/10 text-sm font-medium hover:border-blueflame/50 hover:bg-white/5 transition-colors text-white whitespace-nowrap">
            <Calendar className="w-4 h-4 text-blueflame" />
            <span>Filter by Date</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#121212] border border-white/10 text-sm font-medium hover:border-blueflame/50 hover:bg-white/5 transition-colors text-white whitespace-nowrap">
            <User className="w-4 h-4 text-blueflame" />
            <span>Filter by Admin</span>
          </button>
        </div>
      </div>

      {/* Log Table */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-white/5 bg-[#121212] overflow-hidden shadow-xl flex-1 flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="bg-black/40">
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-blueflame/80">Timestamp</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-blueflame/80">Admin Name</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-blueflame/80">Role</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-blueflame/80">Action Taken</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-blueflame/80">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {ACTIVITY_DATA.length === 0 ? (
                 <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No recent activity detected.</td></tr>
              ) : ACTIVITY_DATA.map((log) => (
                <tr key={log.id} className="group hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-white">{log.date}</div>
                    <div className="text-[12px] text-gray-500">{log.time}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blueflame/20 flex items-center justify-center text-blueflame font-bold text-xs uppercase border border-blueflame/30">
                        {log.initials}
                      </div>
                      <span className="text-sm font-medium text-gray-200 group-hover:text-blueflame transition-colors">{log.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/50 text-gray-400 border border-white/10">
                      {log.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-sm">
                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors" dangerouslySetInnerHTML={{ __html: log.action.replace(/\$2\.40\/kg/, '<span class="text-blueflame font-semibold drop-shadow-[0_0_8px_rgba(10,160,235,0.4)]">$2.40/kg</span>').replace(/#[\w-]+/, '<span class="text-white font-medium">$&</span>') }} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{log.location}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="bg-black/20 px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-white/5 gap-4">
          <span className="text-xs font-medium text-gray-500">Showing 1 to 6 of 1,240 entries</span>
          <div className="flex gap-2">
            <button disabled className="p-2 rounded-lg hover:bg-white/5 transition-colors border border-white/10 disabled:opacity-30 disabled:hover:bg-transparent text-white">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 py-1 text-sm font-bold bg-blueflame text-white rounded-lg shadow-[0_0_10px_rgba(10,160,235,0.4)]">1</button>
            <button className="w-8 py-1 text-sm font-medium hover:bg-white/5 rounded-lg border border-white/10 transition-colors text-white">2</button>
            <button className="w-8 py-1 text-sm font-medium hover:bg-white/5 rounded-lg border border-white/10 transition-colors text-white">3</button>
            <button className="p-2 rounded-lg hover:bg-white/5 transition-colors border border-white/10 text-white">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
