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
