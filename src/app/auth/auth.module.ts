import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { LoginSnackComponent } from './components/login-snack/login-snack.component';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  declarations: [LoginComponent, RegisterComponent, LoginSnackComponent],
  exports: [LoginComponent, RegisterComponent, LoginSnackComponent],
})
export class AuthModule {}
