import { Component, OnInit } from '@angular/core';
import { User } from '../../../auth/models/user';
import { AuthService } from '../../../auth/services/auth.service';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  users: User[];
  books: Book[];
  e: HTMLElement;

  constructor(
    private readonly userService: AuthService,
    private readonly bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    !this.userService.isLoggedIn ? this.router.navigate(['/login']).then() : this.getBooks();
    // this.getBooks();
  }

  // getUsers(): void {
  //   this.userService.get().subscribe(users => {
  //     this.users = users;
  //   });
  // }

  getBooks(): void {
    this.bookService.get().subscribe((books) => {
      console.log(books);
      this.books = books;
    });
  }

  effect(event) {
    const id = event.target.attributes.id?.value;
    const htmlElement = document.getElementById(id);
    htmlElement.classList.add('hover-effect');

    // id.addEventListener('click', () => {
    //   htmlElement.style.backgroundColor = 'red';
    // });
  }
}
