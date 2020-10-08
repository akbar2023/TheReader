import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { catchError, map } from 'rxjs/operators';
import { UserDetails } from '../models/userDetails';
import { environment } from '../../../environments/environment';
import { UserBook } from '../models/userBook';
import { Book } from '../../books/models/book';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}/api/user/`;
  private readonly loginUrl = `${environment.apiUrl}/login`;

  public token: string;
  public isLoggedIn: boolean;
  public userDetails: UserDetails;

  private userBook: UserBook;

  constructor(private http: HttpClient) {
    console.log(this.userDetails, 'Auth service');
  }

  get(email: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + email);
  }

  logIn(username: string, password: string) {
    return this.http
      .post<User>(
        this.loginUrl,
        { username, password },
        {
          headers: new HttpHeaders().set('Authorization', 'application/x-www-form-urlencoded'),
          observe: 'response',
          withCredentials: true,
        }
      )
      .pipe(
        map((response: HttpResponse<User>) => {
          this.token = response.headers.get('Authorization');
          localStorage.setItem('authToken', this.token);
          return 'Success';
        }),
        catchError((err) => {
          alert('Erreur !');
          return of(err);
        })
      );
  }

  signUp(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'register/', user);
  }

  logOut() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userDetails');
    this.isLoggedIn = false;
    return 'logged out!';
  }

  getToken() {
    return (this.token = localStorage.getItem('authToken'));
  }

  addBookToList(bookId: number): Observable<any> {
    console.log(this.userDetails.id);
    const userId = this.userDetails.id;
    this.userBook = { userId, bookId };
    return this.http.post<UserBook>(this.baseUrl + 'add-book/', this.userBook);
  }

  // getMyBooks(): Observable<Book[]> {
  //   const userId = this.userDetails.id;
  //   return this.http.get<Book[]>(`${this.baseUrl}${userId}/books`);
  // }
  //
  // removeBookFromList(bookId: number) {
  //   const userId = this.userDetails.id;
  //   this.userBook = { userId, bookId };
  //   return this.http.put<UserBook>(this.baseUrl + 'remove-book/', this.userBook);
  // }
}
