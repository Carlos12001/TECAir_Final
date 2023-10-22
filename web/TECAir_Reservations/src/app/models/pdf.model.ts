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
  stocity: string;
  sdate: string;
  departurehour: string;
  arrivalhour: string;
  fno: number;

  studentid: string;
  university: string;
  miles: number;
  uemail: string;
  finalprice: number;

  pno?: number = 0;
  baggages?: number[] = [];

  snumber: string;
  baggageprice: number;

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
    uemail: string,
    finalprice: number
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
    this.finalprice = finalprice;
    this.baggageprice = 0;
    this.snumber = '';
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
  finalprice: 0,
  pno: 0,
  baggages: [0, 2, 3, 4, 5, 6],
  snumber: '',
  baggageprice: 0,
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
