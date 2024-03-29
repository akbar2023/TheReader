import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './books/components/book-list/book-list.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { BookFormComponent } from './books/components/book-form/book-form.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { HomeComponent } from './user/components/home/home.component';
import { EditBookGuard } from './auth/guards/edit-book.guard';

const routes: Routes = [
  {
    path: 'book-list',
    component: BookListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'book-form',
    component: BookFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-book/:id',
    component: BookFormComponent,
    canActivate: [AuthGuard, EditBookGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
