import { Component, OnInit, OnDestroy } from '@angular/core';
import { SymbolService } from '../service/symbol.service';
import { SymbolState } from '../service/symbol.state';

@Component({
  selector: 'symbol-list-widget',
  template: `
    <table mat-table [dataSource]="getValues()" class="mat-elevation-z8">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> SymbolName </th>
        <td mat-cell *matCellDef="let element"> {{element.name}} </td>
      </ng-container>

      <ng-container matColumnDef="value">
        <th mat-header-cell *matHeaderCellDef> Value </th>
        <td mat-cell *matCellDef="let element"> {{element.value}} </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
  styleUrls: ['./symbol-list.component.scss']
})
export class SymbolListComponent implements OnInit, OnDestroy {
  public symbols: Symbol[] = [];
  public objectKeys = Object.keys;
  public dataSource: Symbol[] = [];
  public displayedColumns: string[] = ['name', 'value'];

  constructor(private symbolService: SymbolService, private symbolState: SymbolState) {
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
  }

  public getValues() {
    return Object.keys(this.symbolService.symbols).map(index => this.symbolService.symbols[index]);
  }

  /*
  public getValue(): boolean {
    if(!(this.symbol in this.symbolService.symbols)) {
      return false;
    }

    return Boolean(this.symbolService.symbols[this.symbol].value);
  }
  */
}