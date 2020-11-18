import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Book } from '../models/book';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly baseUrl = `${environment.apiUrl}/api/book/`;

  constructor(private http: HttpClient) {}

  get(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl);
  }

  getBookById(id: number): Observable<any> {
    return this.http
      .get<Book>(this.baseUrl + id, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          return response;
        })
      );
  }

  add(book: Book): Observable<any> {
    return this.http.post(this.baseUrl, book, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        console.log(response, '--Book Response');
        return response.status;
      })
    );
  }

  updateBook(book: Book) {
    console.log(book, '--Book update');
    return this.http
      .put<Book>(this.baseUrl, book, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          console.log(response, '--book update response');
          return response.status;
        })
      );
  }
}
