import type { AppProps } from 'next/app';

import { MainLayout } from '@/widgets/layout/main-layout/ui/main-layout';

import '@/app-layer/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}
