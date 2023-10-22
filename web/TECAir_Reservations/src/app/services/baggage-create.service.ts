import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { CreateBaggage, SimpleBaggage } from '../models/baggage.model';

@Injectable({
  providedIn: 'root',
})
export class BaggageCreateService {
  /* The line `private url: string = environment.apiUrl;` is declaring a private variable `url` of type string and initializing it with the value of `environment.apiUrl`. */
  private url: string = environment.apiUrl;

  /* The `httpOptions` object is used to set the headers for the HTTP request. In this case, it sets the `Content-Type` header to `application/json` and the `Authorization` header to `'my-auth-token'`. These headers are necessary for making a request to the server with the correct content type and authorization token. */
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
   * The function `createBaggages` sends a POST request to the server with the passenger number and a list of baggages, and returns an Observable of SimpleBaggage array.
   * @param {CreateBaggage} createBaggage - The `createBaggage` parameter is an object of type `CreateBaggage`. It contains the following properties:
   * @returns an Observable of type SimpleBaggage[].
   */
  public createBaggages(
    createBaggage: CreateBaggage
  ): Observable<SimpleBaggage[]> {
    const body = {
      pnumber: createBaggage.pnumber,
      baggages: createBaggage.baggages,
    };

    return this.http.post<SimpleBaggage[]>(
      this.url + 'api/flight/passenger',
      body,
      this.httpOptions
    );
  }
}
