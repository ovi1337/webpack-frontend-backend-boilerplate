import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SymbolService } from '../service/symbol.service';
import { SymbolState } from '../service/symbol.state';

@Component({
  selector: 'slider2-widget',
  template: `
  <div class="slider-wrapper">
    <input type="range"
           class="slider slider--vertical"
           [class.slider--vertical]="vertical"
           [min]="min" 
           [max]="max" 
           [step]="step" 
           [value]="getValue()"
           (input)="onChange($event)" />
  </div>
  `,
  styleUrls: ['./slider2.component.scss']
})
export class Slider2Component implements OnInit, OnDestroy {
  @Input() public min: number;
  @Input() public max: number;
  @Input() public step: number;
  @Input() public symbol: string;
  @Input() public vertical: boolean;
  public value: string;

  constructor(private symbolService: SymbolService, private symbolState: SymbolState) {
  }

  public ngOnInit(): void {
    this.symbolState.registerSymbol(this.symbol);
  }

  public ngOnDestroy(): void {
    this.symbolState.removeSymbol(this.symbol);
  }

  public onChange(event: any): void {
    this.symbolService.setSymbol(this.symbol, event.target.value);
  }

  public getValue(): number {
    if (!(this.symbol in this.symbolService.symbols)) {
      return 0;
    }

    return this.symbolService.symbols[this.symbol].value;
  }
}