import type { ReactNode } from 'react';

import { CookieBanner } from '@/widgets/layout/cookie-banner/ui/cookie-banner';
import { Footer } from '@/widgets/layout/footer/ui/footer';
import { Navbar } from '@/widgets/layout/navbar/ui/navbar';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
    </>
  );
}
