import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userLogged } from 'src/app/models/user-logged.model';

@Component({
  selector: 'app-display-flies',
  templateUrl: './display-flies.component.html',
  styleUrls: ['./display-flies.component.css'],
})
/* The DisplayFliesComponent class is used to display a list of flies. */
export class DisplayFliesComponent implements OnInit {
  /**
   * The ngOnInit function checks if the user's first name is empty and navigates to the sign-in page if it is, otherwise it logs "Ingreso".
   */
  constructor(private router: Router) {}
  /**
   * The constructor function takes a private router parameter of type Router.
   * @param {Router} router - The "router" parameter is an instance of the Router class. It is used for navigating between different routes in an Angular application.
   */
  ngOnInit(): void {
    if (userLogged.fname == '') {
      this.router.navigate(['/display-sign-in']);
    } else {
      console.log('Ingreso');
    }
  }
}
