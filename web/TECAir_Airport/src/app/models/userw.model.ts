/* The code is defining an interface named `UserW` in TypeScript. An interface is a way to define the structure of an object. In this case, the `UserW` interface has the following properties: */
export interface UserW {
  email: string;
  upassword: string;
  unumber?: string;
  fname?: string;
  mname?: string;
  lname1?: string;
  lname2?: string;
}

/* The code `export const userw: UserW = { email: '', upassword: '', };` is creating a constant variable named `userw` of type `UserW`. It is initializing the `userw` object with empty values for the `email` and `upassword` properties. The `export` keyword is used to make the `userw` variable accessible outside of the current module. */
export const userw: UserW = {
  email: '',
  upassword: '',
};
