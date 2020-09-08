import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  declarations: [LoginComponent, RegisterComponent, HomeComponent],
  exports: [LoginComponent, RegisterComponent, HomeComponent],
})
export class AuthModule {}
