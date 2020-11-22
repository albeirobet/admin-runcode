import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryMerchandisesReportComponent } from 'src/app/components/reports/view-reports/entry-merchandises-report/entry-merchandises-report.component';

const routes: Routes = [
    {
        path: '',
        component: EntryMerchandisesReportComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EntryMerchandisesReportRoutingModule { }
