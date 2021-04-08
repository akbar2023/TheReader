import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Book } from '../models/book';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookLite } from '../models/book-lite';
import { PageableBooks } from '../models/pageableBooks';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly baseUrl = `${environment.apiUrl}/api/book/`;

  constructor(private http: HttpClient) {}

  getBooks(): Observable<HttpResponse<BookLite[]>> {
    return this.http.get<BookLite[]>(this.baseUrl, { observe: 'response' });
  }

  getPageable(page: number, size: number): Observable<HttpResponse<PageableBooks>> {
    return this.http.get<any>(`${environment.apiUrl}/api/reading/page/${page}/${size}`, { observe: 'response' });
  }

  getBookById(id: number): Observable<HttpResponse<Book>> {
    return this.http.get<Book>(this.baseUrl + id, { observe: 'response' });
  }

  searchBookByTitle(title: string): Observable<HttpResponse<BookLite[]>> {
    return this.http.get<BookLite[]>(this.baseUrl + 'search/' + title, { observe: 'response' });
  }

  addBook(book: Book): Observable<number> {
    return this.http
      .post<void>(this.baseUrl, book, { observe: 'response' })
      .pipe(
        map((response) => {
          return response.status;
        })
      );
  }

  updateBook(book: Book): Observable<number> {
    return this.http
      .put<void>(this.baseUrl, book, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<void>) => {
          return response.status;
        })
      );
  }

  deleteBook(bookId: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(this.baseUrl + bookId, { observe: 'response' });
  }
}
