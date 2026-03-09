'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Reusable scroll animation wrapper
function FadeInView({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

export default function LocationsPage() {
  return (
    <div className="bg-[#0F1117] min-h-screen text-[#E5E7EB] font-sans pt-28 pb-20">
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
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
                <span className="material-symbols-outlined text-[#0EA5E9] text-3xl">location_on</span>
                Our Hubs
              </h3>
              <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
                <button className="whitespace-nowrap px-4 py-2 rounded-lg bg-[#0EA5E9] text-white text-sm font-bold shadow-lg shadow-[#0EA5E9]/20">All Locations</button>
                <button className="whitespace-nowrap px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors text-sm font-bold">Near Me</button>
              </div>
            </div>
          </FadeInView>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Abuja HQ */}
            <FadeInView delay={0.2}>
              <div className="group relative p-8 rounded-3xl bg-[#11151C] border border-[#F59E0B]/30 shadow-xl shadow-[#F59E0B]/5 hover:shadow-[#F59E0B]/10 hover:border-[#F59E0B]/50 transition-all duration-300 flex flex-col h-full"> 
                <div className="flex justify-between items-start mb-6"> 
                  <div> 
                    <span className="inline-block px-3 py-1 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] text-[10px] font-black uppercase tracking-wider mb-3">Headquarters</span> 
                    <h4 className="text-2xl font-black text-white tracking-tight">Abuja Central</h4> 
                  </div> 
                  <div className="p-2 bg-[#F59E0B]/10 rounded-xl">
                    <span className="material-symbols-outlined text-[#F59E0B]">verified</span>
                  </div> 
                </div> 
                <p className="text-sm text-gray-400 mb-8 flex items-start gap-3 flex-grow leading-relaxed"> 
                  <span className="material-symbols-outlined text-[#0EA5E9] text-lg shrink-0 mt-0.5">location_on</span> 
                  14 Gana Street, Maitama District, Abuja, FCT. 
                </p> 
                <div className="flex flex-wrap gap-2 mb-8"> 
                  <span className="inline-flex items-center gap-2 text-[11px] font-bold bg-white/5 text-gray-300 px-3 py-1.5 rounded-full border border-white/10"> 
                    <span className="material-symbols-outlined text-[14px] text-[#0EA5E9]">schedule</span> 
                    07:00 AM - 09:00 PM 
                  </span> 
                </div> 
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/10"> 
                  <Link href="tel:+2348001234567" className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-bold text-white"> 
                    <span className="material-symbols-outlined text-lg">call</span> Call 
                  </Link> 
                  <Link href="#" className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all text-sm font-bold border border-emerald-500/20 shadow-lg shadow-emerald-500/5 hover:shadow-emerald-500/20"> 
                    <span className="material-symbols-outlined text-lg">chat</span> WhatsApp 
                  </Link> 
                </div> 
              </div> 
            </FadeInView>

            {/* Lagos Hub */}
            <FadeInView delay={0.3}>
              <div className="group relative p-8 rounded-3xl bg-[#11151C] border border-white/10 hover:border-[#0EA5E9]/50 transition-all duration-300 flex flex-col h-full shadow-lg hover:shadow-2xl"> 
                <div className="flex justify-between items-start mb-6"> 
                  <div> 
                    <span className="inline-block px-3 py-1 rounded-full bg-[#0EA5E9]/10 text-[#0EA5E9] text-[10px] font-black uppercase tracking-wider mb-3">2.4km Away</span> 
                    <h4 className="text-2xl font-black text-white tracking-tight">Lagos Island</h4> 
                  </div> 
                </div> 
                <p className="text-sm text-gray-400 mb-8 flex items-start gap-3 flex-grow leading-relaxed"> 
                  <span className="material-symbols-outlined text-[#0EA5E9] text-lg shrink-0 mt-0.5">location_on</span> 
                  Plot 42, Admiralty Way, Lekki Phase 1, Lagos. 
                </p> 
                <div className="flex flex-wrap gap-2 mb-8"> 
                  <span className="inline-flex items-center gap-2 text-[11px] font-bold bg-[#0EA5E9]/10 text-[#0EA5E9] px-3 py-1.5 rounded-full border border-[#0EA5E9]/20"> 
                    <span className="material-symbols-outlined text-[14px]">bolt</span> 
                    24/7 Service Available 
                  </span> 
                </div> 
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/10"> 
                  <Link href="tel:+2348001234568" className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-bold text-white"> 
                    <span className="material-symbols-outlined text-lg">call</span> Call 
                  </Link> 
                  <Link href="#" className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all text-sm font-bold border border-emerald-500/20 shadow-lg shadow-emerald-500/5 hover:shadow-emerald-500/20"> 
                    <span className="material-symbols-outlined text-lg">chat</span> WhatsApp 
                  </Link> 
                </div> 
              </div> 
            </FadeInView>

            {/* Port Harcourt Hub */}
            <FadeInView delay={0.4}>
              <div className="group relative p-8 rounded-3xl bg-[#11151C] border border-white/10 hover:border-[#0EA5E9]/50 transition-all duration-300 flex flex-col h-full shadow-lg hover:shadow-2xl"> 
                <div className="flex justify-between items-start mb-6"> 
                  <div> 
                    <h4 className="text-2xl font-black text-white tracking-tight mt-[34px]">Port Harcourt</h4> 
                  </div> 
                </div> 
                <p className="text-sm text-gray-400 mb-8 flex items-start gap-3 flex-grow leading-relaxed"> 
                  <span className="material-symbols-outlined text-[#0EA5E9] text-lg shrink-0 mt-0.5">location_on</span> 
                  112 Olu Obasanjo Road, GRA, Port Harcourt. 
                </p> 
                <div className="flex flex-wrap gap-2 mb-8"> 
                  <span className="inline-flex items-center gap-2 text-[11px] font-bold bg-white/5 text-gray-300 px-3 py-1.5 rounded-full border border-white/10"> 
                    <span className="material-symbols-outlined text-[14px] text-[#0EA5E9]">schedule</span> 
                    08:00 AM - 08:00 PM 
                  </span> 
                </div> 
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/10"> 
                  <Link href="tel:+2348001234569" className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-bold text-white"> 
                    <span className="material-symbols-outlined text-lg">call</span> Call 
                  </Link> 
                  <Link href="#" className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all text-sm font-bold border border-emerald-500/20 shadow-lg shadow-emerald-500/5 hover:shadow-emerald-500/20"> 
                    <span className="material-symbols-outlined text-lg">chat</span> WhatsApp 
                  </Link> 
                </div> 
              </div>
            </FadeInView>

          </div>
        </div>
      </main>
    </div>
  );
}
