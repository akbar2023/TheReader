import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { MaterialModule } from '../material/material.module';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [CommonModule, MaterialModule, MatButtonModule, RouterModule, MatMenuModule],
  declarations: [MenuComponent],
  exports: [MenuComponent],
})
export class SharedModule {}
