import clsx from 'clsx';
import { useCallback } from 'react';

import styles from './no-internet-banner.module.css';

export function NoInternetBanner() {
  const handleReload = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }, []);

  return (
    <div className={styles.banner}>
      <div className={clsx('container', styles.content)}>
        <p className={styles.text}>
          No internet connection. Please check your connection and try again.
        </p>
        <button className={styles.button} onClick={handleReload} type="button">
          Reload
        </button>
      </div>
    </div>
  );
}
