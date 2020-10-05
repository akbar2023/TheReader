import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Book } from '../../../books/models/book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  myBooks: Book[];
  public lesLivres = ['Al Anfal', 'Al Araf', 'Al Baqarah'];
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    console.log(this.authService.isLoggedIn);
    this.authService.getMyBooks().subscribe((books: Book[]) => {
      console.log(books, 'My books from home comp');
      this.myBooks = books;
    });
  }

  removeBookFromList(bookId: number) {
    console.log(bookId, 'home comp');
    this.authService.removeBookFromList(bookId).subscribe((data) => console.log(data));
  }
}
