import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ComicsPageComponent } from './comics-page/comics-page.component';
import { ImageModalComponent } from '../../components/image-modal/image-modal.component';
import {ModalOverlayComponent} from '../../components/modal-overlay/modal-overlay.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    ComicsPageComponent,
    ImageModalComponent,
    ModalOverlayComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
  ]
})
export class DashboardModule { }
