export interface SearchStop {
  SfromAirportID: number;
  SfromCity: string;
  StoAirportID: number;
  StoCity: string;
}

export const searchStop = [
  {
    SfromAirportID: 1,
    SfromCity: 'San Jose',
    StoAirportID: 3,
    StoCity: 'Miami',
  },
  {
    SfromAirportID: 4,
    SfromCity: 'New York',
    StoAirportID: 6,
    StoCity: 'Ciudad de Mexico',
  },
];
