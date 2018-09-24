import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { WidgetsModule } from './shared/components/widgets.module';
import { SystemState } from './shared/service/system.state';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DashboardModule,
    SharedModule,
    WidgetsModule,
  ],
  providers: [
    SystemState,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
