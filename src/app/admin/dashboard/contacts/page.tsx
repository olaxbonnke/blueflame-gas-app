'use client';

import { useState, useEffect } from 'react';
import { Phone, MessageCircle, Mail, Share2, Facebook, Twitter, Instagram, Info, HelpCircle, PhoneCall, Loader2, CheckCircle, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';

const DEFAULTS = {
  phone: '',
  whatsapp: '',
  email: '',
  facebook: '',
  twitter: '',
  instagram: '',
};

export default function CompanyContactsPage() {
  const [rowId, setRowId] = useState<string | null>(null);
  const [saved, setSaved] = useState({ ...DEFAULTS });
  const [form, setForm] = useState({ ...DEFAULTS });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

  const isDirty = JSON.stringify(form) !== JSON.stringify(saved);

  useEffect(() => {
    const fetchContacts = async () => {
      const { data } = await supabase.from('contacts').select('*').limit(1).maybeSingle();
      if (data) {
        const vals = {
          phone: data.phone || '',
          whatsapp: data.whatsapp || '',
          email: data.email || '',
          facebook: data.facebook || '',
          twitter: data.twitter || '',
          instagram: data.instagram || '',
        };
        setRowId(data.id);
        setSaved(vals);
        setForm(vals);
      }
      setLoading(false);
    };
    fetchContacts();
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const payload = { ...form };

    let error;
    if (rowId) {
      ({ error } = await supabase.from('contacts').update(payload).eq('id', rowId));
    } else {
      const { data, error: insertError } = await supabase.from('contacts').insert([payload]).select().single();
      error = insertError;
      if (data) setRowId(data.id);
    }

    if (!error) {
      setSaved({ ...form });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } else {
      alert('Failed to save: ' + error.message);
    }
    setIsSaving(false);
  };

  const handleDiscard = () => {
    setForm({ ...saved });
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-blueflame animate-spin" /></div>;
  }

  return (
    <div className="flex flex-col h-full space-y-8 max-w-4xl mx-auto w-full">
      <div className="mb-2">
        <h2 className="text-3xl font-black text-white tracking-tight mb-2">Company Contacts Management</h2>
        <p className="text-gray-400 text-lg">Changes here update the footer and contact links on the live site.</p>
      </div>

      <div className="space-y-8 flex-1">
        {/* General Contacts */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#121212] border border-white/5 rounded-xl overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-white/5 bg-black/20">
            <h3 className="font-bold text-white flex items-center gap-2"><PhoneCall className="text-blueflame w-5 h-5" /> General Contact Information</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-300">Office Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-1 focus:ring-blueflame focus:border-blueflame transition-all text-white outline-none" type="text" placeholder="+234 800 000 0000" value={form.phone} onChange={e => handleChange('phone', e.target.value)} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-300">WhatsApp Number</label>
              <div className="relative">
                <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-1 focus:ring-blueflame focus:border-blueflame transition-all text-white outline-none" type="text" placeholder="+234 800 000 0000" value={form.whatsapp} onChange={e => handleChange('whatsapp', e.target.value)} />
              </div>
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-300">Support Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-1 focus:ring-blueflame focus:border-blueflame transition-all text-white outline-none" type="email" placeholder="support@blueflamegas.com" value={form.email} onChange={e => handleChange('email', e.target.value)} />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Social Media */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#121212] border border-white/5 rounded-xl overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-white/5 bg-black/20">
            <h3 className="font-bold text-white flex items-center gap-2"><Share2 className="text-blueflame w-5 h-5" /> Social Media Links</h3>
          </div>
          <div className="p-6 space-y-6">
            {[
              { key: 'facebook', icon: <Facebook className="w-5 h-5" />, placeholder: 'https://facebook.com/yourpage', bg: 'bg-blue-600/10', text: 'text-blue-500', border: 'border-blue-600/20' },
              { key: 'twitter', icon: <Twitter className="w-5 h-5" />, placeholder: 'https://twitter.com/yourhandle', bg: 'bg-sky-400/10', text: 'text-sky-400', border: 'border-sky-400/20' },
              { key: 'instagram', icon: <Instagram className="w-5 h-5" />, placeholder: 'https://instagram.com/yourpage', bg: 'bg-pink-600/10', text: 'text-pink-500', border: 'border-pink-600/20' },
            ].map(({ key, icon, placeholder, bg, text, border }) => (
              <div key={key} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center ${text} border ${border} shrink-0`}>{icon}</div>
                <input className="flex-1 px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-1 focus:ring-blueflame focus:border-blueflame transition-all text-white outline-none" placeholder={placeholder} type="text" value={(form as any)[key]} onChange={e => handleChange(key, e.target.value)} />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Save Bar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`flex flex-col sm:flex-row items-center justify-between p-6 rounded-xl gap-4 border transition-all ${isDirty ? 'bg-blueflame/5 border-blueflame/30' : 'bg-white/2 border-white/5'}`}>
          <div className="flex items-center gap-3 text-blueflame">
            <Info className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">
              {saveStatus === 'saved' ? '✅ Saved! Footer updated on the live site.' : isDirty ? 'You have unsaved changes.' : 'Contact info is up to date.'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button onClick={handleDiscard} disabled={!isDirty || isSaving} className="px-6 py-2.5 rounded-lg text-gray-400 font-semibold hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors w-full sm:w-auto disabled:opacity-40 flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" /> Discard
            </button>
            <button onClick={handleSave} disabled={!isDirty || isSaving} className="px-8 py-2.5 rounded-lg bg-blueflame text-white font-bold hover:bg-blueflame-dark shadow-[0_0_15px_rgba(10,160,235,0.4)] hover:shadow-[0_0_25px_rgba(10,160,235,0.6)] transition-all w-full sm:w-auto whitespace-nowrap disabled:opacity-40 flex items-center justify-center gap-2">
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : saveStatus === 'saved' ? <CheckCircle className="w-4 h-4" /> : null}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 p-6 rounded-xl border border-dashed border-white/20 flex flex-col items-center text-center bg-[#121212]/50">
        <HelpCircle className="text-gray-500 w-10 h-10 mb-3" />
        <h4 className="text-white font-bold mb-1">Need assistance?</h4>
        <p className="text-gray-400 text-sm max-w-sm">If you're having trouble updating company information, please contact the internal IT support desk.</p>
      </motion.div>
    </div>
  );
}
