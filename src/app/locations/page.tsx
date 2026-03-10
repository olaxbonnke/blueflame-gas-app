'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Loader2, MapPin, Phone } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

function FadeInView({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.8, ease: "easeOut", delay }} className={className || "h-full"}>
      {children}
    </motion.div>
  );
}

export default function LocationsPage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      const { data } = await supabase.from('branches').select('*').order('name');
      if (data) setBranches(data);
      setLoading(false);
    };
    fetchBranches();
  }, []);

  const whatsappUrl = (phone: string) => `https://wa.me/${phone.replace(/\D/g, '')}`;

  return (
    <div className="bg-[#0F1117] min-h-screen text-[#E5E7EB] font-sans pt-28 pb-20">
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center lg:text-left">
          <FadeInView>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]">
              Fueling <span className="text-[#0EA5E9]">Nigeria</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Discover our strategically located hubs providing premium LPG solutions across the nation. Fast, safe, and reliable energy for every home.
            </p>
          </FadeInView>
        </div>

        <div className="flex flex-col gap-8">
          <FadeInView delay={0.1}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <h3 className="text-2xl font-bold flex items-center gap-3 text-white">
                <MapPin className="text-[#0EA5E9] w-7 h-7" />
                Our Hubs {!loading && <span className="text-gray-500 text-base font-normal">({branches.length} locations)</span>}
              </h3>
            </div>
          </FadeInView>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 text-[#0EA5E9] animate-spin" />
            </div>
          ) : branches.length === 0 ? (
            <FadeInView delay={0.2}>
              <div className="py-20 text-center text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-700" />
                <p>No branch locations set up yet. Check back soon!</p>
              </div>
            </FadeInView>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {branches.map((branch, idx) => (
                <FadeInView key={branch.id} delay={0.2 + idx * 0.1}>
                  <div className="group relative p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#11151C] border border-white/10 hover:border-[#0EA5E9]/50 transition-all duration-300 flex flex-col h-full shadow-lg hover:shadow-2xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-6 gap-2">
                      <div>
                        <h4 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-tight group-hover:text-[#0EA5E9] transition-colors">
                          {branch.name}
                        </h4>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-8 flex items-start gap-2 sm:gap-3 flex-grow leading-relaxed">
                      <MapPin className="text-[#0EA5E9] w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" />
                      {branch.address}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-8">
                      <span className="inline-flex items-center gap-1 sm:gap-2 text-[10px] sm:text-[11px] font-bold bg-white/5 text-gray-300 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10">
                        <Phone className="w-3 h-3 text-[#0EA5E9]" />
                        {branch.phone}
                      </span>
                    </div>

                    <div className="flex flex-col xl:flex-row gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-white/10">
                      <Link href={`tel:${branch.phone}`} className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3.5 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-xs sm:text-sm font-bold text-white">
                        <Phone className="w-4 h-4 hidden sm:block" />
                        <span>Call</span>
                      </Link>
                      <Link href={whatsappUrl(branch.phone)} target="_blank" className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3.5 rounded-lg sm:rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all text-xs sm:text-sm font-bold border border-emerald-500/20">
                        <span>WhatsApp</span>
                      </Link>
                    </div>
                  </div>
                </FadeInView>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
