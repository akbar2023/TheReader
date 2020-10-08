import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UserBook } from '../../auth/models/userBook';
import { AuthService } from '../../auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Book } from '../../books/models/book';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = `${environment.apiUrl}/api/user/`;
  private userBook: UserBook;
  private readonly userId: number;
  public userBookList: Book[];

  constructor(private authService: AuthService, private http: HttpClient) {
    this.userId = this.authService.userDetails.id;
  }

  addBookToList(bookId: number): Observable<any> {
    console.log(this.authService.userDetails.id);
    const userId = this.userId;
    this.userBook = { userId, bookId };
    return this.http.post<UserBook>(this.baseUrl + 'add-book/', this.userBook);
  }

  getMyBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}${this.userId}/books`);
  }

  removeBookFromList(bookId: number) {
    const userId = this.userId;
    this.userBook = { userId, bookId };
    return this.http.put<UserBook>(this.baseUrl + 'remove-book/', this.userBook);
  }
}
