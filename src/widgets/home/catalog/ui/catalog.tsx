import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

import type { Car } from '@/entities/car/model/types';
import { formatPrice } from '@/shared/lib/format';
import { ErrorBlock } from '@/shared/ui/error-block/error-block';

import styles from './catalog.module.css';

interface CatalogProps {
  cars: Car[];
  title?: string;
  filterId?: number;
  sectionId?: string;
  isApiFallback?: boolean;
}

export function Catalog({
  cars,
  title = 'Catalog',
  filterId,
  sectionId,
  isApiFallback = false,
}: CatalogProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const filteredCars = useMemo(() => {
    if (!filterId) {
      return cars;
    }

    return cars.filter((car) => car.id !== filterId);
  }, [cars, filterId]);

  const checkScroll = () => {
    if (!scrollRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();

    window.addEventListener('resize', checkScroll);
    return () => {
      window.removeEventListener('resize', checkScroll);
    };
  }, [filteredCars.length]);

  const scrollCards = (direction: 'left' | 'right') => {
    if (!scrollRef.current) {
      return;
    }

    const scrollAmount = 586;

    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id={sectionId} className={clsx(!filterId && 'container', styles.catalogSection)}>
      <div className={styles.top}>
        <h2>{title}</h2>
        <div className={styles.controls}>
          <button
            onClick={() => scrollCards('left')}
            disabled={!canScrollLeft}
            aria-label="Previous"
            type="button"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5 12H9.5"
                stroke="#1A1A1A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.5 9L8.5 12L11.5 15"
                stroke="#1A1A1A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 6C2.75 7.67 2 9.75 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C10.57 2 9.2 2.3 7.97 2.85"
                stroke="#1A1A1A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            onClick={() => scrollCards('right')}
            disabled={!canScrollRight}
            aria-label="Next"
            type="button"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.5 12H14.5"
                stroke="#1A1A1A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.5 15L15.5 12L12.5 9"
                stroke="#1A1A1A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 6C2.75 7.67 2 9.75 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C10.57 2 9.2 2.3 7.97 2.85"
                stroke="#1A1A1A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {isApiFallback && (
        <ErrorBlock
          wrapperClassName={styles.apiFallback}
          title="Live API is unavailable"
          description="Catalog data is rendered from fallback cache."
          actionLabel="Reload"
        />
      )}

      {!filteredCars.length ? (
        <ErrorBlock
          title="Catalog is unavailable"
          description="No vehicles are available right now."
          actionLabel="Refresh page"
        />
      ) : (
        <div className={styles.scrollContainer} ref={scrollRef} onScroll={checkScroll}>
          {filteredCars.map((car) => {
            return (
              <Link
                href={`/product/${car.id}`}
                key={car.id}
                className={styles.card}
                prefetch={false}
              >
                <div className={styles.imageWrapper}>
                  <Image src={car.image.urls.original} alt={car.name} width={574} height={383} />
                </div>

                <div className={styles.info}>
                  <div className={styles.nameRow}>
                    <span className={styles.name}>{car.name}</span>
                    <span className={styles.status}>
                      {car.is_in_stock ? 'In Stock' : 'Out of stock'}
                    </span>
                  </div>
                  <div className={styles.price}>{formatPrice(car.price)}$</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
