import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/components/commons/login/login.component';
import { RegisterComponent } from 'src/app/components/commons/register/register.component';
import { ForgotPasswordComponent } from 'src/app/components/commons/forgot-password/forgot-password.component';
import { PasswordModule } from 'primeng/password';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PasswordModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
