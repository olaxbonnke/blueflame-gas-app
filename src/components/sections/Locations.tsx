'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';
import { MapPin, Phone, ArrowUpRight } from 'lucide-react';

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export function Locations() {
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    const fetchBranches = async () => {
      const { data } = await supabase.from('branches').select('*').order('name');
      if (data) setBranches(data);
    };

    fetchBranches();
  }, []);

  return (
    <section id="locations" className="py-24 bg-[#0a0a0a] relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          <div className="w-full md:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Find Us Near You
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 mb-10"
            >
              With multiple branches across the region, BlueFlame is always within reach for quick pickups and fast deliveries.
            </motion.p>

            <div className="space-y-4">
              {branches.length > 0 ? (
                branches.map((branch, i) => (
                  <motion.div 
                    key={branch.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="p-6 rounded-2xl bg-[#1e1e1e] border border-white/5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 group hover:border-blueflame/50 transition-colors"
                  >
                    <div>
                      <h3 className="text-xl font-semibold flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-blueflame" />
                        {branch.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-1">{branch.address}</p>
                      <p className="text-gray-300 text-sm flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        {branch.phone}
                      </p>
                    </div>
                    <a 
                      href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-white/5 group-hover:bg-blueflame group-hover:text-black transition-colors"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </motion.div>
                ))
              ) : (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-28 rounded-2xl bg-white/5 animate-pulse" />
                  ))}
                </div>
              )}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-[600px] rounded-3xl overflow-hidden relative border border-white/10 bg-[#1e1e1e]"
          >
             {/* Map Placeholder */}
             <div className="absolute inset-0 bg-[url('/map-placeholder.png')] bg-cover bg-center opacity-40 mix-blend-luminosity" />
             <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
                <div className="p-4 bg-black/80 rounded-2xl border border-white/10 text-center">
                  <MapPin className="w-8 h-8 text-blueflame mx-auto mb-2" />
                  <p className="font-medium">Interactive Map View</p>
                  <p className="text-sm text-gray-400">Loading locations mapping...</p>
                </div>
             </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
