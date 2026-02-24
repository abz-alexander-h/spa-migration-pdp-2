import type { Car } from '@/entities/car/model/types';

export const fallbackCars: Car[] = [
  {
    id: 1,
    name: 'Mercedes-Benz S-Class',
    price: 92000,
    is_in_stock: true,
    acceleration: '4.4 s',
    drivetrain: 'AWD',
    capacity: '2999 cc',
    tech: 'Mild Hybrid',
    description:
      '<p>The S-Class combines flagship comfort, safety technologies, and executive-level refinement.</p><p><strong>Highlights:</strong> adaptive suspension, panoramic roof, premium audio.</p>',
    image: {
      urls: {
        original: '/banner.webp',
      },
    },
  },
  {
    id: 2,
    name: 'BMW 7 Series',
    price: 88500,
    is_in_stock: true,
    acceleration: '4.7 s',
    drivetrain: 'RWD',
    capacity: '2998 cc',
    tech: 'Plug-in Hybrid',
    description:
      '<p>BMW 7 Series delivers dynamic handling and luxury comfort for long-distance travel.</p><p><strong>Highlights:</strong> digital cockpit, rear executive lounge, smart parking.</p>',
    image: {
      urls: {
        original: '/banner.webp',
      },
    },
  },
  {
    id: 3,
    name: 'Audi A8',
    price: 84000,
    is_in_stock: false,
    acceleration: '5.3 s',
    drivetrain: 'quattro AWD',
    capacity: '2995 cc',
    tech: 'Mild Hybrid',
    description:
      '<p>The Audi A8 emphasizes smooth ride quality and next-generation driver assistance.</p><p><strong>Highlights:</strong> matrix lights, quattro traction, massage seats.</p>',
    image: {
      urls: {
        original: '/banner.webp',
      },
    },
  },
  {
    id: 4,
    name: 'Porsche Taycan',
    price: 106000,
    is_in_stock: true,
    acceleration: '3.8 s',
    drivetrain: 'AWD',
    capacity: '93.4 kWh',
    tech: 'Electric',
    description:
      '<p>Taycan be a performance EV with instant torque and practical daily usability.</p><p><strong>Highlights:</strong> fast charging, launch control, adaptive aerodynamics.</p>',
    image: {
      urls: {
        original: '/banner.webp',
      },
    },
  },
  {
    id: 5,
    name: 'Lexus LS',
    price: 78000,
    is_in_stock: true,
    acceleration: '5.4 s',
    drivetrain: 'AWD',
    capacity: '3456 cc',
    tech: 'Hybrid',
    description:
      '<p>Lexus LS focuses on reliability, quiet ride, and premium craftsmanship.</p><p><strong>Highlights:</strong> Mark Levinson audio, climate concierge, safety suite.</p>',
    image: {
      urls: {
        original: '/banner.webp',
      },
    },
  },
  {
    id: 6,
    name: 'Range Rover',
    price: 112000,
    is_in_stock: false,
    acceleration: '4.6 s',
    drivetrain: 'AWD',
    capacity: '4395 cc',
    tech: 'Mild Hybrid',
    description:
      '<p>Range Rover combines luxury SUV comfort with confident all-terrain capability.</p><p><strong>Highlights:</strong> air suspension, terrain response, panoramic interior.</p>',
    image: {
      urls: {
        original: '/banner.webp',
      },
    },
  },
];
