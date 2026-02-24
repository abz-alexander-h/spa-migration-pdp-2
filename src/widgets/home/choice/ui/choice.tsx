import styles from './choice.module.css';

export function Choice() {
  return (
    <section className={styles.choice}>
      <div className="container">
        <h2 className={styles.title}>Your Freedom of Choice</h2>
        <p className={styles.description}>
          We have gathered hundreds of models from the world&apos;s leading automakers in one place.
          No more switching between dealerships. Compare them live in our showroom.
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            Multi-brand Catalog: From budget-friendly options to premium class.
          </li>
          <li className={styles.listItem}>
            Full Service: Insurance, financing, and registration all handled on-site.
          </li>
          <li className={styles.listItem}>
            Transparency: Honest vehicle history and a professional approach.
          </li>
        </ul>
      </div>
    </section>
  );
}
