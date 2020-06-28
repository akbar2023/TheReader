import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BookService} from '../../services/book.service';
import {BookGenre} from '../../models/book-genre';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  bookForm: FormGroup;

  genres = Object.keys(BookGenre);

  constructor(private fb: FormBuilder, private readonly service: BookService) {
  }

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
    this.service.add(book).subscribe(
      () => console.log('Success!', book),
      error => console.log(error),
      () => console.log('Completed'),
    );
  }

}
