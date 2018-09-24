import { Component } from '@angular/core';
import { SystemState } from '../service/system.state';

@Component({
  selector: 'connection-widget',
  template: `
    <mat-icon class="icon" *ngIf="systemState.connected">sync</mat-icon>
    <mat-icon class="icon" *ngIf="systemState.connectionProblem">sync_problem</mat-icon>
    <mat-icon class="icon" *ngIf="!systemState.connected">sync_disabled</mat-icon>
  `,
  styleUrls: []
})
export class ConnectionComponent {
  constructor(public systemState: SystemState) {
  }
}