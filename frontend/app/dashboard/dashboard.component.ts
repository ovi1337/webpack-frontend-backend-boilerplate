import { Component, OnInit } from '@angular/core';

import { Event } from './shared/model/event';
import { Symbol } from './shared/model/Symbol';
import { SocketService } from './shared/service/socket.service';
import { Subscription } from '../../../node_modules/rxjs';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public symbols: Symbol[] = [];
  public objectKeys = Object.keys;
  private ioConnection: Subscription;
  public dataSource: Symbol[] = [];

  public displayedColumns: string[] = ['name', 'value'];

  constructor(private socketService: SocketService) {
  }

  public ngOnInit(): void {
    this.initIoConnection();
    //this.setSymbol('MAIN.DIMMER', 50);
  }

  public setSymbol(name: string, value: any): void {
    this.socketService.setSymbol({
      name: name,
      value: value,
    });
  }

  public onChange(symbol: string, event: any) {
    this.setSymbol(symbol, event.value);
  }

  public getValues(values) {
    return Object.keys(values).map(index => values[index]); 
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