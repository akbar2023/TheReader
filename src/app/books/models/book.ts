import { BookGenre } from './book-genre';
import { BookCreator } from './book-creator';

export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: BookGenre;
  summary: string;
  creator?: BookCreator;
  creatorId?: number;
  users?: number[];
}
