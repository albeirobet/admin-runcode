import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileUserComponent } from 'src/app/components/commons/profile-user/profile-user.component';
import { SharedModule } from '../../shared/shared.module';
import { ProfileUserRoutingModule } from './profile-user-routing.module';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [ProfileUserComponent],
  imports: [
    SharedModule,
    ProfileUserRoutingModule,
    PasswordModule
  ],
  exports: [ProfileUserComponent]
})
export class ProfileUserModule { }
