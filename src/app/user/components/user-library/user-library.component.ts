import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Book } from '../../../books/models/book';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-library',
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.scss'],
})
export class UserLibraryComponent implements OnInit {
  myBooks: Book[];
  userId: number;

  constructor(private authService: AuthService, private userService: UserService, private snackBar: MatSnackBar) {}

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

  removeBookFromList(bookId: number) {
    this.userService.removeBookFromList(bookId, this.userId).subscribe((data) => {
      // alert(data);
      this.myBooks.forEach((book) => {
        if (book.id === bookId) {
          const index = this.myBooks.indexOf(book);
          this.myBooks.splice(index, 1);
        }
      });
      this.snackBar.open('Book removed!', null, {
        duration: 1000,
        verticalPosition: 'top',
        panelClass: ['yellow-snackbar'],
      });
    });
  }
}
