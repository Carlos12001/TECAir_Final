/* The `export interface Stop` is defining a TypeScript interface named `Stop`. An interface in TypeScript is a way to define the structure of an object. In this case, the `Stop` interface has several properties such as `stopid`, `sfrom`, `sto`, `sdate`, `departurehour`, `arrivalhour`, and `fno`, each with their respective data types. This interface can be used to define objects that have these properties and their corresponding data types. The `export` keyword makes the interface accessible outside of the module it is defined in, allowing other modules to import and use it. */
export interface Stop {
  stopid: number;
  sfrom: string;
  sto: string;
  sdate: string;
  departurehour: string;
  arrivalhour: string;
  fno: number;
}

/* The `export interface UserStop` is defining another TypeScript interface named `UserStop`. This interface has two properties: `uemail` and `sid`, both of which have the data type `string`. This interface can be used to define objects that have these properties and their corresponding data types. The `export` keyword makes the interface accessible outside of the module it is defined in, allowing other modules to import and use it. */
export interface UserStop {
  uemail: string;
  sid: string;
}

/* The `export const stop` is defining a constant named `stop` that is an object. This object has properties such as `stopid`, `sfrom`, `sto`, `sdate`, `departurehour`, `arrivalhour`, and `fno`, each with their respective initial values. This constant can be exported and used in other modules. */
export const stop = {
  stopid: 0,
  sfrom: 0,
  sto: 0,
  sdate: '',
  departurehour: '',
  arrivalhour: '',
  fno: 0,
};
