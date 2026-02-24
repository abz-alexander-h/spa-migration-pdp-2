import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './footer.module.css';

const CURRENT_YEAR = new Date().getUTCFullYear();

export function Footer() {
  const router = useRouter();
  const isPrivacyPage = router.pathname === '/privacy';

  return (
    <footer className={styles.footer}>
      <div className={clsx('container', styles.content)}>
        <div className={styles.left}>
          <span>&copy;{CURRENT_YEAR} GRANDDRIVE. All rights reserved</span>
        </div>

        <div className={styles.right}>
          <Link href={isPrivacyPage ? '/' : '/privacy'} prefetch={false}>
            {isPrivacyPage ? 'Home' : 'Privacy policy'}
          </Link>
        </div>
      </div>
    </footer>
  );
}
