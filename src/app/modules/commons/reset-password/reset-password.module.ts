import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from 'src/app/components/commons/reset-password/reset-password.component';
import { MainModule } from '../../main/main.module';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    MainModule,
    SharedModule,
    PasswordModule
  ],
  exports: [
    ResetPasswordComponent
  ]
})
export class ResetPasswordModule { }
