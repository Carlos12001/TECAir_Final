import { Injectable } from '@angular/core';

/* The PDF class represents a PDF document with various properties related to a flight booking. */
export class PDF {
  /* The line `email: string;` is declaring a property named `email` of type `string` in the `PDF` class. This property will hold the email address associated with the flight booking. */
  email: string;
  /* The line `unumber: string;` is declaring a property named `unumber` of type `string` in the `PDF` class. This property will hold the unique number associated with the flight booking. */
  unumber: string;
  /* The line `fname: string;` is declaring a property named `fname` of type `string` in the `PDF` class. This property will hold the first name associated with the flight booking. */
  fname: string;
  /* The line `mname: string;` is declaring a property named `mname` of type `string` in the `PDF` class. This property will hold the middle name associated with the flight booking. */
  mname: string;
  /* The line `lname1: string;` is declaring a property named `lname1` of type `string` in the `PDF` class. This property will hold the last name (part 1) associated with the flight booking. */
  lname1: string;
  /* The line `lname2: string;` is declaring a property named `lname2` of type `string` in the `PDF` class. This property will hold the last name (part 2) associated with the flight booking. */
  lname2: string;

  /* The line `stopid: number;` is declaring a property named `stopid` of type `number` in the `PDF` class. This property will hold the stop ID associated with the flight booking. */
  stopid: number;
  /* The line `sfromcity: string;` is declaring a property named `sfromcity` of type `string` in the `PDF` class. This property will hold the name of the city from which the flight is departing. */
  sfromcity: string;
  /* The line `stocity: string;` is declaring a property named `stocity` of type `string` in the `PDF` class. This property will hold the name of the city to which the flight is arriving. */
  stocity: string;
  /* The line `sdate: string;` is declaring a property named `sdate` of type `string` in the `PDF` class. This property will hold the date associated with the flight booking. */
  sdate: string;
  /* The line `departurehour: string;` is declaring a property named `departurehour` of type `string` in the `PDF` class. This property will hold the departure hour associated with the flight booking. */
  departurehour: string;
  /* The line `arrivalhour: string;` is declaring a property named `arrivalhour` of type `string` in the `PDF` class. This property will hold the arrival hour associated with the flight booking. */
  arrivalhour: string;
  /* The line `fno: number;` is declaring a property named `fno` of type `number` in the `PDF` class. This property will hold the flight number associated with the flight booking. */
  fno: number;

  /* The line `studentid: string;` is declaring a property named `studentid` of type `string` in the `PDF` class. This property will hold the student ID associated with the flight booking. */
  studentid: string;
  /* The line `university: string;` is declaring a property named `university` of type `string` in the `PDF` class. This property will hold the name of the university associated with the flight booking. */
  university: string;
  /* The line `miles: number;` is declaring a property named `miles` of type `number` in the `PDF` class. This property will hold the number of miles associated with the flight booking. */
  miles: number;
  /* The line `uemail: string;` is declaring a property named `uemail` of type `string` in the `PDF` class. This property will hold the email address associated with the flight booking. */
  uemail: string;
  /* The line `finalprice: number;` is declaring a property named `finalprice` of type `number` in the `PDF` class. This property will hold the final price associated with the flight booking. */
  finalprice: number;

  /* The line `pno?: number = 0;` is declaring a property named `pno` of type `number` in the `PDF` class. The `?` symbol indicates that this property is optional, meaning it may or may not be present in an instance of the `PDF` class. The `= 0` part assigns a default value of `0` to the `pno` property if it is not explicitly set. */
  pno?: number = 0;
  /* The line `baggages?: number[] = [];` is declaring a property named `baggages` of type `number[]` (an array of numbers) in the `PDF` class. The `?` symbol indicates that this property is optional, meaning it may or may not be present in an instance of the `PDF` class. The `= []` part assigns an empty array as the default value for the `baggages` property if it is not explicitly set. */
  baggages?: number[] = [];

  /* The line `snumber: string;` is declaring a property named `snumber` of type `string` in the `PDF` class. This property will hold a string value associated with the flight booking. The purpose or usage of this property is not clear from the provided code snippet. */
  snumber: string;
  /* The line `baggageprice: number;` is declaring a property named `baggageprice` of type `number` in the `PDF` class. This property will hold the price associated with the baggage for the flight booking. It is used to store the cost of the baggage selected by the passenger. */
  baggageprice: number;

  /**
   * The constructor function initializes the properties of an object with the provided values.
   * @param {string} email - The email parameter is a string that represents the email address of the user.
   * @param {string} unumber - The parameter `unumber` represents the user's phone number.
   * @param {string} fname - First name of the user
   * @param {string} mname - The parameter "mname" represents the middle name of the person.
   * @param {string} lname1 - The parameter "lname1" represents the first part of the last name of the person.
   * @param {string} lname2 - The parameter "lname2" represents the second part of the last name of the person.
   * @param {number} stopid - The stopid parameter is the unique identifier for the stop.
   * @param {string} sfromcity - The starting city of the journey.
   * @param {string} stocity - The `stocity` parameter represents the city where the passenger will be stopping during their journey.
   * @param {string} sdate - The date of the trip.
   * @param {string} departurehour - The departure hour of the flight.
   * @param {string} arrivalhour - The arrival hour of the flight.
   * @param {number} fno - flight number
   * @param {string} studentid - The student ID is a unique identifier assigned to a student. It is typically used to track and identify students within an educational institution.
   * @param {string} university - The university parameter represents the name of the university that the student is attending.
   * @param {number} miles - The "miles" parameter represents the number of miles traveled for a particular journey.
   * @param {string} uemail - The email address of the user.
   * @param {number} finalprice - The final price of the booking.
   */
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

/* The `export const pdf` is a constant object that serves as a default template or initial values for the `PDF` class. It provides default values for all the properties of the `PDF` class, such as `email`, `unumber`, `fname`, etc. These default values can be used when creating a new instance of the `PDF` class or when initializing the `pdfData` property in the `PdfService` class. */
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
/* The PdfService class is responsible for handling PDF-related operations. */
export class PdfService {
  /* The line `private pdfData: PDF = pdf;` is declaring a private property named `pdfData` of type `PDF` in the `PdfService` class. It is initializing this property with the value of the `pdf` constant object. */
  private pdfData: PDF = pdf;

  /**
   * The constructor function is used to initialize an object when it is created.
   */
  constructor() {}

  /**
   * The function "setPdfData" sets the PDF data for a given object.
   * @param {PDF} data - The data parameter is of type PDF, which is likely a custom class or interface representing a PDF document. It is used to pass the PDF data to the setPdfData method.
   */
  setPdfData(data: PDF) {
    this.pdfData = data;
  }

  /**
   * The function `getPdfData` returns the PDF data.
   * @returns the PDF data.
   */
  getPdfData(): PDF {
    return this.pdfData;
  }
}
