import { Component, OnInit } from '@angular/core';
import { User } from '../../../auth/models/user';
import { AuthService } from '../../../auth/services/auth.service';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  users: User[];
  books: Book[];

  constructor(
    private readonly userService: AuthService,
    private readonly bookService: BookService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.get().subscribe((books: Book[]) => {
      console.log(books);
      this.books = books;
    });
  }

  openDialog(book: Book) {
    const modalRef = this.dialog.open(BookDetailsComponent);
    modalRef.componentInstance.book = book;
  }

  addToList(bookId: number) {
    this.userService.addBookToList(bookId).subscribe((data) => console.log(data, 'addBookFromAuthService'));
  }
}
