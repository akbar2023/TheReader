import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { MaterialModule } from '../material/material.module';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  imports: [CommonModule, MaterialModule, MatButtonModule, RouterModule, AuthModule],
  declarations: [MenuComponent, ProfileComponent, HomeComponent],
  exports: [MenuComponent, ProfileComponent, HomeComponent],
})
export class SharedModule {}
