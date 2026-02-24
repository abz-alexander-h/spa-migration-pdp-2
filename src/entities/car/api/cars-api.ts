import { fallbackCars } from '@/entities/car/model/fallback-cars';
import type { Car, CarResult, CarsListResult } from '@/entities/car/model/types';

const CARS_API_URL = 'https://bootcamp-frontend-api.abzdev2.com/v1/cars';
const REQUEST_TIMEOUT_MS = 8000;

type UnknownRecord = Record<string, unknown>;

function isObject(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null;
}

function normalizeCar(input: unknown): Car | null {
  if (!isObject(input)) {
    return null;
  }

  const id = Number(input.id);
  const name = String(input.name ?? '');
  const price = Number(input.price);
  const isInStock = Boolean(input.is_in_stock);
  const acceleration = String(input.acceleration ?? 'N/A');
  const drivetrain = String(input.drivetrain ?? 'N/A');
  const capacity = String(input.capacity ?? 'N/A');
  const tech = String(input.tech ?? 'N/A');
  const description = String(input.description ?? '<p>Description is unavailable.</p>');

  const image = isObject(input.image) ? input.image : null;
  const urls = image && isObject(image.urls) ? image.urls : null;
  const original = urls ? String(urls.original ?? '') : '';

  if (!Number.isFinite(id) || !name || !Number.isFinite(price) || !original) {
    return null;
  }

  return {
    id,
    name,
    price,
    is_in_stock: isInStock,
    acceleration,
    drivetrain,
    capacity,
    tech,
    description,
    image: {
      urls: {
        original,
      },
    },
  };
}

function normalizeCarsList(payload: unknown): Car[] {
  if (Array.isArray(payload)) {
    return payload.map(normalizeCar).filter((car): car is Car => car !== null);
  }

  if (isObject(payload) && Array.isArray(payload.data)) {
    return payload.data.map(normalizeCar).filter((car): car is Car => car !== null);
  }

  return [];
}

async function fetchJson(url: string): Promise<unknown> {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`);

    if (response.status === 404) {
      (error as Error & { status?: number }).status = 404;
    }

    throw error;
  }

  return response.json();
}

export async function getCars(limit = 10): Promise<CarsListResult> {
  const safeLimit = Number.isFinite(limit) ? Math.max(1, limit) : 10;

  try {
    const payload = await fetchJson(`${CARS_API_URL}?pagination=[1,${safeLimit}]`);
    const cars = normalizeCarsList(payload);

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
    const normalized = normalizeCar(payload);

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
    const status = (error as Error & { status?: number }).status;

    if (status === 404) {
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
