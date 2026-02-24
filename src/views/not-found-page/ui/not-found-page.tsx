import Head from 'next/head';

import { StatusPage } from '@/shared/ui/status-page/status-page';

export function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Page not found</title>
      </Head>

      <StatusPage
        code="404"
        title="Page not found"
        description="The page you're looking for doesn't exist or may have been moved. Let's get you back on track."
      />
    </>
  );
}
