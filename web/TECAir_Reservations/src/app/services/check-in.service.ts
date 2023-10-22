import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { PassengerCheckIn } from '../models/passengers-check-in.model';

@Injectable({
  providedIn: 'root',
})
export class CheckInService {
  private url: string = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  constructor(private http: HttpClient) {}

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
