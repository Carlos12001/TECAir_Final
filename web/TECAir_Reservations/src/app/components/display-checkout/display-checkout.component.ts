import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { seeFlightSelected } from 'src/app/models/see-flight.model';
import { userLogged } from 'src/app/models/user-logged.model';

@Component({
  selector: 'app-display-checkout',
  templateUrl: './display-checkout.component.html',
  styleUrls: ['./display-checkout.component.css'],
})
export class DisplayCheckoutComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (userLogged.fname == '') {
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
