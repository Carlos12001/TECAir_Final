import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { BaggageCreateComponent } from './components/baggage-create/baggage-create.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { PromotionsComponent } from './components/promotions/promotions.component';
import { DisplayPromotionsComponent } from './components/display-promotions/display-promotions.component';
import { AdminEditorComponent } from './components/admin-editor/admin-editor.component';
import { CheckInComponent } from './components/check-in/check-in.component';
import { DisplayCheckInComponent } from './components/display-check-in/display-check-in.component';
import { DisplayBaggageComponent } from './components/display-baggage/display-baggage.component';

/* The `@NgModule` decorator is used to define a module in Angular. It is a metadata object that specifies how the module should be compiled and run. */
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
    BaggageCreateComponent,
    RegisterUserComponent,
    PromotionsComponent,
    DisplayPromotionsComponent,
    AdminEditorComponent,
    CheckInComponent,
    DisplayCheckInComponent,
    DisplayBaggageComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
/* The AppModule class is exported and serves as the main module for the application. */
export class AppModule {}
