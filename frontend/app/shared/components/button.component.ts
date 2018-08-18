import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SymbolService } from '../service/symbol.service';
import { SymbolState } from '../service/symbol.state';

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

  constructor(private symbolService: SymbolService, private symbolState: SymbolState) {
  }

  public ngOnInit(): void {
    this.symbolState.registerSymbol(this.symbol);
  }

  public ngOnDestroy(): void {
    this.symbolState.removeSymbol(this.symbol);
  }

  public onChange(event: any): void {
    this.symbolService.setSymbol(this.symbol, this.value);
  }

  public getValue(): boolean {
    if(!(this.symbol in this.symbolService.symbols)) {
      return false;
    }

    return this.symbolService.symbols[this.symbol].value;
  }
}