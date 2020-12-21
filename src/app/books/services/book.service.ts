import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Book } from '../models/book';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly baseUrl = `${environment.apiUrl}/api/book/`;
  bookDetails: any;

  constructor(private http: HttpClient) {}

  get(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl);
  }

  getBookById(id: number): Observable<HttpResponse<Book>> {
    return this.http.get<Book>(this.baseUrl + id, { observe: 'response' });
  }

  add(book: Book): Observable<number> {
    return this.http
      .post<void>(this.baseUrl, book, { observe: 'response' })
      .pipe(
        map((response) => {
          console.log(response, '--Book Response');
          return response.status;
        })
      );
  }

  updateBook(book: Book): Observable<number> {
    console.log(book, '--Book update');
    return this.http
      .put<Book>(this.baseUrl, book, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<Book>) => {
          console.log(response, '--book update response');
          return response.status;
        })
      );
  }

  delete(bookId: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(this.baseUrl + bookId, { observe: 'response' });
  }
}
