import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SymbolService } from '../service/symbol.service';
import { SymbolState } from '../service/symbol.state';

@Component({
  selector: 'status-widget',
  template: `
  <mat-chip [color]="getColor()"
            selected
            disableRipple="true"
            selectable="false">
    {{caption}}
  </mat-chip>
  `,
  styles: [
    '.red: { background-color: #ff0000; }',
    '.green: { background-color: #00ff00; }',
    '.blue: { background-color: #0000ff; }',
  ],
})
export class StatusComponent implements OnInit, OnDestroy {
  @Input() public symbol: string;
  @Input() public caption: string;
  @Input() public colorTrue: string = 'warn';
  @Input() public colorFalse: string = 'none';

  constructor(private symbolService: SymbolService, private symbolState: SymbolState) {
  }

  public ngOnInit(): void {
    this.symbolState.registerSymbol(this.symbol);
  }

  public ngOnDestroy(): void {
    this.symbolState.removeSymbol(this.symbol);
  }

  public getValue(): boolean {
    if(!(this.symbol in this.symbolService.symbols)) {
      return false;
    }

    return Boolean(this.symbolService.symbols[this.symbol].value);
  }

  public getColor(): string {
    return this.getValue() ? this.colorTrue : this.colorFalse;
  }
}