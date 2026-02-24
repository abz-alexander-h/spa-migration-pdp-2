import type { CarDto, CarsListEnvelopeDto } from '@/entities/car/api/car-contract';
import type { Car } from '@/entities/car/model/types';

type UnknownRecord = Record<string, unknown>;

function isObject(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null;
}

function isCarDto(value: unknown): value is CarDto {
  return isObject(value);
}

export function mapCarDtoToEntity(input: unknown): Car | null {
  if (!isCarDto(input)) {
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

export function mapCarsListResponseToEntities(payload: unknown): Car[] {
  if (Array.isArray(payload)) {
    return payload.map(mapCarDtoToEntity).filter((car): car is Car => car !== null);
  }

  if (isObject(payload)) {
    const envelope = payload as CarsListEnvelopeDto;

    if (Array.isArray(envelope.data)) {
      return envelope.data
        .map(mapCarDtoToEntity)
        .filter((car): car is Car => car !== null);
    }
  }

  return [];
}
