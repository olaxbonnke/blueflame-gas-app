'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function FadeInView({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.8, ease: "easeOut", delay }}>
      {children}
    </motion.div>
  );
}

const TIPS = [
  { num: "01", title: "Ventilation", desc: "Always ensure kitchen windows are open when cooking to allow airflow." },
  { num: "02", title: "Soap Test", desc: "Apply soapy water to connections. Bubbles indicate a leak. Never use fire!" },
  { num: "03", title: "Check Hoses", desc: "Inspect hoses regularly for cracks. Replace every 2 years or if damaged." },
  { num: "04", title: "Correct Height", desc: "Keep the cylinder upright. Never place it higher than your burner." },
  { num: "05", title: "Turn Off", desc: "Always turn off the regulator at night or when leaving home for long." },
];

export function HomeSafety() {
  return (
    <section className="bg-[#11151C] py-14 sm:py-20" id="safety">
      <div className="container mx-auto px-4 sm:px-6">
        <FadeInView>
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white">Safety First</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">Follow these simple guidelines to keep your home safe from gas-related accidents.</p>
          </div>
        </FadeInView>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {TIPS.map((tip, i) => (
            <FadeInView key={tip.num} delay={0.1 * (i + 1)}>
              <div className="bg-[#0F1117] p-4 sm:p-6 rounded-xl border-l-4 border-[#0EA5E9] h-full flex flex-col sm:block">
                <div className="flex sm:block items-center gap-3 mb-2 sm:mb-4">
                  <div className="text-[#0EA5E9] text-xl sm:text-3xl font-bold opacity-50 shrink-0">{tip.num}</div>
                  <h4 className="font-bold text-white sm:mt-0 sm:mb-2">{tip.title}</h4>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{tip.desc}</p>
              </div>
            </FadeInView>
          ))}
        </div>

        <FadeInView delay={0.6}>
          <div className="text-center mt-10 sm:mt-12">
            <Link href="/safety" className="px-6 sm:px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs sm:text-sm font-bold rounded-full transition-all inline-block">
              Read Full Safety Guide
            </Link>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
