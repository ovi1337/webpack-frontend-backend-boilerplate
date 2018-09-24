import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SymbolService } from '../service/symbol.service';
import { SymbolState } from '../service/symbol.state';

@Component({
  selector: 'led-widget',
  template: `
    <div class="led-wrapper">
      <span class="led led--{{color}}"
            [class.led--enabled]="getValue()"
            [class.led--blink]="blink">
      </span>
      <p>{{caption}}</p>
    </div>
  `,
  styleUrls: ['./led.component.scss'],
})
export class LedComponent implements OnInit, OnDestroy {
  @Input() public symbol: string;
  @Input() public caption: string;
  @Input() public color: string = 'red';
  @Input() public blink: boolean = false;

  constructor(private symbolService: SymbolService, private symbolState: SymbolState) {
  }

  public ngOnInit(): void {
    this.symbolState.registerSymbol(this.symbol);
  }

  public ngOnDestroy(): void {
    this.symbolState.removeSymbol(this.symbol);
  }

  public getValue(): boolean {
    if (!(this.symbol in this.symbolService.symbols)) {
      return false;
    }

    return Boolean(this.symbolService.symbols[this.symbol].value);
  }
}