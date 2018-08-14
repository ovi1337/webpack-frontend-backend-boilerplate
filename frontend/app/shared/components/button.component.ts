import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SymbolService } from '../service/symbol.service';

@Component({
  selector: 'button-widget',
  template: `
    <button mat-raised-button color="primary" (click)="onChange($event)">
      {{ caption }}
    </button>
  `,
  styleUrls: []
})
export class ButtonComponent implements OnInit, OnDestroy {
  @Input() public caption: string;
  @Input() public symbol: string;
  @Input() public value: any;

  constructor(private symbolService: SymbolService) {
  }

  public ngOnInit(): void {
    console.log('register Symbol:', this.symbol);
  }

  public ngOnDestroy(): void {
    console.log('remove Symbol:', this.symbol);
  }

  public onChange(event: any): void {
    console.log(this.symbol, this.value);
    this.symbolService.setSymbol(this.symbol, this.value);
  }
}