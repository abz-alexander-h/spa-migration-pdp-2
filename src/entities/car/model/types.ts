export interface CarImage {
  urls: {
    original: string;
  };
}

export interface Car {
  id: number;
  name: string;
  price: number;
  is_in_stock: boolean;
  acceleration: string;
  drivetrain: string;
  capacity: string;
  tech: string;
  description: string;
  image: CarImage;
}

export interface CarsListResult {
  status: 'ok' | 'fallback';
  cars: Car[];
}

export type CarResult =
  | {
      status: 'ok';
      car: Car;
    }
  | {
      status: 'fallback';
      car: Car;
    }
  | {
      status: 'not-found';
    }
  | {
      status: 'unavailable';
    };
