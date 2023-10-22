import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { Seat, SeatWithCapacity } from '../models/seat.model';

@Injectable({
  providedIn: 'root',
})
export class PlaceAirplaneService {
  /* The line `private url: string = environment.apiUrl;` is declaring a private property `url` of type `string` in the `PlaceAirplaneService` class. It is initializing the `url` property with the value of `environment.apiUrl`. */
  private url: string = environment.apiUrl;

  /* The `httpOptions` object is used to set the headers for the HTTP requests made by the `HttpClient` service. In this case, it sets the `Content-Type` header to `application/json` and includes an `Authorization` header with the value `'my-auth-token'`. These headers are commonly used for authentication and specifying the format of the request payload. */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  /**
   * The constructor function initializes a private http property of type HttpClient.
   * @param {HttpClient} http - The `http` parameter is of type `HttpClient`. It is a dependency injection that allows you to make HTTP requests in your code. It provides methods for making GET, POST, PUT, DELETE, and other types of HTTP requests to a server.
   */
  constructor(private http: HttpClient) {}

  /**
   * The function `getSeatWithCapacity` sends a POST request to the specified URL with a body containing the `pnumber` parameter, and returns an Observable of type `SeatWithCapacity`.
   * @param {number} pnumber - The `pnumber` parameter is a number that represents the flight number.
   * @returns an Observable of type SeatWithCapacity.
   */
  public getSeatWithCapacity(pnumber: number): Observable<SeatWithCapacity> {
    const body = {
      pnumber: pnumber,
    };

    return this.http.post<SeatWithCapacity>(
      this.url + 'api/seat/flight',
      body,
      this.httpOptions
    );
  }

  /**
   * The function `postSeat` sends a POST request to assign a seat and returns an Observable of an array of seats.
   * @param {Seat} seat - The `seat` parameter is an object that represents a seat. It has the following properties:
   * @returns an Observable of type Seat[].
   */
  public postSeat(seat: Seat): Observable<Seat[]> {
    const body = {
      pnumber: seat.pnumber,
      snumber: seat.snumber,
      sclass: seat.sclass,
    };
    return this.http.post<Seat[]>(
      this.url + 'api/seat/asign',
      body,
      this.httpOptions
    );
  }
}
