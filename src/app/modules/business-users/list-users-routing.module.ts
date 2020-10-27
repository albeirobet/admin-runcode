import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from 'src/app/components/business-users/list-users/list-users.component';

const routes: Routes = [
    {
        path: '',
        component: ListUsersComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListUsersRoutingModule { }
