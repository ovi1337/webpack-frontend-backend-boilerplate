import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDialog,
  MatDialogModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatTableModule,
  MatProgressBarModule,
  MatGridListModule,
} from '@angular/material';

const modules = [
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatTableModule,
  MatProgressBarModule,
  MatGridListModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...modules,
  ],
  exports: [
    ...modules,
  ],
  declarations: [],
  providers: [
    MatDialog
  ]
})
export class MaterialModule { }