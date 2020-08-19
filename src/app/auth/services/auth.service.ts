import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:8081/api/user';
  private readonly loginUrl = 'http://localhost:8081/login';

  // private apiUrl = environment.apiUrl; // to setUp
  private readonly loginApi = 'api/auth';
  readonly status = 200;

  public token = '';
  public loggedIn: boolean;

  constructor(private http: HttpClient) {}

  get(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  // logIn(username: string, password: string): Observable<any> {
  //   return this.http
  //     .post<any>('http://localhost:8081/login', { username, password })
  //     .pipe(
  //       tap((data: HttpResponse<any>) => {
  //         console.log(data, '--Data from login action');
  //         // this.inMemoryToken = { token: data.accessToken, expiry: data.expiresIn };
  //         // this.loggedIn = true;
  //       }),
  //       catchError((err) => {
  //         alert('UNAUTHORIZED!!');
  //         return of(err);
  //       })
  //     );
  // }

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
          this.loggedIn = true;
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
    return this.http.post<User>(this.baseUrl + '/register', user);
  }

  // logOut() {
  //   if (localStorage.getItem('authToken')) {
  //     localStorage.removeItem('authToken');
  //   }
  //   this.loggedIn = false;
  //   return 'logged out!';
  // }

  getToken() {
    return localStorage.getItem('authToken');
  }
}
