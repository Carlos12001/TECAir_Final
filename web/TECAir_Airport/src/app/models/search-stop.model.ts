/* The `export interface SearchStop` is defining a TypeScript interface called `SearchStop`. */
export interface SearchStop {
  sfromairportid: number;
  sfromcity: string;
  stoairportid: number;
  stocity: string;
}

/* The code `export const searchStops: SearchStop[] = [...]` is declaring a constant variable called `searchStops` of type `SearchStop[]`, which is an array of objects that conform to the `SearchStop` interface. Each object in the array represents a stop in a flight search. Each object has four properties: `sfromairportid`, `sfromcity`, `stoairportid`, and `stocity`, which represent the airport ID and city name of the departure and arrival stops respectively. The array contains multiple objects representing different flight stops. */
export const searchStops: SearchStop[] = [
  {
    sfromairportid: 1,
    sfromcity: 'San Jose',
    stoairportid: 3,
    stocity: 'Miami',
  },
  {
    sfromairportid: 1,
    sfromcity: 'San Jose',
    stoairportid: 4,
    stocity: 'New York',
  },
  {
    sfromairportid: 4,
    sfromcity: 'New York',
    stoairportid: 6,
    stocity: 'Ciudad de Mexico',
  },
  {
    sfromairportid: 3,
    sfromcity: 'Miami',
    stoairportid: 6,
    stocity: 'Ciudad de Mexico',
  },
];

/* The code `export const searchStopSelected: SearchStop = { ... }` is declaring a constant variable called `searchStopSelected` of type `SearchStop`. It is initializing this variable with an object that has four properties: `sfromairportid`, `sfromcity`, `stoairportid`, and `stocity`. The values of these properties are set to 0 and an empty string respectively. */
export const searchStopSelected: SearchStop = {
  sfromairportid: 0,
  sfromcity: '',
  stoairportid: 0,
  stocity: '',
};
