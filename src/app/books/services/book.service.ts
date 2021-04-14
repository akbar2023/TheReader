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
  private readonly bookApiUrl = `${environment.apiUrl}/api/book/`;
  private readonly readingApiUrl = `${environment.apiUrl}/api/reading/page/`;

  constructor(private http: HttpClient) {}

  getPageable(page: number = 0, size: number = 4): Observable<HttpResponse<PageableBooks>> {
    return this.http.get<any>(this.bookApiUrl + 'page/' + page + '/' + size, { observe: 'response' });
  }

  getBookById(id: number): Observable<HttpResponse<Book>> {
    return this.http.get<Book>(this.bookApiUrl + id, { observe: 'response' });
  }

  pageableSearchBookByTitle(title: string, page: number = 0, size: number = 4): Observable<HttpResponse<PageableBooks>> {
    return this.http.get<PageableBooks>(this.bookApiUrl + 'search/' + page + '/' + size + '/' + title, { observe: 'response' });
  }

  addBook(book: Book): Observable<number> {
    return this.http
      .post<void>(this.bookApiUrl, book, { observe: 'response' })
      .pipe(
        map((response) => {
          return response.status;
        })
      );
  }

  updateBook(book: Book): Observable<number> {
    return this.http
      .put<void>(this.bookApiUrl, book, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<void>) => {
          return response.status;
        })
      );
  }

  deleteBook(bookId: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(this.bookApiUrl + bookId, { observe: 'response' });
  }
}
