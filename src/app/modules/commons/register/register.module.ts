import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RegisterComponent } from 'src/app/components/commons/register/register.component';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ButtonModule,
    MultiSelectModule,
    CheckboxModule
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule { }
