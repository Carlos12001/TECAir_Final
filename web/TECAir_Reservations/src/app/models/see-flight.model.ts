/**
  fnumber: number; // ID de vuelo
  StopID: number; // ID de parada
  SfromCity: string; // city aeropuerto de salida
  StoCity: string; // city aeropuerto de llegada
  StoImage: string; // imagen aeropuerto de llegada
  Fdate: string; // fecha del vuelo
  Fprice: number; // precio del vuelo
 */
export interface SeeFlight {
  fnumber: number;
  StopID: number;
  SfromCity: string;
  StoCity: string;
  StoImage: string;
  Fdate: string;
  Fprice: number;
}

export const seeFlights: SeeFlight[] = [
  {
    fnumber: 653,
    StopID: 224,
    SfromCity: 'San Jose',
    StoCity: 'Miami',
    StoImage:
      'https://upload.wikimedia.org/wikipedia/commons/a/a1/Miami_International_Airport_%28KMIA-MIA%29_%288204606870%29.jpg',
    Fdate: '2024-03-15',
    Fprice: 299,
  },
  {
    fnumber: 10,
    StopID: 19,
    SfromCity: 'New York',
    StoCity: 'Ciudad de Mexico',
    StoImage:
      'https://upload.wikimedia.org/wikipedia/commons/4/40/AICM_AIR_T2.jpg',
    Fdate: '2024-03-15',
    Fprice: 599,
  },
  {
    fnumber: 12,
    StopID: 432,
    SfromCity: 'San Jose',
    StoCity: 'New York',
    StoImage:
      'https://upload.wikimedia.org/wikipedia/commons/b/b9/JFK_Aerial_Nov_14_2018.jpg',
    Fdate: '2023-12-15',
    Fprice: 899,
  },
  {
    fnumber: 232,
    StopID: 765,
    SfromCity: 'Miami',
    StoCity: 'Ciudad de Mexico',
    StoImage:
      'https://upload.wikimedia.org/wikipedia/commons/4/40/AICM_AIR_T2.jpg',
    Fdate: '2024-01-02',
    Fprice: 399,
  },
];
