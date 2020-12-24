import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { BookGenre } from '../../models/book-genre';
import { AuthService } from '../../../auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  currentYear = new Date().getFullYear();
  genres = Object.keys(BookGenre);
  bookId: number;
  book: Book;
  editMode: boolean;

  constructor(
    private fb: FormBuilder,
    private readonly bookService: BookService,
    private readonly authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.bookId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.editMode = !!this.bookId;
    console.log(this.bookId, '--book Id');
    if (this.bookId) {
      this.bookService.getBookById(this.bookId).subscribe(
        (response) => {
          console.log(response);
          if (response.status === 200 && response.body) {
            this.createForm(response.body);
          }
        },
        (error) => {
          if (error.status === 400) {
            this.snackBar.open(`Book not found!`, null, {
              duration: 2000,
              verticalPosition: 'top',
              panelClass: ['orange-snackbar'],
            });
          } else {
            alert('Error!');
          }
        }
      );
    } else {
      this.createForm();
    }
  }

  createForm(book?: Book) {
    this.bookForm = this.fb.group({
      title: [book ? book.title : '', [Validators.minLength(2), Validators.maxLength(100), Validators.required]],
      author: [book ? book.author : '', [Validators.minLength(2), Validators.maxLength(100), Validators.required]],
      year: [book ? book.year : '', [Validators.min(0), Validators.max(this.currentYear), Validators.required]],
      genre: [book ? book.genre : '', [Validators.minLength(3), Validators.maxLength(20), Validators.required]],
      summary: [book ? book.summary : '', [Validators.minLength(10), Validators.maxLength(1000), Validators.required]],
    });
  }

  saveBook() {
    const book: Book = this.bookForm.value;
    // ***Update
    if (this.bookId) {
      book.id = this.bookId;
      this.bookService.updateBook(book).subscribe(
        (data) => {
          if (data === 200) {
            this.snackBar.open(`Updated successfully!`, null, {
              duration: 2000,
              verticalPosition: 'top',
              panelClass: ['green-snackbar'],
            });
            setTimeout(() => {
              this.router.navigate(['/home']).then();
            }, 2000);
          } else {
            alert('error!');
          }
        },
        (error) => {
          if (error.status === 403) {
            this.snackBar.open(`You are not allowed to edit this Book!`, null, {
              duration: 2000,
              verticalPosition: 'top',
              panelClass: ['orange-snackbar'],
            });
          } else {
            alert('error!');
          }
        }
      );
    } else {
      // ***Create
      this.bookService.addBook(book).subscribe(
        (response) => {
          if (response === 200) {
            this.snackBar.open(`Congrats, ${book.title} was added successfully!`, null, {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['green-snackbar'],
            });
            setTimeout(() => {
              this.router.navigate(['home']).then();
            }, 3000);
          }
        },
        (error: any) => {
          console.log(error);
          if (error.status === 400) {
            this.snackBar.open(`Error occurred while saving the book.`, null, {
              duration: 5000,
              verticalPosition: 'top',
              panelClass: ['orange-snackbar'],
            });
          }
        }
      );
    }
  }

  get title() {
    return this.bookForm.get('title');
  }

  get author() {
    return this.bookForm.get('author');
  }

  get year() {
    return this.bookForm.get('year');
  }

  get genre() {
    return this.bookForm.get('genre');
  }

  get summary() {
    return this.bookForm.get('summary');
  }

  requiredMessage(name: string) {
    return `${name} is required`;
  }

  lengthMessage(length: number, minMax: number) {
    return `The ${minMax === 0 ? 'minimum' : 'maximum'} length for this field is ${length} characters`;
  }
}
