import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Book } from '../models/book';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly baseUrl = `${environment.apiUrl}/api/book/`;

  constructor(private http: HttpClient) {}

  get(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl);
  }

  getBookById(id: number) {
    console.log('Get book by id works! Id is :' + id);
  }

  add(book: Book): Observable<any> {
    return this.http.post(this.baseUrl, book, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        console.log(response, '--Book Response');
        return response.status;
      })
    );
  }
}
