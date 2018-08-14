import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SliderComponent } from './slider.component';
import { ToggleComponent } from './toggle.component';
import { ButtonComponent } from './button.component';
import { ProgressbarComponent } from './progressbar-widget';

const widgets = [
  SliderComponent,
  ToggleComponent,
  ButtonComponent,
  ProgressbarComponent,
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    ...widgets,
  ],
  exports: [
    ...widgets,
  ],
})
export class WidgetsModule { }