import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { seeFlightSelected } from 'src/app/models/see-flight.model';
import { userLogged } from 'src/app/models/user-logged.model';

@Component({
  selector: 'app-display-checkout',
  templateUrl: './display-checkout.component.html',
  styleUrls: ['./display-checkout.component.css'],
})
/* The DisplayCheckoutComponent class is used to display the checkout information. */
export class DisplayCheckoutComponent implements OnInit {
  constructor(private router: Router) {}

  /**
   * The constructor function takes a private router parameter of type Router.
   * @param {Router} router - The "router" parameter is an instance of the Router class. It is used for navigating between different routes in an Angular application.
   */
  ngOnInit(): void {
    if (userLogged.fname == '') {
      window.alert('Debe iniciar sesión');
      this.router.navigate(['/display-sign-in']);
    } else if (
      seeFlightSelected.fnumber == 0 ||
      seeFlightSelected.stopid == 0 ||
      seeFlightSelected.sfromcity == '' ||
      seeFlightSelected.stocity == ''
    ) {
      this.router.navigate(['/display-flies']);
    } else {
      console.log('Ingreso');
    }
  }
}
