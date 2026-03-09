'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Reusable scroll animation wrapper
function FadeInView({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const BULLETINS = [
  {
    id: 1,
    tag: 'Safety',
    tagColor: 'bg-[#0EA5E9]',
    date: 'October 24, 2023',
    title: 'Winter Gas Safety: Essential Pre-Season Checks',
    excerpt: 'Ensure your heating system is ready for the cold snap with our 10-point safety checklist designed for modern homeowners.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGhqdO0gbema0OrSnhNyeSXhoQd6yecqX_UXSSfxPu-EYVPlHynt1lsT89N93RKuzluhe-EodON9ZlwLRLG8OjCeM2XVS7XkUJEF6h4x4xzyvcyqMU-fWFxzyqan_R49KhGv6L4CprktYZw8bjTe5QTffiRuXLVNzel57-ke9c7azwnJpBuqJSB3Xwx2x_AE7yumrckwPBntwTE-763MR8_IiWLsYlWAv96BZ_PKzuHtbVEP9UOzSWHfJ_OnhWnqp3c09HPWkMjUg'
  },
  {
    id: 2,
    tag: 'Market Update',
    tagColor: 'bg-green-500',
    date: 'October 18, 2023',
    title: 'Projected Natural Gas Price Trends for Q4',
    excerpt: 'Market analysis shows a potential softening in rates next month. Learn how you can adjust your usage to maximize savings.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCq0qW6x5ka2xTeO0hdOa_HpKzBd5OCp8aUrgYxbm9_CDFksadNzyO0vc4HPwxYmyyqSxaVMzCjNChsmQVZdKv4LHrUc8a40JH0aoWcd3mWDHu9dKLQWeJ6PIc6xtTG0xeenQ6GU1D3JZw4J5Y_bXkJTwwHsj_voLpmZs6uNhTNdmtvD7rkuBcWl1a_L4Sys46hKBpSB0ZDViJ-OHV77jqlE9mb4DiQh8ljPihGXezFoqvbR2t4C7-T-M8rEKgTM_Kgd40GX3uOoz0'
  },
  {
    id: 3,
    tag: 'Maintenance',
    tagColor: 'bg-orange-500',
    date: 'October 12, 2023',
    title: 'The Silent Threat: Carbon Monoxide Awareness',
    excerpt: 'Everything you need to know about CO detector placement and signs of leakage that often go unnoticed during the fall.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNr-QA04iYZeVDkGHXe4Z41Yf0AO1UsDH50SwDaP9ak4YZzvdr7gCgHly7DfKozO5fythfMxOGgU_tKOq3STk7GXxjL6GstcvZ_lEjX9O6si1PBXgFfOh5YRAiD6kc7QDTS3GYc_-1ctuoKffQ9OBFdDn3vEGskpU3NojojbALSJZ3cv-i7XodCwPTtxGEwitfDHB_DaPsBPh62NNc_86usXdFnxostMCLqbw-YNnttm3jRG203pvGJDYOwXirOmm2LvZVb9YY128'
  }
];

export default function NewsletterPage() {
  return (
    <div className="bg-[#0F1117] min-h-screen text-[#E5E7EB] font-sans pt-20">
      <main className="flex-1">
        {/* Hero / Subscription Section */}
        <section className="px-6 py-12 md:py-20 flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto">
          <div className="flex-1 space-y-6">
            <FadeInView>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0EA5E9]/10 text-[#0EA5E9] text-xs font-bold uppercase tracking-wider mb-4 border border-[#0EA5E9]/20">
                <span className="material-symbols-outlined text-sm">verified</span> Expert Gas Services
              </div>
              <h1 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white mb-6">
                Stay <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#0EA5E9] via-cyan-400 to-blue-500">Informed.</span><br/>Stay Safe.
              </h1>
              <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
                Join over 15,000 homeowners getting the latest safety protocols, gas price fluctuations, and exclusive member discounts delivered straight to their inbox.
              </p>
            </FadeInView>

            <FadeInView delay={0.1}>
              <form className="flex flex-col sm:flex-row gap-3 pt-6" onSubmit={(e) => e.preventDefault()}>
                <div className="flex-1 relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">mail</span>
                  <input 
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9]/20 text-white placeholder:text-gray-500 transition-all outline-none" 
                    placeholder="Enter your email address" 
                    type="email" 
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="px-8 py-4 bg-[#0EA5E9] hover:bg-sky-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-[#0EA5E9]/20 hover:shadow-[#0EA5E9]/40 active:scale-95 whitespace-nowrap"
                >
                  Subscribe Now
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-3 pl-1">We respect your privacy. Unsubscribe at any time.</p>
            </FadeInView>
          </div>

          <div className="flex-1 w-full max-w-lg">
            <div className="grid grid-cols-1 gap-4">
              <FadeInView delay={0.2}>
                <div className="group p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-[#0EA5E9]/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-[#0EA5E9]/10 text-[#0EA5E9] shadow-inner shadow-[#0EA5E9]/20">
                      <span className="material-symbols-outlined text-2xl">shield</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Safety Tips</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">Regular safety maintenance guides and emergency procedure checklists from certified professionals.</p>
                    </div>
                  </div>
                </div>
              </FadeInView>
              
              <FadeInView delay={0.3}>
                <div className="group p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-[#0EA5E9]/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-[#0EA5E9]/10 text-[#0EA5E9] shadow-inner shadow-[#0EA5E9]/20">
                      <span className="material-symbols-outlined text-2xl">trending_down</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Price Alerts</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">Real-time notifications when gas rates drop, helping you lock in the best prices for your household.</p>
                    </div>
                  </div>
                </div>
              </FadeInView>

              <FadeInView delay={0.4}>
                <div className="group p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-[#0EA5E9]/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-[#0EA5E9]/10 text-[#0EA5E9] shadow-inner shadow-[#0EA5E9]/20">
                      <span className="material-symbols-outlined text-2xl">sell</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Special Offers</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">Exclusive discounts on appliance installation, boiler repairs, and seasonal maintenance packages.</p>
                    </div>
                  </div>
                </div>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* Bulletin Archive Section */}
        <section className="px-6 py-20 bg-[#11151C] border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <FadeInView>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-white mb-2">Bulletin Archive</h2>
                  <p className="text-gray-400">Catch up on our recent safety updates and news releases.</p>
                </div>
                <Link href="#" className="text-[#0EA5E9] font-bold flex items-center gap-2 group hover:text-sky-400 transition-colors">
                  View all bulletins 
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </FadeInView>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BULLETINS.map((post, idx) => (
                <FadeInView key={post.id} delay={0.2 + (idx * 0.1)} className="h-full">
                  <article className="flex flex-col h-full bg-[#0F1117] rounded-3xl overflow-hidden border border-white/5 shadow-lg shadow-black/20 hover:shadow-2xl hover:border-[#0EA5E9]/30 transition-all duration-500 group cursor-pointer">
                    <div className="h-52 w-full bg-white/5 relative overflow-hidden">
                      <div 
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700" 
                        style={{ backgroundImage: `url("${post.image}")` }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117]/80 to-transparent"></div>
                      <div className={`absolute top-4 left-4 ${post.tagColor} text-white px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-lg shadow-lg`}>
                        {post.tag}
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow relative -mt-4 bg-[#0F1117] rounded-t-3xl transition-transform duration-300">
                      <span className="text-xs text-gray-500 font-bold mb-3 uppercase tracking-widest">{post.date}</span>
                      <h3 className="text-xl font-black text-white leading-snug mb-4 group-hover:text-[#0EA5E9] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                        {post.excerpt}
                      </p>
                      <div className="inline-flex items-center gap-2 text-[#0EA5E9] text-sm font-bold uppercase tracking-widest group-hover:gap-3 transition-all mt-auto pt-4 border-t border-white/5">
                        Read Article <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </div>
                    </div>
                  </article>
                </FadeInView>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
