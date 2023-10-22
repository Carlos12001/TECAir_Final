import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment';
import { UserLogged } from '../models/user-logged.model';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  private url: string = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserLogged[]> {
    return this.http.get<UserLogged[]>(this.url + 'api/user');
  }
}
