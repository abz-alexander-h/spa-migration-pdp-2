import Head from 'next/head';

import { StatusPage } from '@/shared/ui/status-page/status-page';

export function ServiceUnavailablePage() {
  return (
    <>
      <Head>
        <title>Service temporarily unavailable</title>
      </Head>

      <StatusPage
        code="503"
        title="Service temporarily unavailable"
        description="We cannot load live product data right now. Please try again later or return to the homepage."
      />
    </>
  );
}
