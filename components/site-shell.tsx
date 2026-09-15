'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import SiteFooter from './site-footer';
import SiteHeader from './site-header';

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isInvitationRoute = pathname === '/inv' || pathname.startsWith('/inv/');

  return (
    <>
      {!isInvitationRoute && <SiteHeader />}
      <main>{children}</main>
      {!isInvitationRoute && <SiteFooter />}
    </>
  );
}
