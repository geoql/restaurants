import type { DBSchema } from 'idb';
import { Basemaps } from './map';

export interface MyDB extends DBSchema {
  basemaps: {
    value: Basemaps;
    key: string;
    indexes: { 'by-id': string };
  };
}
