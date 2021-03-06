import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SearchresultsComponent } from './searchresults/searchresults.component';
import { CheckAvailabilityComponent } from './check-availability/check-availability.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SellYourCarComponent } from './sell-your-car/sell-your-car.component';
import { ServiceAndRepairComponent } from './service-and-repair/service-and-repair.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SearchresultsComponent,
    CheckAvailabilityComponent,
    SellYourCarComponent,
    ServiceAndRepairComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ProgressSpinnerModule
  ],
  providers: [
    // provide: APP_BASE_HREF,
    // useValue: window.location.pathname,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
