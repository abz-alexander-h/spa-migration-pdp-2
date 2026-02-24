import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { getCarById, getCars } from '@/entities/car/api/cars-api';
import type { Car } from '@/entities/car/model/types';
import { ProductPage } from '@/views/product-page/ui/product-page';

interface ProductPageRouteProps {
  product: Car;
  relatedCars: Car[];
  isProductFallback: boolean;
  isRelatedFallback: boolean;
}

export default function ProductPageRoute({
  product,
  relatedCars,
  isProductFallback,
  isRelatedFallback,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <ProductPage
      product={product}
      relatedCars={relatedCars}
      isProductFallback={isProductFallback}
      isRelatedFallback={isRelatedFallback}
    />
  );
}

export const getServerSideProps: GetServerSideProps<ProductPageRouteProps> = async (context) => {
  const rawId = context.params?.id;

  if (!rawId || Array.isArray(rawId)) {
    return {
      notFound: true,
    };
  }

  const productId = Number(rawId);

  if (!Number.isInteger(productId) || productId <= 0) {
    return {
      notFound: true,
    };
  }

  const [productResult, relatedResult] = await Promise.all([getCarById(productId), getCars(10)]);

  if (productResult.status === 'not-found') {
    return {
      notFound: true,
    };
  }

  if (productResult.status === 'unavailable') {
    return {
      redirect: {
        destination: '/service-unavailable',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product: productResult.car,
      relatedCars: relatedResult.cars,
      isProductFallback: productResult.status === 'fallback',
      isRelatedFallback: relatedResult.status === 'fallback',
    },
  };
};
