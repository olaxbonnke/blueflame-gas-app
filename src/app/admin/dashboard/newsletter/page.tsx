'use client';

import { 
  Search, Bell, ChevronRight, Send, Bold, Italic, Underline, List, 
  ListOrdered, Link, Code, Calendar, CalendarDays, ImageIcon, 
  UploadCloud, Info, Eye 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function NewsletterEditorPage() {
  return (
    <div className="flex flex-col h-full space-y-6 max-w-6xl mx-auto w-full">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2 text-gray-400">
          <span className="text-sm">Newsletter</span>
          <ChevronRight className="w-4 h-4 text-gray-500" />
          <span className="text-white text-sm font-semibold">Editor</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input 
              className="pl-10 pr-4 py-2 bg-[#121212] border border-white/10 rounded-lg text-sm w-64 focus:ring-1 focus:ring-blueflame focus:border-blueflame outline-none text-white transition-all placeholder:text-gray-500" 
              placeholder="Search entries..." 
              type="text"
            />
          </div>
          <button className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-[#121212] border border-white/10 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blueflame rounded-full border border-[#0a0a0a]"></span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
        
        {/* Title Area */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-white mb-2">Create Newsletter</h2>
            <p className="text-gray-400">Compose and schedule updates for your global subscriber list.</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="px-5 py-2.5 rounded-lg border border-white/10 text-gray-300 font-semibold text-sm hover:bg-white/5 transition-colors w-full sm:w-auto text-center">
              Save Draft
            </button>
            <button className="px-5 py-2.5 rounded-lg bg-blueflame text-white font-bold text-sm hover:bg-blueflame-dark transition-all shadow-[0_0_15px_rgba(10,160,235,0.4)] flex items-center justify-center gap-2 w-full sm:w-auto">
              <Send className="w-4 h-4" />
              Publish Post
            </button>
          </div>
        </div>

        {/* Editor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Editor Fields */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Title Input */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider ml-1">Newsletter Title</label>
              <input 
                className="w-full bg-[#121212] border border-white/10 rounded-xl p-4 text-lg font-semibold text-white focus:border-blueflame focus:ring-1 focus:ring-blueflame transition-all outline-none placeholder:text-gray-600 shadow-lg block" 
                placeholder="e.g. New Safety Protocols for Industrial Refilling" 
                type="text"
              />
            </motion.div>

            {/* Editor Area */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-2 flex flex-col h-full min-h-[500px]">
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider ml-1">Content Body</label>
              <div className="bg-[#121212] border border-white/10 rounded-xl overflow-hidden focus-within:border-blueflame focus-within:ring-1 focus-within:ring-blueflame transition-all shadow-xl flex-1 flex flex-col">
                
                {/* Formatting Toolbar */}
                <div className="bg-black/40 border-b border-white/5 p-2 flex flex-wrap gap-1 items-center">
                  <button className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors" title="Bold"><Bold className="w-4 h-4" /></button>
                  <button className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors" title="Italic"><Italic className="w-4 h-4" /></button>
                  <button className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors" title="Underline"><Underline className="w-4 h-4" /></button>
                  <div className="w-px h-6 bg-white/10 mx-1"></div>
                  <button className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors" title="Bullet List"><List className="w-4 h-4" /></button>
                  <button className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors" title="Numbered List"><ListOrdered className="w-4 h-4" /></button>
                  <div className="w-px h-6 bg-white/10 mx-1"></div>
                  <button className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors" title="Link"><Link className="w-4 h-4" /></button>
                  <button className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors" title="Inline Code"><Code className="w-4 h-4" /></button>
                </div>
                
                {/* Textarea */}
                <textarea 
                  className="w-full bg-transparent border-none p-4 text-gray-300 focus:ring-0 outline-none resize-none flex-1 leading-relaxed block" 
                  placeholder="Start typing your message to subscribers..." 
                ></textarea>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Settings & Metadata */}
          <div className="space-y-6">
            
            {/* Scheduling */}
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-[#121212] border border-white/5 rounded-xl p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-white/5">
                <Calendar className="text-blueflame w-5 h-5" />
                Schedule
              </h3>
              
              <div className="space-y-2 mt-4">
                <label className="text-xs font-medium text-gray-400 ml-1">Publish Date</label>
                <div className="relative">
                  <input 
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-blueflame focus:border-blueflame outline-none transition-all block appearance-none" 
                    type="date"
                  />
                  <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 ml-1">Audience Segment</label>
                <div className="relative">
                  <select className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-blueflame focus:border-blueflame outline-none transition-all appearance-none cursor-pointer block">
                    <option>All Subscribers</option>
                    <option>Retail Customers</option>
                    <option>Industrial Partners</option>
                    <option>New Signups (Last 30 days)</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                     <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Image Preview */}
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-[#121212] border border-white/5 rounded-xl p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-white/5">
                <ImageIcon className="text-blueflame w-5 h-5" />
                Hero Image
              </h3>
              
              <div className="relative aspect-video bg-black/40 border-2 border-dashed border-white/10 rounded-lg overflow-hidden flex flex-col items-center justify-center group cursor-pointer hover:border-blueflame/50 transition-colors mt-4">
                <img 
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity" 
                  alt="Pattern background" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRY7Z2jAnBOb6ssWo5fGeXI94VuupuJzVQvdPdNVcgf42ob_bfpRzIqSc4CSOw8MnnwS0qewVv9-QPi7M28VgRSPDThp9_aCdMeMdUY5AVTDkLocZ-DTPGDdlBD3h4sW6JCt7s_6JUii4HJQ8oebBxuWjDZLBpREx8tnQJdai_5tfR3ciXlEK3Gj6TEVwNCimcabODuAme9mWZPIStVFIRB1uS5gA6-4f5YjNkKbiQVvxD131e8KUdgY8kU53gC6bgBtPiJxseCbk" 
                />
                <div className="relative z-10 text-center p-4">
                  <UploadCloud className="text-gray-400 w-8 h-8 mx-auto mb-2 group-hover:text-blueflame transition-colors" />
                  <p className="text-sm font-medium text-gray-300">Change image</p>
                  <p className="text-xs text-gray-500 mt-1">Recommended: 1200x630px</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 pt-2 text-gray-500">
                <Info className="w-4 h-4 mt-0.5 shrink-0" />
                <p className="text-[11px] leading-tight">This image will appear at the top of the email and in social media previews.</p>
              </div>
            </motion.div>

            {/* Preview Action */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="pt-2">
              <button className="w-full group py-4 bg-[#121212] border-2 border-white/5 rounded-xl flex items-center justify-center gap-3 text-gray-400 hover:text-blueflame hover:border-blueflame/30 hover:bg-blueflame/5 transition-all shadow-lg">
                <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-sm tracking-wide">Live Mobile Preview</span>
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
