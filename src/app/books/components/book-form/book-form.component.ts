import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      title: [''],
      author: [''],
      year: [''],
      genre: [''],
      summary: [''],
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

  get summary() {
    return this.bookForm.get('summary');
  }
}
