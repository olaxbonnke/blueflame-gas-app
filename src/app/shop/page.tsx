'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useCartStore } from '@/lib/store';

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
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

const CATEGORIES = ['All', 'Regulators', 'Hoses', 'Burners', 'Cylinders', 'Accessories'];

const MOCK_PRODUCTS = [
  {
    id: 'prod-reg-1',
    name: 'High Pressure Regulator',
    category: 'Regulators',
    description: 'Industrial grade adjustable pressure regulator for heavy-duty appliances.',
    price: 8500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb72Kxn2sy63FXHdRgstZidzv2HZ7mUIsDG2pGQBo_dtcvJcy9a5EhNANq3UB3GU8n1fS9q2bH__lL5oJp2-0LMG7CJzdZo2QjimA3o9gP3UnxggtqQqm6kirZo7rTlQtf6Rb0jvRD801NDhygWsSLerD-KkLWoo2Xd-k3HO_atRdpibPFvGyMPrLKBnmUXpb03obPvhk_B_G5XhJcm8thIJFmemYjdvB8LldlIapA65qbNpayggjxy9DmwEk2Vj22WoNUOEK10pU',
    stockStatus: 'In Stock',
    stockCount: '24 AVAILABLE',
    stockColor: 'bg-green-500/90'
  },
  {
    id: 'prod-hose-1',
    name: 'Reinforced Hose (2m)',
    category: 'Hoses',
    description: 'Premium safety-mesh reinforced hose for high-pressure gas flow.',
    price: 4200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPehrQ_4o2lyYJ0FxDgLR10-jPoegfPDQQo3KRrKmTDl7Cn0QYnEYzMEdUFkqYsRfEQttrkZfFr1PAfEWH2tJFlreUO1O1AKy3uD-UnFyhdf7xCll6_Y2EVS5mgTE0AlSjTJQqm4KgO2LCCrRwj_bk-rCDoLNd0Qpb-qpKLEt3iCeYrftT-75j9dDDnjJKcTW1xgmozz2clef-R_tnRp2ySAvymbc2AfWqVeIe6IZfwrNoiq9PaZO6_SReeXSejDw7GWe_d_yZauE',
    stockStatus: 'In Stock',
    stockCount: '50+ AVAILABLE',
    stockColor: 'bg-green-500/90'
  },
  {
    id: 'prod-burn-1',
    name: 'Single Industrial Burner',
    category: 'Burners',
    description: 'High-output cast iron burner designed for efficient commercial cooking.',
    price: 15000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQIG_1ZGTXyKgnvHsxVIUu1_f2wo3tMDLIe0eY2moaKB-i0JeCd_CQQ8gEY8hulbVEFX36PDDBAbBsIsNCNL5i3HcNn3OIvn7N60cSPfWHWR1u-D1jVUvM1_KJYw1gUfhk_FrLGTB4J9POgayM2AeAR912k1YIpPgUq4SAqdC00LyEe2lHr-GjDbSPxPF01QupSXZzSkn82NiLL2XxmrwRNKQpVV8kAVM5GEt0wBGbKQ3FU5AnHnAzsc6hzFpfWEOwcOgtfmsudSA',
    stockStatus: 'Low Stock',
    stockCount: '3 LEFT',
    stockColor: 'bg-orange-500/90',
    stockCountColor: 'text-[#F59E0B] bg-[#F59E0B]/10'
  },
  {
    id: 'prod-acc-1',
    name: 'Cylinder Roller Stand',
    category: 'Accessories',
    description: 'Smooth-rolling heavy duty stand for easy cylinder mobility.',
    price: 6000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgUqhE30zDSSTd7P2CglVjHvswlOF564onXVPizZs-BnL1kyLk0SYisuaUM-Y8lT_od5U87pIFAm6yvEuLBkKj7VZyahrrkqIU6UIHulH-Mci7Wq935kRWNQycTHjO-LSe5m6xyNXDxd8c1mIoRP-ZHiLB4VcxXDjP8GQMeub4GmsJAnIpRKLxslHOsu491QsXYx-qQuipnOr_V2uk4r5J6Mdm1ROmb1e4xPlIZu0Z6Kex0vlfW0OdQqtgV_PwbmkR9vG7z2uXiPk',
    stockStatus: 'In Stock',
    stockCount: '12 AVAILABLE',
    stockColor: 'bg-green-500/90'
  }
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const addItem = useCartStore((state) => state.addItem);

  const filteredProducts = activeCategory === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      image: product.image
    });
    // Normally you'd add a toast notification here
  };

  return (
    <div className="bg-[#0F1117] min-h-screen text-[#E5E7EB] font-sans pt-28 pb-20">
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Category Filter & Header */}
        <div className="flex flex-col gap-6 mb-8">
          <FadeInView>
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">Gas Accessories</h1>
              <p className="text-gray-400 text-lg">Genuine parts and safety equipment for your gas appliances.</p>
            </div>
          </FadeInView>
          
          <FadeInView delay={0.1}>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map(category => (
                <button 
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg px-5 text-sm font-semibold transition-all ${
                    activeCategory === category 
                      ? 'bg-[#0EA5E9] text-white shadow-lg shadow-[#0EA5E9]/20' 
                      : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {category === 'All' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>}
                  <span>{category}</span>
                </button>
              ))}
            </div>
          </FadeInView>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-8">
          {filteredProducts.map((product, idx) => (
            <FadeInView key={product.id} delay={0.1 + (idx * 0.1)}>
              <div className="group flex flex-col bg-[#11151C] rounded-2xl overflow-hidden border border-white/5 hover:border-[#0EA5E9]/50 transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-1 h-full">
                <div className="relative w-full aspect-[4/5] bg-white/5 overflow-hidden">
                  <div 
                    className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-110" 
                    style={{ backgroundImage: `url("${product.image}")` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <span className={`absolute top-4 left-4 ${product.stockColor} backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest shadow-lg`}>
                    {product.stockStatus}
                  </span>
                </div>
                
                <div className="p-3 sm:p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-white font-bold text-sm sm:text-lg leading-tight tracking-tight line-clamp-2 sm:line-clamp-none mb-1 sm:mb-0">{product.name}</h3>
                    <button className="text-gray-500 hover:text-red-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </button>
                  </div>
                  <p className="text-gray-400 text-[11px] sm:text-sm mb-3 sm:mb-6 leading-relaxed flex-grow line-clamp-2 sm:line-clamp-none">{product.description}</p>
                  
                  <div className="mt-auto">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-4 sm:mb-5 relative gap-1.5 sm:gap-0">
                      <div className="flex flex-col">
                        <span className="text-[10px] sm:text-xs text-gray-500 font-medium sm:mb-1 uppercase tracking-tighter leading-none">Price</span>
                        <span className="font-black text-base sm:text-2xl text-white">₦{product.price.toLocaleString()}</span>
                      </div>
                      <span className={`text-[9px] sm:text-[11px] font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded uppercase sm:absolute sm:right-0 sm:bottom-1 ${product.stockCountColor || 'text-gray-400 bg-white/5'}`}>
                        {product.stockCount}
                      </span>
                    </div>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-white/5 hover:bg-[#0EA5E9] border border-white/10 hover:border-[#0EA5E9] text-white py-2 sm:py-3.5 rounded-lg sm:rounded-xl font-bold text-[11px] sm:text-sm transition-all flex items-center justify-center gap-1 sm:gap-2"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                      <span className="hidden sm:inline">Add to Cart</span>
                      <span className="sm:hidden">Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </FadeInView>
          ))}
        </div>

        {/* Featured Section / Promotion */}
        <FadeInView delay={0.4}>
          <div className="mt-16 sm:mt-20">
            <div className="flex flex-col md:flex-row items-stretch justify-start rounded-2xl shadow-2xl bg-[#11151C] border border-[#0EA5E9]/20 overflow-hidden">
              <div 
                className="w-full md:w-1/2 bg-center bg-no-repeat aspect-video md:aspect-auto bg-cover" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCDoQ4ay4atWLNGKwhTGS-k9grQSfkG9jHF1njCN09cZvYWr0iiJRq_LkGF0Tb3maOO6hbJ568Ht1d8Dg6_vZTgQNsigf75IPnM6HLQ48QB28ORCcBOyDPpFqUB_x-suyQCFS1Xc8WuYXpTn74UTkhQPZrtTPP-PsYk8P7Aw-Ejn9iWOV8muTnTUDNauvzj-ECBP5mkflezGDqfZgSwc9lHYkGMWlJ1_1ATSwxKWJTJzI0nK2sHyv5FOmlGZAj3WV-q23OlT8fOAvM")' }}
              ></div>
              <div className="flex w-full md:w-1/2 flex-col items-stretch justify-center gap-4 p-8 md:p-12">
                <div className="flex items-center gap-2 text-[#0EA5E9]">
                  <span className="flex h-2 w-2 rounded-full bg-[#0EA5E9] animate-pulse"></span>
                  <p className="text-sm font-bold uppercase tracking-widest">Safety Pick of the Month</p>
                </div>
                <h2 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">Premium Safety Regulator Kit</h2>
                <p className="text-gray-400 text-base leading-relaxed">Ensure your family's safety with our precision flow control regulator. Includes 2m reinforced hose and 4 steel clips. Professional installation recommended.</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-4">
                  <div className="flex flex-col">
                    <p className="text-3xl font-black text-[#F59E0B]">₦12,000</p>
                    <p className="text-gray-500 text-sm line-through decoration-red-500 decoration-2">₦15,000</p>
                  </div>
                  <button className="flex-1 w-full sm:w-auto cursor-pointer items-center justify-center rounded-xl bg-[#0EA5E9] hover:bg-sky-400 h-14 px-8 text-white text-base font-bold transition-transform hover:scale-105 shadow-xl shadow-[#0EA5E9]/20">
                    Buy Bundle &amp; Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </FadeInView>

        {/* Pagination/Load More */}
        <FadeInView delay={0.5}>
          <div className="mt-16 flex justify-center">
            <button className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 text-gray-400 font-bold hover:bg-white/5 hover:text-white transition-colors">
              Load More Accessories
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
          </div>
        </FadeInView>
      </main>
    </div>
  );
}
