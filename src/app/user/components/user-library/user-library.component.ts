import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Book } from '../../../books/models/book';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookDetailsComponent } from '../../../books/components/book-details/book-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-library',
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.scss'],
})
export class UserLibraryComponent implements OnInit {
  myBooks: Book[];
  userId: number;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.userDetails.id;
    this.getBooks();
  }

  getBooks() {
    this.userService.getMyBooks(this.userId).subscribe((books: Book[]) => {
      console.log(books, 'My books');
      this.myBooks = books;
    });
  }

  removeBookFromList(bookId: number, title: string) {
    this.userService.removeBookFromList(bookId, this.userId).subscribe((data) => {
      // alert(data);
      this.myBooks.forEach((book) => {
        if (book.id === bookId) {
          const index = this.myBooks.indexOf(book);
          this.myBooks.splice(index, 1);
        }
      });
      this.snackBar.open(`**${title}** removed from favorite!`, null, {
        duration: 1000,
        verticalPosition: 'top',
        panelClass: ['yellow-snackbar'],
      });
    });
  }

  openDialog(book: Book) {
    const modalRef = this.dialog.open(BookDetailsComponent);
    modalRef.componentInstance.book = book;
  }
}
