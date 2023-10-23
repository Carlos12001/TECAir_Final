/**
  fnumber: number; // ID de vuelo
  stopid: number; // ID de parada
  sfromcity: string; // city aeropuerto de salida
  stocity: string; // city aeropuerto de llegada
  stoimage: string; // imagen aeropuerto de llegada
  fdate: string; // fecha del vuelo
  fprice: number; // precio del vuelo
 */
/* The `export interface SeeFlight` is defining an interface in TypeScript. An interface is a way to define the structure of an object. In this case, the `SeeFlight` interface defines the structure of a flight object with the following properties: */
export interface SeeFlight {
  fnumber: number;
  stopid: number;
  sfromcity: string;
  stocity: string;
  stoimage: string;
  fdate: string;
  fprice: number;
  depercent?: number;
}

/* The `export const seeFlights` is an array of objects that represents a list of flights. Each object in the array represents a flight and contains properties such as `fnumber` (flight number), `stopid` (stop ID), `sfromcity` (departure city), `stocity` (arrival city), `stoimage` (image of the arrival airport), `fdate` (flight date), `fprice` (flight price), and `depercent` (departure percentage). */
export const seeFlights: SeeFlight[] = [
  {
    fnumber: 653,
    stopid: 224,
    sfromcity: 'San Jose',
    stocity: 'Miami',
    stoimage:
      'https://upload.wikimedia.org/wikipedia/commons/a/a1/Miami_International_Airport_%28KMIA-MIA%29_%288204606870%29.jpg',
    fdate: '2024-03-15',
    fprice: 299,
    depercent: 15,
  },
  {
    fnumber: 10,
    stopid: 19,
    sfromcity: 'New York',
    stocity: 'Ciudad de Mexico',
    stoimage:
      'https://upload.wikimedia.org/wikipedia/commons/4/40/AICM_AIR_T2.jpg',
    fdate: '2024-03-15',
    fprice: 599,
    depercent: 5,
  },
  {
    fnumber: 12,
    stopid: 432,
    sfromcity: 'San Jose',
    stocity: 'New York',
    stoimage:
      'https://upload.wikimedia.org/wikipedia/commons/b/b9/JFK_Aerial_Nov_14_2018.jpg',
    fdate: '2023-12-15',
    fprice: 899,
    depercent: 30,
  },
  {
    fnumber: 232,
    stopid: 765,
    sfromcity: 'Miami',
    stocity: 'Ciudad de Mexico',
    stoimage:
      'https://upload.wikimedia.org/wikipedia/commons/4/40/AICM_AIR_T2.jpg',
    fdate: '2024-01-02',
    fprice: 399,
    depercent: 10,
  },
];

/* The `export const seeFlightSelected` is a constant variable that represents a selected flight. It is of type `SeeFlight`, which is an interface defined earlier in the code. The object assigned to `seeFlightSelected` has properties such as `fnumber` (flight number), `stopid` (stop ID), `sfromcity` (departure city), `stocity` (arrival city), `stoimage` (image of the arrival airport), `fdate` (flight date), `fprice` (flight price), and `depercent` (departure percentage). */
export const seeFlightSelected: SeeFlight = {
  fnumber: 0,
  stopid: 0,
  sfromcity: 'sjo',
  stocity: '',
  stoimage: '',
  fdate: '',
  fprice: 399,
  depercent: 0,
};
