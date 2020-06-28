import {BookGenre} from './book-genre';

export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: BookGenre;
  summary: string;
}
