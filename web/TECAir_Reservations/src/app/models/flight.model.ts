export interface Flight {
  Fnumber: number;
  Ffrom: number;
  Fto: number;
  Price: number;
  Fdate: string;
  Fstate: boolean;
  Pid: string;
}

export const flight = {
  Fnumber: 0,
  Ffrom: 0,
  Fto: 0,
  Price: 0,
  Fdate: '',
  Fstate: false,
  Pid: '',
};
