/* The `export interface Flight` is defining a TypeScript interface called `Flight`. An interface in TypeScript is a way to define the structure of an object. In this case, the `Flight` interface has several properties: */
export interface Flight {
  fnumber: number;
  ffrom: number;
  fto: number;
  price: number;
  fdate: string;
  fstate: boolean;
  pid: string;
}

/* The `export const flight` is defining a constant variable called `flight` that is exported from the module. It is an object that represents a flight with various properties such as `fnumber`, `ffrom`, `fto`, `price`, `fdate`, `fstate`, and `pid`. The initial values of these properties are set to 0, an empty string, and false respectively. This object can be used as a template or default value for creating new flight objects. */
export const flight = {
  fnumber: 0,
  ffrom: 0,
  fto: 0,
  price: 0,
  fdate: '',
  fstate: false,
  pid: '',
};

/* The `export const exampleFlight: Flight[]` is defining a constant variable called `exampleFlight` that is exported from the module. It is an array of objects, where each object represents a flight. Each flight object has properties such as `fnumber`, `ffrom`, `fto`, `price`, `fdate`, `fstate`, and `pid`, which define the details of the flight. The array contains two example flight objects with different values for these properties. This `exampleFlight` array can be used as a sample or test data for working with flights in the code. */
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
