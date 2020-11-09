import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CreateEditUserComponent } from 'src/app/components/business-users/create-edit-user/create-edit-user.component';
import { CreateEditUserRoutingModule } from './create-edit-user-routing.module';
import { ButtonModule } from 'primeng/button';
import {MultiSelectModule} from 'primeng/multiselect';
import {CheckboxModule} from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [CreateEditUserComponent],
  imports: [
    SharedModule,
    CreateEditUserRoutingModule,
    ButtonModule,
    MultiSelectModule,
    CheckboxModule,
    DropdownModule
  ],
  exports: [CreateEditUserComponent]
})
export class CreateEditUserModule { }
