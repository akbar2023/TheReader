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
  readingBookIds: number[] = [];

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
    this.getUserReadingBookIds();
  }

  getLibraryBooks(): void {
    this.bookService.getBooks().subscribe((books: Book[]) => {
      console.log(books, 'library books');
      this.libraryBooks = books;
    });
  }

  getUserReadingBookIds() {
    this.userService.getReadingBookIds().subscribe((data) => {
      console.log(data, 'les IDs');
      this.readingBookIds = data;
    });
  }

  openDialog(bookId: number) {
    const modalRef = this.dialog.open(BookDetailsComponent);
    modalRef.componentInstance.bookId = bookId;
  }

  addToList(bookId: number, title: string) {
    this.userService.addReading(bookId).subscribe((response) => {
      console.log(response.status, 'addBook From UserService');
      if (response.status === 200) {
        this.readingBookIds.push(bookId);
        console.log(this.readingBookIds);
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
    this.userService.removeReading(bookId).subscribe((response) => {
      if (response.status === 200) {
        // this.readingBookIds = this.readingBookIds.filter((id) => id !== bookId); //doesn't work, IDK why...
        const index = this.readingBookIds.indexOf(bookId);
        this.readingBookIds.splice(index, 1);

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
