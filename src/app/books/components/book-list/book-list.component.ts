import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { UserService } from '../../../user/services/user.service';
import { AuthService } from '../../../auth/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageableBooks } from '../../models/pageableBooks';
import { MatPaginatorDefaultOptions, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  userBookIds: number[] = [];
  search: string;
  isSearching = false;

  pageableBooks: PageableBooks;
  pageSize: number;
  dataLength: number;
  pageSizeOptions = [4, 8, 12, 16];

  constructor(
    private readonly userService: UserService,
    private readonly bookService: BookService,
    private readonly authService: AuthService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.getUserReadingBookIds();
    this.getPageableBooks();
  }

  getPageableBooks(event?: PageEvent, event2?: MatPaginatorDefaultOptions): void {
    this.bookService.getPageable(event?.pageIndex, event2?.pageSize).subscribe((data) => {
      this.pageableBooks = data.body;
      this.dataLength = data.body.totalElements;
    });
  }

  getUserReadingBookIds(): void {
    this.userService.getUserBookIds().subscribe((data) => {
      this.userBookIds = data;
    });
  }

  searchBook(event?: PageEvent, event2?: MatPaginatorDefaultOptions): void {
    // this.search.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    const safeSearch = this.search.replace(/[`~!@#$%^&*()_|+=?;:",.<>{}\[\]\\\/]/gi, '').trim();
    if (safeSearch === '') {
      this.isSearching = false;
      this.getPageableBooks();
    } else {
      this.isSearching = true;
      this.bookService.pageableSearchBookByTitle(safeSearch, event?.pageIndex, event2?.pageSize).subscribe((data) => {
        this.pageableBooks = data.body;
        this.dataLength = data.body.totalElements;
      });
    }
  }

  openDialog(bookId: number): void {
    const modalRef = this.dialog.open(BookDetailsComponent);
    modalRef.componentInstance.bookId = bookId;
  }

  addToList(bookId: number, title: string): void {
    this.userService.addReading(bookId).subscribe(
      (response) => {
        if (response.status === 200) {
          this.userBookIds.push(bookId);
          this.snackBar.open(`**${title}** saved!`, null, {
            duration: 1000,
            verticalPosition: 'top',
            panelClass: ['green-snackbar']
          });
        }
      },
      (error) => {
        this.snackBar.open(`Error occurred!`, null, {
          duration: 1000,
          verticalPosition: 'top',
          panelClass: ['orange-snackbar']
        });
      }
    );
  }

  removeFromList(bookId: number, title: string): void {
    this.userService.removeReading(bookId).subscribe((response) => {
      if (response.status === 200) {
        // this.userBookIds = this.userBookIds.filter((id) => id !== bookId); //doesn't work, IDK why...
        const index = this.userBookIds.indexOf(bookId);
        this.userBookIds.splice(index, 1);
        this.snackBar.open(`**${title}** removed!`, null, {
          duration: 1000,
          verticalPosition: 'top',
          panelClass: ['yellow-snackbar']
        });
      } else if (response.status === 400) {
        this.snackBar.open(`Error: Unable to remove`, null, {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['orange-snackbar']
        });
      } else {
        this.snackBar.open(`Unexpected Error`, null, {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['orange-snackbar']
        });
      }
    });
  }
}
