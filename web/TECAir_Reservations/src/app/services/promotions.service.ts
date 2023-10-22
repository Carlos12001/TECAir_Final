import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { SeeFlight } from '../models/see-flight.model';

@Injectable({
  providedIn: 'root',
})
export class PromotionsService {
  private url: string = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  constructor(private http: HttpClient) {}

  public getSeePromotions(): Observable<SeeFlight[]> {
    return this.http.get<SeeFlight[]>(this.url + 'api/flight/promotions');
  }
}
