export interface Baggage {
  Bnumber: number;
  Weight: string;
  Pemail: string;
  BaggageColor: BaggageColor[];
}

export interface BaggageColor {
  Bno: number;
  Color: string;
}

export const baggage = {
  Bnumber: 0,
  Weight: '',
  Pemail: '',
  BaggageColor: [],
};
