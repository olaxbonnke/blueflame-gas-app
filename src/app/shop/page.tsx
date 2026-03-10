'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useCartStore } from '@/lib/store';
import { supabase } from '@/lib/supabase/client';
import { Loader2, ShoppingBag } from 'lucide-react';

function FadeInView({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.8, ease: "easeOut", delay }} className="h-full">
      {children}
    </motion.div>
  );
}

const stockConfig: Record<string, { color: string; badgeColor: string }> = {
  'In Stock': { color: 'bg-green-500/90', badgeColor: 'text-emerald-400 bg-emerald-500/10' },
  'Low Stock': { color: 'bg-orange-500/90', badgeColor: 'text-amber-400 bg-amber-500/10' },
  'Out of Stock': { color: 'bg-rose-500/90', badgeColor: 'text-rose-400 bg-rose-500/10' },
};

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from('accessories').select('*').order('name');
      if (data) setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Dynamically extract categories from live data
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  const handleAddToCart = (product: any) => {
    if (product.stock_status === 'Out of Stock') return;
    addItem({ id: product.id, name: product.name, price: product.price, qty: 1, image: product.image_url || '' });
  };

  return (
    <div className="bg-[#0F1117] min-h-screen text-[#E5E7EB] font-sans pt-28 pb-20">
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 mb-8">
          <FadeInView>
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">Gas Accessories</h1>
              <p className="text-gray-400 text-lg">Genuine parts and safety equipment for your gas appliances.</p>
            </div>
          </FadeInView>

          {!loading && categories.length > 1 && (
            <FadeInView delay={0.1}>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg px-5 text-sm font-semibold transition-all ${activeCategory === category
                        ? 'bg-[#0EA5E9] text-white shadow-lg shadow-[#0EA5E9]/20'
                        : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </FadeInView>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-10 h-10 text-[#0EA5E9] animate-spin" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <FadeInView>
            <div className="py-24 text-center text-gray-500">
              <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-700" />
              <p className="text-lg font-medium">
                {activeCategory === 'All' ? 'No products available yet.' : `No products in "${activeCategory}".`}
              </p>
            </div>
          </FadeInView>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-8">
            {filteredProducts.map((product, idx) => {
              const sc = stockConfig[product.stock_status] || stockConfig['In Stock'];
              const isOos = product.stock_status === 'Out of Stock';
              return (
                <FadeInView key={product.id} delay={0.05 * idx}>
                  <div className={`group flex flex-col bg-[#11151C] rounded-2xl overflow-hidden border border-white/5 hover:border-[#0EA5E9]/50 transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-1 h-full ${isOos ? 'opacity-60' : ''}`}>
                    <div className="relative w-full aspect-[4/5] bg-white/5 overflow-hidden">
                      <div
                        className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: product.image_url ? `url("${product.image_url}")` : 'none' }}
                      >
                        {!product.image_url && (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-12 h-12 text-gray-700" />
                          </div>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <span className={`absolute top-4 left-4 ${sc.color} backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest shadow-lg`}>
                        {product.stock_status || 'In Stock'}
                      </span>
                    </div>

                    <div className="p-3 sm:p-6 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-white font-bold text-sm sm:text-lg leading-tight tracking-tight line-clamp-2 mb-1">{product.name}</h3>
                      </div>
                      <p className="text-gray-400 text-[11px] sm:text-sm mb-3 sm:mb-6 leading-relaxed flex-grow line-clamp-2 sm:line-clamp-none">{product.description || ''}</p>

                      <div className="mt-auto">
                        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-4 sm:mb-5 gap-1.5">
                          <div className="flex flex-col">
                            <span className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-tighter">Price</span>
                            <span className="font-black text-base sm:text-2xl text-white">₦{(product.price || 0).toLocaleString()}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={isOos}
                          className="w-full bg-white/5 hover:bg-[#0EA5E9] disabled:opacity-40 disabled:cursor-not-allowed border border-white/10 hover:border-[#0EA5E9] text-white py-2 sm:py-3.5 rounded-lg sm:rounded-xl font-bold text-[11px] sm:text-sm transition-all flex items-center justify-center gap-1 sm:gap-2"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                          <span className="hidden sm:inline">{isOos ? 'Out of Stock' : 'Add to Cart'}</span>
                          <span className="sm:hidden">{isOos ? 'OOS' : 'Add'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </FadeInView>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
