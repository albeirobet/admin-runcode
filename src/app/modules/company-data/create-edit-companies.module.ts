import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CreateEditCompaniesRoutingModule } from './create-edit-companies-routing.module';
import { ButtonModule } from 'primeng/button';
import {MultiSelectModule} from 'primeng/multiselect';
import {CheckboxModule} from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { CreateEditCompanyComponent } from 'src/app/components/company-data/create-edit-company/create-edit-company.component';

@NgModule({
  declarations: [CreateEditCompanyComponent],
  imports: [
    SharedModule,
    CreateEditCompaniesRoutingModule,
    ButtonModule,
    MultiSelectModule,
    CheckboxModule,
    DropdownModule
  ],
  exports: [CreateEditCompanyComponent]
})
export class CreateEditCompanyModule { }
