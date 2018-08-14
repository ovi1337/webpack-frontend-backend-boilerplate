import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Observer } from 'rxjs';
import { Symbol } from '../../dashboard/shared/model/Symbol';
import { Event } from '../../dashboard/shared/model/event';
import { SocketService } from '../../dashboard/shared/service/socket.service';

@Injectable()
export class SymbolService {
    public symbols: Symbol[] = [];
    private ioConnection: Subscription;

    constructor(private socketService: SocketService) {
        this.initIoConnection();
    }

    public setSymbol(name: string, value: any): void {
        this.socketService.setSymbol({
            name: name,
            value: value,
        });
    }

    private initIoConnection(): void {
        this.socketService.initSocket();

        this.ioConnection = this.socketService.onData()
            .subscribe((data: Symbol) => {
                //console.log('onData', data);
                this.symbols[data.name] = data;
                //console.log(this.symbols);
            });

        this.socketService.onEvent(Event.CONNECT)
            .subscribe(() => {
                console.log('connected');
            });

        this.socketService.onEvent(Event.DISCONNECT)
            .subscribe(() => {
                console.log('disconnected');
            });
    }
}