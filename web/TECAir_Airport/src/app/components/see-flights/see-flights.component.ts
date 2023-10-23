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

@Component({
  selector: 'app-see-flights',
  templateUrl: './see-flights.component.html',
  styleUrls: ['./see-flights.component.css'],
})
/* The SeeFlightsComponent class is responsible for fetching and displaying flight data, as well as handling flight reservations. */
export class SeeFlightsComponent implements OnInit {
  /* The line `private onDestroy = new Subject<void>();` is creating a private instance of the `Subject` class from the RxJS library. This subject is used to emit a completion signal when the component is destroyed. It is typically used to unsubscribe from any ongoing subscriptions or perform cleanup tasks to prevent memory leaks. */
  private onDestroy = new Subject<void>();
  /* The line `seeFlights: SeeFlight[] = [];` is declaring and initializing a variable `seeFlights` as an array of `SeeFlight` objects. The `SeeFlight` type is defined elsewhere in the code and represents the structure of flight data. By initializing it as an empty array, it is ready to store flight data fetched from the server. */
  seeFlights: SeeFlight[] = [];
  /**
   * The constructor function initializes the router, seeFlightsService, and searchPlaneService dependencies.
   * @param {Router} router - The router parameter is an instance of the Router class, which is used for navigating between different routes in an Angular application.
   * @param {SeeFlightsService} seeFlightsService - The `seeFlightsService` parameter is an instance of the `SeeFlightsService` class. It is used to retrieve flight information from a data source.
   * @param {SearchPlaneService} searchPlaneService - The `searchPlaneService` parameter is an instance of the `SearchPlaneService` class. It is used to perform search operations related to planes.
   */
  constructor(
    private router: Router,
    private seeFlightsService: SeeFlightsService,
    private searchPlaneService: SearchPlaneService
  ) {}

  /**
   * The ngOnInit function is used to fetch flights when the component is initialized.
   */
  ngOnInit(): void {
    this.fetchFlights();
  }

  /**
   * The ngOnDestroy function is called when a component is destroyed and it emits a value through the onDestroy subject.
   */
  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  /**
   * The function fetches flights based on search data and either fetches flights with the selected data or fetches all flights if no data is selected.
   */
  fetchFlights(): void {
    this.searchPlaneService
      .getSearchData()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((data) => {
        if (data) {
          this.fetchFlightsWithSelection(data);
          // console.log(data);
        } else {
          this.fetchFlightsNoSelection();
        }
      });
  }

  /**
   * The function fetches flights data from a service and handles the response and error cases.
   */
  fetchFlightsNoSelection(): void {
    this.seeFlightsService.getSeeFlights().subscribe({
      next: (data) => {
        this.seeFlights = data;
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
   * The function fetches flights based on a selection of search criteria and handles any errors that occur during the process.
   * @param {SearchStop} searchStop - The `searchStop` parameter is an object that contains the following properties:
   */
  fetchFlightsWithSelection(searchStop: SearchStop): void {
    this.seeFlightsService
      .postSeeFlightsWithSelection(
        searchStop.sfromairportid,
        searchStop.stoairportid
      )
      .subscribe({
        next: (data: SeeFlight[]) => {
          this.seeFlights = data;
        },
        error: (error) => {
          console.error('Error fetching flights:', error);
          this.seeFlights = seeFlights;
          this.seeFlights = seeFlights.filter(
            (seeFlight) =>
              seeFlight.sfromcity === searchStop.sfromcity &&
              seeFlight.stocity === searchStop.stocity
          );
        },
        complete: () => {
          console.log('Finished Flights fetched');
        },
      });
  }

  /**
   * The reserveFlight function reserves a flight and navigates to the checkout page.
   * @param {SeeFlight} flight - The flight parameter is an object of type SeeFlight, which contains information about a specific flight.
   */
  reserveFlight(flight: SeeFlight): void {
    // if (
    //   searchStopSelected.sfromairportid == 0 ||
    //   searchStopSelected.stoairportid == 0 ||
    //   searchStopSelected.sfromcity == '' ||
    //   searchStopSelected.stocity == ''
    // ) {
    //   window.alert('TIENES QUE BUSCAR UN ORIGEN Y DESTINO!!');
    //   return;
    // }
    console.log('Reserving flight: ', flight);
    seeFlightSelected.fnumber = flight.fnumber;
    seeFlightSelected.stopid = flight.stopid;
    seeFlightSelected.sfromcity = flight.sfromcity;
    seeFlightSelected.stocity = flight.stocity;
    seeFlightSelected.stoimage = flight.stoimage;
    seeFlightSelected.fdate = flight.fdate;
    seeFlightSelected.fprice = flight.fprice;

    this.router.navigate(['/display-checkout']);
  }
}
