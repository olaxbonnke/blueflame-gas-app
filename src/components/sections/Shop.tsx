'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/lib/store';
import { supabase } from '@/lib/supabase/client';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart, Flame } from 'lucide-react';

const CYLINDER_SIZES = [
  { id: 'gas-3kg', name: '3kg Refill', weight: 3, image: '/cylinders/3kg.png' },
  { id: 'gas-6kg', name: '6kg Refill', weight: 6, image: '/cylinders/6kg.png' },
  { id: 'gas-12.5kg', name: '12.5kg Refill', weight: 12.5, image: '/cylinders/12kg.png' },
  { id: 'gas-50kg', name: '50kg Refill', weight: 50, image: '/cylinders/50kg.png' },
];

export function Shop() {
  const [pricePerKg, setPricePerKg] = useState<number | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    // Fetch initial price
    const fetchPrice = async () => {
      const { data, error } = await supabase
        .from('prices')
        .select('lpg_price_per_kg')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();
      
      if (data) setPricePerKg(data.lpg_price_per_kg);
    };

    fetchPrice();

    // Subscribe to real-time price changes
    const channel = supabase
      .channel('public:prices')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'prices' }, (payload) => {
        // payload.new contains the updated row
        if (payload.new && 'lpg_price_per_kg' in payload.new) {
          setPricePerKg(payload.new.lpg_price_per_kg);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleAddToCart = (item: typeof CYLINDER_SIZES[0]) => {
    if (!pricePerKg) return;
    addItem({
      id: item.id,
      name: item.name,
      price: item.weight * pricePerKg,
      qty: 1,
      image: item.image,
    });
  };

  return (
    <section id="shop" className="py-24 bg-[#0a0a0a] relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Order Gas Refill
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400"
            >
              Select your cylinder size. Prices update in real-time based on the current market rate.
            </motion.p>
          </div>
          
          {pricePerKg ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-6 md:mt-0 p-4 rounded-xl bg-blueflame/10 border border-blueflame/20 flex flex-col items-end"
            >
              <span className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Current Rate</span>
              <span className="text-2xl font-bold text-blueflame">{formatPrice(pricePerKg)}/kg</span>
            </motion.div>
          ) : (
            <div className="mt-6 md:mt-0 p-4 rounded-xl bg-white/5 animate-pulse w-40 h-16" />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CYLINDER_SIZES.map((size, index) => {
            const calculatedPrice = pricePerKg ? size.weight * pricePerKg : null;

            return (
              <motion.div
                key={size.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1e1e1e] rounded-2xl p-6 border border-white/5 hover:border-blueflame/50 transition-colors flex flex-col h-full"
              >
                <div className="w-full h-48 bg-[#121212] rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
                  {/* Fallback box if image missing */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <Flame className="w-24 h-24 text-gray-500" />
                  </div>
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium border border-white/10">
                    {size.weight}KG
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{size.name}</h3>
                
                <div className="mt-auto pt-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Total Price</p>
                    {calculatedPrice ? (
                      <p className="text-lg font-bold text-white">{formatPrice(calculatedPrice)}</p>
                    ) : (
                      <div className="h-6 w-20 bg-white/10 animate-pulse rounded" />
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(size)}
                    disabled={!pricePerKg}
                    className="w-12 h-12 rounded-full bg-blueflame flex items-center justify-center hover:bg-white transition-colors group disabled:opacity-50 disabled:hover:bg-blueflame"
                  >
                    <ShoppingCart className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
