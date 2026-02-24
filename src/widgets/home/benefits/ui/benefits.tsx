import Image from 'next/image';

import styles from './benefits.module.css';

const benefitsData = [
  {
    icon: '/shield.svg',
    title: 'Quality assurance',
    desc: 'Each car undergoes detailed technical diagnostics and legal verification before sale.',
  },
  {
    icon: '/wallet.svg',
    title: 'Flexible Financing',
    desc: 'We offer personalized credit programs and fair Trade-in exchange values.',
  },
  {
    icon: '/flash.svg',
    title: 'Fast Checkout',
    desc: 'Paperwork and registration take less than 2 hours. Drive away in your new car today.',
  },
];

export function Benefits() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {benefitsData.map((item) => (
            <div key={item.title} className={styles.item}>
              <div className={styles.iconWrapper}>
                <Image src={item.icon} alt={item.title} width={24} height={24} />
              </div>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.desc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
