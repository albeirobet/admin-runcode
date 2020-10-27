import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ====== Exclusively Principal Component in this file
import { AppComponent } from './components/app/app.component';

// ====== Custom Modules App
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './modules/commons/login/login.module';
import { DashboardModule } from './modules/commons/dashboard/dashboard.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHttpInterceptor } from './utils/jwt-http-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2IziToastModule } from 'ng2-izitoast';
import { CommonModule } from '@angular/common';
import { SharedModule } from './modules/shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';

// ======= To get access token
export function tokenGetter() {
  return localStorage.getItem('acc_tok_rc');
}

@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    RouterModule,
    Ng2IziToastModule,
    AppRoutingModule,
    LoginModule,
    DashboardModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  date = new Date();
}
