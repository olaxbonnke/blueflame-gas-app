'use client';

import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export function Newsletter() {
  return (
    <section id="newsletter" className="py-24 relative z-10 overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 bg-blueflame/5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blueflame/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-blueflame font-semibold tracking-wider uppercase text-sm mb-4 inline-block">Stay Updated</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Never Run Out of Gas Again</h2>
          <p className="text-gray-400 mb-10 text-lg">
            Subscribe to our newsletter for exclusive discounts, safety tips, and timely reminders to refill your cylinder before it runs empty.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-black/50 border border-white/10 rounded-full px-6 py-4 outline-none focus:border-blueflame focus:ring-1 focus:ring-blueflame transition-all"
              required
            />
            <button 
              type="submit"
              className="bg-blueflame hover:bg-white hover:text-black text-white px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 group"
            >
              Subscribe <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
