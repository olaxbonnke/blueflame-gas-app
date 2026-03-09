'use client';

import { Phone, MessageCircle, Mail, Share2, Facebook, Twitter, Instagram, Info, HelpCircle, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CompanyContactsPage() {
  return (
    <div className="flex flex-col h-full space-y-8 max-w-4xl mx-auto w-full">
      {/* Header Section */}
      <div className="mb-2">
        <h2 className="text-3xl font-black text-white tracking-tight mb-2">Company Contacts Management</h2>
        <p className="text-gray-400 text-lg">Centralize and manage how customers connect with BlueFlame Gas.</p>
      </div>

      {/* Form Section */}
      <div className="space-y-8 flex-1">
        
        {/* General Contacts Card */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#121212] border border-white/5 rounded-xl overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-white/5 bg-black/20">
            <h3 className="font-bold text-white flex items-center gap-2">
              <PhoneCall className="text-blueflame w-5 h-5" />
              General Contact Information
            </h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-300">Office Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input 
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-1 focus:ring-blueflame focus:border-blueflame transition-all text-white outline-none" 
                  type="text" 
                  defaultValue="+234 (800) 123-4567" 
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-300">WhatsApp Number</label>
              <div className="relative">
                <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input 
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-1 focus:ring-blueflame focus:border-blueflame transition-all text-white outline-none" 
                  type="text" 
                  defaultValue="+234 (800) 987-6543" 
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-300">Support Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input 
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-1 focus:ring-blueflame focus:border-blueflame transition-all text-white outline-none" 
                  type="email" 
                  defaultValue="support@blueflamegas.com" 
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Social Media Card */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} delay={0.1} className="bg-[#121212] border border-white/5 rounded-xl overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-white/5 bg-black/20">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Share2 className="text-blueflame w-5 h-5" />
              Social Media Links
            </h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-600/20 shrink-0">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <input 
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-1 focus:ring-blueflame focus:border-blueflame transition-all text-white outline-none" 
                  placeholder="Facebook Profile URL" 
                  type="text" 
                  defaultValue="https://facebook.com/blueflamegas" 
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-sky-400/10 flex items-center justify-center text-sky-400 border border-sky-400/20 shrink-0">
                <Twitter className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <input 
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-1 focus:ring-blueflame focus:border-blueflame transition-all text-white outline-none" 
                  placeholder="Twitter/X Handle" 
                  type="text" 
                  defaultValue="https://twitter.com/blueflamegas" 
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-pink-600/10 flex items-center justify-center text-pink-500 border border-pink-600/20 shrink-0">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <input 
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-1 focus:ring-blueflame focus:border-blueflame transition-all text-white outline-none" 
                  placeholder="Instagram Profile URL" 
                  type="text" 
                  defaultValue="https://instagram.com/blueflamegas" 
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Save Bar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} delay={0.2} className="flex flex-col sm:flex-row items-center justify-between p-6 bg-blueflame/5 border border-blueflame/20 rounded-xl gap-4">
          <div className="flex items-center gap-3 text-blueflame">
            <Info className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">Last updated: 2 hours ago by admin</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button className="px-6 py-2.5 rounded-lg text-gray-400 font-semibold hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors w-full sm:w-auto">
              Discard
            </button>
            <button className="px-8 py-2.5 rounded-lg bg-blueflame text-white font-bold hover:bg-blueflame-dark shadow-[0_0_15px_rgba(10,160,235,0.4)] hover:shadow-[0_0_25px_rgba(10,160,235,0.6)] transition-all w-full sm:w-auto whitespace-nowrap">
              Save Changes
            </button>
          </div>
        </motion.div>
      </div>

      {/* Help Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} delay={0.3} className="mt-8 p-6 rounded-xl border border-dashed border-white/20 flex flex-col items-center text-center bg-[#121212]/50">
        <HelpCircle className="text-gray-500 w-10 h-10 mb-3" />
        <h4 className="text-white font-bold mb-1">Need assistance?</h4>
        <p className="text-gray-400 text-sm max-w-sm">If you're having trouble updating company information, please contact the internal IT support desk.</p>
      </motion.div>
    </div>
  );
}
