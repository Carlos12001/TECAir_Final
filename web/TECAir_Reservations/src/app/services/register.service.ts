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
      adminid: registerUser.adminid,
      email: registerUser.email,
      fname: registerUser.fname,
      lname1: registerUser.lname1,
      lname2: registerUser.lname2,
      miles: 0,
      mname: registerUser.mname,
      studentid: registerUser.studentid,
      university: registerUser.university,
      unumber: registerUser.unumber,
      upassword: registerUser.upassword,
    };

    return this.http.post<UserLogged>(
      this.url + 'api/user/new',
      body,
      this.httpOptions
    );
  }
}
