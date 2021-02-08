import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Reading } from '../../books/models/reading';
import { ReadingStatus } from '../../books/models/readingStatus';
import { FavoriteReading } from '../../books/models/favoriteReading';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly readingApi = `${environment.apiUrl}/api/reading/`;
  private readonly userId: number;
  private userReadings: Reading[] = []; // used by editBookGuard

  constructor(private authService: AuthService, private http: HttpClient) {
    this.userId = this.authService.userDetails.id;
  }

  addReading(bookId: number): Observable<HttpResponse<void>> {
    return this.http
      .post<void>(this.readingApi + bookId, null, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<void>) => response),
        catchError((err) => of(err))
      );
  }

  getReadings(): Observable<Reading[]> {
    return this.http.get<Reading[]>(this.readingApi);
  }

  getUserBookIds(): Observable<number[]> {
    return this.http.get<number[]>(this.readingApi + 'reading-book-ids');
  }

  removeReading(bookId?: number): Observable<HttpResponse<void>> {
    return this.http
      .delete<void>(this.readingApi + bookId, {
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<void>) => response),
        catchError((err) => of(err))
      );
  }

  editReadingStatus(readingStatus: ReadingStatus): Observable<HttpResponse<void>> {
    return this.http
      .put<void>(this.readingApi, readingStatus, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<void>) => response),
        catchError((err) => of(err))
      );
  }

  // used by editBookGuard
  setUserReadings(books: Reading[]): void {
    this.userReadings = books;
  }

  getUserReadings(): Reading[] {
    return this.userReadings;
  }

  setFavoriteBook(favoriteBook: FavoriteReading): Observable<HttpResponse<void>> {
    return this.http
      .put<void>(this.readingApi + 'favorite', favoriteBook, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<void>) => response),
        catchError((err) => of(err))
      );
  }
}
