import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { SocketService } from './shared/service/socket.service';
import { SharedModule } from '../shared/shared.module';
import { WidgetsModule } from '../shared/components/widgets.module';
import { SliderComponent } from '../shared/components/slider.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    WidgetsModule,
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: [
    SocketService,
  ],
})
export class DashboardModule {
}