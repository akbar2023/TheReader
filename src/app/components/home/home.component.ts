import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: User[];
  books: Book[];
  e: HTMLElement;

  constructor(private readonly userService: UserService, private readonly bookService: BookService) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.getBooks();
  }

  getUsers(): void {
    this.userService.get().subscribe(users => {
      this.users = users;
    });
  }

  getBooks(): void {
    this.bookService.get().subscribe(books => {
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
