import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { Seat, SeatWithCapacity } from '../models/seat.model';

@Injectable({
  providedIn: 'root',
})
export class PlaceAirplaneService {
  private url: string = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  constructor(private http: HttpClient) {}

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
