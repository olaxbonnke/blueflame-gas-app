'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Truck, DollarSign, Package, Users } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    revenue: 0,
    pendingDeliveries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      // Very basic aggregate fetch for demo. Production should use an RPC Call
      const { data: orders } = await supabase.from('orders').select('total_amount, status');
      
      if (orders) {
        setStats({
          totalOrders: orders.length,
          revenue: orders.reduce((sum, o) => sum + (o.total_amount || 0), 0),
          pendingDeliveries: orders.filter((o) => o.status === 'pending').length,
        });
      }
      setLoading(false);
    };
    
    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-gray-400">Loading metrics...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-white/5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-400 mb-1">Total Revenue</p>
              <h2 className="text-2xl font-bold">{formatPrice(stats.revenue)}</h2>
            </div>
            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-white/5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-400 mb-1">Pending Deliveries</p>
              <h2 className="text-2xl font-bold">{stats.pendingDeliveries}</h2>
            </div>
            <div className="w-12 h-12 bg-blueflame/10 rounded-full flex items-center justify-center">
              <Truck className="w-6 h-6 text-blueflame" />
            </div>
          </div>
        </div>

        <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-white/5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-400 mb-1">Total Orders</p>
              <h2 className="text-2xl font-bold">{stats.totalOrders}</h2>
            </div>
            <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1e1e1e] border border-white/5 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-gray-400">Activity logs will appear here. Navigate to Orders to see full lists.</p>
      </div>
    </div>
  );
}
