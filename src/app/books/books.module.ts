import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [BookFormComponent, BookListComponent],
  exports: [BookFormComponent, BookListComponent],
})
export class BooksModule {}
