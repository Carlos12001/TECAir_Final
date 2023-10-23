/* The code is defining an interface called `CreatePassenger` in TypeScript. An interface is a way to define the structure of an object. In this case, the `CreatePassenger` interface has three properties: `email` of type `string`, `pnumber` of type `number`, and `departurehour` of type `string`. This interface can be used to define objects that have these properties. */
export interface CreatePassenger {
  email: string;
  pnumber: number;
  departurehour: string;
}

/* The code `export const createPassengerSelected: CreatePassenger = { email: '', pnumber: 0, departurehour: '', };` is creating a constant variable called `createPassengerSelected` of type `CreatePassenger`. It is initializing this variable with an object that has empty string values for the `email` and `departurehour` properties, and a numeric value of 0 for the `pnumber` property. This constant can be exported and used in other parts of the code. */
export const createPassengerSelected: CreatePassenger = {
  email: '',
  pnumber: 0,
  departurehour: '',
};
