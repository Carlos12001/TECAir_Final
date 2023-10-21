import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DisplayFliesComponent } from './components/display-flies/display-flies.component';
import { DisplayResgiterComponent } from './components/display-resgiter/display-resgiter.component';
import { DisplaySignInComponent } from './components/display-sign-in/display-sign-in.component';
import { DisplayPricesComponent } from './components/display-prices/display-prices.component';
import { DisplaySeatComponent } from './components/display-seat/display-seat.component';
import { DisplayCheckoutComponent } from './components/display-checkout/display-checkout.component';
import { DisplayConfirmationComponent } from './components/display-confirmation/display-confirmation.component';
import { SeeFlightsComponent } from './components/see-flights/see-flights.component';
import { GeneratepdfComponent } from './components/generatepdf/generatepdf.component';
import { DisplayPromotionsComponent } from './components/display-promotions/display-promotions.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'display-sign-in', component: DisplaySignInComponent },
  { path: 'display-register', component: DisplayResgiterComponent },
  { path: 'display-prices', component: DisplayPricesComponent },
  { path: 'display-flights', component: DisplayFliesComponent },
  { path: 'display-seat', component: DisplaySeatComponent },
  { path: 'display-checkout', component: DisplayCheckoutComponent },
  { path: 'display-confirmation', component: DisplayConfirmationComponent },
  { path: 'generate-pdf', component: GeneratepdfComponent },
  { path: 'display-promotions', component: DisplayPromotionsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
