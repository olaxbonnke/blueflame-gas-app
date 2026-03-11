'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Loader2, Save, X, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';
import { ImageUpload } from '@/components/admin/ImageUpload';

const CATEGORIES = ['Accessories', 'Regulators', 'Hoses', 'Burners', 'Cylinders', 'Other'];

function AccessoryForm({ item, onSave, onCancel, isSaving }: any) {
  const [name, setName] = useState(item?.name || '');
  const [category, setCategory] = useState(item?.category || 'Accessories');
  const [description, setDescription] = useState(item?.description || '');
  const [price, setPrice] = useState(item?.price?.toString() || '');
  const [stockStatus, setStockStatus] = useState(item?.stock_status || 'In Stock');
  const [imageUrl, setImageUrl] = useState(item?.image_url || '');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Product Name *</label>
          <input
            className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-blueflame focus:border-blueflame outline-none transition-colors text-sm"
            placeholder="e.g. High Pressure Regulator"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Category *</label>
          <select
            className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-blueflame outline-none appearance-none text-sm"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Price (₦) *</label>
          <input
            className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-blueflame focus:border-blueflame outline-none transition-colors text-sm"
            type="number"
            placeholder="e.g. 4500"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Stock Status</label>
          <select
            className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-blueflame outline-none appearance-none text-sm"
            value={stockStatus}
            onChange={e => setStockStatus(e.target.value)}
          >
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</label>
          <textarea
            className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-blueflame focus:border-blueflame outline-none transition-colors resize-none text-sm"
            rows={2}
            placeholder="Short product description..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Product Image</label>
          <ImageUpload
            bucket="accessories"
            currentUrl={imageUrl}
            onUploaded={url => setImageUrl(url)}
          />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors border border-white/10">
          Cancel
        </button>
        <button
          onClick={() => onSave({ name, category, description, price: parseFloat(price), stock_status: stockStatus, image_url: imageUrl })}
          disabled={isSaving || !name || !price}
          className="px-6 py-2 bg-blueflame disabled:opacity-50 text-sm font-bold text-white rounded-lg flex items-center gap-2 transition-all"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {item ? 'Save Changes' : 'Create Accessory'}
        </button>
      </div>
    </div>
  );
}

export default function AccessoriesManagementPage() {
  const [accessories, setAccessories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { fetchAccessories(); }, []);

  const fetchAccessories = async () => {
    setLoading(true);
    const { data } = await supabase.from('accessories').select('*').order('name');
    if (data) setAccessories(data);
    setLoading(false);
  };

  const handleSave = async (formData: any) => {
    if (isNaN(formData.price) || formData.price <= 0) { alert('Please enter a valid price.'); return; }
    setIsSaving(true);
    if (editItem) {
      const { error } = await supabase.from('accessories').update(formData).eq('id', editItem.id);
      if (!error) {
        setAccessories(accessories.map(a => a.id === editItem.id ? { ...a, ...formData } : a));
        setEditItem(null); setIsFormOpen(false);
      } else alert('Failed to update: ' + error.message);
    } else {
      const { data, error } = await supabase.from('accessories').insert([formData]).select().single();
      if (!error && data) {
        setAccessories([...accessories, data]);
        setIsFormOpen(false);
      } else alert('Failed to create: ' + error?.message);
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this accessory? It will no longer appear on the customer shop.')) return;
    const { error } = await supabase.from('accessories').delete().eq('id', id);
    if (!error) setAccessories(accessories.filter(a => a.id !== id));
    else alert('Failed to delete: ' + error.message);
  };

  const handleEdit = (item: any) => { setEditItem(item); setIsFormOpen(true); };
  const handleCancel = () => { setEditItem(null); setIsFormOpen(false); };

  const filtered = accessories.filter(a =>
    a.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusColor = (status: string) => {
    if (status === 'In Stock') return 'text-emerald-400';
    if (status === 'Low Stock') return 'text-amber-400';
    return 'text-rose-400';
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Accessories</h2>
          <p className="text-sm text-gray-400">{accessories.length} items in catalog — changes reflect live on the customer shop</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              className="pl-10 pr-4 py-2 bg-[#121212] border border-white/10 rounded-lg text-sm w-56 focus:ring-1 focus:ring-blueflame outline-none text-white placeholder:text-gray-500"
              placeholder="Search accessories..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => { setEditItem(null); setIsFormOpen(true); }}
            className="bg-blueflame hover:bg-blueflame-dark text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-blueflame/20"
          >
            <Plus className="w-4 h-4" /> Add Accessory
          </button>
        </div>
      </header>

      {isFormOpen && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#121212] border border-blueflame/30 rounded-xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-white">{editItem ? `Editing: ${editItem.name}` : 'New Accessory'}</h3>
            <button onClick={handleCancel} className="text-gray-500 hover:text-white p-1"><X className="w-5 h-5" /></button>
          </div>
          <AccessoryForm item={editItem} onSave={handleSave} onCancel={handleCancel} isSaving={isSaving} />
        </motion.div>
      )}

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blueflame animate-spin" />
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#121212] rounded-xl border border-white/5 overflow-hidden shadow-xl flex-1 flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="bg-black/40 border-b border-white/5">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider w-20">Image</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <Package className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-500">No accessories yet. Add your first product.</p>
                    </td>
                  </tr>
                ) : filtered.map(item => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-lg bg-black/50 overflow-hidden flex items-center justify-center border border-white/10 group-hover:border-blueflame/50 transition-colors">
                        {item.image_url
                          ? <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${item.image_url}')` }} />
                          : <Package className="w-5 h-5 text-gray-600" />
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-white group-hover:text-blueflame transition-colors">{item.name}</div>
                      <div className="text-xs text-gray-500 line-clamp-1">{item.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">{item.category || '—'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-white">₦{(item.price || 0).toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold ${statusColor(item.stock_status)}`}>{item.stock_status || 'In Stock'}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(item)} className="p-2 text-gray-400 hover:text-blueflame hover:bg-blueflame/10 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length > 0 && (
            <div className="px-6 py-4 border-t border-white/5 bg-black/20">
              <p className="text-xs text-gray-500">Showing {filtered.length} of {accessories.length} products</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
