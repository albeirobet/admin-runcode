import { NgModule } from '@angular/core';
import { ListUsersComponent } from 'src/app/components/business-users/list-users/list-users.component';
import { SharedModule } from '../shared/shared.module';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { CreateEditCompanyModule } from './create-edit-companies.module';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ListCompaniesComponent } from 'src/app/components/company-data/list-companies/list-companies.component';
import { ListCompaniesRoutingModule } from './list-companies-routing.module';

@NgModule({
  declarations: [ListCompaniesComponent],
  imports: [
    SharedModule,
    ListCompaniesRoutingModule,
    PaginatorModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    CreateEditCompanyModule,
    ConfirmDialogModule
  ],
  exports: [ListCompaniesComponent]
})
export class ListCompaniesModule { }
