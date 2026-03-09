'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { formatPrice } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface Order {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  status: string;
  total_amount: number;
  created_at: string;
  order_details: any[];
  nearest_branch_id: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    // Ideally, RLS policies will automatically scope this to the branch if they are a regional admin.
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (data) setOrders(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', id);
    if (!error) {
       setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    } else {
       alert('Failed to update status');
    }
  };

  if (loading) {
    return <div className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin"/> Loading orders...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Orders Management</h1>
        <button onClick={fetchOrders} className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20">Refresh</button>
      </div>

      <div className="bg-[#1e1e1e] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black/20 border-b border-white/5 text-gray-400 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Items</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No orders found.</td></tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs">{order.id.split('-')[0]}</span>
                      <div className="text-gray-500 text-xs mt-1">{new Date(order.created_at).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{order.customer_name}</div>
                      <div className="text-gray-500 text-xs">{order.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm bg-white/5 px-2 py-1 rounded inline-block">
                        {order.order_details?.length || 0} items
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-blueflame">
                      {formatPrice(order.total_amount)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        order.status === 'completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                        order.status === 'cancelled' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                        'bg-orange-500/10 text-orange-500 border border-orange-500/20'
                      }`}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="bg-black border border-white/10 rounded px-2 py-1 text-sm outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
