import clsx from 'clsx';
import type { MouseEventHandler } from 'react';

import styles from './error-block.module.css';

interface ErrorBlockProps {
  wrapperClassName?: string;
  title?: string;
  description?: string;
  actionLabel?: string;
  onActionClick?: MouseEventHandler<HTMLButtonElement>;
  hideAction?: boolean;
}

export function ErrorBlock({
  wrapperClassName,
  title = 'We are already fixing it',
  description = 'The service is temporarily unavailable. Please try again later.',
  actionLabel = 'Refresh page',
  onActionClick,
  hideAction = false,
}: ErrorBlockProps) {
  const handleRefresh: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (onActionClick) {
      onActionClick(event);
      return;
    }

    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div className={clsx(styles.wrapper, wrapperClassName)}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{description}</p>
      {!hideAction && (
        <button className={styles.button} onClick={handleRefresh} type="button">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
