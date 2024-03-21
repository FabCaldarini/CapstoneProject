import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ComicsPageComponent } from './comics-page/comics-page.component';

const routes: Routes = [{ path: '', component: DashboardComponent },
{path:'comics-page', component: ComicsPageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
