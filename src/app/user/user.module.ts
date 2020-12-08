import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from '../material/material.module';
import { AuthModule } from '../auth/auth.module';
import { UserLibraryComponent } from './components/user-library/user-library.component';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [CommonModule, MaterialModule, AuthModule, RouterModule],
  declarations: [ProfileComponent, HomeComponent, UserLibraryComponent, ConfirmDialogComponent],
  exports: [ProfileComponent, HomeComponent],
})
export class UserModule {}
