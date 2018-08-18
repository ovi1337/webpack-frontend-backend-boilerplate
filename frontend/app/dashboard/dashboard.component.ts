import { Component, OnInit } from '@angular/core';
import { Event } from '../shared/model/event';
import { Symbol } from '../shared/model/Symbol';
import { SocketService } from '../shared/service/socket.service';
import { Subscription } from 'rxjs';

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

  public getValues(values) {
    return Object.keys(values).map(index => values[index]); 
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onData()
      .subscribe((data: Symbol) => {
        this.symbols[data.name] = data;
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