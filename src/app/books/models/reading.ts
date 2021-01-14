export interface Reading {
  readingId: number;
  bookId: number;
  creatorId: number;
  author: string;
  title: string;
  read: boolean;
  favorite: boolean;
}
