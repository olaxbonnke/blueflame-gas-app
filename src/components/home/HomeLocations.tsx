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

export function HomeLocations() {
  return (
    <section className="bg-[#11151C] py-20 border-b border-white/5" id="locations">
      <div className="container mx-auto px-6">
        <FadeInView>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Find a Station Near You</h2>
            <p className="text-gray-400 mb-12 leading-relaxed">We are expanding rapidly across Nigeria to serve you better. Visit our hubs for instant refill services or bulk collection.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {/* Hub 1 */}
              <div className="flex flex-col items-center md:items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 transition-colors hover:border-[#0EA5E9]/30">
                <div className="w-10 h-10 rounded-full bg-[#0EA5E9]/20 flex items-center justify-center shrink-0 mb-2">
                  <svg className="w-6 h-6 text-[#0EA5E9]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-white">Lagos Hub</h4>
                  <p className="text-sm text-gray-500">12, Admiralty Way, Lekki Phase 1, Lagos State.</p>
                </div>
              </div>

              {/* Hub 2 */}
              <div className="flex flex-col items-center md:items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 transition-colors hover:border-[#0EA5E9]/30">
                <div className="w-10 h-10 rounded-full bg-[#0EA5E9]/20 flex items-center justify-center shrink-0 mb-2">
                  <svg className="w-6 h-6 text-[#0EA5E9]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-white">Abuja Station</h4>
                  <p className="text-sm text-gray-500">Plot 45, Wuse II District, FCT, Abuja.</p>
                </div>
              </div>

              {/* Hub 3 */}
              <div className="flex flex-col items-center md:items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 transition-colors hover:border-[#0EA5E9]/30">
                <div className="w-10 h-10 rounded-full bg-[#0EA5E9]/20 flex items-center justify-center shrink-0 mb-2">
                  <svg className="w-6 h-6 text-[#0EA5E9]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-white">PH Garden Hub</h4>
                  <p className="text-sm text-gray-500">99, Aba Road, Port Harcourt, Rivers State.</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
             <Link href="/locations" className="text-[#0EA5E9] font-bold text-sm tracking-wide hover:underline">View All Locations →</Link>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
