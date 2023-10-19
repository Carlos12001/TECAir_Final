export interface Flight {
  fnumber: number;
  ffrom: number;
  fto: number;
  price: number;
  fdate: string;
  fstate: boolean;
  pid: string;
}

export const flight = {
  fnumber: 0,
  ffrom: 0,
  fto: 0,
  price: 0,
  fdate: '',
  fstate: false,
  pid: '',
};
