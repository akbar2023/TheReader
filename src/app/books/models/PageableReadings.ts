import { Reading } from './reading';

export interface PageableReadings {
  readingDto: Reading[];
  totalElements: number;
  totalPages: number;
}
