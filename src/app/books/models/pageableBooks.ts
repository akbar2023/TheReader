import { BookLite } from './book-lite';

export interface PageableBooks {
  bookLiteDto: BookLite[];
  totalElements: number;
  totalPages: number;
}
