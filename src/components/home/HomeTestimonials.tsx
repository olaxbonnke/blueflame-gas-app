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

export function HomeTestimonials() {
  return (
    <section className="bg-[#0F1117] py-20">
      <div className="container mx-auto px-6">
        <FadeInView>
          <h2 className="text-3xl font-bold text-center mb-16 text-white">Trusted by 10,000+ Nigerians</h2>
        </FadeInView>
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
          <FadeInView delay={0.1}>
            <div className="bg-white/5 p-4 sm:p-6 rounded-2xl h-full flex flex-col">
              <div className="flex text-[#F59E0B] mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path></svg>
                ))}
              </div>
              <p className="text-gray-300 italic mb-4 sm:mb-6 flex-grow text-[11px] sm:text-base leading-relaxed">"Fastest delivery I've experienced in Lagos. Within 30 minutes, they were at my door. Five stars!"</p>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0EA5E9]/20 flex items-center justify-center font-bold text-[#0EA5E9] text-xs sm:text-base">OA</div>
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-white leading-tight">Olabisi Adeyemi</h5>
                  <span className="text-[10px] sm:text-xs text-gray-500">Lekki, Lagos</span>
                </div>
              </div>
            </div>
          </FadeInView>

          <FadeInView delay={0.2}>
            <div className="bg-white/5 p-4 sm:p-6 rounded-2xl h-full flex flex-col">
              <div className="flex text-[#F59E0B] mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path></svg>
                ))}
              </div>
              <p className="text-gray-300 italic mb-4 sm:mb-6 flex-grow text-[11px] sm:text-base leading-relaxed">"Professional installation for our restaurant. The BlueFlame team knows their stuff. Highly recommended."</p>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0EA5E9]/20 flex items-center justify-center font-bold text-[#0EA5E9] text-xs sm:text-base">CN</div>
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-white leading-tight">Chidi Nwosu</h5>
                  <span className="text-[10px] sm:text-xs text-gray-500">Garki, Abuja</span>
                </div>
              </div>
            </div>
          </FadeInView>

          <FadeInView delay={0.3}>
            <div className="bg-white/5 p-4 sm:p-6 rounded-2xl h-full flex flex-col">
              <div className="flex text-[#F59E0B] mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path></svg>
                ))}
              </div>
              <p className="text-gray-300 italic mb-4 sm:mb-6 flex-grow text-[11px] sm:text-base leading-relaxed">"I love the price ticker feature. No hidden charges, just transparent rates always. Excellent service!"</p>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0EA5E9]/20 flex items-center justify-center font-bold text-[#0EA5E9] text-xs sm:text-base">FE</div>
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-white leading-tight">Fatima Eze</h5>
                  <span className="text-[10px] sm:text-xs text-gray-500">GRA, Port Harcourt</span>
                </div>
              </div>
            </div>
          </FadeInView>

          <FadeInView delay={0.4}>
            <div className="bg-white/5 p-4 sm:p-6 rounded-2xl h-full flex flex-col">
              <div className="flex text-[#F59E0B] mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path></svg>
                ))}
              </div>
              <p className="text-gray-300 italic mb-4 sm:mb-6 flex-grow text-[11px] sm:text-base leading-relaxed">"Finally a reliable gas service in Nigeria. The subscription plan is a lifesaver for our family."</p>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0EA5E9]/20 flex items-center justify-center font-bold text-[#0EA5E9] text-xs sm:text-base">IM</div>
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-white leading-tight">Ibrahim Musa</h5>
                  <span className="text-[10px] sm:text-xs text-gray-500">Kano City</span>
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
