import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { UserBook } from '../../auth/models/userBook';
import { AuthService } from '../../auth/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Book } from '../../books/models/book';
import { catchError, map } from 'rxjs/operators';
import { Reading } from '../../books/models/reading';
import { ReadingStatus } from '../../books/models/readingStatus';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = `${environment.apiUrl}/api/user/`;
  private readonly readingApi = `${environment.apiUrl}/api/reading/`;
  private readonly userId: number;
  private userReadings: Reading[] = []; // used by editGuard

  constructor(private authService: AuthService, private http: HttpClient) {
    this.userId = this.authService.userDetails.id;
  }

  addBookToList(bookId: number): Observable<any> {
    return this.http
      .post<UserBook>(`${this.baseUrl}add-to-list/${bookId}`, null, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          return response;
        }),
        catchError((err) => {
          return of(err);
        })
      );
  }

  addReading(bookId: number): Observable<any> {
    return this.http
      .post<any>(`${this.readingApi + bookId}`, null, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => response),
        catchError((err) => of(err))
      );
  }

  getMyBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}books`);
  }

  getReadings(): Observable<Reading[]> {
    return this.http.get<Reading[]>(`${this.readingApi}`);
  }

  removeBookFromList(bookId: number): Observable<any> {
    return this.http
      .put<UserBook>(`${this.baseUrl}remove-book/${bookId}`, null, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          return response;
        }),
        catchError((err) => {
          return of(err);
        })
      );
  }

  removeReading(readingId: number): Observable<any> {
    return this.http.delete(`${this.readingApi + readingId}`, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => response),
      catchError((err) => of(err))
    );
  }

  editReadingStatus(readingStatus: ReadingStatus): Observable<any> {
    return this.http
      .put<ReadingStatus>(`${this.readingApi}`, readingStatus, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => response),
        catchError((err) => of(err))
      );
  }

  setUserReadings(books: Reading[]) {
    this.userReadings = books;
  }

  getUserReadings() {
    return this.userReadings;
  }
}
