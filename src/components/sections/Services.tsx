'use client';

import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Flame, Clock } from 'lucide-react';

const services = [
  {
    icon: Flame,
    title: 'Premium LPG',
    description: 'High-quality, clean-burning cooking gas for domestic and commercial use.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Same-day delivery directly to your doorstep with real-time tracking.',
  },
  {
    icon: ShieldCheck,
    title: 'Safety First',
    description: 'Certified cylinders with regular safety inspections and maintenance.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock customer support for emergencies and inquiries.',
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-[#121212] relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Why Choose BlueFlame?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Experience unparalleled service with our premium gas delivery system designed for your convenience and safety.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-[#1e1e1e] border border-white/5 hover:border-blueflame/50 transition-colors group"
            >
              <div className="w-14 h-14 rounded-full bg-blueflame/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-blueflame" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
