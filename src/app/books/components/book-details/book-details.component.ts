import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  book: Book;
  bookId: number;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBookById(this.bookId).subscribe((data: Book) => {
      return (this.book = data);
    });
  }
}
