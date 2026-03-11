'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Settings, LogOut, PackageSearch, LayoutDashboard, Truck, Users, Tag, Map, Shield, BookOpen, History, Mail } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [role, setRole] = useState<'main_admin' | 'sub_admin' | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      // 1. Check Supabase auth session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin');
        return;
      }

      const email = session.user.email?.toLowerCase();
      setUserEmail(email || null);

      // All users must be in admin_users table
      const { data: adminUser, error } = await supabase
        .from('admin_users')
        .select('role, status')
        .eq('email', email)
        .maybeSingle();

      if (!adminUser || error) {
        // Not on whitelist — sign them out and redirect
        await supabase.auth.signOut();
        router.push('/admin?blocked=1');
        return;
      }

      // 3. Set role from admin_users table
      const r = adminUser.role?.toLowerCase() || '';
      setRole(r.includes('sub') ? 'sub_admin' : 'main_admin');

      // 4. Mark as Active if still Invited
      if (adminUser.status === 'Invited') {
        await supabase.from('admin_users').update({ status: 'Active' }).eq('email', email);
      }

      setLoading(false);
    };

    checkUser();

    // Re-check on auth state changes (catches token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') router.push('/admin');
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] flex-col gap-3">
        <div className="w-8 h-8 border-2 border-blueflame border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">Verifying access...</p>
      </div>
    );
  }

  const links = [
    { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Orders', href: '/admin/dashboard/orders', icon: Truck },
    { name: 'Pricing', href: '/admin/dashboard/pricing', icon: Tag },
    { name: 'Accessories', href: '/admin/dashboard/accessories', icon: PackageSearch },
    ...(role === 'main_admin' ? [
      { name: 'Branches', href: '/admin/dashboard/branches', icon: Map },
      { name: 'Users', href: '/admin/dashboard/users', icon: Users },
      { name: 'Sub-Admins', href: '/admin/dashboard/subadmins', icon: Shield },
      { name: 'Contacts', href: '/admin/dashboard/contacts', icon: BookOpen },
      { name: 'Activity Log', href: '/admin/dashboard/activity', icon: History },
      { name: 'Newsletter', href: '/admin/dashboard/newsletter', icon: Mail },
      { name: 'Settings', href: '/admin/dashboard/settings', icon: Settings },
    ] : [])
  ];

  return (
    <div className="min-h-screen flex bg-[#0a0a0a] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#121212] border-r border-white/5 flex flex-col hidden md:flex shrink-0">
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="text-xl font-bold flex items-center gap-2" target="_blank">
            <span className="text-blueflame">Blue</span>Flame Admin
          </Link>
          <span className="text-xs text-blueflame mt-1 uppercase tracking-wider font-semibold bg-blueflame/10 px-2 py-1 rounded inline-block">
            {role === 'main_admin' ? 'Super Admin' : 'Sub Admin'}
          </span>
          {userEmail && <p className="text-[10px] text-gray-600 mt-1 truncate">{userEmail}</p>}
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
            >
              <link.icon className="w-5 h-5" />
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-3 w-full rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        {children}
      </main>
    </div>
  );
}
