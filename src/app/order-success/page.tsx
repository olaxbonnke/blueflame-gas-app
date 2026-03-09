'use client';

import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderSuccess() {
  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-[#0a0a0a]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#1e1e1e] p-10 rounded-3xl border border-white/10 text-center max-w-lg w-full mx-4"
      >
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Order Received!</h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Your order has been recorded and a chat has been opened on WhatsApp to complete the process. Our nearest branch will handle your order shortly.
        </p>
        
        <Link href="/" className="inline-block bg-white/10 hover:bg-white/20 px-8 py-4 rounded-full font-semibold transition-colors">
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
}
