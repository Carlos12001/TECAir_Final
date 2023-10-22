/* The `export interface PassengerCheckIn` is defining a TypeScript interface called `PassengerCheckIn`. An interface in TypeScript is a way to define the structure of an object. In this case, the `PassengerCheckIn` interface has properties such as `pnumber`, `fnumber`, `stopid`, `sfromcity`, `stocity`, `fdate`, and `fprice`, each with their respective data types. */
export interface PassengerCheckIn {
  pnumber: number;
  fnumber: number;
  stopid: number;
  sfromcity: string;
  stocity: string;
  fdate: string;
  fprice: number;
}

/* The code `export const passengerCheckInSelected: PassengerCheckIn = { ... }` is creating a constant variable called `passengerCheckInSelected` of type `PassengerCheckIn`. It is initializing this variable with an object that has properties `pnumber`, `fnumber`, `stopid`, `sfromcity`, `stocity`, `fdate`, and `fprice`, each with their respective initial values. This object represents the selected passenger check-in information. */
export const passengerCheckInSelected: PassengerCheckIn = {
  pnumber: 0,
  fnumber: 0,
  stopid: 0,
  sfromcity: '',
  stocity: '',
  fdate: '',
  fprice: 0,
};
/* The code `export const passengerChecks: PassengerCheckIn[] = [...]` is creating a constant variable called `passengerChecks` of type `PassengerCheckIn[]`, which is an array of objects that conform to the `PassengerCheckIn` interface. Each object in the array represents a passenger check-in and contains properties such as `pnumber`, `fnumber`, `stopid`, `sfromcity`, `stocity`, `fdate`, and `fprice`, each with their respective values. This array represents a collection of passenger check-in information. */

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
