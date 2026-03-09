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

export function HomeShop() {
  return (
    <section className="bg-[#0F1117] py-20" id="shop">
      <div className="container mx-auto px-6">
        <FadeInView>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Online Shop</h2>
              <p className="text-gray-400">Everything you need for a safe and efficient kitchen.</p>
              <Link href="/shop" className="inline-flex items-center mt-6 text-[11px] font-black text-[#0EA5E9] hover:text-white uppercase tracking-[0.2em] transition-colors">
                Explore Full Catalog 
                <span className="material-symbols-outlined text-[12px] ml-1">arrow_forward</span>
              </Link>
            </div>
            <div className="flex gap-2">
              <Link href="/shop?category=cylinders" className="px-4 py-2 bg-[#0EA5E9]/10 text-[#0EA5E9] rounded-full text-sm font-bold border border-[#0EA5E9]/20 hover:bg-[#0EA5E9] hover:text-white transition-all">Cylinders</Link>
              <Link href="/shop?category=regulators" className="px-4 py-2 bg-white/5 text-gray-400 rounded-full text-sm font-bold border border-white/10 hover:border-[#0EA5E9]/50 transition-all">Regulators</Link>
              <Link href="/shop?category=stoves" className="px-4 py-2 bg-white/5 text-gray-400 rounded-full text-sm font-bold border border-white/10 hover:border-[#0EA5E9]/50 transition-all">Stoves</Link>
            </div>
          </div>
        </FadeInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Product 1 */}
          <FadeInView delay={0.1}>
            <div className="group bg-[#11151C] rounded-2xl p-4 border border-white/5 flex flex-col h-full">
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-white/5">
                <img alt="12.5kg Gas Cylinder" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg2Jf4t8h-08Ilm8qpRI5Ss7_vEx6-RN-R2eQxHqU4-3WkSC1gvngVAKWSokGla8wKkRm_V_b7rV6UqTtsKuQvAWG_xmtULxyL_AjKsmG3EaxMDaFLi3IOOUcbMRfinaz132fI0Td0LjLO7_HwigNOQlZ9hUP8NQm0HCbI9dbzfqCo4u1Bk7pEw2dYxfz3xTC3fh6H2WFek-fw4er3v6wV4jwCRKNBm6Ihl2Mh43kcEvdBs2Oz5qFWwdKsCGGWp-moCDrrueBGFvY"/>
                <div className="absolute top-3 left-3 bg-[#0EA5E9] px-2 py-1 rounded text-[10px] font-bold text-white">TOP SELLER</div>
              </div>
              <h3 className="text-lg font-bold mb-1 text-white">Standard 12.5kg Cylinder</h3>
              <p className="text-gray-400 text-sm mb-4">Pre-filled with premium gas</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-xl font-bold text-[#F59E0B]">₦38,500</span>
                <button className="p-3 bg-[#0EA5E9] rounded-lg hover:bg-sky-500 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                </button>
              </div>
            </div>
          </FadeInView>

          {/* Product 2 */}
          <FadeInView delay={0.2}>
            <div className="group bg-[#11151C] rounded-2xl p-4 border border-white/5 flex flex-col h-full">
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-white/5">
                <img alt="6kg Gas Cylinder" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmbeDPlyKkRMjIN4VSl4hV8ks_cctyiki0dA94-292OicAKlLz4HkoL0SX7kRn5FXpwXBKu5KHEd0F1Yx4L-RYTWtayJqNz6ThXAWDuz28doJXJZXNKzws_HPv5m2LoVhe-J2DqryG5dDjVRuBj4iDILzVVXVed0YQak5IJ5CZsZiLj9ZWdesblkiWGfwkebkPNfiMWgDrXRonpRZHxwOZARAuiq2eTUpLPgYVUbEwp6C5Sx7VSBB5FfGguFUx3oMGg8gBBiy5gLQ"/>
              </div>
              <h3 className="text-lg font-bold mb-1 text-white">Standard 6kg Cylinder</h3>
              <p className="text-gray-400 text-sm mb-4">Includes burner stand</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-xl font-bold text-[#F59E0B]">₦18,500</span>
                <button className="p-3 bg-[#0EA5E9] rounded-lg hover:bg-sky-500 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                </button>
              </div>
            </div>
          </FadeInView>

          {/* Product 3 */}
          <FadeInView delay={0.3}>
            <div className="group bg-[#11151C] rounded-2xl p-4 border border-white/5 flex flex-col h-full">
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-white/5">
                <img alt="Gas Regulator" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh0mVvBESs-WFvvQZBVI6YdyQfxEhvifr0hh_A6fzF6m9fsCftPvNZysGBanqUDY4sBsaR4885TO1uhqFxT5nz58AofKDQe-zU8HLriwcL6bDoeKGtroM5lYt0PTWe8vzOOvr624uPIas8VsI47xM86__YOhbURa1EY-0NR8Jnc76NuR0823eZPJB1y4ztuXv8Vm8x7XSxd0ogm7G0OShiQbgVYV_s49VkzdJQYdesF_eCjCIUnpMt6_RH24Qc8S2j6ZkNHULQeiA"/>
              </div>
              <h3 className="text-lg font-bold mb-1 text-white">Smart Gas Regulator</h3>
              <p className="text-gray-400 text-sm mb-4">With auto-shutoff safety</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-xl font-bold text-[#F59E0B]">₦8,200</span>
                <button className="p-3 bg-[#0EA5E9] rounded-lg hover:bg-sky-500 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                </button>
              </div>
            </div>
          </FadeInView>

          {/* Product 4 */}
          <FadeInView delay={0.4}>
            <div className="group bg-[#11151C] rounded-2xl p-4 border border-white/5 flex flex-col h-full">
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-white/5">
                <img alt="Gas Hose" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjRWgX8GNQ4ZiUgu8FSV3BvAYDFFo1kKHI7-Y5CbfjjZgDJs7Tw3DzXMX7OzwbJJ1hZOGmD69qCQS3odNDCLU8JCtf2CHOCUq8_mlJFvxP0DXrNjL8s3XmcP4IYKyRi1ZDoYBkhAshBU0zsnllD3KC8tNqza7pSChFfUNBk-Sl_eY7Rt-HW4h091KWe8BMfpgYPHPQL-bTGoLEESjzwOAxqBAwuu3qb-NUbDqHfwttMIyALtqpesrHqXmWYVBpKVjterG9pUZ51yQ"/>
              </div>
              <h3 className="text-lg font-bold mb-1 text-white">High-Pressure Hose</h3>
              <p className="text-gray-400 text-sm mb-4">2 Meters + Stainless Clips</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-xl font-bold text-[#F59E0B]">₦4,500</span>
                <button className="p-3 bg-[#0EA5E9] rounded-lg hover:bg-sky-500 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                </button>
              </div>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
