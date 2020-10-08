import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { UserService } from '../../../user/services/user.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: Book[];

  constructor(
    private readonly userService: UserService,
    private readonly bookService: BookService,
    public dialog: MatDialog
  ) {
    console.log(this.userService.userBookList, 'user book list');
  }

  ngOnInit(): void {
    this.getLibraryBooks();
    this.getUserBooks();
  }

  getLibraryBooks(): void {
    this.bookService.get().subscribe((books: Book[]) => {
      console.log(books);
      this.books = books;
    });
  }

  getUserBooks(): void {
    this.userService.getMyBooks().subscribe((data) => {
      this.userService.userBookList = data;
      console.log(data, 'get User Books');
    });
  }

  openDialog(book: Book) {
    const modalRef = this.dialog.open(BookDetailsComponent);
    modalRef.componentInstance.book = book;
  }

  addToList(bookId: number) {
    this.userService.addBookToList(bookId).subscribe((data) => {
      console.log(data, 'addBook From UserService');
      this.getUserBooks();
      alert(data);
    });

    // this.userService.getMyBooks().subscribe((data1) => {
    //   console.log(data1, 'user Books from book service');
    //   const userBooks: Book[] = data1;
    //   const bookIds: number[] = [];
    //   userBooks.forEach((book) => {
    //     bookIds.push(book.id);
    //   });
    //   if (!bookIds.includes(bookId)) {
    //     this.userService.addBookToList(bookId).subscribe((data) => {
    //       console.log(data, 'addBook From UserService');
    //       alert(data);
    //     });
    //   } else {
    //     alert('This book already exists in your book list');
    //   }
    // });
  }
}
