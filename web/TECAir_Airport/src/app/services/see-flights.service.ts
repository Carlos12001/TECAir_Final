import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

import { SeeFlight } from '../models/see-flight.model';
@Injectable({
  providedIn: 'root',
})
export class SeeFlightsService {
  /* The line `private url: string = environment.apiUrl;` is declaring a private variable `url` of type string and initializing it with the value of `environment.apiUrl`. */
  private url: string = environment.apiUrl;

  /* The `httpOptions` variable is an object that contains the headers for an HTTP request. In this case, it includes the `Content-Type` header set to `application/json` and the `Authorization` header set to `my-auth-token`. These headers provide additional information to the server about the type of data being sent (JSON) and any authentication token that may be required. */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  /**
   * The constructor function initializes a private property http of type HttpClient.
   * @param {HttpClient} http - The `http` parameter is of type `HttpClient`. It is a dependency injection that allows you to make HTTP requests in your code.
   */
  constructor(private http: HttpClient) {}

  /**
   * The function `getSeeFlights` returns an Observable that makes an HTTP GET request to retrieve a list of available flights.
   * @returns The getSeeFlights() method returns an Observable of type SeeFlight[].
   */
  public getSeeFlights(): Observable<SeeFlight[]> {
    return this.http.get<SeeFlight[]>(this.url + 'api/flight/available');
  }

  /**
   * This function sends a POST request to retrieve a list of flights based on the selected departure and arrival airports.
   * @param {number} sfromairportid - The ID of the airport from which you want to search for flights.
   * @param {number} stoairportid - The parameter "stoairportid" represents the ID of the destination airport.
   * @returns an Observable of type SeeFlight[].
   */
  public postSeeFlightsWithSelection(
    sfromairportid: number,
    stoairportid: number
  ): Observable<SeeFlight[]> {
    const body = {
      sfromairportID: sfromairportid,
      stoairportID: stoairportid,
    };

    console.log(body);

    return this.http.post<SeeFlight[]>(
      this.url + 'api/flight/fromto',
      body,
      this.httpOptions
    );
  }
}
