import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {CreateBookComponent} from './components/create-book/create-book.component';
import {MatSelectModule} from '@angular/material/select';
import {HomeComponent} from './components/home/home.component';
import {MenuComponent} from './components/menu/menu.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';



@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatButtonModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    CreateBookComponent,
    HomeComponent,
    MenuComponent,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    CreateBookComponent,
    HomeComponent,
    MenuComponent,
  ]
})
export class SharedModule { }
