import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchPlaneService } from 'src/app/services/search-plane.service';
import {
  SearchStop,
  searchStopSelected,
  searchStops,
} from 'src/app/models/search-stop.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-plane',
  templateUrl: './search-plane.component.html',
  styleUrls: ['./search-plane.component.css'],
})
/* The SearchPlaneComponent class is responsible for managing the search functionality for flights, including selecting origins and destinations, fetching search stops, and navigating to the display flights page. */
export class SearchPlaneComponent implements OnInit {
  /* The line `searchStops: SearchStop[] = searchStops;` is declaring a variable `searchStops` of type `SearchStop[]` and initializing it with the value of `searchStops`. `searchStops` is likely an array of `SearchStop` objects, which is a model used in the application. */
  searchStops: SearchStop[] = searchStops;

  /* The line `selectedOrigin: { city: string; id: number } | null = null;` is declaring a variable `selectedOrigin` and initializing it with the value `null`. The type of `selectedOrigin` is a union type, which means it can either be of type `{ city: string; id: number }` or `null`. */
  selectedOrigin: { city: string; id: number } | null = null;
  /* The line `selectedDestination: { city: string; id: number } | null = null;` is declaring a variable `selectedDestination` and initializing it with the value `null`. The type of `selectedDestination` is a union type, which means it can either be of type `{ city: string; id: number }` or `null`. This variable is used to store the selected destination for the flight search. If no destination is selected, the value will be `null`. */
  selectedDestination: { city: string; id: number } | null = null;

  /* The line `private onDestroy = new Subject<void>();` is declaring a private variable `onDestroy` and initializing it with a new instance of the `Subject` class. This `Subject` is used to emit a completion signal when the component is destroyed. It is typically used in combination with the `takeUntil` operator to unsubscribe from observables and prevent memory leaks. */
  private onDestroy = new Subject<void>();

  /**
   * The ngOnInit function is used to initialize the component by populating the selection from a service and fetching search stops.
   */
  ngOnInit(): void {
    this.populateSelectionFromService();
    this.fetchSearchStops();
  }

  /**
   * The ngOnDestroy function in TypeScript is used to notify subscribers that the component is being destroyed.
   */
  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  /**
   * The function "populateSelectionFromService" populates the selectedOrigin and selectedDestination variables with data retrieved from the searchPlaneService.
   */
  populateSelectionFromService(): void {
    this.searchPlaneService
      .getSearchData()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((data) => {
        if (data) {
          this.selectedOrigin = {
            city: data.sfromcity,
            id: data.sfromairportid,
          };
          this.selectedDestination = {
            city: data.stocity,
            id: data.stoairportid,
          };
        }
      });
  }

  /**
   * The constructor function initializes the searchPlaneService and router dependencies.
   * @param {SearchPlaneService} searchPlaneService - The `searchPlaneService` parameter is an instance of the `SearchPlaneService` class. It is used to perform search operations related to planes.
   * @param {Router} router - The router parameter is an instance of the Router class, which is used for navigating between different routes in an Angular application. It provides methods for navigating to a specific route, navigating back, and other navigation-related functionality.
   */
  constructor(
    private searchPlaneService: SearchPlaneService,
    private router: Router
  ) {}
  /**
   * The function fetches search stops data from a service and handles the response and error cases.
   */

  fetchSearchStops(): void {
    this.searchPlaneService.getSeeFlights().subscribe({
      next: (data) => {
        this.searchStops = data;
      },
      error: (error) => {
        this.populateSelectionFromService();
        console.error('Error fetching SearchStops:', error);
      },
      complete: () => {
        console.log('Finished SearchStops fetched');
      },
    });
  }

  /**
   * The function returns an array of unique origins based on a selected destination.
   * @returns The function `getUniqueOrigins()` returns an array of objects with properties `city` (string) and `id` (number).
   */
  get uniqueOrigins(): { city: string; id: number }[] {
    if (this.selectedDestination) {
      return this.searchStops
        .filter((stop) => stop.stocity === this.selectedDestination?.city)
        .map((stop) => ({ city: stop.sfromcity, id: stop.sfromairportid }));
    }

    // This part ensures that each origin appears only once in the array
    const originsSet: { [key: string]: number } = {};
    this.searchStops.forEach((stop) => {
      originsSet[stop.sfromcity] = stop.sfromairportid;
    });

    return Object.entries(originsSet).map(([city, id]) => ({ city, id }));
  }

  /**
   * The function returns an array of unique destinations based on the selected origin city.
   * @returns The function `getUniqueDestinations()` returns an array of objects with properties `city` (string) and `id` (number).
   */
  get uniqueDestinations(): { city: string; id: number }[] {
    if (this.selectedOrigin) {
      return this.searchStops
        .filter((stop) => stop.sfromcity === this.selectedOrigin?.city)
        .map((stop) => ({ city: stop.stocity, id: stop.stoairportid }));
    }

    // This part ensures that each destination appears only once in the array
    const destinationsSet: { [key: string]: number } = {};
    this.searchStops.forEach((stop) => {
      destinationsSet[stop.stocity] = stop.stoairportid;
    });

    return Object.entries(destinationsSet).map(([city, id]) => ({ city, id }));
  }

  /**
   * The function "selectOrigin" assigns the value of the "stop" parameter to the "selectedOrigin" variable.
   * @param {any} stop - The parameter "stop" is of type "any", which means it can accept any data type.
   */
  selectOrigin(stop: any) {
    this.selectedOrigin = stop;
  }

  /**
   * The function "selectDestination" assigns the value of the "stop" parameter to the "selectedDestination" property.
   * @param {any} stop - The `stop` parameter is of type `any`, which means it can accept any data type.
   */
  selectDestination(stop: any) {
    this.selectedDestination = stop;
  }

  /**
   * The function clears the selected origin and destination and sets the search data to null.
   */
  clearSelections(): void {
    this.selectedOrigin = null;
    this.selectedDestination = null;
    this.searchPlaneService.setSearchData(null);
  }

  /**
   * The function "seeFlights" sets search data and navigates to the "display-flights" page if both the selected origin and destination are not null.
   * @returns If either the selectedOrigin or selectedDestination is null, the function will return without performing any further actions.
   */
  seeFlights(): void {
    if (this.selectedOrigin == null || this.selectedDestination == null) {
      return;
    }
    this.searchPlaneService.setSearchData({
      sfromairportid: this.selectedOrigin.id,
      sfromcity: this.selectedOrigin.city,
      stoairportid: this.selectedDestination.id,
      stocity: this.selectedDestination.city,
    });
    searchStopSelected.sfromairportid = this.selectedOrigin.id;
    searchStopSelected.sfromcity = this.selectedOrigin.city;
    searchStopSelected.stoairportid = this.selectedDestination.id;
    searchStopSelected.stocity = this.selectedDestination.city;

    this.router.navigate(['display-flights']);
  }
}
