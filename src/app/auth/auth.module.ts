import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  declarations: [LoginComponent, RegisterComponent],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
