import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCompaniesComponent } from 'src/app/components/company-data/list-companies/list-companies.component';

const routes: Routes = [
    {
        path: '',
        component: ListCompaniesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListCompaniesRoutingModule { }
