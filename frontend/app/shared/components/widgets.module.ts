import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SliderComponent } from './slider.component';
import { ToggleComponent } from './toggle.component';
import { ButtonComponent } from './button.component';
import { ProgressbarComponent } from './progressbar.component';
import { ConnectionComponent } from './connection.component';
import { StatusComponent } from './status.component';
import { SymbolListComponent } from './symbol-list.component';
import { LedComponent } from './led.component';
import { Slider2Component } from './slider2.component';

const widgets = [
  SliderComponent,
  Slider2Component,
  ToggleComponent,
  ButtonComponent,
  ProgressbarComponent,
  ConnectionComponent,
  StatusComponent,
  SymbolListComponent,
  LedComponent,
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