'use client';

import { useState } from 'react';
import { Search, Bell, User, Download, PackagePlus, Flame, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const INVENTORY_DATA = [
  { id: 1, size: '3kg Mini', iconColor: 'text-primary', iconBg: 'bg-primary/10', location: 'Central Hub, Area A', total: 1200, reserved: 150, available: 1050, status: 'Healthy', statusColor: 'emerald' },
  { id: 2, size: '6kg Standard', iconColor: 'text-primary', iconBg: 'bg-primary/10', location: 'West Wing, Rack 12', total: 850, reserved: 230, available: 620, status: 'Healthy', statusColor: 'emerald' },
  { id: 3, size: '12.5kg Family', iconColor: 'text-rose-500', iconBg: 'bg-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.2)]', location: 'Main Depot, Storage B', total: 45, reserved: 30, available: 15, status: 'Low Stock', statusColor: 'rose', isLowStock: true },
  { id: 4, size: '50kg Industrial', iconColor: 'text-primary', iconBg: 'bg-primary/10', location: 'External Compound Yard', total: 120, reserved: 12, available: 108, status: 'Healthy', statusColor: 'emerald' },
  { id: 5, size: '9kg Leisure', iconColor: 'text-primary', iconBg: 'bg-primary/10', location: 'Retail Outlet A', total: 450, reserved: 80, available: 370, status: 'Healthy', statusColor: 'emerald' },
  { id: 6, size: 'Catering Gas', iconColor: 'text-primary', iconBg: 'bg-primary/10', location: 'Industrial Zone hub', total: 210, reserved: 45, available: 165, status: 'Monitor', statusColor: 'amber' },
];

export default function PricingInventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-bold tracking-tight">Inventory Management</h2>
          <div className="relative w-64 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              className="w-full pl-10 pr-4 py-2 bg-[#121212] border border-white/10 rounded-lg text-sm focus:ring-1 focus:ring-blueflame focus:border-blueflame outline-none text-white placeholder:text-gray-500 transition-all"
              placeholder="Search stock ID or location..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0a0a]"></span>
          </button>
          <div className="w-px h-6 bg-white/10 mx-1"></div>
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-blueflame/20 flex items-center justify-center border border-blueflame/30 group-hover:bg-blueflame/30 transition-colors">
              <User className="text-blueflame w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Admin User</span>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#121212] border border-white/5 p-6 rounded-xl relative overflow-hidden group hover:border-blueflame/50 transition-colors">
          <div className="absolute inset-0 bg-blueflame/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <p className="text-gray-400 text-sm font-medium">Total Cylinders</p>
            <span className="bg-emerald-500/10 text-emerald-500 text-xs px-2 py-1 rounded font-bold border border-emerald-500/20">+5.2%</span>
          </div>
          <p className="text-3xl font-bold relative z-10">4,250</p>
          <div className="mt-4 w-full bg-white/5 h-1.5 rounded-full overflow-hidden relative z-10">
            <div className="bg-blueflame h-full w-[75%] rounded-full shadow-[0_0_10px_rgba(10,160,235,0.5)]"></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#121212] border border-white/5 p-6 rounded-xl relative overflow-hidden group hover:border-amber-500/30 transition-colors">
          <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <p className="text-gray-400 text-sm font-medium">Reserved Units</p>
            <span className="bg-rose-500/10 text-rose-500 text-xs px-2 py-1 rounded font-bold border border-rose-500/20">-2.1%</span>
          </div>
          <p className="text-3xl font-bold relative z-10">890</p>
          <div className="mt-4 w-full bg-white/5 h-1.5 rounded-full overflow-hidden relative z-10">
            <div className="bg-amber-500 h-full w-[21%] rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#121212] border border-white/5 p-6 rounded-xl relative overflow-hidden group hover:border-rose-500/30 transition-colors">
          <div className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <p className="text-gray-400 text-sm font-medium">Low Stock Alerts</p>
            <span className="bg-rose-500/10 text-rose-500 text-xs px-2 py-1 rounded font-bold border border-rose-500/20">Action Needed</span>
          </div>
          <p className="text-3xl font-bold text-rose-500 relative z-10">12</p>
          <div className="mt-4 flex gap-1 relative z-10">
            <div className="h-1.5 flex-1 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
            <div className="h-1.5 flex-1 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
            <div className="h-1.5 flex-1 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
            <div className="h-1.5 flex-1 bg-white/5 rounded-full"></div>
            <div className="h-1.5 flex-1 bg-white/5 rounded-full"></div>
          </div>
        </motion.div>
      </div>

      {/* Inventory Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#121212] border border-white/5 rounded-xl flex flex-col flex-1 overflow-hidden shadow-xl">
        {/* Actions Bar */}
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-black/20">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blueflame text-white text-xs font-bold rounded-lg border border-blueflame/50 shadow-[0_0_15px_rgba(10,160,235,0.3)] transition-all">All Locations</button>
            <button className="px-4 py-2 bg-[#1e1e1e] hover:bg-white/10 text-xs font-bold rounded-lg border border-white/10 text-gray-400 hover:text-white transition-all">Main Depot</button>
            <button className="px-4 py-2 bg-[#1e1e1e] hover:bg-white/10 text-xs font-bold rounded-lg border border-white/10 text-gray-400 hover:text-white transition-all hidden md:block">West Distribution</button>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#1e1e1e] hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blueflame hover:bg-blueflame-dark text-white rounded-lg text-sm font-bold shadow-[0_0_20px_rgba(10,160,235,0.4)] hover:shadow-[0_0_30px_rgba(10,160,235,0.6)] transition-all">
              <PackagePlus className="w-4 h-4" />
              <span>Restock</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-black/40 text-gray-400 text-xs uppercase tracking-wider border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-semibold">Cylinder Size</th>
                <th className="px-6 py-4 font-semibold">Warehouse Location</th>
                <th className="px-6 py-4 font-semibold">Total Stock</th>
                <th className="px-6 py-4 font-semibold">Reserved</th>
                <th className="px-6 py-4 font-semibold">Available</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {INVENTORY_DATA.map((item) => (
                <tr key={item.id} className={`hover:bg-white/5 transition-colors group ${item.isLowStock ? 'bg-rose-500/5' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform`}>
                        <Flame className={`w-5 h-5 ${item.iconColor}`} />
                      </div>
                      <span className="font-semibold text-white">{item.size}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{item.location}</td>
                  <td className={`px-6 py-4 font-medium ${item.isLowStock ? 'text-rose-500' : 'text-gray-200'}`}>{item.total.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.reserved.toLocaleString()}</td>
                  <td className={`px-6 py-4 font-bold ${item.isLowStock ? 'text-rose-500' : 'text-blueflame'}`}>{item.available.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                      item.statusColor === 'emerald' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                      item.statusColor === 'amber' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                      item.statusColor === 'rose' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : ''
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {item.isLowStock ? (
                      <button className="px-3 py-1.5 bg-rose-500 text-white text-xs uppercase font-bold rounded-lg hover:bg-rose-600 shadow-[0_0_15px_rgba(244,63,94,0.4)] hover:shadow-[0_0_20px_rgba(244,63,94,0.6)] transition-all">
                        Restock
                      </button>
                    ) : (
                      <button className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 bg-black/20 gap-4">
          <p>Showing 1 to 6 of 24 entries</p>
          <div className="flex gap-2">
            <button className="p-2 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-blueflame text-white font-bold rounded-lg shadow-[0_0_15px_rgba(10,160,235,0.4)]">1</button>
            <button className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-colors">3</button>
            <button className="p-2 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
