import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { UserBook } from '../../auth/models/userBook';
import { AuthService } from '../../auth/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Book } from '../../books/models/book';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = `${environment.apiUrl}/api/user/`;
  private userBook: UserBook;
  private readonly userId: number;

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

  getMyBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}books`);
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
}
