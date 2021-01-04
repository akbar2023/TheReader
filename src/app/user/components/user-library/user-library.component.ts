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
    this.getUserReadings();
  }

  getUserReadings(): void {
    this.userService.getReadings().subscribe((readings: Reading[]) => {
      this.myReadings = readings;
      this.userService.setUserReadings(readings);
    });
  }

  removeUserReading(bookId: number, title: string): void {
    this.userService.removeReading(bookId).subscribe((response) => {
      if (response.status === 200) {
        this.myReadings = this.myReadings.filter((reading) => reading.bookId !== bookId);
        this.snackBar.open(`**${title}** removed from favorite!`, null, {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['yellow-snackbar'],
        });
      } else if (response.status === 400) {
        this.snackBar.open(`Error: Unable to remove`, null, {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['orange-snackbar'],
        });
      } else {
        this.snackBar.open(`Unexpected Error`, null, {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['orange-snackbar'],
        });
      }
    });
  }

  changeReadingStatus(readingId: number, read: boolean): void {
    this.myReadings.filter((readings) => readings.readingId === readingId).map((reading) => (reading.read = !read));
    this.userService
      .editReadingStatus({
        id: readingId,
        isRead: !read,
      })
      .subscribe();
  }

  openDialog(bookId): void {
    const matDialogRef = this.dialog.open(BookDetailsComponent);
    matDialogRef.componentInstance.bookId = bookId;
  }

  deleteBook(bookId: number): void {
    const bookToDelete = this.myReadings.filter((reading) => reading.bookId === bookId)[0];
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: `Delete **${bookToDelete.title}**?`,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.bookService.deleteBook(bookId).subscribe(
          (response) => {
            if (response.status === 200) {
              this.myReadings = this.myReadings.filter((reading) => reading.bookId !== bookId);
              this.snackBar.open(`DELETE success!`, null, {
                duration: 2000,
                verticalPosition: 'top',
                panelClass: ['green-snackbar'],
              });
            } else if (response.status === 400 && response.body === null) {
              this.snackBar.open(`Error!`, null, {
                duration: 2000,
                verticalPosition: 'top',
                panelClass: ['orange-snackbar'],
              });
            }
          },
          () => {
            this.snackBar.open(`Unexpected Error`, null, {
              duration: 2000,
              verticalPosition: 'top',
              panelClass: ['orange-snackbar'],
            });
          }
        );
      }
    });
  }
}
