/* The code is defining an interface named `Flie`. This interface specifies the structure of an object that represents a flight. It has the following properties: */

export interface Flie {
  fnumber: number;
  ffrom: number;
  fto: number;
  price: number;
  fdate: string;
  fstate: boolean;
  pid: string;
}

/* The code is defining a constant variable named `flie` which represents a flight object. It initializes the properties of the flight object with default values. The `fnumber`, `ffrom`, `fto`, `price`, and `pid` properties are initialized with numeric values of 0. The `fdate` property is initialized with an empty string, and the `fstate` property is initialized with a boolean value of false. */
export const flie = {
  fnumber: 0,
  ffrom: 0,
  fto: 0,
  price: 0,
  fdate: '',
  fstate: false,
  pid: '',
};

/* The code is defining a constant variable named `exampleFlight` which is an array of objects that represent flights. Each object in the array follows the structure defined by the `Flie` interface. */
export const exampleFlight: Flie[] = [
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
