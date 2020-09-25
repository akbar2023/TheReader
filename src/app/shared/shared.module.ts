import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { MaterialModule } from '../material/material.module';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  imports: [CommonModule, MaterialModule, MatButtonModule, RouterModule],
  declarations: [MenuComponent, ProfileComponent],
  exports: [MenuComponent],
})
export class SharedModule {}
