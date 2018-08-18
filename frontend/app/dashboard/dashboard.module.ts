import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { WidgetsModule } from '../shared/components/widgets.module';

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
  ],
})
export class DashboardModule {
}