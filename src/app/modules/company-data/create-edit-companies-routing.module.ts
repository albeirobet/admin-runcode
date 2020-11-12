import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEditCompanyComponent } from 'src/app/components/company-data/create-edit-company/create-edit-company.component';

const routes: Routes = [
    {
        path: '',
        component: CreateEditCompanyComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CreateEditCompaniesRoutingModule { }
