import Link from 'next/link';

import styles from './status-page.module.css';

interface StatusPageProps {
  code: string;
  title: string;
  description: string;
}

export function StatusPage({ code, title, description }: StatusPageProps) {
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <h1 className={styles.title}>{code}</h1>
        <h2 className={styles.subtitle}>{title}</h2>
        <p className={styles.text}>{description}</p>
        <Link className={styles.button} href="/" prefetch={false}>
          Go to homepage
        </Link>
      </div>
    </div>
  );
}
