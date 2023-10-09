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
import { PrincingComponent } from './components/princing/princing.component';

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
    PrincingComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
