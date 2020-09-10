import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  // private readonly baseUrl = environment.apiUrl + 'books/';
  private readonly baseUrl = 'http://localhost:8081/book';

  constructor(private http: HttpClient) {}

  get(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl);
  }

  getBookById(id: number) {
    console.log('Get book by id works! Id is :' + id);
  }

  add(book: Book): Observable<any> {
    return this.http.post(this.baseUrl, book);
  }
}
