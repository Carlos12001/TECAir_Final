import { NumberSymbol } from '@angular/common';

/* The `export interface Seat` is defining the structure of a seat object. It has the following properties: */
export interface Seat {
  snumber: string;
  sclass: 'Ejecutivo' | 'Turista' | '';
  pemail?: string;
  pnumber: number;
}
/* The code is defining and exporting several variables and interfaces related to seats in a seating arrangement. */

export const seatsExample: Seat[] = [
  {
    snumber: 'A00',
    sclass: 'Ejecutivo',
    pemail: '',
    pnumber: 2,
  },
  {
    snumber: 'A01',
    sclass: 'Ejecutivo',
    pemail: '',
    pnumber: 4,
  },
  {
    snumber: 'B02',
    sclass: 'Ejecutivo',
    pemail: '',
    pnumber: 6,
  },
  {
    snumber: 'B01',
    sclass: 'Ejecutivo',
    pemail: '',
    pnumber: 8,
  },
];
/* The code is defining and exporting a constant variable `seatSelected` of type `Seat`. It represents a selected seat in a seating arrangement. The `seatSelected` object has the following properties: */

export const seatSelected: Seat = {
  snumber: 'Z00',
  sclass: 'Ejecutivo',
  pemail: 'pedrog@gmail.com',
  pnumber: 0,
};

/* The `export interface SeatWithCapacity` is defining the structure of an object that represents a seating arrangement with a capacity and an array of seats. It has two properties: */
export interface SeatWithCapacity {
  capacity: number;
  seats: Seat[];
}

/* The `export const seatWithCapacityExample` is defining a constant variable of type `SeatWithCapacity`. It represents a seating arrangement with a capacity of 40 and an array of seats. The `seats` property contains an array of `Seat` objects, each representing a seat in the arrangement. Each `Seat` object has properties such as `snumber` (seat number), `sclass` (seat class), `pemail` (passenger email), and `pnumber` (passenger number). */
export const seatWithCapacityExample: SeatWithCapacity = {
  capacity: 40,
  seats: [
    {
      snumber: 'A00',
      sclass: 'Ejecutivo',
      pemail: '',
      pnumber: 2,
    },
    {
      snumber: 'A01',
      sclass: 'Ejecutivo',
      pemail: '',
      pnumber: 4,
    },
    {
      snumber: 'B02',
      sclass: 'Ejecutivo',
      pemail: '',
      pnumber: 6,
    },
    {
      snumber: 'B01',
      sclass: 'Ejecutivo',
      pemail: '',
      pnumber: 8,
    },
  ],
};
