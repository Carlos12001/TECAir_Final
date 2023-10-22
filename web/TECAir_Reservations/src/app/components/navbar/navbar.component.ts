import { Component, OnInit } from '@angular/core';
import { UserLogged, userLogged } from 'src/app/models/user-logged.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
/* The NavbarComponent class is used for initializing and managing the navigation bar component. */
export class NavbarComponent implements OnInit {
  /* The line `userLogged: UserLogged = userLogged;` is declaring a variable `userLogged` of type `UserLogged` and initializing it with the value of `userLogged`. */
  userLogged: UserLogged = userLogged;
  /**
   * The ngOnInit function assigns the value of userLogged to the variable this.userLogged.
   */
  ngOnInit(): void {
    this.userLogged = userLogged;
  }
}
