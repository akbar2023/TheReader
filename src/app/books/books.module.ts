import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { MaterialModule } from '../material/material.module';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  imports: [CommonModule, MaterialModule, MatIconModule],
  declarations: [BookFormComponent, BookListComponent, BookDetailsComponent],
  exports: [BookFormComponent, BookListComponent],
})
export class BooksModule {}
