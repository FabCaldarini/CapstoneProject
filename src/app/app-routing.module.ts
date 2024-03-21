import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{LoginComponent} from './pages/auth/login/login.component';
import{RegisterComponent} from './pages/auth/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'user-page', loadChildren: () => import('./pages/user-page/user-page.module').then(m => m.UserPageModule) },
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
