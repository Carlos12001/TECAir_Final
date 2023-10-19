import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SeeFlightsComponent } from './components/see-flights/see-flights.component';
import { SlidesComponent } from './components/slides/slides.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PlaceAirplaneComponent } from './components/place-airplane/place-airplane.component';
import { SearchPlaneComponent } from './components/search-plane/search-plane.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { FooterComponent } from './components/footer/footer.component';
import { DisplayFliesComponent } from './components/display-flies/display-flies.component';
import { DisplaySignInComponent } from './components/display-sign-in/display-sign-in.component';
import { DisplayResgiterComponent } from './components/display-resgiter/display-resgiter.component';
import { DisplayPricesComponent } from './components/display-prices/display-prices.component';
import { DisplaySeatComponent } from './components/display-seat/display-seat.component';
import { DisplayCheckoutComponent } from './components/display-checkout/display-checkout.component';
import { DisplayConfirmationComponent } from './components/display-confirmation/display-confirmation.component';
import { GeneratepdfComponent } from './components/generatepdf/generatepdf.component';
import { BaggageComponent } from './components/baggage/baggage.component';
import { BaggageCreateComponent } from './components/baggage-create/baggage-create.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    MDBBootstrapModule,
  ],

  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SeeFlightsComponent,
    SlidesComponent,
    PricingComponent,
    NavbarComponent,
    PlaceAirplaneComponent,
    SearchPlaneComponent,
    CheckoutComponent,
    ButtonsComponent,
    FooterComponent,
    DisplayFliesComponent,
    DisplaySignInComponent,
    DisplayResgiterComponent,
    DisplayPricesComponent,
    DisplaySeatComponent,
    DisplayCheckoutComponent,
    DisplayConfirmationComponent,
    GeneratepdfComponent,
    BaggageComponent,
    BaggageCreateComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
