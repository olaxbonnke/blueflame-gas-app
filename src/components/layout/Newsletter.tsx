'use client';

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

export function Newsletter() {
  return (
    <section className="bg-[#0EA5E9] py-20">
      <div className="container mx-auto px-6 text-center">
        <FadeInView>
          <h2 className="text-3xl font-bold text-white mb-4">Never Run Out of Gas Again</h2>
          <p className="text-sky-100 mb-8 max-w-xl mx-auto">Get weekly price updates, safety reminders, and exclusive discount codes directly to your inbox.</p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input className="flex-grow px-6 py-4 rounded-full border-none focus:ring-2 focus:ring-[#F59E0B] text-[#0F1117] font-medium" placeholder="Enter your email address" required type="email" />
            <button className="px-8 py-4 bg-[#0F1117] text-white font-bold rounded-full hover:bg-[#11151C] transition-colors" type="submit">Subscribe</button>
          </form>
        </FadeInView>
      </div>
    </section>
  );
}
