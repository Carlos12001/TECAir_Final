export interface Stop {
  stopid: number;
  sfrom: number;
  sto: number;
  sdate: string;
  Departure_hour: string;
  Arrival_hour: string;
  fno: number;
}

export interface UserStop {
  uemail: string;
  sid: string;
}

export const stop = {
  stopid: 0,
  sfrom: 0,
  sto: 0,
  sdate: '',
  Departure_hour: '',
  Arrival_hour: '',
  fno: 0,
};
