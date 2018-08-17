import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
import { Symbol } from '../model/Symbol';
import { Event } from '../model/event';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';

@Injectable()
export class SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public setSymbol(symbol: Symbol): void {
        this.socket.emit('Data', symbol);
    }

    public updateSymbolAccessList(symbols: string[]): void {
        this.socket.emit('SymbolAccessList', symbols);
    }

    public onData(): Observable<Symbol> {
        return new Observable<Symbol>(observer => {
            this.socket.on('Data', (symbol: Symbol) => observer.next(symbol));
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}