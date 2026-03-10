'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

function FadeInView({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.8, ease: "easeOut", delay }} className={className}>
      {children}
    </motion.div>
  );
}

export default function NewsletterPage() {
  const [bulletins, setBulletins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('newsletter_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      if (data) setBulletins(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

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
                Stay <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#0EA5E9] via-cyan-400 to-blue-500">Informed.</span><br />Stay Safe.
              </h1>
              <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
                Get the latest safety protocols, gas price updates, and exclusive member discounts delivered straight to your inbox.
              </p>
            </FadeInView>

            <FadeInView delay={0.1}>
              {subscribed ? (
                <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 font-semibold pt-6">
                  ✅ You're subscribed! Welcome to BlueFlame updates.
                </div>
              ) : (
                <form className="flex flex-col sm:flex-row gap-3 pt-6" onSubmit={handleSubscribe}>
                  <div className="flex-1 relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">mail</span>
                    <input
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9]/20 text-white placeholder:text-gray-500 transition-all outline-none"
                      placeholder="Enter your email address"
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="px-8 py-4 bg-[#0EA5E9] hover:bg-sky-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-[#0EA5E9]/20 hover:shadow-[#0EA5E9]/40 active:scale-95 whitespace-nowrap">
                    Subscribe Now
                  </button>
                </form>
              )}
              <p className="text-xs text-gray-500 mt-3 pl-1">We respect your privacy. Unsubscribe at any time.</p>
            </FadeInView>
          </div>

          <div className="flex-1 w-full max-w-lg">
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: 'shield', title: 'Safety Tips', desc: 'Regular safety maintenance guides from certified professionals.' },
                { icon: 'trending_down', title: 'Price Alerts', desc: 'Real-time notifications when gas rates drop.' },
                { icon: 'sell', title: 'Special Offers', desc: 'Exclusive discounts on appliance installation.' },
              ].map((item, i) => (
                <FadeInView key={i} delay={0.2 + i * 0.1}>
                  <div className="group p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-[#0EA5E9]/30 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-[#0EA5E9]/10 text-[#0EA5E9] shadow-inner shadow-[#0EA5E9]/20">
                        <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </FadeInView>
              ))}
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
                  <p className="text-gray-400">Latest updates from BlueFlame.</p>
                </div>
              </div>
            </FadeInView>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 text-[#0EA5E9] animate-spin" />
              </div>
            ) : bulletins.length === 0 ? (
              <FadeInView>
                <div className="py-20 text-center text-gray-500">
                  <p className="text-lg font-medium">No posts published yet. Check back soon!</p>
                </div>
              </FadeInView>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
                {bulletins.map((post, idx) => (
                  <FadeInView key={post.id} delay={0.1 + idx * 0.1} className="h-full">
                    <article className="flex flex-col h-full bg-[#0F1117] rounded-3xl overflow-hidden border border-white/5 shadow-lg shadow-black/20 hover:shadow-2xl hover:border-[#0EA5E9]/30 transition-all duration-500 group cursor-pointer">
                      <div className="h-32 sm:h-52 w-full bg-white/5 relative overflow-hidden">
                        {post.image_url ? (
                          <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url("${post.image_url}")` }} />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blueflame/10 to-transparent" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117]/80 to-transparent" />
                        <div className={`absolute top-2 left-2 sm:top-4 sm:left-4 ${post.tag_color || 'bg-[#0EA5E9]'} text-white px-2 py-1 sm:px-3 sm:py-1.5 text-[8px] sm:text-xs font-black uppercase tracking-wider rounded-md sm:rounded-lg shadow-lg`}>
                          {post.tag}
                        </div>
                      </div>
                      <div className="p-4 sm:p-8 flex flex-col flex-grow relative -mt-4 bg-[#0F1117] rounded-t-2xl sm:rounded-t-3xl">
                        <span className="text-[10px] sm:text-xs text-gray-500 font-bold mb-2 sm:mb-3 uppercase tracking-widest">
                          {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <h3 className="text-sm sm:text-xl font-black text-white leading-tight sm:leading-snug mb-2 sm:mb-4 group-hover:text-[#0EA5E9] transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-[10px] sm:text-sm leading-relaxed line-clamp-3 mb-4 sm:mb-6 flex-grow">
                          {post.excerpt}
                        </p>
                        <div className="inline-flex items-center gap-1 sm:gap-2 text-[#0EA5E9] text-[10px] sm:text-sm font-bold uppercase tracking-widest mt-auto pt-3 sm:pt-4 border-t border-white/5">
                          <span className="hidden sm:inline">Read Article</span><span className="sm:hidden">Read</span>
                          <span className="material-symbols-outlined text-[14px] sm:text-[18px]">arrow_forward</span>
                        </div>
                      </div>
                    </article>
                  </FadeInView>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
