'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container mx-auto px-6 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Safe Cooking Gas, <br/><span className="text-[#0EA5E9]">Delivered Fast</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Reliable refills, installations, repairs & accessories delivered across Nigeria. Quality you can trust, speed you can depend on.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/shop" className="px-12 py-4 bg-[#0EA5E9] hover:bg-sky-400 text-white font-bold rounded-full transition-all transform hover:-translate-y-1 shadow-xl shadow-[#0EA5E9]/20">
              Order Now
            </Link>
            <Link href="#contact" className="px-12 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-bold rounded-full transition-all backdrop-blur-sm">
              Contact Us
            </Link>
          </div>

          {/* Price Ticker */}
          <div className="max-w-5xl mx-auto rounded-2xl p-6 md:p-10 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-around gap-8">
              <div className="flex flex-col items-center md:items-start shrink-0">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#0EA5E9] font-bold mb-2">Live Market Rate</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white tracking-tighter">₦1,100</span>
                  <span className="text-xs text-white/40 font-medium uppercase tracking-widest">/ 1kg</span>
                </div>
              </div>
              <div className="hidden md:block h-16 w-px bg-white/10"></div>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 flex-grow w-full">
                <div className="flex flex-col items-center md:items-start group cursor-default text-center md:text-left">
                  <span className="text-[11px] text-white/40 font-bold mb-1 group-hover:text-[#0EA5E9] transition-colors">3KG</span>
                  <span className="text-lg font-bold text-white">₦3,300</span>
                </div>
                <div className="flex flex-col items-center md:items-start group cursor-default text-center md:text-left">
                  <span className="text-[11px] text-white/40 font-bold mb-1 group-hover:text-[#0EA5E9] transition-colors">6KG</span>
                  <span className="text-lg font-bold text-white">₦6,600</span>
                </div>
                <div className="flex flex-col items-center md:items-start group cursor-default text-center md:text-left">
                  <span className="text-[11px] text-white/40 font-bold mb-1 group-hover:text-[#0EA5E9] transition-colors">12.5KG</span>
                  <span className="text-lg font-bold text-[#F59E0B]">₦13,750</span>
                </div>
                <div className="flex flex-col items-center md:items-start group cursor-default text-center md:text-left">
                  <span className="text-[11px] text-white/40 font-bold mb-1 group-hover:text-[#0EA5E9] transition-colors">25KG</span>
                  <span className="text-lg font-bold text-white">₦27,500</span>
                </div>
                <div className="flex flex-col items-center md:items-start group cursor-default text-center md:text-left">
                  <span className="text-[11px] text-white/40 font-bold mb-1 group-hover:text-[#0EA5E9] transition-colors">50KG</span>
                  <span className="text-lg font-bold text-[#0EA5E9]">₦55,000</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
