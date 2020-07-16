import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Book} from '../models/book';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly baseUrl = environment.apiUrl + 'books/';

  constructor(private http: HttpClient) { }

  get(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl);
  }

  add(book: Book): Observable<any> {
    return this.http.post(this.baseUrl, book);
  }
}
