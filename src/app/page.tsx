'use client';

import { Hero } from '@/components/home/Hero';
import { HomeServices } from '@/components/home/HomeServices';
import { HomeShop } from '@/components/home/HomeShop';
import { HomeSafety } from '@/components/home/HomeSafety';
import { HomeLocations } from '@/components/home/HomeLocations';
import { Newsletter } from '@/components/layout/Newsletter';

export default function Home() {
  return (
    <div className="bg-[#0F1117] text-[#E5E7EB] font-sans selection:bg-[#0EA5E9] selection:text-white">
      <Hero />
      <HomeServices />
      <HomeShop />
      <HomeSafety />
      <HomeLocations />
      <Newsletter />
    </div>
  );
}
