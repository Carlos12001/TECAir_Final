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
export class SearchPlaneComponent implements OnInit {
  searchStops: SearchStop[] = searchStops;

  selectedOrigin: { city: string; id: number } | null = null;
  selectedDestination: { city: string; id: number } | null = null;

  private onDestroy = new Subject<void>();

  ngOnInit(): void {
    this.fetchSearchStops();
    this.populateSelectionFromService();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

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

  constructor(
    private searchPlaneService: SearchPlaneService,
    private router: Router
  ) {}

  fetchSearchStops(): void {
    // this.searchPlaneService.getSeeFlights().subscribe({
    //   next: (data) => {
    //     this.searchStops = data;
    //   },
    //   error: (error) => {
    //     console.error('Error fetching SearchStops:', error);
    //   },
    //   complete: () => {
    //     console.log('Finished SearchStops fetched');
    //   },
    // });
  }

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

  selectOrigin(stop: any) {
    this.selectedOrigin = stop;
  }

  selectDestination(stop: any) {
    this.selectedDestination = stop;
  }

  clearSelections(): void {
    this.selectedOrigin = null;
    this.selectedDestination = null;
    this.searchPlaneService.setSearchData(null);
  }

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
