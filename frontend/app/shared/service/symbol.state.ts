import { Injectable } from '@angular/core';
import { SymbolService } from './symbol.service';
import { Subject, ReplaySubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class SymbolState {
    public symbols: string[] = [];
    public onChanges = new ReplaySubject<string[]>();
    //public symbolListener = new ReplaySubject<string[]>();

    constructor(private symbolService: SymbolService) {
        this.onChanges
            .pipe(
                debounceTime(100),
            )
            .subscribe((symbols: string[]) => {
                this.symbolService.updateSymbolAccessList(symbols);
            });
    }

    public registerSymbol(name: string): void {
        if (this.symbols.indexOf(name) !== -1) {
            return;
        }

        this.symbols.push(name);

        this.onChanges.next(this.symbols);
    }

    public removeSymbol(name: string): void {
        const index = this.symbols.indexOf(name);

        if (this.symbols.indexOf(name) !== -1) {
            return;
        }

        this.symbols.splice(index, 1);

        this.onChanges.next(this.symbols);
    }

    public getValueBySymbolName(name: string): any|undefined {
        console.log(name);
        if(this.symbols.indexOf(name) !== -1) {
            return this.symbols[name];
          }
    }
}