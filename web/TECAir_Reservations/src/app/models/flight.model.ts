export interface Flight {
  fnumber: number;
  Ffrom: number;
  Fto: number;
  Price: number;
  Fdate: string;
  Fstate: boolean;
  Pid: string;
}

export const flight = {
  fnumber: 0,
  Ffrom: 0,
  Fto: 0,
  Price: 0,
  Fdate: '',
  Fstate: false,
  Pid: '',
};
