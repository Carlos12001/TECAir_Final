import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { passengerCheckInSelected } from 'src/app/models/passengers-check-in.model';
import { pdf } from 'src/app/models/pdf.model';
import {
  Seat,
  seatWithCapacityExample,
  SeatWithCapacity,
  seatSelected,
  seatsExample,
} from 'src/app/models/seat.model';
import { userLogged } from 'src/app/models/user-logged.model';
import { PlaceAirplaneService } from 'src/app/services/place-airplane.service';

@Component({
  selector: 'app-place-airplane',
  templateUrl: './place-airplane.component.html',
  styleUrls: ['./place-airplane.component.css'],
})
export class PlaceAirplaneComponent implements OnInit {
  seatStructure: Seat[] = [];
  /* The line `seatStructure: Seat[] = [];` is declaring a variable `seatStructure` of type `Seat[]` (an array of `Seat` objects) and initializing it as an empty array. This variable is used to store the structure of the seats in the airplane. */
  takenSeats: string[] = [];
  /* The line `takenSeats: string[] = [];` is declaring and initializing an empty array called `takenSeats` of type `string[]`. This array is used to store the seat numbers of seats that have already been taken by passengers. */
  seatWithCapacity: SeatWithCapacity = seatWithCapacityExample;

  /**
   * The ngOnInit function logs the passengerCheckInSelected object and calls the getSeats function with the passengerCheckInSelected.pnumber parameter.
   */
  ngOnInit() {
    console.log(
      'passengerCheckInSelected',
      JSON.stringify(passengerCheckInSelected)
    );
    this.getSeats(passengerCheckInSelected.pnumber);
  }

  /**
   * The constructor function initializes the router and placeAirplaneService dependencies.
   * @param {Router} router - The router parameter is an instance of the Router class, which is used for navigating between different routes in an Angular application. It allows you to programmatically navigate to different views or components.
   * @param {PlaceAirplaneService} placeAirplaneService - The `placeAirplaneService` parameter is an instance of the `PlaceAirplaneService` class. It is used to interact with the backend API and perform operations related to placing an airplane.
   */
  constructor(
    private router: Router,
    private placeAirplaneService: PlaceAirplaneService
  ) {}

  /**
   * The function `getSeats` retrieves seat information with a specified capacity and handles any errors that occur during the process.
   * @param {number} pnumber - The parameter "pnumber" is of type number and represents the number of seats to be fetched.
   */
  getSeats(pnumber: number) {
    this.placeAirplaneService.getSeatWithCapacity(pnumber).subscribe({
      next: (data: SeatWithCapacity) => {
        console.log('Seat get:', JSON.stringify(data));
        this.seatWithCapacity = data;
        this.createSeatStructure();
      },
      error: (error) => {
        console.error('Error fetching  seats:', error);
        this.seatWithCapacity = seatWithCapacityExample;
        this.createSeatStructure();
      },
      complete: () => {
        console.log('Finished seats fetched');
      },
    });
  }

  /**
   * The function creates a seat structure based on the capacity of a seat and assigns seat numbers and classes to each seat.
   * @returns The function does not return anything.
   */
  createSeatStructure() {
    if (!this.seatWithCapacity) {
      console.error('SeatWithCapacity is undefined');
      return;
    }
    const rows = this.seatWithCapacity.capacity / 4;
    const businessRows = Math.floor(this.seatWithCapacity.capacity / 8);
    const letters = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < 4; j++) {
        const snumber = letters[i] + j;
        const sclass = i < businessRows ? 'Ejecutivo' : 'Turista';

        this.seatStructure.push({
          snumber,
          sclass,
          pnumber: passengerCheckInSelected.pnumber,
        });
      }
    }

    this.takenSeats = this.seatWithCapacity.seats.map((s) => s.snumber);
  }

  /**
   * The function "isSeatTaken" checks if a seat number is included in the "takenSeats" array and returns a boolean value.
   * @param {string} snumber - The parameter `snumber` is a string that represents the seat number.
   * @returns a boolean value, either true or false.
   */
  isSeatTaken(snumber: string): boolean {
    return this.takenSeats.includes(snumber);
  }

  /**
   * The `onSeatClick` function is triggered when a seat is clicked, and it checks if the seat is available before making a request to reserve the seat and navigate to the display baggage page.
   * @param {Seat} seat - The `seat` parameter is an object that represents a seat in an airplane. It has the following properties:
   */
  onSeatClick(seat: Seat) {
    if (!this.isSeatTaken(seat.snumber)) {
      this.placeAirplaneService.postSeat(seat).subscribe({
        next: (data: Seat[]) => {
          console.log('Seat get:', JSON.stringify(data));
          seatSelected.pnumber = data[0].pnumber;
          seatSelected.snumber = data[0].snumber;
          seatSelected.sclass = data[0].sclass;
          seatSelected.pemail = userLogged.email;
          pdf.snumber = data[0].snumber;
          this.router.navigate(['/display-baggage']);
        },
        error: (error) => {
          pdf.snumber = seatSelected.snumber;
          this.router.navigate(['/display-baggage']);
          console.error('Error fetching  seats:', error);
        },
        complete: () => {
          console.log('Finished seats fetched');
        },
      });
    }
  }
}
