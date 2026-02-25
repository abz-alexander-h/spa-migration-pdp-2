import clsx from 'clsx';
import Image from 'next/image';
import { useCallback } from 'react';

import { CATALOG_SECTION_ID, scrollToSection } from '@/shared/lib/scroll';

import styles from './banner.module.css';

export function Banner() {
  const handleScrollToCatalog = useCallback(() => {
    scrollToSection(CATALOG_SECTION_ID);
  }, []);

  return (
    <section className={styles.banner}>
      <Image
        src="/banner.webp"
        alt="Luxury car showroom"
        fill
        priority
        className={styles.background}
        sizes="100vw"
        fetchPriority={'high'}
      />

      <div className={clsx('container', styles.content)}>
        <h1 className={styles.title}>Your new journey begins here</h1>
        <p className={styles.description}>
          Choose a car that emphasizes your status. The world&apos;s best brands with a warranty and
          personalized service.
        </p>
        <button className={styles.ctaButton} onClick={handleScrollToCatalog} type="button">
          Browse the catalog
        </button>
      </div>
    </section>
  );
}
