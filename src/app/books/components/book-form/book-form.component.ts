import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { BookGenre } from '../../models/book-genre';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  currentYear = new Date().getFullYear();
  genres = Object.keys(BookGenre);

  constructor(
    private fb: FormBuilder,
    private readonly service: BookService,
    private readonly userService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.genres, '--les Genres');
    this.createForm();
  }

  createForm() {
    this.bookForm = this.fb.group({
      title: ['', [Validators.minLength(2), Validators.maxLength(100), Validators.required]],
      author: ['', [Validators.minLength(2), Validators.maxLength(100), Validators.required]],
      year: ['', [Validators.min(0), Validators.max(this.currentYear), Validators.required]],
      genre: ['', [Validators.minLength(3), Validators.maxLength(20), Validators.required]],
      summary: ['', [Validators.minLength(10), Validators.maxLength(255), Validators.required]],
    });
  }

  saveBook() {
    const book = this.bookForm.value;
    const userDetails = localStorage.getItem('userDetails');
    book.creatorId = JSON.parse(userDetails).id;
    this.service.add(book).subscribe(
      () => console.log('Success!', book),
      (error) => console.log(error),
      () => console.log('Completed')
    );
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
