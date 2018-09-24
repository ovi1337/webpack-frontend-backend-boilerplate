import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SymbolService } from '../service/symbol.service';
import { SymbolState } from '../service/symbol.state';

@Component({
  selector: 'progressbar-widget',
  template: `
  <mat-progress-bar mode="determinate" [value]="getValue()">
  </mat-progress-bar>
  `,
  styleUrls: []
})
export class ProgressbarComponent implements OnInit, OnDestroy {
  @Input() public symbol: string;
  @Input() public value: number;
  @Input() public min: number;
  @Input() public max: number;

  constructor(private symbolService: SymbolService, private symbolState: SymbolState) {
  }

  public ngOnInit(): void {
    this.symbolState.registerSymbol(this.symbol);
  }

  public ngOnDestroy(): void {
    this.symbolState.removeSymbol(this.symbol);
  }

  public getValue(): number {
    if(!(this.symbol in this.symbolService.symbols)) {
      return 0;
    }

    return (this.max / (this.max - this.symbolService.symbols[this.symbol].value)) * 100 - 100;
  }
}