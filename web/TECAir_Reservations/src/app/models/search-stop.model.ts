export interface SearchStop {
  sfromairportid: number;
  sfromcity: string;
  stoairportid: number;
  stocity: string;
}

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
