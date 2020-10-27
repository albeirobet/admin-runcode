import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEditUserComponent } from 'src/app/components/business-users/create-edit-user/create-edit-user.component';

const routes: Routes = [
    {
        path: '',
        component: CreateEditUserComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CreateEditUserRoutingModule { }
