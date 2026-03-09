'use client';

import { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ACCESSORIES_DATA = [
  { 
    id: 1, 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtHK2mHO3dCjADiF1TbjKW2pODHCy4_wxdhZ7jjNacMRhmhfcTwodyWJdke5cLhrwAXgU7omzU2-J9N_2quXxvrJ79SQkRNfawSe_HgD1XoL6gb9zfdZ5TUjAx7zyJ4dl_-TwGnCosNhpfPVNTM7hoeW3Vq5jnJ5w96J0K5J7njGQBnFmhaUHyYpBABGsFzk2rxh-Fxf-hmId_l8y1eEsq4Fq7b19WjxrbkKOo72Wa0zVuhvrJlKVoVw6BraRWdXZGvsA36wLNbhk', // Using placeholder from HTML
    name: 'Premium PVC Hose', 
    sku: 'BFG-HSE-001', 
    price: 2500, 
    stock: 142, 
    status: 'In Stock', 
    statusColor: 'emerald' 
  },
  { 
    id: 2, 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxOdSM5FAyqDbHCVlIM-Lsq6DmRhSpFRRlwUZOn1Wdtqf1xXAgwjSM1wipci31NjsU9I30J3l_TP72utxvMgWSA2KfkhV5S19ezpJ4eIaJ1iNYo8GoOnx_WJDdDV2LibkWhzYXISIIDjiVOvZVBGA7XDfjCwGCnW8NVkE2dxIX0VZmVMQ9MhND04AJwpoRPc33QQ8Bm7D4v425ai0R-9Nkp9yJP9Wc0cJgd7ku2XphlgRiNYzVjPA1gjQLLESAMbDJyKZVsatqrCQ',
    name: 'Low Pressure Regulator', 
    sku: 'BFG-REG-450', 
    price: 4500, 
    stock: 85, 
    status: 'In Stock', 
    statusColor: 'emerald' 
  },
  { 
    id: 3, 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFMkbevOAT1ejduU7pT7f5UHt8T_dqts3uWEw8G12hUQicOqr_AI0nnPzIi2JSm5KdcE_1IPAvCHVXYf6oQotePc68LpT7OzxGcpFDsCq9_f1UmjJ-TRie6J1bidQJ_g8z86eAbppVmhyPYFi45TGLGLQE2xpPrFQwtURgkeOiE9OnTGy6j1lkyQdXRdNwQE8rhS4wIIGIuLW_QtXmxeC6ej4nfgeIY5iYZBeagmqjOKK8Rf0dNmQXzNmf8Lvvob744Lr3JUXkiJE',
    name: 'Steel Base Protector', 
    sku: 'BFG-STP-202', 
    price: 1800, 
    stock: 0, 
    status: 'Out of Stock', 
    statusColor: 'rose' 
  },
  { 
    id: 4, 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBH4efwY3EUjekGMqwCBU8k1YB3F86RuVsIHhqtzxFk2Gk_JvN7Pnq4TwnRbkHqLgKY5V2cTXmMdFMAtwJu9a7vv2sWfkdknGkflTouqHHUr5Hmp6mj7ei-lJm5UK92Gq9q5R8nqy8VLvHgkIidZssKuE05XAL7QFtT_hxRnA6DPRmW7WyqgG_x9qOg3skX9wVPVDPpD3mN-oek-sZgLrI_W_QOVzpCNwgBKM6gV0MTwarbf_QgK9s43OcHMrcGp7K80QkbWTcwaAk',
    name: 'Electronic Sparker', 
    sku: 'BFG-SPK-911', 
    price: 1200, 
    stock: 8, 
    status: 'Low Stock', 
    statusColor: 'amber' 
  },
];

export default function AccessoriesManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Accessories Management</h2>
          <p className="text-sm text-gray-400">Manage your inventory of gas stove accessories</p>
        </div>
        <button className="bg-blueflame hover:bg-blueflame-dark text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-blueflame/20">
          <Plus className="w-5 h-5" />
          Add New Accessory
        </button>
      </header>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Search and Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              className="w-full pl-10 pr-4 py-2.5 bg-[#121212] border border-white/10 rounded-lg focus:ring-1 focus:ring-blueflame focus:border-blueflame outline-none text-sm text-white transition-all placeholder:text-gray-500" 
              placeholder="Search accessories by name or SKU..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="px-4 py-2.5 bg-[#121212] border border-white/10 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-white/5 transition-colors text-white">
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* CRUD Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#121212] rounded-xl border border-white/5 overflow-hidden shadow-xl flex-1 flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="bg-black/40 border-b border-white/5">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider w-20">Image</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Price (₦)</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Stock Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {ACCESSORIES_DATA.map((item, index) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-12 h-12 rounded-lg bg-black/50 overflow-hidden flex items-center justify-center border border-white/10 group-hover:border-blueflame/50 transition-colors">
                        <div 
                          className="w-full h-full bg-cover bg-center" 
                          style={{ backgroundImage: `url('${item.image}')` }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-white group-hover:text-blueflame transition-colors">{item.name}</div>
                      <div className="text-xs text-gray-500">SKU: {item.sku}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-300">{item.price.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 object-contain">
                        <span className={`w-2 h-2 rounded-full ${
                          item.statusColor === 'emerald' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' :
                          item.statusColor === 'amber' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]' :
                          item.statusColor === 'rose' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]' : ''
                        }`}></span>
                        <span className={`text-xs font-medium ${
                          item.statusColor === 'emerald' ? 'text-emerald-400' :
                          item.statusColor === 'amber' ? 'text-amber-400' :
                          item.statusColor === 'rose' ? 'text-rose-400' : ''
                        }`}>
                          {item.status} {item.stock > 0 && `(${item.stock})`}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-blueflame hover:bg-blueflame/10 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors">
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
          <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between bg-black/20">
            <span className="text-xs text-gray-500">Showing 1 to 4 of 24 results</span>
            <div className="flex items-center gap-2">
              <button disabled className="p-2 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-white">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-white">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
