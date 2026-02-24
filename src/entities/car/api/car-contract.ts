export interface CarImageUrlsDto {
  original?: unknown;
}

export interface CarImageDto {
  urls?: CarImageUrlsDto | null;
}

export interface CarDto {
  id?: unknown;
  name?: unknown;
  price?: unknown;
  is_in_stock?: unknown;
  acceleration?: unknown;
  drivetrain?: unknown;
  capacity?: unknown;
  tech?: unknown;
  description?: unknown;
  image?: CarImageDto | null;
}

export interface CarsListEnvelopeDto {
  data?: unknown;
}
