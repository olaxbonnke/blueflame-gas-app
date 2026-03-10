'use client';

import { useState, useEffect } from 'react';
import { Search, Bell, Flame, Globe, Save, Loader2, ArrowUpRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';
import { formatPrice } from '@/lib/utils';

export default function PricingInventoryPage() {
  const [globalPrice, setGlobalPrice] = useState<number>(0);
  const [priceId, setPriceId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<string>('');

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchGlobalPrice();
  }, []);

  const fetchGlobalPrice = async () => {
    setLoading(true);
    // Get the most recently inserted/updated price row
    const { data, error } = await supabase
      .from('prices')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (data) {
      setGlobalPrice(data.lpg_price_per_kg);
      setEditPrice(data.lpg_price_per_kg.toString());
      setPriceId(data.id);
    } else if (error) {
      console.error('[Pricing] fetch error:', error.message);
    }
    setLoading(false);
  };

  const handleUpdatePrice = async () => {
    const newPrice = parseFloat(editPrice);
    if (isNaN(newPrice) || newPrice <= 0) {
      alert('Please enter a valid price greater than 0.');
      return;
    }

    setIsSaving(true);

    if (priceId) {
      // Update existing row
      const { error } = await supabase
        .from('prices')
        .update({ lpg_price_per_kg: newPrice, updated_at: new Date().toISOString() })
        .eq('id', priceId);

      if (!error) {
        setGlobalPrice(newPrice);
      } else {
        console.error('[Pricing] update error:', error);
        alert(`Failed to update price: ${error.message}`);
      }
    } else {
      // No row yet — insert one
      const { data, error } = await supabase
        .from('prices')
        .insert([{ lpg_price_per_kg: newPrice }])
        .select()
        .single();

      if (!error && data) {
        setGlobalPrice(newPrice);
        setPriceId(data.id);
      } else {
        console.error('[Pricing] insert error:', error);
        alert(`Failed to set price: ${error?.message}`);
      }
    }

    setIsSaving(false);
  };

  return (
    <div className="flex flex-col h-full space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-bold tracking-tight">Pricing & Inventory</h2>
        </div>
      </header>

      {/* Global Price Control Panel */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#121212] border border-blueflame/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blueflame/5 rounded-bl-[100px] pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blueflame/10 flex items-center justify-center border border-blueflame/20">
                <Globe className="w-5 h-5 text-blueflame" />
              </div>
              <h3 className="text-xl font-black text-white">Global LPG Rate</h3>
            </div>
            <p className="text-gray-400 text-sm max-w-md">This is the master price per kilogram of gas. Updating this instantly syncs your entire live website and customer carts.</p>
          </div>

          {loading ? (
            <div className="animate-pulse flex items-center gap-4">
              <div className="h-16 w-32 bg-white/5 rounded-xl"></div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-end gap-4 w-full lg:w-auto">
              <div className="space-y-1 w-full sm:w-auto">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Current Rate per KG</label>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-black text-blueflame drop-shadow-[0_0_15px_rgba(10,160,235,0.4)]">
                    {formatPrice(globalPrice)}
                  </span>
                </div>
              </div>

              <div className="w-[1px] h-12 bg-white/10 hidden sm:block mx-2"></div>

              <div className="flex items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                <div className="relative flex-1 sm:w-32">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₦</span>
                  <input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="w-full bg-black border border-white/20 rounded-xl pl-8 pr-4 py-3 text-lg font-bold text-white focus:ring-2 focus:ring-blueflame focus:border-blueflame outline-none transition-all"
                  />
                </div>
                <button
                  onClick={handleUpdatePrice}
                  disabled={isSaving || parseFloat(editPrice) === globalPrice}
                  className="bg-blueflame hover:bg-blueflame-dark disabled:opacity-50 disabled:hover:bg-blueflame text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blueflame/20 flex items-center gap-2 h-full"
                >
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  Update Site
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#121212] border border-white/5 p-6 rounded-xl hover:border-emerald-500/30 transition-colors">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Average Order Size</p>
          <div className="flex items-end justify-between mt-2">
            <span className="text-3xl font-black text-white">14.2 kg</span>
            <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Standard
            </span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#121212] border border-white/5 p-6 rounded-xl hover:border-blueflame/30 transition-colors">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Live Carts</p>
          <div className="flex items-end justify-between mt-2">
            <span className="text-3xl font-black text-white">18</span>
            <span className="text-blueflame text-xs font-bold flex items-center gap-1">
              Active Sessions
            </span>
          </div>
        </motion.div>
      </div>

      {/* Informational UI about Phase 2 Inventory */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#121212] border border-white/5 rounded-xl overflow-hidden shadow-xl flex flex-col flex-1 p-8 items-center justify-center text-center opacity-70">
        <Flame className="w-16 h-16 text-gray-600 mb-6" />
        <h3 className="text-2xl font-bold text-white mb-2">Cylinder Stock Tracking API</h3>
        <p className="text-gray-400 max-w-lg mb-8">
          We are currently tracking your business holistically via fluid metrics. Individual cylinder barcode tracking, refill queue syncs, and warehouse multi-location counts will be activated in Phase 2 of the BlueFlame software rollout.
        </p>
        <button disabled className="px-6 py-3 rounded-lg border border-white/10 text-gray-500 font-bold flex items-center gap-2 cursor-not-allowed">
          Manage Cylinders <ArrowUpRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}
