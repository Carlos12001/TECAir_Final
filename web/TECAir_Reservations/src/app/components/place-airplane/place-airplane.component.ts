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
  takenSeats: string[] = [];
  seatWithCapacity: SeatWithCapacity = seatWithCapacityExample;

  ngOnInit() {
    console.log(
      'passengerCheckInSelected',
      JSON.stringify(passengerCheckInSelected)
    );
    this.getSeats(passengerCheckInSelected.pnumber);
  }

  constructor(
    private router: Router,
    private placeAirplaneService: PlaceAirplaneService
  ) {}

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

  isSeatTaken(snumber: string): boolean {
    return this.takenSeats.includes(snumber);
  }

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
