export interface SearchStop {
  sfromAirportid: number;
  sfromcity: string;
  stoairportid: number;
  stocity: string;
}

export const searchStops: SearchStop[] = [
  {
    sfromAirportid: 1,
    sfromcity: 'San Jose',
    stoairportid: 3,
    stocity: 'Miami',
  },
  {
    sfromAirportid: 1,
    sfromcity: 'San Jose',
    stoairportid: 4,
    stocity: 'New York',
  },
  {
    sfromAirportid: 4,
    sfromcity: 'New York',
    stoairportid: 6,
    stocity: 'Ciudad de Mexico',
  },
  {
    sfromAirportid: 3,
    sfromcity: 'Miami',
    stoairportid: 6,
    stocity: 'Ciudad de Mexico',
  },
];
