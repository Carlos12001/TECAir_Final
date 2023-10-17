import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SearchPlaneService } from 'src/app/services/search-plane.service';
import { SearchStop, searchStops } from 'src/app/models/search-stop.model';

@Component({
  selector: 'app-search-plane',
  templateUrl: './search-plane.component.html',
  styleUrls: ['./search-plane.component.css'],
})
export class SearchPlaneComponent implements OnInit {
  searchStops: SearchStop[] = searchStops;

  selectedOrigin: { city: string; id: number } | null = null;
  selectedDestination: { city: string; id: number } | null = null;

  ngOnInit(): void {
    this.fetchSearchStops();
  }

  constructor(
    private searchPlaneService: SearchPlaneService,
    private router: Router
  ) {}

  fetchSearchStops(): void {
    this.searchPlaneService.getSeeFlights().subscribe({
      next: (data) => {
        this.searchStops = data;
      },
      error: (error) => {
        console.error('Error fetching SearchStops:', error);
      },
      complete: () => {
        console.log('Finished SearchStops fetched');
      },
    });
  }

  get uniqueOrigins(): { city: string; id: number }[] {
    if (this.selectedDestination) {
      return this.searchStops
        .filter((stop) => stop.StoCity === this.selectedDestination?.city)
        .map((stop) => ({ city: stop.SfromCity, id: stop.SfromAirportID }));
    }

    // This part ensures that each origin appears only once in the array
    const originsSet: { [key: string]: number } = {};
    this.searchStops.forEach((stop) => {
      originsSet[stop.SfromCity] = stop.SfromAirportID;
    });

    return Object.entries(originsSet).map(([city, id]) => ({ city, id }));
  }

  get uniqueDestinations(): { city: string; id: number }[] {
    if (this.selectedOrigin) {
      return this.searchStops
        .filter((stop) => stop.SfromCity === this.selectedOrigin?.city)
        .map((stop) => ({ city: stop.StoCity, id: stop.StoAirportID }));
    }

    // This part ensures that each destination appears only once in the array
    const destinationsSet: { [key: string]: number } = {};
    this.searchStops.forEach((stop) => {
      destinationsSet[stop.StoCity] = stop.StoAirportID;
    });

    return Object.entries(destinationsSet).map(([city, id]) => ({ city, id }));
  }

  selectOrigin(stop: any) {
    this.selectedOrigin = stop;
  }

  selectDestination(stop: any) {
    this.selectedDestination = stop;
  }

  clearSelections(): void {
    this.selectedOrigin = null;
    this.selectedDestination = null;
  }

  seeFlights(): void {
    this.router.navigate(['/see-flights']);
  }
}
