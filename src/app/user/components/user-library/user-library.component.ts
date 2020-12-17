import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Book } from '../../../books/models/book';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookDetailsComponent } from '../../../books/components/book-details/book-details.component';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from '../../../books/services/book.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Reading } from '../../../books/models/reading';

@Component({
  selector: 'app-user-library',
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.scss'],
})
export class UserLibraryComponent implements OnInit {
  myBooks: Book[];
  userId: number;
  myReadings: Reading[];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.userDetails.id;
    this.authService.getToken();
    this.getBooks();
  }

  getBooks() {
    this.userService.getMyBooks().subscribe((books: Book[]) => {
      console.log(books, 'My books');
      this.myBooks = books;
      this.userService.setUserBooks(books);
    });

    this.userService.getReadings().subscribe((readings: Reading[]) => {
      this.myReadings = readings;
    });
  }

  removeBookFromList(bookId: number, title: string) {
    this.userService.removeBookFromList(bookId).subscribe((response) => {
      if (response.status === 200) {
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
      } else if (response.status === 403) {
        this.snackBar.open(`Error: Unable to remove`, null, {
          duration: 1000,
          verticalPosition: 'top',
          panelClass: ['orange-snackbar'],
        });
      } else {
        alert('Error!');
      }
    });
  }

  removeUserReading(readingId: number, title: string) {
    this.userService.removeReading(readingId).subscribe((response) => {
      if (response.status === 200) {
        this.myReadings = this.myReadings.filter((reading) => reading.readingId !== readingId);
        this.snackBar.open(`**${title}** removed from favorite!`, null, {
          duration: 1000,
          verticalPosition: 'top',
          panelClass: ['yellow-snackbar'],
        });
      } else if (response.status === 400) {
        this.snackBar.open(`Error: Unable to remove`, null, {
          duration: 1000,
          verticalPosition: 'top',
          panelClass: ['orange-snackbar'],
        });
      } else {
        alert('Error!');
      }
    });
  }

  changeReadingStatus(readingId: number, read: boolean) {
    this.myReadings.filter((readings) => readings.readingId === readingId).map((reading) => (reading.read = !read));
    this.userService
      .editReadingStatus({
        id: readingId,
        isRead: !read,
      })
      .subscribe();
  }

  openDialog(book: Book) {
    const modalRef = this.dialog.open(BookDetailsComponent);
    modalRef.componentInstance.book = book;
  }

  deleteBook(id: number) {
    const bookToDelete = this.myBooks.filter((book) => book.id === id)[0];
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: `Delete **${bookToDelete.title}**?`,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.bookService.delete(id).subscribe(
          (response) => {
            console.log(response);
            if (response.status === 200) {
              this.myBooks.forEach((book) => {
                if (book.id === id) {
                  const index = this.myBooks.indexOf(book);
                  this.myBooks.splice(index, 1);
                }
              });
              this.snackBar.open(`DELETE success!`, null, {
                duration: 2000,
                verticalPosition: 'top',
                panelClass: ['green-snackbar'],
              });
            } else if (response.status === 404 && response.body === null) {
              this.snackBar.open(`Error!`, null, {
                duration: 1000,
                verticalPosition: 'top',
                panelClass: ['orange-snackbar'],
              });
            }
          },
          (error) => {
            console.log('Error ' + error.status);
          }
        );
      }
    });
  }
}
