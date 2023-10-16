export interface Airport {
  AirportID: number;
  Code: string;
  City: string;
  Aname: string;
  Image: string;
}

const airports: Airport[] = [
  {
    AirportID: 1,
    Code: 'SJO',
    City: 'San Jose',
    Aname: 'Aeropuerto Juan Santamaría',
    Image:
      'https://upload.wikimedia.org/wikipedia/commons/1/11/Aeropuerto_Juan_Santamaria_terminal_internacional.jpg',
  },
  {
    AirportID: 2,
    Code: 'KIN',
    City: 'Kingston',
    Aname: 'Aeropuerto Norman Manley',
    Image:
      'https://upload.wikimedia.org/wikipedia/commons/1/11/Norman_Manley_International_Airport.jpg',
  },
  {
    AirportID: 3,
    Code: 'MIA',
    City: 'Miami',
    Aname: 'Aeropuerto de Miami',
    Image:
      'https://upload.wikimedia.org/wikipedia/commons/a/a1/Miami_International_Airport_%28KMIA-MIA%29_%288204606870%29.jpg',
  },
  {
    AirportID: 4,
    Code: 'JFK',
    City: 'Nueva York',
    Aname: 'Aeropuerto John F. Kennedy',
    Image:
      'https://upload.wikimedia.org/wikipedia/commons/b/b9/JFK_Aerial_Nov_14_2018.jpg',
  },
  {
    AirportID: 5,
    Code: 'YYZ',
    City: 'Toronto',
    Aname: 'Aeropuerto Toronto Pearson',
    Image:
      'https://upload.wikimedia.org/wikipedia/commons/f/f5/YYZ_airphoto.jpg',
  },
  {
    AirportID: 6,
    Code: 'MEX',
    City: 'Ciudad de Mexico',
    Aname: 'Aeropuerto de la Ciudad de México',
    Image:
      'https://upload.wikimedia.org/wikipedia/commons/4/40/AICM_AIR_T2.jpg',
  },
  {
    AirportID: 7,
    Code: 'CUN',
    City: 'Cancun',
    Aname: 'Aeropuerto de Cancún',
    Image:
      'https://upload.wikimedia.org/wikipedia/commons/8/8b/CUNterminal3.jpg',
  },
];
