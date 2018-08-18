import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SymbolService } from '../service/symbol.service';
import { SymbolState } from '../service/symbol.state';

@Component({
  selector: 'slider-widget',
  template: `
    <mat-slider [min]="min" 
                [max]="max" 
                [step]="step" 
                [value]="getValue()" 
                (input)="onChange($event)">
    </mat-slider>
  `,
  styleUrls: []
})
export class SliderComponent implements OnInit, OnDestroy {
  @Input() public min: number;
  @Input() public max: number;
  @Input() public step: number;
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
    this.symbolService.setSymbol(this.symbol, event.value);
  }

  public getValue(): number {
    if(!(this.symbol in this.symbolService.symbols)) {
      return 0;
    }

    return this.symbolService.symbols[this.symbol].value;
  }
}