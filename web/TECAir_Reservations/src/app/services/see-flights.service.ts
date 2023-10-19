import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

import { SeeFlight } from '../models/see-flight.model';
@Injectable({
  providedIn: 'root',
})
export class SeeFlightsService {
  private url: string = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  constructor(private http: HttpClient) {}

  public getSeeFlights(): Observable<SeeFlight[]> {
    return this.http.get<SeeFlight[]>(this.url + 'api/see-flights');
  }

  public postSeeFlightsWithSelection(
    sfromAirportid: number,
    stoairportid: number
  ): Observable<SeeFlight[]> {
    const body = {
      sfromAirportid: sfromAirportid,
      stoairportid: stoairportid,
    };

    return this.http.post<SeeFlight[]>(this.url + 'api/see-flights', {
      ...this.httpOptions,
      body,
    });
  }
}
