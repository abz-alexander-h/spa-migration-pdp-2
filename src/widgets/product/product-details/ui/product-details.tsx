import clsx from 'clsx';
import Image from 'next/image';

import type { Car } from '@/entities/car/model/types';
import { formatPrice } from '@/shared/lib/format';
import { ErrorBlock } from '@/shared/ui/error-block/error-block';
import { Catalog } from '@/widgets/home/catalog/ui/catalog';

import styles from './product-details.module.css';

interface ProductDetailsProps {
  product: Car;
  relatedCars: Car[];
  isProductFallback: boolean;
  isRelatedFallback: boolean;
}

export function ProductDetails({
  product,
  relatedCars,
  isProductFallback,
  isRelatedFallback,
}: ProductDetailsProps) {
  const isRemoteImage = product.image.urls.original.startsWith('http');

  return (
    <div className="container">
      {(isProductFallback || isRelatedFallback) && (
        <ErrorBlock
          wrapperClassName={styles.warning}
          title="Live API is unavailable"
          description="Product data is rendered from fallback cache."
          actionLabel="Reload"
        />
      )}

      <section className={clsx(styles.productInfo)}>
        <div className={styles.imageSide}>
          <Image
            src={product.image.urls.original}
            alt={product.name}
            width={543}
            height={305}
            unoptimized={isRemoteImage}
            sizes="(max-width: 768px) 100vw, 543px"
          />
        </div>

        <div className={styles.contentSide}>
          <h1>{product.name}</h1>

          <div className={styles.imageSideMob}>
            <Image
              src={product.image.urls.original}
              alt={product.name}
              width={328}
              height={218}
              unoptimized={isRemoteImage}
              sizes="100vw"
            />

            <div className={styles.price}>{formatPrice(product.price)}$</div>
            <div className={styles.divider} />
          </div>

          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          <div className={styles.specs}>
            <p className={styles.specItem}>0-100 km/h: {product.acceleration}</p>
            <p className={styles.specItem}>Drivetrain: {product.drivetrain}</p>
            <p className={styles.specItem}>Capacity: {product.capacity}</p>
            <p className={styles.specItem}>Tech: {product.tech}</p>
          </div>

          <div className={styles.divider} />

          <div className={styles.price}>{formatPrice(product.price)}$</div>
        </div>
      </section>

      <Catalog
        title="You may also be interested"
        cars={relatedCars}
        filterId={product.id}
        isApiFallback={isRelatedFallback}
      />
    </div>
  );
}
