import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DefaultComponent} from './dashboards/default/default.component';

const routes: Routes = [
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' }, // redirect to `DefaultComponent`

  { path: 'dashboard', component: DefaultComponent },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule) },
  { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },
  { path: 'pages', loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule) },
  { path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.UiModule) },
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
