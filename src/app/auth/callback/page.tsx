'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Loader2, ShieldCheck, ShieldAlert } from 'lucide-react';

function AuthCallbackContent() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const handleCallback = async () => {
      await new Promise(r => setTimeout(r, 800));

      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        if (isMounted) setError('Authentication failed. Please try again.');
        setTimeout(() => isMounted && router.push('/admin?error=auth_failed'), 3000);
        return;
      }

      const email = session.user.email?.toLowerCase();
      if (!email) {
        await supabase.auth.signOut();
        if (isMounted) setError('No email found on this Google account.');
        setTimeout(() => isMounted && router.push('/admin?error=no_email'), 3000);
        return;
      }

      // Check admin_users whitelist — anyone in this table (any role) can access
      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('role, status')
        .eq('email', email)
        .maybeSingle();

      if (!adminUser) {
        await supabase.auth.signOut();
        if (isMounted) router.push('/admin?error=unauthorized');
        return;
      }

      // Mark as Active on first login (skip for developer role — stay invisible)
      if (adminUser.status === 'Invited' && adminUser.role !== 'developer') {
        await supabase.from('admin_users').update({ status: 'Active' }).eq('email', email);
      }

      if (isMounted) router.push('/admin/dashboard');
    };

    handleCallback();
    return () => { isMounted = false; };
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-4 text-center">
      {error ? (
        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-500 p-8 rounded-2xl max-w-md w-full shadow-2xl flex flex-col items-center">
          <ShieldAlert className="w-12 h-12 mb-4" />
          <h2 className="text-xl font-black mb-2 tracking-tight">Access Denied</h2>
          <p className="text-sm font-medium opacity-90">{error}</p>
          <p className="text-xs mt-6 opacity-60">Redirecting back to portal...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-blueflame/30 blur-2xl rounded-full"></div>
            <div className="w-20 h-20 bg-[#121212] rounded-full border border-white/10 flex items-center justify-center relative z-10 shadow-2xl">
              <ShieldCheck className="w-10 h-10 text-blueflame" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              Authenticating <Loader2 className="w-5 h-5 text-blueflame animate-spin" />
            </h2>
            <p className="text-gray-400 text-sm font-medium">Verifying authorization clearance...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        <Loader2 className="w-8 h-8 text-blueflame animate-spin" />
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
