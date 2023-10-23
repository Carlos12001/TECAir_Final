/* The `export interface Airport` is defining the structure or shape of an object that represents an airport. It specifies the properties that an airport object should have, including `airportid`, `code`, `city`, `aname`, and `image`. Each property has a specific type, such as `number` for `airportid`, `string` for `code`, `city`, `aname`, and `image`. This interface can be exported and used in other parts of the code to ensure consistency and type safety when working with airport objects. */
export interface Airport {
  airportid: number;
  code: string;
  city: string;
  aname: string;
  image: string;
}

/* The `const airports` is an array of objects that represent different airports. Each object in the array has properties such as `airportid`, `code`, `city`, `aname`, and `image`, which provide information about the airport. The array contains information for multiple airports, including their unique identifiers, airport codes, city names, airport names, and image URLs. This array can be used to store and access airport data in the code. */
const airports: Airport[] = [
  {
    airportid: 1,
    code: 'SJO',
    city: 'San Jose',
    aname: 'Aeropuerto Juan Santamaría',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/1/11/Aeropuerto_Juan_Santamaria_terminal_internacional.jpg',
  },
  {
    airportid: 2,
    code: 'KIN',
    city: 'Kingston',
    aname: 'Aeropuerto Norman Manley',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/1/11/Norman_Manley_International_Airport.jpg',
  },
  {
    airportid: 3,
    code: 'MIA',
    city: 'Miami',
    aname: 'Aeropuerto de Miami',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/a/a1/Miami_International_Airport_%28KMIA-MIA%29_%288204606870%29.jpg',
  },
  {
    airportid: 4,
    code: 'JFK',
    city: 'Nueva York',
    aname: 'Aeropuerto John F. Kennedy',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/b/b9/JFK_Aerial_Nov_14_2018.jpg',
  },
  {
    airportid: 5,
    code: 'YYZ',
    city: 'Toronto',
    aname: 'Aeropuerto Toronto Pearson',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/f/f5/YYZ_airphoto.jpg',
  },
  {
    airportid: 6,
    code: 'MEX',
    city: 'Ciudad de Mexico',
    aname: 'Aeropuerto de la Ciudad de México',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/4/40/AICM_AIR_T2.jpg',
  },
  {
    airportid: 7,
    code: 'CUN',
    city: 'Cancun',
    aname: 'Aeropuerto de Cancún',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/8/8b/CUNterminal3.jpg',
  },
];
