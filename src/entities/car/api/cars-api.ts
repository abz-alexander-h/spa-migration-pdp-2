import { mapCarDtoToEntity, mapCarsListResponseToEntities } from '@/entities/car/api/car-mapper';
import { HttpError, isHttpError } from '@/entities/car/api/http-error';
import { fallbackCars } from '@/entities/car/model/fallback-cars';
import type { CarResult, CarsListResult } from '@/entities/car/model/types';

const CARS_API_URL = 'https://bootcamp-frontend-api.abzdev2.com/v1/cars';
const REQUEST_TIMEOUT_MS = 8000;

async function fetchJson(url: string): Promise<unknown> {
  const controller = new AbortController();

  const timeoutPromise = new Promise<never>((_, reject) => {
    const timeoutId = setTimeout(() => {
      controller.abort();
      reject(new HttpError(504, 'Request timeout'));
    }, REQUEST_TIMEOUT_MS);

    controller.signal.addEventListener(
      'abort',
      () => {
        clearTimeout(timeoutId);
      },
      { once: true }
    );
  });

  const response = await Promise.race([
    fetch(url, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    }),
    timeoutPromise,
  ]);

  if (!response.ok) {
    throw new HttpError(response.status);
  }

  return response.json();
}

export async function getCars(limit = 10): Promise<CarsListResult> {
  const safeLimit = Number.isFinite(limit) ? Math.max(1, limit) : 10;

  try {
    const payload = await fetchJson(`${CARS_API_URL}?pagination=[1,${safeLimit}]`);
    const cars = mapCarsListResponseToEntities(payload);

    if (cars.length === 0) {
      return {
        status: 'fallback',
        cars: fallbackCars.slice(0, safeLimit),
      };
    }

    return {
      status: 'ok',
      cars,
    };
  } catch {
    return {
      status: 'fallback',
      cars: fallbackCars.slice(0, safeLimit),
    };
  }
}

export async function getCarById(id: number): Promise<CarResult> {
  try {
    const payload = await fetchJson(`${CARS_API_URL}/${id}`);
    const normalized = mapCarDtoToEntity(payload);

    if (!normalized) {
      return {
        status: 'not-found',
      };
    }

    return {
      status: 'ok',
      car: normalized,
    };
  } catch (error) {
    if (isHttpError(error) && error.status === 404) {
      return {
        status: 'not-found',
      };
    }

    const fallbackCar = fallbackCars.find((car) => car.id === id);

    if (fallbackCar) {
      return {
        status: 'fallback',
        car: fallbackCar,
      };
    }

    return {
      status: 'unavailable',
    };
  }
}
