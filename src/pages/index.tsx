import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import { getCars } from '@/entities/car/api/cars-api';
import type { Car } from '@/entities/car/model/types';
import { HomePage } from '@/views/home-page/ui/home-page';

interface HomePageRouteProps {
  cars: Car[];
  isApiFallback: boolean;
}

export default function HomePageRoute({
  cars,
  isApiFallback,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <HomePage cars={cars} isApiFallback={isApiFallback} />;
}

export const getStaticProps: GetStaticProps<HomePageRouteProps> = async () => {
  const carsResult = await getCars(10);

  return {
    props: {
      cars: carsResult.cars,
      isApiFallback: carsResult.status === 'fallback',
    },
    revalidate: 180,
  };
};
