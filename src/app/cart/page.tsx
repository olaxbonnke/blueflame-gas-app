'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/store';
import { supabase } from '@/lib/supabase/client';
import { formatPrice } from '@/lib/utils';
import { Trash2, ArrowLeft, Loader2, Send } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, removeItem, updateQty, clearCart } = useCartStore();
  const [branches, setBranches] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    branchId: '',
  });

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  useEffect(() => {
    const fetchBranches = async () => {
      const { data } = await supabase.from('branches').select('id, name').order('name');
      if (data) setBranches(data);
    };
    fetchBranches();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsLoading(true);

    try {
      // 1. Insert into Supabase
      const { data, error } = await supabase.from('orders').insert([{
        customer_name: formData.name,
        phone: formData.phone,
        address: formData.address,
        nearest_branch_id: formData.branchId,
        total_amount: total,
        order_details: items,
        status: 'pending'
      }]).select().single();

      if (error) throw error;

      // 2. Generate WhatsApp Link
      const orderId = data.id.substring(0, 8).toUpperCase();
      const message = `*NEW ORDER: #${orderId}*\n\n` +
        `*Customer:* ${formData.name}\n` +
        `*Phone:* ${formData.phone}\n` +
        `*Address:* ${formData.address}\n\n` +
        `*Items:*\n` +
        items.map(i => `- ${i.qty}x ${i.name} (${formatPrice(i.price * i.qty)})`).join('\n') +
        `\n\n*Total:* ${formatPrice(total)}`;
        
      const whatsappUrl = `https://wa.me/2348000000000?text=${encodeURIComponent(message)}`;

      // 3. Clear cart and redirect
      clearCart();
      window.open(whatsappUrl, '_blank');
      router.push('/order-success');
    } catch (err) {
      console.error('Checkout error:', err);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-24 container mx-auto px-6 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <Trash2 className="w-10 h-10 text-gray-500" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-400 mb-8">Looks like you haven't added any gas refills to your cart yet.</p>
        <Link href="/#shop" className="bg-blueflame text-white px-8 py-4 rounded-full font-semibold hover:-translate-y-1 transition-transform">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <Link href="/#shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#1e1e1e] border border-white/5 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/5 bg-black/20">
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </div>
              <div className="p-6 space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center relative pb-10 sm:pb-0">
                    <div className="flex gap-3 sm:gap-4 items-center w-full sm:w-auto">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-[#121212] rounded-xl border border-white/10 flex items-center justify-center">
                        <span className="text-[10px] sm:text-xs font-bold text-gray-400 text-center px-1 leading-tight">{item.name}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-base sm:text-lg leading-tight mb-1 sm:mb-0">{item.name}</h3>
                        <p className="text-blueflame font-bold">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 absolute sm:static bottom-0 left-0">
                      <div className="flex items-center gap-2 sm:gap-3 bg-black/50 border border-white/10 rounded-full px-2 sm:px-3 py-1">
                        <button 
                          onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                          className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center hover:text-blueflame disabled:opacity-50 transition-colors"
                          disabled={item.qty <= 1}
                        >-</button>
                        <span className="font-medium text-sm sm:text-base w-4 text-center">{item.qty}</span>
                        <button 
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center hover:text-blueflame transition-colors"
                        >+</button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 sm:p-2 text-red-400 hover:bg-red-400/10 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-black/20 border-t border-white/5 flex justify-between items-center text-xl font-bold">
                <span>Total Amount:</span>
                <span className="text-blueflame">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="bg-[#1e1e1e] border border-white/5 rounded-2xl p-6 space-y-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blueflame focus:ring-1 focus:ring-blueflame"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone / WhatsApp</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blueflame focus:ring-1 focus:ring-blueflame"
                  placeholder="0800 000 0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Delivery Address</label>
                <textarea 
                  required
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blueflame focus:ring-1 focus:ring-blueflame resize-none"
                  placeholder="Complete street address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Nearest Branch</label>
                <select
                  required
                  value={formData.branchId}
                  onChange={(e) => setFormData({...formData, branchId: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blueflame focus:ring-1 focus:ring-blueflame appearance-none"
                >
                  <option value="" disabled>Select a branch</option>
                  {branches.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-blueflame hover:bg-blueflame-dark text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                {isLoading ? 'Processing...' : 'Complete Order on WhatsApp'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
