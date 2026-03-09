'use client';

import { motion } from 'framer-motion';
import { ShieldAlert, Wind, Thermometer, Info } from 'lucide-react';

const safetyTips = [
  {
    icon: Wind,
    title: 'Ventilation is Key',
    description: 'Always keep your kitchen well-ventilated when using gas to prevent accumulation in case of minor leaks.',
  },
  {
    icon: ShieldAlert,
    title: 'Check for Leaks',
    description: 'Use soapy water to check connections. Never use a match or open flame to check for gas leaks.',
  },
  {
    icon: Thermometer,
    title: 'Store Upright',
    description: 'Always store and use your gas cylinder in an upright position in a cool, dry place away from direct sunlight.',
  },
  {
    icon: Info,
    title: 'Regular Maintenance',
    description: 'Replace your gas hose every 2 years and the regulator every 5 years to ensure maximum safety.',
  },
];

export function Safety() {
  return (
    <section id="safety" className="py-24 bg-[#121212] relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-6"
          >
            <ShieldAlert className="w-8 h-8 text-red-500" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Your Safety is Our Priority
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            LPG is extremely safe when used correctly. Follow these essential guidelines to ensure the safety of your home and family.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {safetyTips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4 p-6 rounded-2xl bg-[#1e1e1e] border border-white/5 hover:border-red-500/30 transition-colors"
            >
              <div className="shrink-0 w-12 h-12 rounded-full bg-black/50 flex items-center justify-center border border-white/10">
                <tip.icon className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{tip.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
