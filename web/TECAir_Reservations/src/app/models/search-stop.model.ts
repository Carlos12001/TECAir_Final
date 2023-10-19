export interface SearchStop {
  SfromAirportID: number;
  sfromcity: string;
  StoAirportID: number;
  stocity: string;
}

export const searchStops: SearchStop[] = [
  {
    SfromAirportID: 1,
    sfromcity: 'San Jose',
    StoAirportID: 3,
    stocity: 'Miami',
  },
  {
    SfromAirportID: 1,
    sfromcity: 'San Jose',
    StoAirportID: 4,
    stocity: 'New York',
  },
  {
    SfromAirportID: 4,
    sfromcity: 'New York',
    StoAirportID: 6,
    stocity: 'Ciudad de Mexico',
  },
  {
    SfromAirportID: 3,
    sfromcity: 'Miami',
    StoAirportID: 6,
    stocity: 'Ciudad de Mexico',
  },
];
