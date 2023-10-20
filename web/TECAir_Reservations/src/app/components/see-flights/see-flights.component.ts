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
export class SeeFlightsComponent implements OnInit {
  private onDestroy = new Subject<void>();
  seeFlights: SeeFlight[] = [];
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
        // this.seeFlights = seeFlights;
      },
      complete: () => {
        console.log('Finished Flights fetched');
      },
    });
  }

  fetchFlightsWithSelection(searchStop: SearchStop): void {
    this.seeFlightsService
      .postSeeFlightsWithSelection(
        searchStop.sfromairportid,
        searchStop.stoairportid
      )
      .subscribe({
        next: (data) => {
          this.seeFlights = data;
        },
        error: (error) => {
          console.error('Error fetching flights:', error);
          // this.seeFlights = seeFlights.filter(
          //   (seeFlight) =>
          //     seeFlight.sfromcity === searchStop.sfromcity &&
          //     seeFlight.stocity === searchStop.stocity
          // );
        },
        complete: () => {
          console.log('Finished Flights fetched');
        },
      });
  }

  reserveFlight(flight: SeeFlight): void {
    if (
      searchStopSelected.sfromairportid == 0 ||
      searchStopSelected.stoairportid == 0 ||
      searchStopSelected.sfromcity == '' ||
      searchStopSelected.stocity == ''
    ) {
      window.alert('TIENES QUE BUSCAR UN ORIGEN Y DESTINO!!');
      return;
    }
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
