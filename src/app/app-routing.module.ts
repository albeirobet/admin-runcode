import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/commons/login/login.component';
import { RegisterComponent } from './components/commons/register/register.component';
import { ForgotPasswordComponent } from './components/commons/forgot-password/forgot-password.component';

import { UserRouteAccessService } from './services/auth/user-route-access-service';
import { Authority } from './utils/constants/authority.constants';
import { LoginGuardService } from './services/auth/login-guard.service';

const routes: Routes = [
  /*{ path: '', redirectTo: 'login', pathMatch: 'full' },*/
  /*loadChildren: () => import('./modules/commons/register/register.module').then(m => m.RegisterModule),*/
  { path: 'login', component: LoginComponent, canActivate: [LoginGuardService] },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'dashboard',
    data: {
      authorities: [Authority.ADMIN, Authority.USER],
    },
    canActivate: [UserRouteAccessService],
    loadChildren: () => import('./modules/commons/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'reset-password/:code',
    loadChildren: () => import('./modules/commons/reset-password/reset-password.module').then(m => m.ResetPasswordModule),
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

