import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment';
import { SearchStop } from '../models/search-stop.model';

@Injectable({
  providedIn: 'root',
})
export class SearchPlaneService {
  private searchSubject = new BehaviorSubject<SearchStop | null>(null);

  private url: string = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  constructor(private http: HttpClient) {}

  public getSeeFlights(): Observable<SearchStop[]> {
    return this.http.get<SearchStop[]>(this.url + 'api/see-flights');
  }

  setSearchData(data: SearchStop | null) {
    this.searchSubject.next(data);
  }

  getSearchData(): Observable<SearchStop | null> {
    return this.searchSubject.asObservable();
  }
}
