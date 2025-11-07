import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VmListComponent } from './vm-list/vm-list.component';
import { VmCreateComponent } from './vm-create/vm-create.component';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  // rota pública de login
  { path: 'login', component: LoginComponent },

  // rotas
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'vms', component: VmListComponent },
      { path: 'vms/create', component: VmCreateComponent },
    ]
  },

  // qualquer outra rota cai pro login
  { path: '**', redirectTo: 'login' }
];
