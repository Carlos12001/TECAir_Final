import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment';
import { UserLogged, userLogged } from '../models/user-logged.model';

@Injectable({
  providedIn: 'root',
})
export class ResgiterService {
  private url: string = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  constructor(private http: HttpClient) {}

  public postUserLogged(registerUser: UserLogged): Observable<UserLogged> {
    const body = {
      email: userLogged.email,
      upassword: userLogged.upassword,
      unumber: userLogged.unumber,
      fname: userLogged.fname,
      mname: userLogged.mname,
      lname1: userLogged.lname1,
      lname2: userLogged.lname2,
      studentid: userLogged.studentid,
      university: userLogged.university,
      adminid: userLogged.adminid,
      miles: userLogged.miles,
    };

    return this.http.post<UserLogged>(this.url + 'api/user/new', {
      ...this.httpOptions,
      body,
    });
  }
}
