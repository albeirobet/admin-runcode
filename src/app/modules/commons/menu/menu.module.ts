import { NgModule } from '@angular/core';
import { MenuComponent } from 'src/app/components/commons/menu/menu.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule
  ],
  exports: [MenuComponent]
})
export class MenuModule { }
