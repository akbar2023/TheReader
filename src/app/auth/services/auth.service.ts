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

  public token: string;
  public isLoggedIn: boolean;

  constructor(private http: HttpClient) {}

  get(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
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
          this.isLoggedIn = true;
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

  logOut() {
    this.isLoggedIn = false;
    localStorage.removeItem('authToken');
    return 'logged out!';
  }

  getToken() {
    this.token = localStorage.getItem('authToken');
    return this.token;
  }
}
