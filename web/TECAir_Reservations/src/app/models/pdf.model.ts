import { Injectable } from '@angular/core';

export class PDF {
  Email: string;
  Unumber: string;
  Fname: string;
  Mname: string;
  Lname1: string;
  Lname2: string;

  StopID: number;
  Sfrom: number;
  Sto: number;
  Sdate: string;
  Departure_hour: string;
  Arrival_hour: string;
  Fno: number;

  StudentID: string;
  University: string;
  Miles: number;
  Uemail: string;

  constructor(
    Email: string,
    Unumber: string,
    Fname: string,
    Mname: string,
    Lname1: string,
    Lname2: string,

    StopID: number,
    Sfrom: number,
    Sto: number,
    Sdate: string,
    Departure_hour: string,
    Arrival_hour: string,
    Fno: number,

    StudentID: string,
    University: string,
    Miles: number,
    Uemail: string
  ) {
    this.Email = Email;
    this.Unumber = Unumber;
    this.Fname = Fname;
    this.Mname = Mname;
    this.Lname1 = Lname1;
    this.Lname2 = Lname2;
    this.StopID = StopID;
    this.Sfrom = Sfrom;
    this.Sto = Sto;
    this.Sdate = Sdate;
    this.Departure_hour = Departure_hour;
    this.Arrival_hour = Arrival_hour;
    this.Fno = Fno;
    this.StudentID = StudentID;
    this.University = University;
    this.Miles = Miles;
    this.Uemail = Uemail;
  }
}

export const pdf = {
  Email: 'lnjknjnjknjk',
  Unumber: '123',
  Fname: 'felipe',
  Mname: 'marco',
  Lname1: 'vinicio',
  Lname2: 'patricio',
  StopID: 6,
  Sfrom: 5,
  Sto: 2,
  Sdate: '9/12/2023',
  Departure_hour: '14:05',
  Arrival_hour: '15:08',
  Fno: 25,
  StudentID: '211683',
  University: 'TEC',
  Miles: 25,
  Uemail: 'pepe@pepe',
};


@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  getPdfData(): PDF {
    return pdf; // Retornando la constante pdf que ya tienes definida
  }
}

