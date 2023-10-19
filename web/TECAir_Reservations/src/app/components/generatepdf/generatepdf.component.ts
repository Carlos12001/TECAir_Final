import { Component, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PDF, PdfService } from '../../models/pdf.model';

@Component({
  selector: 'app-generatepdf',
  templateUrl: './generatepdf.component.html',
  styleUrls: ['./generatepdf.component.css'],
})
export class GeneratepdfComponent implements OnInit {
  pdfData!: PDF;

  constructor(private pdfService: PdfService) {
    (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
    this.pdfData = this.pdfService.getPdfData();
  }

  ngOnInit(): void {
    this.pdfData = this.pdfService.getPdfData();
    console.log(this.pdfData); // Verificar los datos obtenidos
  }

  generatePdf() {
    const simpleDocument = {
      content: [
        { text: 'Detalles del PDF', bold: true },
        { text: `Email: ${this.pdfData.Email}` },
        { text: `Unumber: ${this.pdfData.Unumber}` },
        { text: `Fname: ${this.pdfData.Fname}` },
        { text: `Mname: ${this.pdfData.Mname}` },
        { text: `Lname1: ${this.pdfData.Lname1}` },
        { text: `Lname2: ${this.pdfData.Lname2}` },
        { text: `StopID: ${this.pdfData.StopID}` },
        { text: `Sfrom: ${this.pdfData.Sfrom}` },
        { text: `Sto: ${this.pdfData.Sto}` },
        { text: `Sdate: ${this.pdfData.Sdate}` },
        { text: `Departure_hour: ${this.pdfData.Departure_hour}` },
        { text: `Arrival_hour: ${this.pdfData.Arrival_hour}` },
        { text: `Fno: ${this.pdfData.Fno}` },
        { text: `StudentID: ${this.pdfData.StudentID}` },
        { text: `University: ${this.pdfData.University}` },
        { text: `Miles: ${this.pdfData.Miles}` },
        { text: `uemail: ${this.pdfData.uemail}` },
      ],
    };

    pdfMake.createPdf(simpleDocument).open();
  }
}
