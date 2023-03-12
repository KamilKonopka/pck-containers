export interface Location {
  id: number;
  voivodeship: string;
  district: string;
  area: string;
  city: string;
  address: string;
}

export enum LocationHierarchy {
  voivodeship,
  district,
  area,
  city,
  address,
}

export const locationFields: readonly string[] = Object.freeze([
  'voivodeship',
  'district',
  'area',
  'city',
  'address',
]);
