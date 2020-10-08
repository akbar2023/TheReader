import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Book } from '../../../books/models/book';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-library',
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.scss'],
})
export class UserLibraryComponent implements OnInit {
  myBooks: Book[];

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    console.log(this.authService.isLoggedIn);
    this.userService.getMyBooks().subscribe((books: Book[]) => {
      console.log(books, 'My books');
      this.userService.userBookList = books;
      this.myBooks = books;
    });
  }

  removeBookFromList(bookId: number) {
    this.userService.removeBookFromList(bookId).subscribe((data) => console.log(data));
  }
}
