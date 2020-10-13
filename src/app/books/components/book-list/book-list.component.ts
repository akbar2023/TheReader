import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { UserService } from '../../../user/services/user.service';
import { AuthService } from '../../../auth/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookSnackComponent } from '../book-snack/book-snack.component';

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
    public dialog: MatDialog,
    private snackBar: MatSnackBar
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
    this.userService.addBookToList(bookId).subscribe((response) => {
      console.log(response.status, 'addBook From UserService');
      if (response.status === 200) {
        this.snackBar.openFromComponent(BookSnackComponent, { duration: 1000, verticalPosition: 'top' });
        this.libraryBooks.forEach((book) => {
          if (book.id === bookId) {
            book.users.push(this.userId);
          }
        });
      }
    });
  }

  removeFromList(bookId: number): void {
    this.userService.removeBookFromList(bookId).subscribe((response) => {
      if (response.status === 200) {
        this.libraryBooks.forEach((book) => {
          if (book.id === bookId) {
            const index = book.users.indexOf(this.userId);
            book.users.splice(index, 1);
          }
        });
      }
    });
  }
}
