import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment';
import { UserLogged, userLogged } from '../models/user-logged.model';

@Injectable({
  providedIn: 'root',
})
export class ResgiterService {
  /* The line `private url: string = environment.apiUrl;` is declaring a private variable `url` of type string and initializing it with the value of `environment.apiUrl`. */
  private url: string = environment.apiUrl;

  /* The `httpOptions` object is used to set the headers for the HTTP request. In this case, it sets the `Content-Type` header to `application/json` and the `Authorization` header to `'my-auth-token'`. These headers provide information to the server about the type of data being sent (JSON) and can be used for authentication purposes. */
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
   * The function `postUserLogged` sends a POST request to create a new user with the provided user information.
   * @param {UserLogged} registerUser - The registerUser parameter is an object that contains the following properties:
   * @returns an Observable of type UserLogged.
   */
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
