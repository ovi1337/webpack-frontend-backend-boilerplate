import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { Event } from '../model/event';

@Injectable()
export class SystemState {
    public connected: boolean = false;
    public connectionProblem: boolean = false;

    constructor(private socketService: SocketService) {
        this.socketService.onEvent(Event.CONNECT)
            .subscribe(() => {
                console.log('connected');
                this.connected = true;
            });

        this.socketService.onEvent(Event.DISCONNECT)
            .subscribe(() => {
                console.log('disconnected');
                this.connected = false;
            });
    }
}