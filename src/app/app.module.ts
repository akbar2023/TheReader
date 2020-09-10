import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { BooksModule } from './books/books.module';
import { AuthInterceptorService } from './auth/services/auth-interceptor.service';
import { BookDetailsComponent } from './books/components/book-details/book-details.component';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    BooksModule,
  ],
  entryComponents: [BookDetailsComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
