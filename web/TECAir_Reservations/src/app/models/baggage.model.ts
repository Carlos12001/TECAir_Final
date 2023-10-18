export interface Baggage {
  Bnumber?: number;
  Weight: string;
  Pemail?: string;
  BaggageColor: Color[];
}

export enum Color {
  rojo = 'rojo',
  blanco = 'blanco',
  azul = 'azul',
  negro = 'negro',
  verde = 'verde',
  amarillo = 'amarillo',
  gris = 'gris',
  cafe = 'cafe',
}

export const baggages: Baggage[] = [
  {
    Weight: '10',
    BaggageColor: [Color.rojo, Color.verde],
  },
  {
    Weight: '20',
    BaggageColor: [Color.rojo, Color.verde],
  },
  {
    Weight: '30',
    BaggageColor: [Color.rojo, Color.amarillo, Color.verde],
  },
];
