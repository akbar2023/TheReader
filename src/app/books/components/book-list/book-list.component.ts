import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { UserService } from '../../../user/services/user.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  libraryBooks: Book[];
  userId: number;

  constructor(
    private readonly userService: UserService,
    private readonly bookService: BookService,
    private readonly authService: AuthService,
    public dialog: MatDialog
  ) {
    this.userId = this.authService.userDetails.id;
  }

  ngOnInit(): void {
    this.getLibraryBooks();
  }

  getLibraryBooks(): void {
    this.bookService.get().subscribe((books: Book[]) => {
      console.log(books, 'library books');
      this.libraryBooks = books;
    });
  }

  openDialog(book: Book) {
    const modalRef = this.dialog.open(BookDetailsComponent);
    modalRef.componentInstance.book = book;
  }

  addToList(bookId: number) {
    this.libraryBooks.forEach((book) => {
      if (book.id === bookId) {
        book.users.push(this.userId);
      }
    });
    this.userService.addBookToList(bookId).subscribe((data) => {
      console.log(data, 'addBook From UserService');
      alert(data);
    });
  }

  removeFromList(bookId: number): void {
    console.log('remove detected !');
    this.libraryBooks.forEach((book) => {
      if (book.id === bookId) {
        const index = book.users.indexOf(this.userId);
        book.users.splice(index, 1);
      }
    });
    this.userService.removeBookFromList(bookId).subscribe((data) => alert(data));
  }
}
