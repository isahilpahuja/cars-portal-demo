import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { CheckAvailabilityComponent } from './check-availability/check-availability.component';
import { SellYourCarComponent } from './sell-your-car/sell-your-car.component';
import { ServiceAndRepairComponent } from './service-and-repair/service-and-repair.component';

const routes: Routes = [
  { path: '', redirectTo: '/used-car-portal', pathMatch: 'full' },
  { path: 'used-car-portal', component: SearchresultsComponent },
  { path: 'check-availability', component: CheckAvailabilityComponent },
  { path: 'sell-car-portal', component: SellYourCarComponent },
  { path: 'service-and-repair', component: ServiceAndRepairComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
