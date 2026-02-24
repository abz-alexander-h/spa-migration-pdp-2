import Head from 'next/head';

import type { Car } from '@/entities/car/model/types';
import { CATALOG_SECTION_ID } from '@/shared/lib/scroll';
import { Banner } from '@/widgets/home/banner/ui/banner';
import { Benefits } from '@/widgets/home/benefits/ui/benefits';
import { BottomSection } from '@/widgets/home/bottom-section/ui/bottom-section';
import { Catalog } from '@/widgets/home/catalog/ui/catalog';
import { Choice } from '@/widgets/home/choice/ui/choice';

interface HomePageProps {
  cars: Car[];
  isApiFallback: boolean;
}

export function HomePage({ cars, isApiFallback }: HomePageProps) {
  return (
    <>
      <Head>
        <title>Grand Drive</title>
        <meta
          name="description"
          content="Choose a car that emphasizes your status. The world's best brands with a warranty and personalized service."
        />
      </Head>

      <div>
        <Banner />
        <Catalog cars={cars} sectionId={CATALOG_SECTION_ID} isApiFallback={isApiFallback} />
        <Choice />
        <Benefits />
        <BottomSection />
      </div>
    </>
  );
}

export type { HomePageProps };
