'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import supabase from '@/lib/supabase';
import { canAccessManagerApp, isPublicPath } from '@/lib/auth';

type AuthGateProps = {
  children: React.ReactNode;
};

export default function AuthGate({ children }: AuthGateProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    const validateSession = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      const isPublic = isPublicPath(pathname);

      if (!session) {
        if (!isPublic) router.replace('/login');
        if (mounted) setChecking(false);
        return;
      }

      if (!(await canAccessManagerApp(session.user))) {
        await supabase.auth.signOut();
        router.replace('/login?error=forbidden');
        if (mounted) setChecking(false);
        return;
      }

      if (isPublic) {
        router.replace('/');
      }

      if (mounted) setChecking(false);
    };

    validateSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const isPublic = isPublicPath(pathname);

      if (!session) {
        if (!isPublic) router.replace('/login');
        return;
      }

      void (async () => {
        if (!(await canAccessManagerApp(session.user))) {
          await supabase.auth.signOut();
          router.replace('/login?error=forbidden');
          return;
        }

        if (isPublic) {
          router.replace('/');
        }
      })();
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [pathname, router]);

  if (checking && !isPublicPath(pathname)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600">
        인증 정보를 확인하는 중입니다...
      </div>
    );
  }

  return <>{children}</>;
}
