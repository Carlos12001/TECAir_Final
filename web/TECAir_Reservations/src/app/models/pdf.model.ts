import { Injectable } from '@angular/core';

export class PDF {
  email: string;
  unumber: string;
  fname: string;
  mname: string;
  lname1: string;
  lname2: string;

  stopid: number;
  sfromcity: string;
  stocity: string; // deberia ser la cuidad ya que yo no le muestro el id de la aeropuerto sino el nombre del lugar
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
    sfromcity: string,
    stocity: string,
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
    this.sfromcity = sfromcity;
    this.stocity = stocity;
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
  email: '',
  unumber: '',
  fname: '',
  mname: '',
  lname1: '',
  lname2: '',
  stopid: 0,
  sfromcity: '',
  stocity: '',
  sdate: '',
  departurehour: '',
  arrivalhour: '',
  fno: 0,
  studentid: '',
  university: '',
  miles: 0,
  uemail: '',
};

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private pdfData: PDF = pdf;

  constructor() {}

  setPdfData(data: PDF) {
    this.pdfData = data;
  }

  getPdfData(): PDF {
    return this.pdfData;
  }
}
