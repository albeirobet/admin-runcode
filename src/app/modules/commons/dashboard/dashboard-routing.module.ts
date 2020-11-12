import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/components/commons/dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: 'account',
                loadChildren: () => import('../profile-user/profile-user.module').then(m => m.ProfileUserModule)
            },
            {
                path: 'user-list',
                loadChildren: () => import('../../business-users/list-users.module').then(m => m.ListUsersModule)
            },
            {
                path: 'company-list',
                loadChildren: () => import('../../company-data/list-companies.module').then(m => m.ListCompaniesModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
