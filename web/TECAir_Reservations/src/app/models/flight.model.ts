export interface Flight {
  fnumber: number;
  ffrom: number;
  fto: number;
  price: number;
  fdate: string;
  fstate: boolean;
  pid: string;
}

export const flight = {
  fnumber: 0,
  ffrom: 0,
  fto: 0,
  price: 0,
  fdate: '',
  fstate: false,
  pid: '',
};

export const exampleFlight: Flight[] = [
  {
    fnumber: 23,
    ffrom: 1,
    fto: 3,
    price: 2399,
    fdate: '2022-02-02',
    fstate: false,
    pid: 'plane1',
  },
  {
    fnumber: 234,
    ffrom: 2,
    fto: 3,
    price: 2399,
    fdate: '2022-06-02',
    fstate: false,
    pid: 'plane2',
  },
];
