import { Injectable } from '@angular/core';
import { Symbol } from '../model/Symbol';
import { SocketService } from './socket.service';

@Injectable()
export class SymbolService {
    public symbols: Symbol[] = [];

    constructor(private socketService: SocketService) {
        this.socketService.onData()
            .subscribe((data: Symbol) => {
                this.symbols[data.name] = data;
            });
    }

    public setSymbol(name: string, value: any): void {
        this.socketService.setSymbol({
            name: name,
            value: value,
        });
    }

    public updateSymbolAccessList(symbols: string[]): void {
        this.socketService.updateSymbolAccessList(symbols);
    }
}