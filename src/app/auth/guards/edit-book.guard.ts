import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { BookService } from '../../books/services/book.service';
import { UserService } from '../../user/services/user.service';
import { Book } from '../../books/models/book';

@Injectable({
  providedIn: 'root',
})
export class EditBookGuard implements CanActivate {
  myBooks: Book[];

  constructor(
    private authService: AuthService,
    private bookService: BookService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const books = this.userService.getUserBooks().filter((book) => book.id === parseInt(next.paramMap.get('id'), 10));
    return books[0]?.creator.id === this.authService.userDetails.id ? true : this.router.navigate(['/home']).then();
  }
}
