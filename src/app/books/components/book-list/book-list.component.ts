import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../auth/models/user';
import { AuthService } from '../../../auth/services/auth.service';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  users: User[];
  books: Book[];
  e: HTMLElement;
  @Input() public book = { author: 'Izzat Nadiri', year: 26 };

  constructor(
    private readonly userService: AuthService,
    private readonly bookService: BookService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBooks();
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

  openDialog(book: Book) {
    const modalRef = this.dialog.open(BookDetailsComponent);
    modalRef.componentInstance.book = book;
  }
}
