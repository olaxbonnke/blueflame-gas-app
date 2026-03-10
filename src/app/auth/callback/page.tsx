'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Loader2, ShieldCheck, ShieldAlert } from 'lucide-react';

function AuthCallbackContent() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [hash, setHash] = useState('');

  useEffect(() => {
    let isMounted = true;
    setHash(window.location.hash);
    
    // Only proceed if there is a hash or if we explicitly don't need one
    if (!window.location.hash && !window.location.search) {
       return;
    }
    
    const handleCallback = async () => {
      // Supabase client automatically processes the OAuth callback in the URL
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        if (isMounted) setError(sessionError?.message || 'Authentication failed. No session found.');
        setTimeout(() => isMounted && router.push('/admin?error=auth_failed'), 3000);
        return;
      }

      const user = session.user;
      if (!user?.email) {
        if (isMounted) setError('No email associated with this Google Account detected.');
        await supabase.auth.signOut();
        setTimeout(() => isMounted && router.push('/admin?error=no_email'), 3000);
        return;
      }

      try {
        // 1. Check if ANY master admin exists in the system
        const { data: mainAdmins, error: adminQueryError } = await supabase
          .from('profiles')
          .select('id')
          .eq('role', 'main_admin')
          .limit(1);

        if (adminQueryError) throw adminQueryError;

        // 2. HIGHLANDER RULE: Are we the very first user ever?
        if (!mainAdmins || mainAdmins.length === 0) {
          // Become the undisputed Master Admin!
          const { error: insertError } = await supabase
            .from('profiles')
            .upsert({ id: user.id, role: 'main_admin' });
          
          if (insertError) throw insertError;
          if (isMounted) router.push('/admin/dashboard');
          return;
        }

        // 3. A master admin exists. Check if WE are already in profiles (we've logged in before)
        const { data: myProfile, error: myProfileQueryError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (myProfileQueryError && myProfileQueryError.code !== 'PGRST116') {
            // PGRST116 is "Rows not found", which is expected if not in profiles. Throw others.
            throw myProfileQueryError;
        }

        if (myProfile) {
          // We are already successfully registered (either main_admin or sub_admin)
          if (isMounted) router.push('/admin/dashboard');
          return;
        }

        // 4. We are NOT in profiles. We must check the whitelisted_emails table!
        const { data: whitelist, error: whitelistError } = await supabase
          .from('whitelisted_emails')
          .select('role')
          .eq('email', user.email)
          .single();
          
        if (whitelistError && whitelistError.code !== 'PGRST116') {
             throw whitelistError;
        }

        if (whitelist) {
          // We are whitelisted! Promote us into the profiles table so we have constant access
          const { error: insertSubAdminError } = await supabase
            .from('profiles')
            .upsert({ id: user.id, role: whitelist.role || 'regional_admin' });
          
          if (insertSubAdminError) throw insertSubAdminError;
          if (isMounted) router.push('/admin/dashboard');
          return;
        } else {
          // 5. INTRUDER ALERT! Email not recognized.
          await supabase.auth.signOut();
          if (isMounted) router.push('/admin?error=unauthorized');
          return;
        }

      } catch (err: any) {
        console.error(err);
        if (isMounted) setError(err.message || 'An error occurred during authorization');
        await supabase.auth.signOut();
        setTimeout(() => isMounted && router.push('/admin'), 3000);
      }
    };

    // Slight delay to ensure the Supabase client has digested the URL fragments
    const timer = setTimeout(handleCallback, 1000);
    return () => {
        isMounted = false;
        clearTimeout(timer);
    };
  }, [router, hash]);

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
  )
}
