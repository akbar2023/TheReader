import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  declarations: [MenuComponent, FooterComponent],
  exports: [MenuComponent, FooterComponent],
})
export class SharedModule {}
