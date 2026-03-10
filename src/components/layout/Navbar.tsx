'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((acc, item) => acc + item.qty, 0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 flex items-center ${isScrolled ? 'bg-[#0F1117]/80 backdrop-blur-lg border-b border-white/10' : 'bg-[#0F1117]/60 backdrop-blur-lg border-b border-white/10'}`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo & Brand Name */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 bg-[#0EA5E9] rounded-lg flex items-center justify-center shadow-lg shadow-[#0EA5E9]/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.99 7.99 0 0120 13a7.98 7.98 0 01-2.343 5.657z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14l-0.657 2.121z"></path></svg>
          </div>
          <span className="text-xl font-bold tracking-tight whitespace-nowrap text-white">BlueFlame<span className="text-[#0EA5E9]">Gas</span></span>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-semibold tracking-wide">
          <Link href="/services" className={`relative transition-all group py-1 ${pathname === '/services' ? 'text-white' : 'text-white/70 hover:text-white'}`}>
            SERVICES
            <span className={`absolute bottom-0 left-0 h-0.5 bg-[#0EA5E9] transition-all duration-300 ${pathname === '/services' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
          <Link href="/shop" className={`relative transition-all group py-1 ${pathname === '/shop' ? 'text-white' : 'text-white/70 hover:text-white'}`}>
            SHOP
            <span className={`absolute bottom-0 left-0 h-0.5 bg-[#0EA5E9] transition-all duration-300 ${pathname === '/shop' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
          <Link href="/safety" className={`relative transition-all group py-1 ${pathname === '/safety' ? 'text-white' : 'text-white/70 hover:text-white'}`}>
            SAFETY TIPS
            <span className={`absolute bottom-0 left-0 h-0.5 bg-[#0EA5E9] transition-all duration-300 ${pathname === '/safety' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
          <Link href="/locations" className={`relative transition-all group py-1 ${pathname === '/locations' ? 'text-white' : 'text-white/70 hover:text-white'}`}>
            LOCATIONS
            <span className={`absolute bottom-0 left-0 h-0.5 bg-[#0EA5E9] transition-all duration-300 ${pathname === '/locations' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
          <Link href="/newsletter" className={`relative transition-all group py-1 ${pathname === '/newsletter' ? 'text-white' : 'text-white/70 hover:text-white'}`}>
            NEWSLETTER
            <span className={`absolute bottom-0 left-0 h-0.5 bg-[#0EA5E9] transition-all duration-300 ${pathname === '/newsletter' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
        </div>
        
        {/* Actions & Hamburger */}
        <div className="flex items-center gap-3 md:gap-6">
          <Link href="/cart" className="relative p-3 sm:p-2 hover:bg-white/5 active:bg-white/10 rounded-full transition-colors group">
            <ShoppingCart className="w-6 h-6 text-white/80 group-hover:text-[#0EA5E9] transition-colors" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#F59E0B] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/cart" className="hidden sm:flex px-5 py-2.5 bg-white/10 hover:bg-[#0EA5E9] hover:border-[#0EA5E9] text-white text-sm font-bold rounded-full border border-white/20 transition-all items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            <span>Checkout</span>
          </Link>
          
          {/* Mobile Menu Trigger */}
          <button 
            className="lg:hidden p-3 -mr-2 text-white hover:bg-white/5 active:bg-white/10 rounded-lg transition-colors cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-[#0F1117]/95 backdrop-blur-xl border-t border-white/10 flex flex-col p-6 gap-6 shadow-2xl"
          >
            <Link href="/services" onClick={() => setMobileOpen(false)} className={`text-xl font-bold tracking-widest uppercase ${pathname === '/services' ? 'text-[#0EA5E9]' : 'text-white'}`}>Services</Link>
            <Link href="/shop" onClick={() => setMobileOpen(false)} className={`text-xl font-bold tracking-widest uppercase ${pathname === '/shop' ? 'text-[#0EA5E9]' : 'text-white'}`}>Shop</Link>
            <Link href="/safety" onClick={() => setMobileOpen(false)} className={`text-xl font-bold tracking-widest uppercase ${pathname === '/safety' ? 'text-[#0EA5E9]' : 'text-white'}`}>Safety Tips</Link>
            <Link href="/locations" onClick={() => setMobileOpen(false)} className={`text-xl font-bold tracking-widest uppercase ${pathname === '/locations' ? 'text-[#0EA5E9]' : 'text-white'}`}>Locations</Link>
            <Link href="/newsletter" onClick={() => setMobileOpen(false)} className={`text-xl font-bold tracking-widest uppercase ${pathname === '/newsletter' ? 'text-[#0EA5E9]' : 'text-white'}`}>Newsletter</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
