import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryMerchandisesExtraReportComponent } from 'src/app/components/reports/view-reports/entry-merchandises-extra-report/entry-merchandises-extra-report.component';

const routes: Routes = [
    {
        path: '',
        component: EntryMerchandisesExtraReportComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EntryMerchandisesExtraReportRoutingModule { }
