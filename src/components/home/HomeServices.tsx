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

export function HomeServices() {
  return (
    <section className="bg-[#11151C] relative overflow-hidden py-20" id="services">
      <div className="container mx-auto px-6 relative z-10">
        <FadeInView>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Professional Services</h2>
            <div className="w-20 h-1 bg-[#0EA5E9] mx-auto"></div>
          </div>
        </FadeInView>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1 */}
          <FadeInView delay={0.1}>
            <div className="bg-[#0F1117] p-8 rounded-lg border border-white/5 hover:border-[#0EA5E9]/50 transition-all group h-full">
              <div className="w-14 h-14 bg-[#0EA5E9]/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Quick Refills</h3>
              <p className="text-gray-400 leading-relaxed">Doorstep gas refills within 45 minutes of ordering. Safety-checked at every fill.</p>
            </div>
          </FadeInView>

          {/* Service 2 */}
          <FadeInView delay={0.2}>
            <div className="bg-[#0F1117] p-8 rounded-lg border border-white/5 hover:border-[#0EA5E9]/50 transition-all group h-full">
              <div className="w-14 h-14 bg-[#0EA5E9]/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Cylinder Sales</h3>
              <p className="text-gray-400 leading-relaxed">Certified SON-standard cylinders available in all sizes (3kg to 50kg).</p>
            </div>
          </FadeInView>

          {/* Service 3 */}
          <FadeInView delay={0.3}>
            <div className="bg-[#0F1117] p-8 rounded-lg border border-white/5 hover:border-[#0EA5E9]/50 transition-all group h-full">
              <div className="w-14 h-14 bg-[#0EA5E9]/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Installations</h3>
              <p className="text-gray-400 leading-relaxed">Professional gas piping and stove installations for homes and restaurants.</p>
            </div>
          </FadeInView>
          
          {/* Service 4 */}
          <FadeInView delay={0.4}>
            <div className="bg-[#0F1117] p-8 rounded-lg border border-white/5 hover:border-[#0EA5E9]/50 transition-all group h-full">
              <div className="w-14 h-14 bg-[#0EA5E9]/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Repairs</h3>
              <p className="text-gray-400 leading-relaxed">Expert repair services for gas leakages, burner issues, and regulator faults.</p>
            </div>
          </FadeInView>

          {/* Service 5 */}
          <FadeInView delay={0.5}>
            <div className="bg-[#0F1117] p-8 rounded-lg border border-white/5 hover:border-[#0EA5E9]/50 transition-all group h-full">
              <div className="w-14 h-14 bg-[#0EA5E9]/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Accessories</h3>
              <p className="text-gray-400 leading-relaxed">High-quality hoses, regulators, clips, and burner stands at unbeatable prices.</p>
            </div>
          </FadeInView>

          {/* Service 6 */}
          <FadeInView delay={0.6}>
            <div className="bg-[#0F1117] p-8 rounded-lg border border-white/5 hover:border-[#0EA5E9]/50 transition-all group h-full">
              <div className="w-14 h-14 bg-[#0EA5E9]/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Bulk Supply</h3>
              <p className="text-gray-400 leading-relaxed">Industrial and commercial bulk gas solutions for hotels, hospitals, and factories.</p>
            </div>
          </FadeInView>
        </div>
        
        <FadeInView delay={0.4}>
          <div className="text-center mt-16">
            <Link href="/services" className="inline-flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white transition-all group">
              LEARN MORE ABOUT OUR SERVICES
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
