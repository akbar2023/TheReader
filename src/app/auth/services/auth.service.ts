import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserDetails } from '../models/userDetails';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}/api/user/`;
  private readonly loginUrl = `${environment.apiUrl}/login`;

  public token: string;
  public isLoggedIn: boolean;
  public userDetails: UserDetails;

  constructor(private http: HttpClient) {}

  getUser(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.baseUrl + 'info', { observe: 'response' });
  }

  logIn(username: string, password: string): Observable<any> {
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
        switchMap((response: any) => {
          this.token = response.headers.get('Authorization');
          localStorage.setItem('authToken', this.token);
          return this.getUser();
        }),
        catchError((err) => {
          return Array.of(err);
        })
      );
  }

  signUp(user: User): Observable<number> {
    return this.http
      .post<User>(this.baseUrl + 'register/', user, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          return response.status;
        })
      );
  }

  logOut(): void {
    localStorage.clear();
    this.isLoggedIn = false;
  }

  getToken(): string {
    return (this.token = localStorage.getItem('authToken'));
  }
}
