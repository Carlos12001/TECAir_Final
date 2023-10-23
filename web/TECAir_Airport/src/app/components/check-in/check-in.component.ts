import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  PassengerCheckIn,
  passengerCheckInSelected,
  passengerChecks,
} from 'src/app/models/passengers-check-in.model';
import { searchStopSelected } from 'src/app/models/search-stop.model';
import { seeFlightSelected } from 'src/app/models/see-flight.model';
import { UserLogged, userLogged } from 'src/app/models/user-logged.model';
import { CheckInService } from 'src/app/services/check-in.service';
import { pdf } from '../../models/pdf.model';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css'],
})
export class CheckInComponent {
  /* The line `passengerCheckIns: PassengerCheckIn[] = [];` is declaring a variable named `passengerCheckIns` of type `PassengerCheckIn[]` (an array of `PassengerCheckIn` objects) and initializing it with an empty array `[]`. This variable is used to store the list of passenger check-ins fetched from the server. */
  passengerCheckIns: PassengerCheckIn[] = [];

  /* The line `user: UserLogged = userLogged;` is initializing the `user` variable of type `UserLogged` with the value of `userLogged`. It is assigning the `userLogged` object to the `user` variable. */
  user: UserLogged = userLogged;

  /**
   * The constructor function takes in a router and check-in service as parameters.
   * @param {Router} router - The router parameter is an instance of the Router class, which is used for navigating between different routes in an Angular application. It provides methods for navigating to a specific route, navigating back, and other navigation-related functionality.
   * @param {CheckInService} checkInService - The `checkInService` parameter is an instance of the `CheckInService` class. It is used to interact with the check-in functionality of the application, such as retrieving check-in data, creating new check-ins, updating check-in status, etc.
   */
  constructor(private router: Router, private checkInService: CheckInService) {}

  /**
   * The ngOnInit function checks if the user's first name is empty and navigates to the sign-in page if it is, otherwise it fetches promotional data.
   */
  ngOnInit(): void {
    if (userLogged.fname == '') {
      this.router.navigate(['/display-sign-in']);
    }
    this.fetchPromo();
  }

  /**
   * The function fetchPromo() fetches passenger check-in data and assigns it to the passengerCheckIns variable, handling any errors and logging completion.
   */
  fetchPromo(): void {
    this.checkInService.getPassengerCheckIn(userLogged.email).subscribe({
      next: (data) => {
        this.passengerCheckIns = data;
      },
      error: (error) => {
        console.error('Error fetching passengers:', error);
        this.passengerCheckIns = passengerChecks;
      },
      complete: () => {
        console.log('Finished Flights passengers');
      },
    });
  }

  /**
   * The function "checkInFlight" is used to post selected check-in data for a passenger and handle the response.
   * @param {PassengerCheckIn} passenger - The parameter "passenger" is of type "PassengerCheckIn".
   */
  checkInFlight(passenger: PassengerCheckIn): void {
    this.checkInService.postSeletecdCheckIn(passenger).subscribe({
      next: (data) => {
        this.siguientePagina(passenger);
      },
      error: (error) => {
        console.error('Error fetching passengers:', error);
        this.siguientePagina(passenger);
      },
      complete: () => {
        console.log('Finished Flights passengers');
      },
    });
  }

  /**
   * The function "siguientePagina" reserves a flight for a passenger and navigates to the display seat page.
   * @param {PassengerCheckIn} passenger - The parameter "passenger" is of type "PassengerCheckIn".
   */
  siguientePagina(passenger: PassengerCheckIn): void {
    console.log('Reserving flight: ', passenger);
    passengerCheckInSelected.pnumber = passenger.pnumber;
    passengerCheckInSelected.fnumber = passenger.fnumber;
    passengerCheckInSelected.stopid = passenger.stopid;
    passengerCheckInSelected.sfromcity = passenger.sfromcity;
    passengerCheckInSelected.stocity = passenger.stocity;
    passengerCheckInSelected.fdate = passenger.fdate;
    passengerCheckInSelected.fprice = passenger.fprice;

    searchStopSelected.sfromcity = passenger.sfromcity;
    searchStopSelected.stocity = passenger.stocity;
    seeFlightSelected.fnumber = passenger.fnumber;
    seeFlightSelected.stopid = passenger.stopid;
    seeFlightSelected.sfromcity = passenger.sfromcity;
    seeFlightSelected.stocity = passenger.stocity;
    seeFlightSelected.fdate = passenger.fdate;
    seeFlightSelected.fprice = passenger.fprice;

    pdf.arrivalhour = passenger.fdate;
    pdf.departurehour = passenger.fdate;
    pdf.fno = passenger.fnumber;
    pdf.stopid = passenger.stopid;
    pdf.sfromcity = passenger.sfromcity;
    pdf.stocity = passenger.stocity;
    pdf.pno = passenger.pnumber;
    if (userLogged.studentid) {
      pdf.studentid = userLogged.studentid;
    }
    if (userLogged.university) {
      pdf.university = userLogged.university;
    }
    if (userLogged.miles) {
      pdf.miles = userLogged.miles;
    }
    pdf.uemail = userLogged.email;
    pdf.finalprice = passenger.fprice;
    pdf.email = userLogged.email;
    pdf.unumber = userLogged.unumber;
    pdf.fname = userLogged.fname;
    pdf.mname = userLogged.mname;
    pdf.lname1 = userLogged.lname1;
    pdf.lname2 = userLogged.lname2;

    this.router.navigate(['/display-seat']);
  }
}
