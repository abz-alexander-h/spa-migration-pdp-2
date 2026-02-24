import clsx from 'clsx';
import Image from 'next/image';
import { useCallback, useState, useSyncExternalStore } from 'react';

import { getCookie, setCookie } from '@/shared/lib/cookies';

import styles from './cookie-banner.module.css';

const COOKIE_KEY = 'cookies_accepted';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
const subscribeToCookieChanges = () => () => {};
const getCookieConsent = () => getCookie(COOKIE_KEY) === 'true';

export function CookieBanner() {
  const [isDismissed, setIsDismissed] = useState(false);
  const hasAcceptedCookie = useSyncExternalStore(
    subscribeToCookieChanges,
    getCookieConsent,
    () => true
  );
  const isVisible = !hasAcceptedCookie && !isDismissed;

  const handleAccept = useCallback(() => {
    setCookie(COOKIE_KEY, 'true', ONE_YEAR_SECONDS);
    setIsDismissed(true);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={clsx('container', styles.content)}>
        <div className={styles.info}>
          <Image src="/cookies.svg" alt="Cookies" className={styles.icon} width={43} height={40} />
          <p className={styles.text}>
            We use cookies and similar technologies to enhance your browsing experience, analyze
            site traffic, and personalize content. By clicking &quot;Accept All Cookies&quot;, you
            consent to our use of cookies. You can manage your preferences in your browser settings.
          </p>
        </div>

        <button className={styles.button} onClick={handleAccept} type="button">
          Accept All Cookies
        </button>
      </div>
    </div>
  );
}
