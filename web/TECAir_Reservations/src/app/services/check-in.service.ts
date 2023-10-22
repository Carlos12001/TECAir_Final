import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { PassengerCheckIn } from '../models/passengers-check-in.model';

@Injectable({
  providedIn: 'root',
})
export class CheckInService {
  /* The line `private url: string = environment.apiUrl;` is declaring a private variable `url` of type string and initializing it with the value of `environment.apiUrl`. */
  private url: string = environment.apiUrl;

  /* The `httpOptions` variable is an object that contains the headers for the HTTP requests made by the `CheckInService` class. */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  /**
   * The constructor function takes an instance of the HttpClient class as a parameter and assigns it to the private http property.
   * @param {HttpClient} http - The `http` parameter is of type `HttpClient`. It is a service provided by Angular that allows you to make HTTP requests to a server. It is typically used to retrieve data from an API or send data to a server.
   */
  constructor(private http: HttpClient) {}

  /**
   * The function `getPassengerCheckIn` takes an email as input and returns an Observable of type `PassengerCheckIn[]` by making a POST request to a specific URL with the email as the request body.
   * @param {string} email - The email parameter is a string that represents the email address of the passenger.
   * @returns an Observable of type `PassengerCheckIn[]`.
   */
  public getPassengerCheckIn(email: string): Observable<PassengerCheckIn[]> {
    const body = {
      email: email,
    };

    return this.http.post<PassengerCheckIn[]>(
      this.url + 'api/flight/passenger',
      body,
      this.httpOptions
    );
  }

  /**
   * This function sends a PUT request to the server to update the check-in status of a passenger.
   * @param {PassengerCheckIn} passenger - The `passenger` parameter is an object of type `PassengerCheckIn`. It contains the information of the passenger for check-in.
   * @returns an Observable of type PassengerCheckIn[].
   */
  public postSeletecdCheckIn(
    passenger: PassengerCheckIn
  ): Observable<PassengerCheckIn[]> {
    const body = {
      pnumber: passenger.pnumber,
    };
    return this.http.put<PassengerCheckIn[]>(
      this.url + 'api/passenger/checkin',
      body,
      this.httpOptions
    );
  }
}
