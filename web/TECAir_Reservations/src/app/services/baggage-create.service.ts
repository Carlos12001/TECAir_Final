import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { CreateBaggage, SimpleBaggage } from '../models/baggage.model';

@Injectable({
  providedIn: 'root',
})
export class BaggageCreateService {
  private url: string = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  constructor(private http: HttpClient) {}

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
