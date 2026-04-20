import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage';
import { LoginComponent } from './pages/login/login';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard';
import { ClientDashboardComponent } from './pages/client-dashboard/client-dashboard';
import { FournisseurDashboardComponent } from './pages/fournisseur-dashboard/fournisseur-dashboard';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard/admin', component: AdminDashboardComponent },
  { path: 'dashboard/client', component: ClientDashboardComponent },
  { path: 'dashboard/fournisseur', component: FournisseurDashboardComponent },
  { path: '**', redirectTo: '' },
];
