import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSyncExternalStore } from 'react';

import { NoInternetBanner } from '@/widgets/layout/no-internet-banner/ui/no-internet-banner';

import styles from './navbar.module.css';

const subscribeToOnlineStatus = (callback: () => void) => {
  if (typeof window === 'undefined') {
    return () => {};
  }

  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);

  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
};

const getOnlineStatus = () => (typeof navigator === 'undefined' ? true : navigator.onLine);

export function Navbar() {
  const router = useRouter();
  const isOnline = useSyncExternalStore(subscribeToOnlineStatus, getOnlineStatus, () => true);

  const isHomePage = router.pathname === '/';
  const isPrivacyPage = router.pathname === '/privacy';

  return (
    <header className={styles.wrapper}>
      {!isOnline && <NoInternetBanner />}

      <nav className={clsx('container', styles.header)}>
        <Link className={styles.logoLink} href="/" prefetch={false}>
          <Image src="/logo.svg" alt="Grand Drive logo" width={148} height={31} priority />
        </Link>

        <div className={styles.navLinks}>
          <Link className={clsx(isHomePage && styles.active)} href="/" prefetch={false}>
            Home
          </Link>
          <Link className={clsx(isPrivacyPage && styles.active)} href="/privacy" prefetch={false}>
            Privacy policy
          </Link>
        </div>
      </nav>
    </header>
  );
}
