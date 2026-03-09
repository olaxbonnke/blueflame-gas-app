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
    >
      {children}
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <div className="bg-[#0F1117] text-[#E5E7EB] font-sans selection:bg-[#0EA5E9] selection:text-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0EA5E9]/10 to-transparent"></div>
          <div className="w-full h-full opacity-20 bg-[url('https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInView>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-white">
              Professional <span className="text-[#0EA5E9]">Gas Solutions</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Safe, reliable, and efficient gas services for residential, commercial, and industrial applications. Fueling your world with precision and care.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#services-grid" className="bg-[#0EA5E9] text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-[#0EA5E9]/20">
                Explore Services
              </Link>
              <Link href="/contact" className="bg-white/5 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors border border-white/10 backdrop-blur-sm">
                Request a Quote
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Services Grid Section */}
      <section id="services-grid" className="py-20 bg-[#11151C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Service 1 */}
            <FadeInView delay={0.1}>
              <div className="group bg-[#0F1117] p-8 rounded-2xl border border-white/5 shadow-sm hover:border-[#0EA5E9]/50 transition-all hover:-translate-y-1 h-full">
                <div className="w-14 h-14 bg-[#0EA5E9]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0EA5E9] transition-colors">
                  <svg className="w-8 h-8 text-[#0EA5E9] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Refills &amp; Delivery</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Fast, door-to-door LPG refills. We offer scheduled deliveries and emergency top-ups to ensure you never run out of fuel.
                </p>
                <ul className="space-y-2 mb-8 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
                    60-minute express delivery
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
                    Accurate digital weighing
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
                    All cylinder sizes supported
                  </li>
                </ul>
              </div>
            </FadeInView>

            {/* Service 2 */}
            <FadeInView delay={0.2}>
              <div className="group bg-[#0F1117] p-8 rounded-2xl border border-white/5 shadow-sm hover:border-[#0EA5E9]/50 transition-all hover:-translate-y-1 h-full">
                <div className="w-14 h-14 bg-[#0EA5E9]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0EA5E9] transition-colors">
                  <svg className="w-8 h-8 text-[#0EA5E9] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Cylinder Sales</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Premium steel and composite cylinders for every need. Built to international safety standards for maximum durability.
                </p>
                <ul className="space-y-2 mb-8 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
                    Certified safety valves
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
                    Lightweight composite options
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
                    Anti-rust coating technology
                  </li>
                </ul>
              </div>
            </FadeInView>

            {/* Service 3 */}
            <FadeInView delay={0.3}>
              <div className="group bg-[#0F1117] p-8 rounded-2xl border border-white/5 shadow-sm hover:border-[#0EA5E9]/50 transition-all hover:-translate-y-1 h-full">
                <div className="w-14 h-14 bg-[#0EA5E9]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0EA5E9] transition-colors">
                  <svg className="w-8 h-8 text-[#0EA5E9] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Professional Installations</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Expert piping and manifold setups for homes and businesses. Our certified engineers ensure leak-free performance.
                </p>
                <ul className="space-y-2 mb-8 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
                    Residential kitchen setups
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
                    Commercial kitchen manifolds
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
                    Pressure testing &amp; certification
                  </li>
                </ul>
              </div>
            </FadeInView>

            {/* Service 4 */}
            <FadeInView delay={0.4}>
              <div className="group bg-[#0F1117] p-8 rounded-2xl border border-white/5 shadow-sm hover:border-[#0EA5E9]/50 transition-all hover:-translate-y-1 h-full">
                <div className="w-14 h-14 bg-[#0EA5E9]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0EA5E9] transition-colors">
                  <svg className="w-8 h-8 text-[#0EA5E9] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Repairs &amp; Maintenance</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Comprehensive safety checks and appliance repairs. We fix leaks, replace worn parts, and optimize burner efficiency.
                </p>
                <ul className="space-y-2 mb-8 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
                    Stove &amp; oven servicing
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
                    Leak detection services
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
                    Component replacement
                  </li>
                </ul>
              </div>
            </FadeInView>

            {/* Service 5 */}
            <FadeInView delay={0.5}>
              <div className="group bg-[#0F1117] p-8 rounded-2xl border border-white/5 shadow-sm hover:border-[#0EA5E9]/50 transition-all hover:-translate-y-1 h-full">
                <div className="w-14 h-14 bg-[#0EA5E9]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0EA5E9] transition-colors">
                  <svg className="w-8 h-8 text-[#0EA5E9] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Accessories Sales</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  High-quality regulators, hoses, and burners. Don't compromise on safety with cheap imitations; get genuine BlueFlame parts.
                </p>
                <ul className="space-y-2 mb-8 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
                    High-pressure regulators
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
                    Reinforced gas hoses
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
                    Industrial &amp; home burners
                  </li>
                </ul>
              </div>
            </FadeInView>

            {/* Service 6 */}
            <FadeInView delay={0.6}>
              <div className="group bg-[#0F1117] p-8 rounded-2xl border border-white/5 shadow-sm hover:border-[#0EA5E9]/50 transition-all hover:-translate-y-1 h-full">
                <div className="w-14 h-14 bg-[#0EA5E9]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0EA5E9] transition-colors">
                  <svg className="w-8 h-8 text-[#0EA5E9] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Bulk Supply</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Custom solutions for industry, hospitality, and agriculture. High-capacity tanks and consistent supply chains.
                </p>
                <ul className="space-y-2 mb-8 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
                    Tank installation &amp; filling
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
                    Priority delivery scheduling
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
                    Volume-based pricing models
                  </li>
                </ul>
              </div>
            </FadeInView>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0F1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="bg-[#0EA5E9]/5 rounded-3xl p-8 md:p-16 border border-[#0EA5E9]/20 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1">
                <h2 className="text-3xl md:text-5xl font-black mb-6 text-white leading-tight">
                  Ready to switch to a <span className="text-[#0EA5E9]">safer gas service?</span>
                </h2>
                <p className="text-lg text-gray-400 mb-8 max-w-xl">
                  Join over 10,000 satisfied customers who trust BlueFlame Gas for their daily energy needs. Experience the difference in quality and safety today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#0EA5E9]/20 transition-all text-center">
                    Request a Free Quote
                  </Link>
                  <Link href="tel:+2348000000000" className="flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-bold text-lg border-2 border-white/10 hover:bg-white/5 transition-colors text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    Call Now
                  </Link>
                </div>
              </div>
              <div className="flex-1 w-full max-w-md hidden md:block">
                <div className="relative rounded-2xl overflow-hidden aspect-square border-8 border-[#11151C] shadow-2xl">
                  <img alt="Technician installing industrial gas pipes in a modern factory" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0GMybnkAO2Xe2iJ2gJEOe5XjGBajBzvTRxVh0IXe-l1ye159iShMyy7a1W5ugZ672s1iOyfPHjB5FJEPPj2yQr2BuTZjFg1WBbABRzZDzoaYXXtsZcgLzJXg02otAVXMXjcRepwvBN4Iq-76X6NF35E1vfbAGS-t-t33SI97tkrp949TirJxp0nW7PAgr3p0JMdRjH-XSdMIIWd6W_FtQ6E8kaM2Ew-ESyeka1-XDGh_XQH7EVi7cuVWbsjyCYi2e7cfBflBqtho"/>
                  <div className="absolute bottom-4 left-4 right-4 bg-[#0F1117]/90 backdrop-blur p-4 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Certified Technicians</p>
                        <p className="text-xs text-gray-400">Available 24/7 for support</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>
    </div>
  );
}
