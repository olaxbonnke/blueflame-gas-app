'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Loader2, ShoppingBag } from 'lucide-react';

function FadeInView({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.8, ease: "easeOut", delay }}>
      {children}
    </motion.div>
  );
}

export function HomeShop() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('accessories')
        .select('id, name, description, price, image_url, stock_status')
        .order('created_at', { ascending: false })
        .limit(4);
      if (data) setProducts(data);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <section className="bg-[#0F1117] py-14 sm:py-20" id="shop">
      <div className="container mx-auto px-4 sm:px-6">
        <FadeInView>
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-white">Our Online Shop</h2>
            <p className="text-gray-400 text-sm sm:text-base">Everything you need for a safe and efficient kitchen.</p>
          </div>
        </FadeInView>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-[#0EA5E9] animate-spin" /></div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            <ShoppingBag className="w-10 h-10 mx-auto mb-3 text-gray-700" />
            <p className="text-sm">No products yet. Add them from the admin accessories page.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {products.map((product, i) => (
              <FadeInView key={product.id} delay={0.1 * (i + 1)}>
                <div className="group bg-[#11151C] rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/5 flex flex-col h-full">
                  <div className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4 bg-white/5">
                    {product.image_url ? (
                      <img alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={product.image_url} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><ShoppingBag className="w-10 h-10 text-gray-700" /></div>
                    )}
                    <div className={`absolute top-2 left-2 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[8px] sm:text-[10px] font-bold text-white ${product.stock_status === 'Out of Stock' ? 'bg-rose-500' : product.stock_status === 'Low Stock' ? 'bg-orange-500' : 'bg-[#0EA5E9]'}`}>
                      {product.stock_status || 'In Stock'}
                    </div>
                  </div>
                  <h3 className="text-xs sm:text-base font-bold mb-1 text-white leading-tight line-clamp-2">{product.name}</h3>
                  <p className="text-gray-400 text-[10px] sm:text-sm mb-3 line-clamp-1">{product.description}</p>
                  <div className="mt-auto flex items-center justify-between gap-2">
                    <span className="text-sm sm:text-xl font-bold text-[#F59E0B]">₦{(product.price || 0).toLocaleString()}</span>
                    <button className="p-2 sm:p-3 bg-[#0EA5E9] rounded-lg hover:bg-sky-500 transition-colors shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        )}

        <FadeInView delay={0.3}>
          <div className="text-center mt-10 sm:mt-14">
            <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0EA5E9] hover:bg-sky-400 text-white font-bold rounded-full transition-all shadow-lg shadow-[#0EA5E9]/20 text-sm sm:text-base">
              Explore Our Store
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
