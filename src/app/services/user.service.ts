import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = environment.apiUrl + 'users/';

  constructor(private http: HttpClient) {
  }

  get(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUser(email: string) {
    return this.http.get<User[]>(this.baseUrl).pipe(
      map(users => {
        users.filter(user => user.email === email);
        // console.log(users1, '--error');
        // console.log(users);
      })
    );
  }

  add(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

}
