import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SymbolService } from '../service/symbol.service';

@Component({
  selector: 'toggle-widget',
  template: `
    <mat-slide-toggle (change)="onChange($event)">
      {{caption}}
    </mat-slide-toggle>
  `,
  styleUrls: []
})
export class ToggleComponent implements OnInit, OnDestroy {
  @Input() public caption: string;
  @Input() public symbol: string;

  constructor(private symbolService: SymbolService) {
  }

  public ngOnInit(): void {
    console.log('register Symbol:', this.symbol);
  }

  public ngOnDestroy(): void {
    console.log('remove Symbol:', this.symbol);
  }

  public onChange(event: any): void {
    console.log(this.symbol, event);
    this.symbolService.setSymbol(this.symbol, event.checked);
  }
}