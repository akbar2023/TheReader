import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { UserService } from '../../../user/services/user.service';
import { AuthService } from '../../../auth/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.userDetails.id;
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

  addToList(bookId: number, title: string) {
    this.userService.addReading(bookId).subscribe((response) => {
      console.log(response.status, 'addBook From UserService');
      if (response.status === 200) {
        this.snackBar.open(`**${title}** added to favorite!`, null, {
          duration: 1000,
          verticalPosition: 'top',
          panelClass: ['green-snackbar'],
        });
        this.libraryBooks.forEach((book) => {
          if (book.id === bookId) {
            book.users.push(this.userId);
          }
        });
      }
    });
  }

  removeFromList(bookId: number, title: string): void {
    // this.userService.removeBookFromList(bookId).subscribe((response) => {
    //   if (response.status === 200) {
    //     this.libraryBooks.forEach((book) => {
    //       if (book.id === bookId) {
    //         const index = book.users.indexOf(this.userId);
    //         book.users.splice(index, 1);
    //       }
    //     });
    //     this.snackBar.open(`**${title}** removed from favorite!`, null, {
    //       duration: 1000,
    //       verticalPosition: 'top',
    //       panelClass: ['yellow-snackbar'],
    //     });
    //   }
    // });

    this.userService.removeReading(bookId).subscribe((response) => {
      if (response.status === 200) {
        // this.myReadings = this.myReadings.filter((reading) => reading.readingId !== readingId);
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
}
