import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SymbolService } from '../service/symbol.service';

@Component({
  selector: 'slider-widget',
  template: `
    <mat-slider [min]="min" 
                [max]="max" 
                [step]="step" 
                value="0" 
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
    this.symbolService.setSymbol(this.symbol, event.value);
  }
}