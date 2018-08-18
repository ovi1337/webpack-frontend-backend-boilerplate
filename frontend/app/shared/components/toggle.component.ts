import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SymbolService } from '../service/symbol.service';
import { SymbolState } from '../service/symbol.state';

@Component({
  selector: 'toggle-widget',
  template: `
    <mat-slide-toggle (change)="onChange($event)" [checked]="getValue()">
      {{caption}}
    </mat-slide-toggle>
  `,
  styleUrls: []
})
export class ToggleComponent implements OnInit, OnDestroy {
  @Input() public caption: string;
  @Input() public symbol: string;

  constructor(private symbolService: SymbolService, private symbolState: SymbolState) {
  }

  public ngOnInit(): void {
    this.symbolState.registerSymbol(this.symbol);
  }

  public ngOnDestroy(): void {
    this.symbolState.removeSymbol(this.symbol);
  }

  public onChange(event: any): void {
    this.symbolService.setSymbol(this.symbol, event.checked);
  }

  public getValue(): boolean {
    if(!(this.symbol in this.symbolService.symbols)) {
      return false;
    }

    return Boolean(this.symbolService.symbols[this.symbol].value);
  }
}