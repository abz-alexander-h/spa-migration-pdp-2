import styles from './bottom-section.module.css';

export function BottomSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Grand Drive. The Art of Motion.</h2>
        <p className={styles.desc}>
          Choose reliability, proven by time and thousands of kilometers.
        </p>
      </div>
    </section>
  );
}
