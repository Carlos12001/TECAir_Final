export interface Stop {
  StopID: number;
  Sfrom: number;
  Sto: number;
  Sdate: string;
  Departure_hour: string;
  Arrival_hour: string;
  Fno: number;
}

export interface UserStop {
  uemail: string;
  Sid: string;
}

export const stop = {
  StopID: 0,
  Sfrom: 0,
  Sto: 0,
  Sdate: '',
  Departure_hour: '',
  Arrival_hour: '',
  Fno: 0,
};
