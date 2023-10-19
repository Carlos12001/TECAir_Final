export interface SearchStop {
  SfromAirportID: number;
  SfromCity: string;
  StoAirportID: number;
  StoCity: string;
}

export const searchStops: SearchStop[] = [
  {
    SfromAirportID: 1,
    SfromCity: 'San Jose',
    StoAirportID: 3,
    StoCity: 'Miami',
  },
  {
    SfromAirportID: 1,
    SfromCity: 'San Jose',
    StoAirportID: 4,
    StoCity: 'New York',
  },
  {
    SfromAirportID: 4,
    SfromCity: 'New York',
    StoAirportID: 6,
    StoCity: 'Ciudad de Mexico',
  },
  {
    SfromAirportID: 3,
    SfromCity: 'Miami',
    StoAirportID: 6,
    StoCity: 'Ciudad de Mexico',
  },
];
