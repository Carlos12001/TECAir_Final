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
  private url: string = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  constructor(private http: HttpClient) {}

  public postCreatePassenger(
    email: string,
    fnumber: number,
    stopID: number
  ): Observable<CreatePassenger> {
    const body = {
      email: email,
      fnumber: fnumber,
      stopID: stopID,
    };

    return this.http.post<CreatePassenger>(this.url + 'api/passenger/create', {
      ...this.httpOptions,
      body,
    });
  }
}
