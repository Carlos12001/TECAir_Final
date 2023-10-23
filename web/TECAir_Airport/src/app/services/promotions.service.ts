import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { SeeFlight } from '../models/see-flight.model';

@Injectable({
  providedIn: 'root',
})
export class PromotionsService {
  /* The line `private url: string = environment.apiUrl;` is declaring a private property `url` of type `string` and initializing it with the value of `environment.apiUrl`. */
  private url: string = environment.apiUrl;

  /* The `httpOptions` object is used to set the headers for an HTTP request. In this case, it sets the `Content-Type` header to `application/json` and the `Authorization` header to `my-auth-token`. These headers provide additional information to the server about the type of data being sent and any authentication credentials that may be required. */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  /**
   * The constructor function initializes a private http property of type HttpClient.
   * @param {HttpClient} http - The `http` parameter is of type `HttpClient`. It is a dependency injection that allows you to make HTTP requests in your code.
   */
  constructor(private http: HttpClient) {}

  /**
   * The function `getSeePromotions` returns an Observable of type `SeeFlight[]` that makes an HTTP GET request to retrieve flight promotions.
   * @returns an Observable of type SeeFlight[].
   */
  public getSeePromotions(): Observable<SeeFlight[]> {
    return this.http.get<SeeFlight[]>(this.url + 'api/flight/promotions');
  }
}
