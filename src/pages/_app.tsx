import type { AppProps } from 'next/app';

import { MainLayout } from '@/widgets/layout/main-layout/ui/main-layout';

import '@/app-layer/styles/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
      <SpeedInsights />
    </MainLayout>
  );
}
