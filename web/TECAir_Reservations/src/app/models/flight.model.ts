export interface Flight {
  fnumber: number;
  Ffrom: number;
  Fto: number;
  Price: number;
  fdate: string;
  Fstate: boolean;
  Pid: string;
}

export const flight = {
  fnumber: 0,
  Ffrom: 0,
  Fto: 0,
  Price: 0,
  fdate: '',
  Fstate: false,
  Pid: '',
};
