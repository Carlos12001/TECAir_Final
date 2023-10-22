export interface PassengerCheckIn {
  pnumber: number;
  fnumber: number;
  stopid: number;
  sfromcity: string;
  stocity: string;
  fdate: string;
  fprice: number;
}

export const passengerCheckInSelected: PassengerCheckIn = {
  pnumber: 0,
  fnumber: 0,
  stopid: 0,
  sfromcity: '',
  stocity: '',
  fdate: '',
  fprice: 0,
};

export const passengerChecks: PassengerCheckIn[] = [
  {
    pnumber: 1,
    fnumber: 1,
    stopid: 1,
    sfromcity: 'San Jose',
    stocity: 'Cuidad de Mexico',
    fdate: '2024-09-09',
    fprice: 100,
  },
  {
    pnumber: 2,
    fnumber: 2,
    stopid: 2,
    sfromcity: 'New York',
    stocity: 'Miami',
    fdate: '2024-11-09',
    fprice: 200,
  },
];
