import { NgModule } from '@angular/core';
import { ListUsersComponent } from 'src/app/components/business-users/list-users/list-users.component';
import { SharedModule } from '../shared/shared.module';
import { ListUsersRoutingModule } from './list-users-routing.module';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { CreateEditUserModule } from './create-edit-users.module';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
  declarations: [ListUsersComponent],
  imports: [
    SharedModule,
    ListUsersRoutingModule,
    PaginatorModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    CreateEditUserModule,
    ConfirmDialogModule
  ],
  exports: [ListUsersComponent]
})
export class ListUsersModule { }
