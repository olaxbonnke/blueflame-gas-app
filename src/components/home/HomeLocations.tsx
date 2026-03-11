'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Loader2, MapPin, Phone } from 'lucide-react';

function FadeInView({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.8, ease: "easeOut", delay }}>
      {children}
    </motion.div>
  );
}

export function HomeLocations() {
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('branches')
        .select('id, name, address, phone')
        .order('name')
        .limit(3);
      if (data) setBranches(data);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <section className="bg-[#11151C] py-14 sm:py-20 border-b border-white/5" id="locations">
      <div className="container mx-auto px-4 sm:px-6">
        <FadeInView>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">Find a Station Near You</h2>
            <p className="text-gray-400 mb-8 sm:mb-12 leading-relaxed text-sm sm:text-base">
              We are expanding rapidly across Nigeria to serve you better. Visit our hubs for instant refill services or bulk collection.
            </p>

            {loading ? (
              <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 text-[#0EA5E9] animate-spin" /></div>
            ) : branches.length === 0 ? (
              <div className="py-10 text-center text-gray-500">
                <MapPin className="w-10 h-10 mx-auto mb-3 text-gray-700" />
                <p className="text-sm">No branch locations set up yet.</p>
              </div>
            ) : (
              <div className={`grid grid-cols-1 gap-3 sm:gap-6 text-left ${branches.length > 1 ? 'sm:grid-cols-2 lg:grid-cols-3' : ''}`}>
                {branches.map((branch, i) => (
                  <FadeInView key={branch.id} delay={0.15 * (i + 1)}>
                    <div className="flex items-start gap-3 sm:flex-col sm:items-center md:items-start sm:gap-4 p-4 sm:p-6 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 hover:border-[#0EA5E9]/30 transition-colors">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0EA5E9]/20 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-[#0EA5E9]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm sm:text-lg mb-0.5 sm:mb-1 text-white">{branch.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{branch.address}</p>
                        {branch.phone && (
                          <p className="text-xs text-[#0EA5E9] mt-1 flex items-center gap-1">
                            <Phone className="w-3 h-3" /> {branch.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </FadeInView>
                ))}
              </div>
            )}

            <FadeInView delay={0.5}>
              <div className="mt-8 sm:mt-10">
                <Link href="/locations" className="inline-flex items-center gap-2 text-[#0EA5E9] font-bold text-sm tracking-wide hover:underline">
                  View All Locations
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </Link>
              </div>
            </FadeInView>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
