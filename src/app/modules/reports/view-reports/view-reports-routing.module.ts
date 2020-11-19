import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewReportsComponent } from 'src/app/components/reports/view-reports/view-reports.component';

const routes: Routes = [
    {
        path: '',
        component: ViewReportsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewReportsRoutingModule { }
