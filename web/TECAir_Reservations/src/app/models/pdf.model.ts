import { Injectable } from '@angular/core';

export class PDF {
  email: string;
  unumber: string;
  fname: string;
  mname: string;
  lname1: string;
  lname2: string;

  stopid: number;
  sfrom: number;
  sto: number;
  sdate: string;
  departurehour: string;
  arrivalhour: string;
  fno: number;

  studentid: string;
  university: string;
  miles: number;
  uemail: string;

  constructor(
    email: string,
    unumber: string,
    fname: string,
    mname: string,
    lname1: string,
    lname2: string,

    stopid: number,
    sfrom: number,
    sto: number,
    sdate: string,
    departurehour: string,
    arrivalhour: string,
    fno: number,

    studentid: string,
    university: string,
    miles: number,
    uemail: string
  ) {
    this.email = email;
    this.unumber = unumber;
    this.fname = fname;
    this.mname = mname;
    this.lname1 = lname1;
    this.lname2 = lname2;
    this.stopid = stopid;
    this.sfrom = sfrom;
    this.sto = sto;
    this.sdate = sdate;
    this.departurehour = departurehour;
    this.arrivalhour = arrivalhour;
    this.fno = fno;
    this.studentid = studentid;
    this.university = university;
    this.miles = miles;
    this.uemail = uemail;
  }
}

export const pdf = {
  email: 'felipevaras@tecair',
  unumber: '123',
  fname: 'felipe',
  mname: 'marco',
  lname1: 'vinicio',
  lname2: 'patricio',
  stopid: 6,
  sfrom: 5,
  sto: 2,
  sdate: '9/12/2023',
  departurehour: '14:05',
  arrivalhour: '15:08',
  fno: 25,
  studentid: '211683',
  university: 'TEC',
  miles: 25,
  uemail: 'pepe@pepe',
};

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  getPdfData(): PDF {
    return pdf; // Retornando la constante pdf que ya tienes definida
  }
}
