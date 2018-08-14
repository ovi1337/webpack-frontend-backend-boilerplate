import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SymbolService } from '../service/symbol.service';

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

  constructor(private symbolService: SymbolService) {
  }

  public getValue(): number {
    if(!(this.symbol in this.symbolService.symbols)) {
      return 0;
    }

    return (this.max / (this.max - this.symbolService.symbols[this.symbol].value)) * 100 - 100
  }

  public ngOnInit(): void {
    console.log('register Symbol:', this.symbol);
  }

  public ngOnDestroy(): void {
    console.log('remove Symbol:', this.symbol);
  }
}