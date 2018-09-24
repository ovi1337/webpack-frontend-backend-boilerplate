import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public rowHeight: number = 750;

  public ngOnInit(): void {
    this.rowHeight = window.innerHeight - 64;

    console.log(this.rowHeight);
  }  
}