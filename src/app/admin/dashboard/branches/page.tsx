'use client';

import { useState, useEffect } from 'react';
import { Home, Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Loader2, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';

export default function BranchManagementPage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedBranch, setSelectedBranch] = useState<any | null>(null);
  const [isAddingMode, setIsAddingMode] = useState(false);

  // Edit State
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editCoords, setEditCoords] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    setLoading(true);
    const { data } = await supabase.from('branches').select('*').order('name');
    if (data) {
      setBranches(data);
      if (data.length > 0) handleSelectBranch(data[0]);
      else setIsAddingMode(true);
    }
    setLoading(false);
  };

  const handleSelectBranch = (branch: any) => {
    setIsAddingMode(false);
    setSelectedBranch(branch);
    setEditName(branch.name);
    setEditPhone(branch.phone);
    setEditAddress(branch.address);
    setEditCoords(branch.coordinates || '');
  };

  const handleCreateNew = () => {
    setSelectedBranch(null);
    setIsAddingMode(true);
    setEditName('');
    setEditPhone('');
    setEditAddress('');
    setEditCoords('');
  };

  const handleSave = async () => {
    if (!editName || !editAddress || !editPhone) {
        alert("Please fill in the required fields (Name, Phone, Address)");
        return;
    }
    
    setIsSaving(true);
    if (isAddingMode) {
      const { data, error } = await supabase.from('branches').insert([{
         name: editName,
         address: editAddress,
         phone: editPhone,
         coordinates: editCoords || null
      }]).select().single();
      
      if (!error && data) {
         setBranches([...branches, data]);
         handleSelectBranch(data);
      } else {
         alert("Failed to create branch: " + error?.message);
      }
    } else if (selectedBranch) {
      const { error } = await supabase.from('branches').update({
         name: editName,
         address: editAddress,
         phone: editPhone,
         coordinates: editCoords || null
      }).eq('id', selectedBranch.id);
      
      if (!error) {
         setBranches(branches.map(b => b.id === selectedBranch.id ? { ...b, name: editName, address: editAddress, phone: editPhone, coordinates: editCoords } : b));
      } else {
         alert("Failed to update branch: " + error?.message);
      }
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string, e: any) => {
     e.stopPropagation();
     if (confirm("Are you sure you want to delete this branch?")) {
         const { error } = await supabase.from('branches').delete().eq('id', id);
         if (!error) {
            const updated = branches.filter(b => b.id !== id);
            setBranches(updated);
            if (selectedBranch?.id === id) {
               if (updated.length > 0) handleSelectBranch(updated[0]);
               else handleCreateNew();
            }
         } else {
            alert("Failed to delete branch. Ensure there are no active orders tied to it.");
         }
     }
  };

  const filteredBranches = branches.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <button 
            onClick={handleCreateNew}
            className="bg-blueflame hover:bg-blueflame-dark text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blueflame/20 flex-1 sm:flex-none"
          >
            <Plus className="w-4 h-4" />
            Add New Branch
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-1 mb-2">
        <h2 className="text-2xl font-bold tracking-tight">Manage Locations</h2>
        <p className="text-gray-400 text-sm">Oversee and edit your gas distribution hubs and regional stations across the network.</p>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-blueflame animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
          {/* Table Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 bg-[#121212] border border-white/5 rounded-xl overflow-hidden shadow-xl flex flex-col h-full">
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead className="bg-black/40">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-white/5">Branch Name</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-white/5">Full Address</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-white/5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredBranches.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-gray-500">No branches found.</td>
                    </tr>
                  ) : (
                    filteredBranches.map((branch) => (
                      <tr 
                        key={branch.id} 
                        className={`transition-colors cursor-pointer ${selectedBranch?.id === branch.id ? 'bg-white/5' : 'hover:bg-white/[0.02]'}`}
                        onClick={() => handleSelectBranch(branch)}
                      >
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-white">{branch.name}</span>
                          </div>
                          <div className="text-gray-500 text-xs mt-1">{branch.phone}</div>
                        </td>
                        <td className="px-6 py-5 text-gray-400 text-sm max-w-[200px] xl:max-w-[250px] truncate" title={branch.address}>
                          {branch.address}
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-gray-500 hover:text-blueflame hover:bg-blueflame/10 rounded-lg transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              className="p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors" 
                              onClick={(e) => handleDelete(branch.id, e)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Simple Pagination Footer Placeholder */}
            {filteredBranches.length > 0 && (
                <div className="px-6 py-4 border-t border-white/5 bg-black/20 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <p className="text-xs text-gray-500">Total: {filteredBranches.length} locations</p>
                </div>
            )}
            
          </motion.div>

          {/* Detail/Edit Panel */}
          {(selectedBranch || isAddingMode) && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-1 bg-[#121212] border border-white/5 rounded-xl p-6 shadow-xl h-fit sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-white">
                  {isAddingMode ? 'Create New Branch' : `Edit ${selectedBranch.name}`}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Branch Name *</label>
                  <input 
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-blueflame focus:border-blueflame outline-none transition-colors" 
                    type="text" 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="e.g. Lagos Hub"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Phone Number *</label>
                  <input 
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-blueflame focus:border-blueflame outline-none transition-colors" 
                    type="text" 
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="e.g. +234 800 000 0000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Full Address *</label>
                  <textarea 
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-blueflame focus:border-blueflame outline-none transition-colors resize-none" 
                    rows={2}
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    placeholder="Physical address"
                  />
                </div>
                
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Coordinates (Optional)</label>
                    <input 
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-blueflame focus:border-blueflame outline-none transition-colors text-sm" 
                    type="text" 
                    value={editCoords}
                    onChange={(e) => setEditCoords(e.target.value)}
                    placeholder="e.g. 6.5244° N, 3.3792° E"
                    />
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
                {isAddingMode && branches.length > 0 && (
                   <button 
                     onClick={() => handleSelectBranch(branches[0])}
                     className="px-4 py-2 bg-transparent hover:bg-white/5 border border-white/10 text-sm font-medium text-gray-300 rounded-lg transition-colors w-full sm:w-auto"
                   >
                     Cancel
                   </button>
                )}
                <button 
                   onClick={handleSave}
                   disabled={isSaving}
                   className="bg-blueflame disabled:opacity-50 px-6 py-2 text-sm font-bold text-white rounded-lg shadow-[0_0_15px_rgba(10,160,235,0.3)] hover:shadow-[0_0_25px_rgba(10,160,235,0.5)] transition-all w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4"/>}
                  {isAddingMode ? 'Create Branch' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          )}

        </div>
      )}
    </div>
  );
}
