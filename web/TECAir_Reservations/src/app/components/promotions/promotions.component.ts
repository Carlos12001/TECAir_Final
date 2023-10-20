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
export class PromotionsComponent {
  seeFlights: SeeFlight[] = [];

  constructor(
    private router: Router,
    private promotionsService: PromotionsService
  ) {}

  ngOnInit(): void {
    this.fetchPromo();
  }

  fetchPromo(): void {
    this.promotionsService.getSeePromotions().subscribe({
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
