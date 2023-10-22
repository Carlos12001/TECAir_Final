import { Component, OnInit } from '@angular/core';
import {
  Seat,
  seatWithCapacityExample,
  SeatWithCapacity,
} from 'src/app/models/seat.model';

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
    this.createSeatStructure();
    this.seatWithCapacity = seatWithCapacityExample;
  }

  createSeatStructure() {
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
        const snumber = letters[i] + String(j).padStart(2, '0');
        const sclass = i < businessRows ? 'Ejecutiva' : 'Turista';

        this.seatStructure.push({
          snumber,
          sclass,
          pnumber: 0,
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
      console.log(seat);
    }
  }
}
