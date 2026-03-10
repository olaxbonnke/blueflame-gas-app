'use client';

import { Settings, LogOut, User, Shield, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin'); // Redirect to login
  };

  return (
    <div className="flex flex-col h-full space-y-8 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="mb-2">
        <h2 className="text-3xl font-black text-white tracking-tight mb-2">Admin Settings</h2>
        <p className="text-gray-400 text-lg">Manage your account preferences and secure session.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        
        {/* Profile/Account Card (Placeholder for now) */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#121212] border border-white/5 rounded-xl p-6 shadow-xl h-fit border-t-4 border-t-blueflame">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
            <div className="w-16 h-16 rounded-full bg-blueflame/10 flex items-center justify-center border border-blueflame/20 text-blueflame">
               <User className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Your Profile</h3>
              <p className="text-sm text-gray-400">Manage your personal admin details.</p>
            </div>
          </div>
          
          <div className="space-y-4">
             <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Access Level</span>
                <span className="px-2.5 py-1 rounded bg-blueflame/10 text-blueflame font-bold border border-blueflame/20 uppercase tracking-wider text-[10px]">Active Session</span>
             </div>
             <p className="text-xs text-gray-500 leading-relaxed italic bg-black/40 p-3 rounded-lg border border-white/5">
               Profile editing is managed through your Google account authentication provider.
             </p>
          </div>
        </motion.div>

        {/* Security & System Card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#121212] border border-white/5 rounded-xl p-6 shadow-xl h-fit border-t-4 border-t-rose-500/50">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20 text-rose-500">
               <Shield className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Security & Session</h3>
              <p className="text-sm text-gray-400">Safely end your connection.</p>
            </div>
          </div>
          
          <div className="space-y-6">
             <div className="flex items-start gap-3 bg-rose-500/5 border border-rose-500/10 p-4 rounded-lg">
                <Info className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <p className="text-sm text-rose-200/70 leading-relaxed">
                  Always log out of your session if you are using a shared or public computer to prevent unauthorized access to the BlueFlame dashboard.
                </p>
             </div>
             
             <button 
               onClick={handleLogout}
               className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-bold transition-all shadow-[0_0_15px_rgba(244,63,94,0.3)] hover:shadow-[0_0_25px_rgba(244,63,94,0.5)]"
             >
               <LogOut className="w-5 h-5" />
               Log out of Admin Dashboard
             </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
