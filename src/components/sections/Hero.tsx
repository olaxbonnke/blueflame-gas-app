'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Flame, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gasPrice, setGasPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      const { data } = await supabase
        .from('prices')
        .select('lpg_price_per_kg')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();
      if (data) setGasPrice(data.lpg_price_per_kg);
    };
    fetchPrice();
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <motion.div style={{ y: y as any, opacity: opacity as any }} className="absolute inset-0 w-full h-full -z-10 origin-top">
        <video autoPlay muted loop playsInline controls={false} preload="auto" className="w-full h-full object-cover" poster="/placeholder-bg.jpg">
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#121212]" />
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="flex flex-col items-center max-w-4xl">

          <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
              <Flame className="w-4 h-4 text-blueflame" />
              <span className="text-sm font-medium tracking-wide uppercase">Premium Gas Delivery</span>
            </div>
            {gasPrice !== null && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blueflame/20 border border-blueflame/40 backdrop-blur-md">
                <TrendingUp className="w-4 h-4 text-blueflame" />
                <span className="text-sm font-bold text-white">
                  Today&apos;s Rate: <span className="text-blueflame">₦{gasPrice.toLocaleString()}/kg</span>
                </span>
              </motion.div>
            )}
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight">
            Fuel Your Life <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blueflame to-blue-400">Without Interruption</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl font-light">
            Fast, safe, and reliable LPG delivery right to your doorstep. Experience the premium standard of cooking gas supply with BlueFlame.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="#shop" className="px-8 py-4 bg-blueflame hover:bg-blueflame-dark text-white rounded-full font-semibold transition-all shadow-[0_0_30px_rgba(10,160,235,0.4)] hover:shadow-[0_0_40px_rgba(10,160,235,0.6)] hover:-translate-y-1">
              Order Gas Now
            </Link>
            <Link href="#services" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold backdrop-blur-sm transition-all border border-white/10 hover:-translate-y-1">
              Explore Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

