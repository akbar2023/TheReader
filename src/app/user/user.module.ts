import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from '../material/material.module';
import { AuthModule } from '../auth/auth.module';
import { UserLibraryComponent } from './components/user-library/user-library.component';

@NgModule({
  imports: [CommonModule, MaterialModule, AuthModule],
  declarations: [ProfileComponent, HomeComponent, UserLibraryComponent],
  exports: [ProfileComponent, HomeComponent],
})
export class UserModule {}
