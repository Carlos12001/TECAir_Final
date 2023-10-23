import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment';
import { SearchStop } from '../models/search-stop.model';

@Injectable({
  providedIn: 'root',
})
export class SearchPlaneService {
  /* The line `private searchSubject = new BehaviorSubject<SearchStop | null>(null);` is creating a new instance of the `BehaviorSubject` class. */
  private searchSubject = new BehaviorSubject<SearchStop | null>(null);

  /* The line `private url: string = environment.apiUrl;` is declaring a private variable `url` of type string and initializing it with the value of `environment.apiUrl`. */
  private url: string = environment.apiUrl;

  /* The `httpOptions` variable is an object that contains the headers to be sent with an HTTP request. In this case, it includes the `Content-Type` header set to `application/json` and the `Authorization` header set to `'my-auth-token'`. These headers provide information to the server about the type of data being sent (JSON) and can be used for authentication purposes. */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  /**
   * The constructor function takes an instance of the HttpClient class as a parameter and assigns it to the private http property.
   * @param {HttpClient} http - The `http` parameter is of type `HttpClient`. It is a service provided by Angular that allows you to make HTTP requests to a server. It provides methods like `get()`, `post()`, `put()`, `delete()`, etc. to send different types of HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * The function `getSeeFlights` returns an Observable of type `SearchStop[]` that makes an HTTP GET request to retrieve available flight stops.
   * @returns The getSeeFlights() method returns an Observable of type SearchStop[].
   */
  public getSeeFlights(): Observable<SearchStop[]> {
    return this.http.get<SearchStop[]>(this.url + 'api/stop/available');
  }

  /**
   * The setSearchData function sets the search data for a search stop.
   * @param {SearchStop | null} data - The `data` parameter is of type `SearchStop` or `null`.
   */
  setSearchData(data: SearchStop | null) {
    this.searchSubject.next(data);
  }

  /**
   * The function returns an Observable that emits either a SearchStop object or null.
   * @returns The method is returning an Observable of type `SearchStop` or `null`.
   */
  getSearchData(): Observable<SearchStop | null> {
    return this.searchSubject.asObservable();
  }
}
