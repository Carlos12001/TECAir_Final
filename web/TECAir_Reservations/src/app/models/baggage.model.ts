/* The `export interface Baggage` is defining an interface called `Baggage`. An interface in TypeScript is a way to define the structure of an object. In this case, the `Baggage` interface has several properties: */
export interface Baggage {
  bnumber?: number;
  weight: string;
  pemail?: string;
  baggagecolor: Color[];
}

/* The `export enum Color` is defining an enumeration (enum) called `Color`. An enum is a way to define a set of named constants. In this case, the `Color` enum has several constant values: `rojo`, `blanco`, `azul`, `negro`, `verde`, `amarillo`, `gris`, and `cafe`. Each constant value is assigned a string value that represents a color. */
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

/* The code `export const baggages: Baggage[] = [...]` is creating an array called `baggages` of type `Baggage[]`. Each element in the array is an object that represents a baggage. Each baggage object has properties `weight` and `baggagecolor`. The `weight` property is of type `string` and represents the weight of the baggage. The `baggagecolor` property is an array of `Color` enum values, representing the colors of the baggage. */
export const baggages: Baggage[] = [
  {
    weight: '10',
    baggagecolor: [Color.rojo, Color.verde],
  },
  {
    weight: '20',
    baggagecolor: [Color.rojo, Color.verde],
  },
  {
    weight: '30',
    baggagecolor: [Color.rojo, Color.amarillo, Color.verde],
  },
];

/* The `export const baggagesIDSelected: number[] = [99, 100, 101];` line of code is creating a constant variable called `baggagesIDSelected` of type `number[]` (an array of numbers). The array contains the values `[99, 100, 101]`, which represent the IDs of selected baggages. This variable can be exported and used in other parts of the code. */
export const baggagesIDSelected: number[] = [99, 100, 101];

/* The `export interface CreateBaggage` is defining an interface called `CreateBaggage`. This interface has two properties: */
export interface CreateBaggage {
  pnumber: number;
  baggages: Baggage[];
}

/* The code `export const createBaggageExample: CreateBaggage = { pnumber: 0, baggages: baggages };` is creating a constant variable called `createBaggageExample` of type `CreateBaggage`. */
export const createBaggageExample: CreateBaggage = {
  pnumber: 0,
  baggages: baggages,
};

/* The `export interface SimpleBaggage` is defining an interface called `SimpleBaggage`. This interface has a single property `bnumber` of type `number`. This interface can be used to define the structure of an object that represents a simple baggage, which only includes the baggage number. The `export` keyword allows this interface to be accessed and used in other parts of the code. */
export interface SimpleBaggage {
  bnumber: number;
}
