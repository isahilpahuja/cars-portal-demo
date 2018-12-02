import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { CheckAvailabilityComponent } from './check-availability/check-availability.component';

const routes: Routes = [
  { path: '', redirectTo: '/searchresults', pathMatch: 'full' },
  { path: 'searchresults', component: SearchresultsComponent },
  { path: 'check-availability', component: CheckAvailabilityComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
