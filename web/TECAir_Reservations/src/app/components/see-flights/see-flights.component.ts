import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeeFlightsService } from 'src/app/services/see-flights.service';
import { SeeFlight, seeFlights } from 'src/app/models/see-flight.model';

@Component({
  selector: 'app-see-flights',
  templateUrl: './see-flights.component.html',
  styleUrls: ['./see-flights.component.css'],
})
export class SeeFlightsComponent implements OnInit {
  seeFlights: SeeFlight[] = seeFlights;
  constructor(
    private router: Router,
    private seeFlightsService: SeeFlightsService
  ) {}

  ngOnInit(): void {
    this.fetchFlights();
  }

  fetchFlights(): void {
    this.seeFlightsService.getSeeFlights().subscribe({
      next: (data) => {
        this.seeFlights = data;
      },
      error: (error) => {
        console.error('Error fetching flights:', error);
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
