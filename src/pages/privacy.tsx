import type { GetStaticProps } from 'next';

import { PrivacyPage } from '@/views/privacy-page/ui/privacy-page';

export default function PrivacyPageRoute() {
  return <PrivacyPage />;
}

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});
