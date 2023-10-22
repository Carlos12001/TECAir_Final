import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeeFlightsService } from 'src/app/services/see-flights.service';
import { SearchPlaneService } from 'src/app/services/search-plane.service';
import {
  SeeFlight,
  seeFlightSelected,
  seeFlights,
} from 'src/app/models/see-flight.model';
import { Subject, takeUntil } from 'rxjs';
import {
  SearchStop,
  searchStopSelected,
} from 'src/app/models/search-stop.model';
import { PromotionsService } from 'src/app/services/promotions.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css'],
})
/* The PromotionsComponent class is responsible for fetching and displaying flight promotions, as well as reserving a selected flight. */
export class PromotionsComponent {
  /* The line `seeFlights: SeeFlight[] = [];` is declaring a variable `seeFlights` of type `SeeFlight[]` and initializing it as an empty array. This variable is used to store the fetched flight promotions. */
  seeFlights: SeeFlight[] = [];

  /**
   * The constructor function initializes the router and promotions service.
   * @param {Router} router - The router parameter is an instance of the Router class, which is used for navigating between different routes in an Angular application. It allows you to programmatically navigate to different views or components.
   * @param {PromotionsService} promotionsService - The `promotionsService` parameter is an instance of the `PromotionsService` class. It is used to interact with the promotions data and perform operations such as fetching, creating, updating, and deleting promotions.
   */
  constructor(
    private router: Router,
    private promotionsService: PromotionsService
  ) {}

  /**
   * The ngOnInit function is used to fetch promotional data when the component is initialized.
   */
  ngOnInit(): void {
    this.fetchPromo();
  }

  /**
   * The fetchPromo function fetches flight promotions and filters them based on a discount percentage.
   */
  fetchPromo(): void {
    this.promotionsService.getSeePromotions().subscribe({
      next: (data) => {
        this.seeFlights = data.filter(
          (flight) => flight.depercent && flight.depercent > 0
        );
      },
      error: (error) => {
        console.error('Error fetching flights:', error);
        this.seeFlights = seeFlights;
      },
      complete: () => {
        console.log('Finished Flights fetched');
      },
    });
  }

  /**
   * The reserveFlight function logs the flight details, updates the selected flight and stop information, and navigates to the checkout page.
   * @param {SeeFlight} flight - The flight parameter is an object of type SeeFlight, which contains the following properties:
   */
  reserveFlight(flight: SeeFlight): void {
    console.log('Reserving flight: ', flight);
    searchStopSelected.sfromcity = flight.sfromcity;
    searchStopSelected.stocity = flight.stocity;
    seeFlightSelected.fnumber = flight.fnumber;
    seeFlightSelected.stopid = flight.stopid;
    seeFlightSelected.sfromcity = flight.sfromcity;
    seeFlightSelected.stocity = flight.stocity;
    seeFlightSelected.stoimage = flight.stoimage;
    seeFlightSelected.fdate = flight.fdate;
    seeFlightSelected.fprice = flight.fprice;
    seeFlightSelected.depercent = flight.depercent;

    this.router.navigate(['/display-checkout']);
  }
}
