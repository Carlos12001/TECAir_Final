export interface Stop {
  stopid: number;
  sfrom: number;
  sto: number;
  sdate: string;
  departurehour: string;
  arrivalhour: string;
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
  departurehour: '',
  arrivalhour: '',
  fno: 0,
};
