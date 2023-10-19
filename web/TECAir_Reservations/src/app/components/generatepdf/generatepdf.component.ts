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
        { text: `email: ${this.pdfData.email}` },
        { text: `unumber: ${this.pdfData.unumber}` },
        { text: `fname: ${this.pdfData.fname}` },
        { text: `mname: ${this.pdfData.mname}` },
        { text: `lname1: ${this.pdfData.lname1}` },
        { text: `lname2: ${this.pdfData.lname2}` },
        { text: `stopid: ${this.pdfData.stopid}` },
        { text: `sfrom: ${this.pdfData.sfrom}` },
        { text: `sto: ${this.pdfData.sto}` },
        { text: `sdate: ${this.pdfData.sdate}` },
        { text: `departurehour: ${this.pdfData.departurehour}` },
        { text: `arrivalhour: ${this.pdfData.arrivalhour}` },
        { text: `fno: ${this.pdfData.fno}` },
        { text: `studentid: ${this.pdfData.studentid}` },
        { text: `university: ${this.pdfData.university}` },
        { text: `miles: ${this.pdfData.miles}` },
        { text: `uemail: ${this.pdfData.uemail}` },
      ],
    };

    pdfMake.createPdf(simpleDocument).open();
  }
}
