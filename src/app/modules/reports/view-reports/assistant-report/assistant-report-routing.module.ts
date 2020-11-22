import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssistantReportComponent } from 'src/app/components/reports/view-reports/assistant-report/assistant-report.component';

const routes: Routes = [
    {
        path: '',
        component: AssistantReportComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssistantReportRoutingModule { }
