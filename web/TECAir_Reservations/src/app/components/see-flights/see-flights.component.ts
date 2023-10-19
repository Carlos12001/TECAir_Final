import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeeFlightsService } from 'src/app/services/see-flights.service';
import { SearchPlaneService } from 'src/app/services/search-plane.service';
import { SeeFlight, seeFlights } from 'src/app/models/see-flight.model';
import { Subject, takeUntil } from 'rxjs';
import { SearchStop } from 'src/app/models/search-stop.model';

@Component({
  selector: 'app-see-flights',
  templateUrl: './see-flights.component.html',
  styleUrls: ['./see-flights.component.css'],
})
export class SeeFlightsComponent implements OnInit {
  private onDestroy = new Subject<void>();
  seeFlights: SeeFlight[] = seeFlights;
  constructor(
    private router: Router,
    private seeFlightsService: SeeFlightsService,
    private searchPlaneService: SearchPlaneService
  ) {}

  ngOnInit(): void {
    this.fetchFlights();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  fetchFlights(): void {
    this.searchPlaneService
      .getSearchData()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((data) => {
        if (data) {
          this.fetchFlightsWithSelection(data);
          console.log(data);
        } else {
          this.fetchFlightsNoSelection();
        }
      });
  }

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

  fetchFlightsWithSelection(searchStop: SearchStop): void {
    this.seeFlightsService
      .postSeeFlightsWithSelection(
        searchStop.SfromAirportID,
        searchStop.StoAirportID
      )
      .subscribe({
        next: (data) => {
          this.seeFlights = data;
        },
        error: (error) => {
          console.error('Error fetching flights:', error);
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

  reserveFlight(flight: SeeFlight): void {
    console.log('Reserving flight: ', flight);
  }
}
