import { Injectable, numberAttribute } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment';
import { UserLogged } from '../models/user-logged.model';
import { CreatePassenger } from '../models/create-passenger.model';
@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  /* The line `private url: string = environment.apiUrl;` is declaring a private variable `url` of type string and initializing it with the value of `environment.apiUrl`. */
  private url: string = environment.apiUrl;

  /* The `httpOptions` variable is an object that contains the headers for an HTTP request. In this case, it sets the `Content-Type` header to `application/json` and includes an `Authorization` header with the value `'my-auth-token'`. These headers provide information to the server about the type of data being sent (JSON) and can be used for authentication purposes. */
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
   * The function `postCreatePassenger` sends a POST request to create a passenger with the specified email, flight number, and stop ID.
   * @param {string} email - The email parameter is a string that represents the email address of the passenger.
   * @param {number} fnumber - The `fnumber` parameter represents the flight number. It is of type `number`.
   * @param {number} stopid - The `stopid` parameter represents the ID of the stop where the passenger wants to board the flight.
   * @returns an Observable of type CreatePassenger[].
   */
  public postCreatePassenger(
    email: string,
    fnumber: number,
    stopid: number
  ): Observable<CreatePassenger[]> {
    const body = {
      email: email,
      fnumber: fnumber,
      stopid: stopid,
    };
    console.log(body);

    return this.http.post<CreatePassenger[]>(
      this.url + 'api/passenger/create',
      body,
      this.httpOptions
    );
  }
}
