import Head from 'next/head';

import type { Car } from '@/entities/car/model/types';
import { ProductDetails } from '@/widgets/product/product-details/ui/product-details';

interface ProductPageProps {
  product: Car;
  relatedCars: Car[];
  isProductFallback: boolean;
  isRelatedFallback: boolean;
}

export function ProductPage({
  product,
  relatedCars,
  isProductFallback,
  isRelatedFallback,
}: ProductPageProps) {
  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={`Detailed specs and description for ${product.name}.`} />
      </Head>

      <ProductDetails
        product={product}
        relatedCars={relatedCars}
        isProductFallback={isProductFallback}
        isRelatedFallback={isRelatedFallback}
      />
    </>
  );
}

export type { ProductPageProps };
