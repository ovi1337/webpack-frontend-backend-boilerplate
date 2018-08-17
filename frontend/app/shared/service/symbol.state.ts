import { Injectable } from '@angular/core';
import { SymbolService } from './symbol.service';
import { Observable, Subject, Observer } from 'rxjs';
import { debounceTime, debounce, switchMap } from 'rxjs/operators';

@Injectable()
export class SymbolState {
    public symbols: string[] = [];
    public onChanges = new Subject<string[]>();

    constructor(private symbolService: SymbolService) {
        this.onChanges
            .pipe(
                debounceTime(100),
            )
            .subscribe((symbols: string[]) => {
                this.symbolService.updateSymbolAccessList(symbols);

                console.log('debounced', symbols);
            });
    }

    public registerSymbol(name: string): void {
        if(this.symbols.indexOf(name) !== -1) {
            console.log(this.symbols, 'skipped');
            return;
        }

        this.symbols.push(name);
        
        this.onChanges.next(this.symbols);
    }

    public removeSymbol(name: string): void {
        const index = this.symbols.indexOf(name);

        if(this.symbols.indexOf(name) !== -1) {
            console.log(this.symbols, 'skipped');
            return;
        }

        this.symbols.splice(index, 1);

        this.onChanges.next(this.symbols);
    }
}