'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function FadeInView({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export function HomeSafety() {
  return (
    <section className="bg-[#11151C] py-20" id="safety">
      <div className="container mx-auto px-6">
        <FadeInView>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Safety First</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Follow these simple guidelines to keep your home safe from gas-related accidents.</p>
          </div>
        </FadeInView>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <FadeInView delay={0.1}>
            <div className="bg-[#0F1117] p-6 rounded-xl border-l-4 border-[#0EA5E9] h-full">
              <div className="text-[#0EA5E9] text-3xl font-bold mb-4 opacity-50">01</div>
              <h4 className="font-bold mb-2 text-white">Ventilation</h4>
              <p className="text-sm text-gray-400">Always ensure kitchen windows are open when cooking to allow airflow.</p>
            </div>
          </FadeInView>

          <FadeInView delay={0.2}>
            <div className="bg-[#0F1117] p-6 rounded-xl border-l-4 border-[#0EA5E9] h-full">
              <div className="text-[#0EA5E9] text-3xl font-bold mb-4 opacity-50">02</div>
              <h4 className="font-bold mb-2 text-white">Soap Test</h4>
              <p className="text-sm text-gray-400">Apply soapy water to connections. Bubbles indicate a leak. Never use fire!</p>
            </div>
          </FadeInView>

          <FadeInView delay={0.3}>
            <div className="bg-[#0F1117] p-6 rounded-xl border-l-4 border-[#0EA5E9] h-full">
              <div className="text-[#0EA5E9] text-3xl font-bold mb-4 opacity-50">03</div>
              <h4 className="font-bold mb-2 text-white">Check Hoses</h4>
              <p className="text-sm text-gray-400">Inspect hoses regularly for cracks. Replace every 2 years or if damaged.</p>
            </div>
          </FadeInView>

          <FadeInView delay={0.4}>
            <div className="bg-[#0F1117] p-6 rounded-xl border-l-4 border-[#0EA5E9] h-full">
              <div className="text-[#0EA5E9] text-3xl font-bold mb-4 opacity-50">04</div>
              <h4 className="font-bold mb-2 text-white">Correct Height</h4>
              <p className="text-sm text-gray-400">Keep the cylinder upright. Never place it higher than your burner.</p>
            </div>
          </FadeInView>

          <FadeInView delay={0.5}>
            <div className="bg-[#0F1117] p-6 rounded-xl border-l-4 border-[#0EA5E9] h-full">
              <div className="text-[#0EA5E9] text-3xl font-bold mb-4 opacity-50">05</div>
              <h4 className="font-bold mb-2 text-white">Turn Off Offs</h4>
              <p className="text-sm text-gray-400">Always turn off the regulator at night or when leaving home for long.</p>
            </div>
          </FadeInView>
        </div>

        <FadeInView delay={0.6}>
          <div className="text-center mt-12">
            <Link href="/safety" className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold rounded-full transition-all inline-block">
              Read Full Safety Guide
            </Link>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
