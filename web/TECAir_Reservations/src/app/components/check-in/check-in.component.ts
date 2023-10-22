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
  passengerCheckIns: PassengerCheckIn[] = [];

  user: UserLogged = userLogged;
  constructor(private router: Router, private checkInService: CheckInService) {}

  ngOnInit(): void {
    if (userLogged.fname == '') {
      this.router.navigate(['/display-sign-in']);
    }
    this.fetchPromo();
  }

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

  siguientePagina(passenger: PassengerCheckIn): void {
    console.log('Reserving flight: ', passenger);
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
