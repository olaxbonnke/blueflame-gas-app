'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function FadeInView({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.8, ease: "easeOut", delay }}>
      {children}
    </motion.div>
  );
}

const PRODUCTS = [
  {
    title: "Standard 12.5kg Cylinder", desc: "Pre-filled with premium gas", price: "₦38,500", badge: "TOP SELLER",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBg2Jf4t8h-08Ilm8qpRI5Ss7_vEx6-RN-R2eQxHqU4-3WkSC1gvngVAKWSokGla8wKkRm_V_b7rV6UqTtsKuQvAWG_xmtULxyL_AjKsmG3EaxMDaFLi3IOOUcbMRfinaz132fI0Td0LjLO7_HwigNOQlZ9hUP8NQm0HCbI9dbzfqCo4u1Bk7pEw2dYxfz3xTC3fh6H2WFek-fw4er3v6wV4jwCRKNBm6Ihl2Mh43kcEvdBs2Oz5qFWwdKsCGGWp-moCDrrueBGFvY"
  },
  {
    title: "Standard 6kg Cylinder", desc: "Includes burner stand", price: "₦18,500",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmbeDPlyKkRMjIN4VSl4hV8ks_cctyiki0dA94-292OicAKlLz4HkoL0SX7kRn5FXpwXBKu5KHEd0F1Yx4L-RYTWtayJqNz6ThXAWDuz28doJXJZXNKzws_HPv5m2LoVhe-J2DqryG5dDjVRuBj4iDILzVVXVed0YQak5IJ5CZsZiLj9ZWdesblkiWGfwkebkPNfiMWgDrXRonpRZHxwOZARAuiq2eTUpLPgYVUbEwp6C5Sx7VSBB5FfGguFUx3oMGg8gBBiy5gLQ"
  },
  {
    title: "Smart Gas Regulator", desc: "With auto-shutoff safety", price: "₦8,200",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCh0mVvBESs-WFvvQZBVI6YdyQfxEhvifr0hh_A6fzF6m9fsCftPvNZysGBanqUDY4sBsaR4885TO1uhqFxT5nz58AofKDQe-zU8HLriwcL6bDoeKGtroM5lYt0PTWe8vzOOvr624uPIas8VsI47xM86__YOhbURa1EY-0NR8Jnc76NuR0823eZPJB1y4ztuXv8Vm8x7XSxd0ogm7G0OShiQbgVYV_s49VkzdJQYdesF_eCjCIUnpMt6_RH24Qc8S2j6ZkNHULQeiA"
  },
  {
    title: "High-Pressure Hose", desc: "2 Meters + Stainless Clips", price: "₦4,500",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjRWgX8GNQ4ZiUgu8FSV3BvAYDFFo1kKHI7-Y5CbfjjZgDJs7Tw3DzXMX7OzwbJJ1hZOGmD69qCQS3odNDCLU8JCtf2CHOCUq8_mlJFvxP0DXrNjL8s3XmcP4IYKyRi1ZDoYBkhAshBU0zsnllD3KC8tNqza7pSChFfUNBk-Sl_eY7Rt-HW4h091KWe8BMfpgYPHPQL-bTGoLEESjzwOAxqBAwuu3qb-NUbDqHfwttMIyALtqpesrHqXmWYVBpKVjterG9pUZ51yQ"
  },
];

export function HomeShop() {
  return (
    <section className="bg-[#0F1117] py-14 sm:py-20" id="shop">
      <div className="container mx-auto px-4 sm:px-6">
        <FadeInView>
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-white">Our Online Shop</h2>
            <p className="text-gray-400 text-sm sm:text-base">Everything you need for a safe and efficient kitchen.</p>
          </div>
        </FadeInView>

        <FadeInView delay={0.05}>
          <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
            <Link href="/shop?category=cylinders" className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#0EA5E9]/10 text-[#0EA5E9] rounded-full text-xs sm:text-sm font-bold border border-[#0EA5E9]/20 hover:bg-[#0EA5E9] hover:text-white transition-all">Cylinders</Link>
            <Link href="/shop?category=regulators" className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 text-gray-400 rounded-full text-xs sm:text-sm font-bold border border-white/10 hover:border-[#0EA5E9]/50 transition-all">Regulators</Link>
            <Link href="/shop?category=stoves" className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 text-gray-400 rounded-full text-xs sm:text-sm font-bold border border-white/10 hover:border-[#0EA5E9]/50 transition-all">Stoves</Link>
          </div>
        </FadeInView>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {PRODUCTS.map((product, i) => (
            <FadeInView key={product.title} delay={0.1 * (i + 1)}>
              <div className="group bg-[#11151C] rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/5 flex flex-col h-full">
                <div className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4 bg-white/5">
                  <img alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={product.img} />
                  {product.badge && (
                    <div className="absolute top-2 left-2 bg-[#0EA5E9] px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[8px] sm:text-[10px] font-bold text-white">{product.badge}</div>
                  )}
                </div>
                <h3 className="text-xs sm:text-lg font-bold mb-1 text-white leading-tight">{product.title}</h3>
                <p className="text-gray-400 text-[11px] sm:text-sm mb-3 sm:mb-4 line-clamp-1">{product.desc}</p>
                <div className="mt-auto flex items-center justify-between gap-2">
                  <span className="text-sm sm:text-xl font-bold text-[#F59E0B]">{product.price}</span>
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

        {/* Centered CTA below items */}
        <FadeInView delay={0.3}>
          <div className="text-center mt-10 sm:mt-14">
            <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0EA5E9] hover:bg-sky-400 text-white font-bold rounded-full transition-all shadow-lg shadow-[#0EA5E9]/20 hover:shadow-[#0EA5E9]/40 text-sm sm:text-base">
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
