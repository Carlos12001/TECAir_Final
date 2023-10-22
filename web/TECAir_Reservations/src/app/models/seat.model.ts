import { NumberSymbol } from '@angular/common';

export interface Seat {
  snumber: string;
  sclass: 'Ejecutiva' | 'Turista' | '';
  pemail?: string;
  pnumber: number;
}

export const seatsExample: Seat[] = [
  {
    snumber: 'A00',
    sclass: 'Ejecutiva',
    pemail: '',
    pnumber: 2,
  },
  {
    snumber: 'A01',
    sclass: 'Ejecutiva',
    pemail: '',
    pnumber: 4,
  },
  {
    snumber: 'B02',
    sclass: 'Ejecutiva',
    pemail: '',
    pnumber: 6,
  },
  {
    snumber: 'B01',
    sclass: 'Ejecutiva',
    pemail: '',
    pnumber: 8,
  },
];

export const seatSelected: Seat = {
  snumber: 'Z00',
  sclass: 'Ejecutiva',
  pemail: 'pedrog@gmail.com',
  pnumber: 0,
};

export interface SeatWithCapacity {
  capacity: number;
  seats: Seat[];
}

export const seatWithCapacityExample: SeatWithCapacity = {
  capacity: 40,
  seats: [
    {
      snumber: 'A00',
      sclass: 'Ejecutiva',
      pemail: '',
      pnumber: 2,
    },
    {
      snumber: 'A01',
      sclass: 'Ejecutiva',
      pemail: '',
      pnumber: 4,
    },
    {
      snumber: 'B02',
      sclass: 'Ejecutiva',
      pemail: '',
      pnumber: 6,
    },
    {
      snumber: 'B01',
      sclass: 'Ejecutiva',
      pemail: '',
      pnumber: 8,
    },
  ],
};
