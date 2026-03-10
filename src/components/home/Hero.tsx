'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

const CYLINDER_SIZES = [
  { label: '3KG', kg: 3 },
  { label: '6KG', kg: 6 },
  { label: '12.5KG', kg: 12.5 },
  { label: '25KG', kg: 25 },
  { label: '50KG', kg: 50 },
];

function PriceTicker() {
  const [pricePerKg, setPricePerKg] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      const { data } = await supabase
        .from('prices')
        .select('lpg_price_per_kg')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (data?.lpg_price_per_kg) setPricePerKg(data.lpg_price_per_kg);
    };
    fetchPrice();
  }, []);

  const fmt = (n: number) => `₦${Math.round(n).toLocaleString()}`;

  return (
    <div className="max-w-5xl mx-auto rounded-2xl p-6 md:p-10 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-around gap-8">
        <div className="flex flex-col items-center md:items-start shrink-0">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#0EA5E9] font-bold mb-2">Live Market Rate</span>
          {pricePerKg === null ? (
            <Loader2 className="w-8 h-8 text-[#0EA5E9] animate-spin mt-1" />
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white tracking-tighter">{fmt(pricePerKg)}</span>
              <span className="text-xs text-white/40 font-medium uppercase tracking-widest">/ 1kg</span>
            </div>
          )}
        </div>

        <div className="hidden md:block h-16 w-px bg-white/10"></div>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 flex-grow w-full">
          {CYLINDER_SIZES.map((cyl) => {
            const highlight =
              cyl.label === '12.5KG' ? 'text-[#F59E0B]' :
                cyl.label === '50KG' ? 'text-[#0EA5E9]' : 'text-white';
            return (
              <div key={cyl.label} className="flex flex-col items-center md:items-start group cursor-default text-center md:text-left">
                <span className="text-[11px] text-white/40 font-bold mb-1 group-hover:text-[#0EA5E9] transition-colors">{cyl.label}</span>
                {pricePerKg === null ? (
                  <span className="text-sm text-white/20">—</span>
                ) : (
                  <span className={`text-lg font-bold ${highlight}`}>{fmt(pricePerKg * cyl.kg)}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-[120px] pb-10 md:pt-20 md:pb-0">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container mx-auto px-6 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
            BlueFlame Quality, <br />
            <span className="text-[#0EA5E9]">your Reliable Gas Supply</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Reliable refills, installations, repairs &amp; accessories delivered to you. Best Quality in service you can rely on.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/shop" className="px-12 py-4 bg-[#0EA5E9] hover:bg-sky-400 text-white font-bold rounded-full transition-all transform hover:-translate-y-1 shadow-xl shadow-[#0EA5E9]/20">
              Order Now
            </Link>
            <Link href="#contact" className="px-12 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-bold rounded-full transition-all backdrop-blur-sm">
              Contact Us
            </Link>
          </div>

          <PriceTicker />
        </motion.div>
      </div>
    </section>
  );
}
