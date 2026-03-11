'use client';

import { useState, useEffect } from 'react';
import { Send, ChevronRight, Bold, Italic, Underline, List, ListOrdered, Link, Code, Calendar, CalendarDays, Loader2, CheckCircle, Trash2, Eye, EyeOff, PenSquare, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';
import { ImageUpload } from '@/components/admin/ImageUpload';

const TAGS = ['Safety', 'Market Update', 'Maintenance', 'Promotion', 'Company News', 'Product Update'];
const TAG_COLORS: Record<string, string> = {
  'Safety': 'bg-[#0EA5E9]',
  'Market Update': 'bg-green-500',
  'Maintenance': 'bg-orange-500',
  'Promotion': 'bg-pink-500',
  'Company News': 'bg-purple-500',
  'Product Update': 'bg-yellow-500',
};

// ─── Published Posts List ────────────────────────────────────────────────────
function PostsList({ onNew }: { onNew: () => void }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('newsletter_posts')
      .select('id, title, tag, tag_color, published, created_at, image_url')
      .order('created_at', { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from('newsletter_posts').delete().eq('id', id);
    if (!error) setPosts(posts.filter(p => p.id !== id));
    else alert('Delete failed: ' + error.message);
  };

  const handleTogglePublish = async (post: any) => {
    const { error } = await supabase.from('newsletter_posts').update({ published: !post.published }).eq('id', post.id);
    if (!error) setPosts(posts.map(p => p.id === post.id ? { ...p, published: !p.published } : p));
    else alert('Update failed: ' + error.message);
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-blueflame animate-spin" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">{posts.length} {posts.length === 1 ? 'Post' : 'Posts'}</h3>
        <button onClick={onNew} className="px-4 py-2 bg-blueflame text-white text-sm font-bold rounded-lg flex items-center gap-2 shadow-lg shadow-blueflame/20">
          <PenSquare className="w-4 h-4" /> New Post
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-4 text-gray-700" />
          <p>No posts yet. Create your first newsletter post.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map(post => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 p-4 bg-[#121212] border border-white/5 rounded-xl hover:border-white/10 transition-all">
              {/* Thumbnail */}
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-black/40 border border-white/5 shrink-0 flex items-center justify-center">
                {post.image_url
                  ? <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${post.image_url}')` }} />
                  : <FileText className="w-6 h-6 text-gray-600" />
                }
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm truncate">{post.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded ${post.tag_color || 'bg-blueflame'}`}>{post.tag}</span>
                  <span className={`text-[10px] font-semibold ${post.published ? 'text-emerald-400' : 'text-gray-500'}`}>
                    {post.published ? '● Live' : '○ Draft'}
                  </span>
                  <span className="text-[10px] text-gray-600">
                    {new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleTogglePublish(post)}
                  title={post.published ? 'Unpublish (hide from customers)' : 'Publish (show to customers)'}
                  className={`p-2 rounded-lg transition-colors ${post.published ? 'text-emerald-400 hover:bg-emerald-400/10' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}
                >
                  {post.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleDelete(post.id, post.title)}
                  className="p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Create / Editor Form ─────────────────────────────────────────────────────
function CreateForm({ onViewPosts }: { onViewPosts: () => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tag, setTag] = useState('Safety');
  const [imageUrl, setImageUrl] = useState('');

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
      setTimeout(() => {
        setTitle(''); setContent(''); setExcerpt(''); setImageUrl(''); setTag('Safety');
        setSaveStatus('idle');
        if (publish) onViewPosts(); // Switch to list after publishing
      }, 1800);
    } else {
      alert('Failed to save: ' + error.message);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-black tracking-tight text-white">Create Newsletter Post</h2>
        <button onClick={onViewPosts} className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
          <FileText className="w-4 h-4" /> Manage Posts
        </button>
      </div>

      {saveStatus !== 'idle' && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`flex items-center gap-3 p-4 rounded-xl border font-bold mb-6 ${saveStatus === 'published' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-blueflame/10 border-blueflame/20 text-blueflame'}`}>
          <CheckCircle className="w-5 h-5" />
          {saveStatus === 'published' ? '🎉 Post is now live on the customer newsletter page!' : 'Draft saved. Not visible to customers yet.'}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider ml-1">Newsletter Title *</label>
            <input className="w-full bg-[#121212] border border-white/10 rounded-xl p-4 text-lg font-semibold text-white focus:border-blueflame focus:ring-1 focus:ring-blueflame transition-all outline-none placeholder:text-gray-600 shadow-lg" placeholder="e.g. New Safety Protocols for Industrial Refilling" type="text" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider ml-1">Short Excerpt (optional)</label>
            <input className="w-full bg-[#121212] border border-white/10 rounded-xl p-3 text-sm text-white focus:border-blueflame focus:ring-1 focus:ring-blueflame transition-all outline-none placeholder:text-gray-600 shadow-lg" placeholder="A brief 1-2 sentence summary..." type="text" value={excerpt} onChange={e => setExcerpt(e.target.value)} />
          </div>
          <div className="space-y-2 flex flex-col">
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider ml-1">Content Body</label>
            <div className="bg-[#121212] border border-white/10 rounded-xl overflow-hidden focus-within:border-blueflame focus-within:ring-1 focus-within:ring-blueflame transition-all shadow-xl flex flex-col">
              <div className="bg-black/40 border-b border-white/5 p-2 flex flex-wrap gap-1">
                {[Bold, Italic, Underline].map((Icon, i) => <button key={i} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"><Icon className="w-4 h-4" /></button>)}
                <div className="w-px h-6 bg-white/10 mx-1 self-center"></div>
                {[List, ListOrdered].map((Icon, i) => <button key={i} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"><Icon className="w-4 h-4" /></button>)}
                <div className="w-px h-6 bg-white/10 mx-1 self-center"></div>
                {[Link, Code].map((Icon, i) => <button key={i} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"><Icon className="w-4 h-4" /></button>)}
              </div>
              <textarea className="w-full bg-transparent border-none p-4 text-gray-300 focus:ring-0 outline-none resize-none leading-relaxed min-h-[280px]" placeholder="Write your full article content here..." value={content} onChange={e => setContent(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Right: Settings */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="bg-[#121212] border border-white/5 rounded-xl p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-white/5">
              <CalendarDays className="text-blueflame w-5 h-5" /> Post Settings
            </h3>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 ml-1">Category Tag</label>
              <select value={tag} onChange={e => setTag(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-blueflame outline-none appearance-none">
                {TAGS.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Preview:</span>
              <span className={`px-2 py-0.5 rounded text-white text-xs font-bold ${TAG_COLORS[tag] || 'bg-blueflame'}`}>{tag}</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-[#121212] border border-white/5 rounded-xl p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-white/5">
              <Calendar className="text-blueflame w-5 h-5" /> Hero Image
            </h3>
            <ImageUpload bucket="newsletter-images" currentUrl={imageUrl} onUploaded={url => setImageUrl(url)} />
            <p className="text-xs text-gray-500">Recommended 1200×630px.</p>
          </motion.div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-white/5">
        <button onClick={() => handleSubmit(false)} disabled={isSaving} className="px-5 py-2.5 rounded-lg border border-white/10 text-gray-300 font-semibold text-sm hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Save Draft
        </button>
        <button onClick={() => handleSubmit(true)} disabled={isSaving} className="px-6 py-2.5 rounded-lg bg-blueflame text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blueflame/20">
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Publish Post
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function NewsletterEditorPage() {
  const [view, setView] = useState<'list' | 'create'>('list');

  return (
    <div className="flex flex-col h-full space-y-6 max-w-6xl mx-auto w-full">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2 text-gray-400">
          <span className="text-sm">Newsletter</span>
          <ChevronRight className="w-4 h-4 text-gray-500" />
          <span className="text-white text-sm font-semibold">{view === 'list' ? 'All Posts' : 'New Post'}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setView('list')} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${view === 'list' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}>
            <FileText className="w-4 h-4 inline mr-1.5" />All Posts
          </button>
          <button onClick={() => setView('create')} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${view === 'create' ? 'bg-blueflame text-white' : 'text-gray-400 hover:text-white'}`}>
            <PenSquare className="w-4 h-4 inline mr-1.5" />New Post
          </button>
        </div>
      </header>

      {view === 'list'
        ? <PostsList onNew={() => setView('create')} />
        : <CreateForm onViewPosts={() => setView('list')} />
      }
    </div>
  );
}
