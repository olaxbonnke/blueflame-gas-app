'use client';

import { useState } from 'react';
import { Send, ChevronRight, Bold, Italic, Underline, List, ListOrdered, Link, Code, Calendar, CalendarDays, Loader2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';

const TAGS = ['Safety', 'Market Update', 'Maintenance', 'Promotion', 'Company News', 'Product Update'];
const TAG_COLORS: Record<string, string> = {
  'Safety': 'bg-[#0EA5E9]',
  'Market Update': 'bg-green-500',
  'Maintenance': 'bg-orange-500',
  'Promotion': 'bg-pink-500',
  'Company News': 'bg-purple-500',
  'Product Update': 'bg-yellow-500',
};

export default function NewsletterEditorPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tag, setTag] = useState('Safety');
  const [imageUrl, setImageUrl] = useState('');
  const [publishDate, setPublishDate] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'published'>('idle');

  const handleSubmit = async (publish: boolean) => {
    if (!title) { alert('Please add a title before saving.'); return; }
    setIsSaving(true);
    const { error } = await supabase.from('newsletter_posts').insert([{
      title,
      content,
      excerpt: excerpt || content.substring(0, 120) + '...',
      tag,
      tag_color: TAG_COLORS[tag] || 'bg-[#0EA5E9]',
      image_url: imageUrl || null,
      published: publish,
    }]);
    setIsSaving(false);
    if (!error) {
      setSaveStatus(publish ? 'published' : 'saved');
      // Reset form after 2s
      setTimeout(() => {
        setTitle(''); setContent(''); setExcerpt(''); setImageUrl(''); setPublishDate(''); setTag('Safety');
        setSaveStatus('idle');
      }, 2500);
    } else {
      alert('Failed to save: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6 max-w-6xl mx-auto w-full">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2 text-gray-400">
          <span className="text-sm">Newsletter</span>
          <ChevronRight className="w-4 h-4 text-gray-500" />
          <span className="text-white text-sm font-semibold">New Post</span>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={() => handleSubmit(false)}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-lg border border-white/10 text-gray-300 font-semibold text-sm hover:bg-white/5 transition-colors w-full sm:w-auto text-center flex items-center justify-center gap-2"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Save Draft
          </button>
          <button
            onClick={() => handleSubmit(true)}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-lg bg-blueflame text-white font-bold text-sm hover:bg-blueflame-dark transition-all shadow-[0_0_15px_rgba(10,160,235,0.4)] flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Publish Post
          </button>
        </div>
      </header>

      {saveStatus !== 'idle' && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`flex items-center gap-3 p-4 rounded-xl border font-bold ${saveStatus === 'published' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-blueflame/10 border-blueflame/20 text-blueflame'}`}>
          <CheckCircle className="w-5 h-5" />
          {saveStatus === 'published' ? '🎉 Post is now live on the customer newsletter page!' : 'Draft saved. Not visible to customers yet.'}
        </motion.div>
      )}

      <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
        <h2 className="text-3xl font-black tracking-tight text-white mb-6">Create Newsletter Post</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Editor */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider ml-1">Newsletter Title *</label>
              <input
                className="w-full bg-[#121212] border border-white/10 rounded-xl p-4 text-lg font-semibold text-white focus:border-blueflame focus:ring-1 focus:ring-blueflame transition-all outline-none placeholder:text-gray-600 shadow-lg"
                placeholder="e.g. New Safety Protocols for Industrial Refilling"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="space-y-2">
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider ml-1">Short Excerpt (optional — auto-generated if blank)</label>
              <input
                className="w-full bg-[#121212] border border-white/10 rounded-xl p-3 text-sm text-white focus:border-blueflame focus:ring-1 focus:ring-blueflame transition-all outline-none placeholder:text-gray-600 shadow-lg"
                placeholder="A brief 1-2 sentence summary shown on the newsletter page..."
                type="text"
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-2 flex flex-col">
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider ml-1">Content Body</label>
              <div className="bg-[#121212] border border-white/10 rounded-xl overflow-hidden focus-within:border-blueflame focus-within:ring-1 focus-within:ring-blueflame transition-all shadow-xl flex flex-col">
                <div className="bg-black/40 border-b border-white/5 p-2 flex flex-wrap gap-1 items-center">
                  {[Bold, Italic, Underline].map((Icon, i) => (
                    <button key={i} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"><Icon className="w-4 h-4" /></button>
                  ))}
                  <div className="w-px h-6 bg-white/10 mx-1"></div>
                  {[List, ListOrdered].map((Icon, i) => (
                    <button key={i} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"><Icon className="w-4 h-4" /></button>
                  ))}
                  <div className="w-px h-6 bg-white/10 mx-1"></div>
                  {[Link, Code].map((Icon, i) => (
                    <button key={i} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"><Icon className="w-4 h-4" /></button>
                  ))}
                </div>
                <textarea
                  className="w-full bg-transparent border-none p-4 text-gray-300 focus:ring-0 outline-none resize-none leading-relaxed min-h-[300px]"
                  placeholder="Write your full article content here..."
                  value={content}
                  onChange={e => setContent(e.target.value)}
                />
              </div>
            </motion.div>
          </div>

          {/* Right: Settings */}
          <div className="space-y-6">
            {/* Tag */}
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="bg-[#121212] border border-white/5 rounded-xl p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-white/5">
                <CalendarDays className="text-blueflame w-5 h-5" /> Post Settings
              </h3>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 ml-1">Category Tag</label>
                <select
                  value={tag}
                  onChange={e => setTag(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-blueflame outline-none appearance-none"
                >
                  {TAGS.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              {/* Tag preview */}
              <div className="flex items-center gap-2 text-sm">
                <span>Preview:</span>
                <span className={`px-2 py-0.5 rounded text-white text-xs font-bold ${TAG_COLORS[tag] || 'bg-blueflame'}`}>{tag}</span>
              </div>
            </motion.div>

            {/* Hero Image URL */}
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-[#121212] border border-white/5 rounded-xl p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-white/5">
                <Calendar className="text-blueflame w-5 h-5" /> Hero Image
              </h3>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 ml-1">Image URL</label>
                <input
                  type="url"
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-blueflame outline-none transition-all text-sm"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                />
              </div>
              {imageUrl && (
                <div className="relative aspect-video rounded-lg overflow-hidden bg-black/40 mt-2">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
              )}
              <p className="text-xs text-gray-500">Paste a direct image URL. Recommended 1200×630px.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
