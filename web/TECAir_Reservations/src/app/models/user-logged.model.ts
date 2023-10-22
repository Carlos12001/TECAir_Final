/* The code is defining an interface called `UserLogged`. An interface in TypeScript is a way to define the shape or structure of an object. */
export interface UserLogged {
  email: string;
  upassword: string;
  unumber: string;
  fname: string;
  mname: string;
  lname1: string;
  lname2: string;
  studentid: string | null;
  miles: number | null;
  university: string | null;
  adminid: string | null;
}

export const userLogged: UserLogged = {
/* The code is initializing an object called `userLogged` with default values for each property defined in the `UserLogged` interface. Each property is assigned an empty string (`''`) or a default value (`0` for `miles`). The properties `studentid`, `miles`, `university`, and `adminid` are assigned `null` as their initial values. */
  email: '',
  upassword: '',
  unumber: '',
  fname: '',
  mname: '',
  lname1: '',
  lname2: '',
  studentid: '',
  miles: 0,
  university: '',
  adminid: '',
};
