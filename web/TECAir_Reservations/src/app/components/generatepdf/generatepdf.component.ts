import { Component, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PDF, PdfService } from '../../models/pdf.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generatepdf',
  templateUrl: './generatepdf.component.html',
  styleUrls: ['./generatepdf.component.css'],
})
export class GeneratepdfComponent implements OnInit {
  /* The line `pdfData?: PDF;` is declaring a property named `pdfData` with a type of `PDF`. The `?` symbol after the type indicates that the property can be `undefined`. This means that the `pdfData` property may or may not have a value assigned to it. */
  pdfData?: PDF; // Usamos ? para indicar que puede ser undefined.
  pdfGenerated: number = 0;
  /**
   * The constructor initializes the router and pdfService variables and sets the vfs property of pdfMake to the vfs property of pdfFonts.pdfMake.
   * @param {Router} router - The "router" parameter is an instance of the Router class, which is used for navigating between different routes in an Angular application. It allows you to programmatically navigate to different views or components.
   * @param {PdfService} pdfService - The `pdfService` parameter is an instance of the `PdfService` class. It is used to perform operations related to generating and manipulating PDF documents.
   */
  constructor(private router: Router, private pdfService: PdfService) {
    (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
  }

  /**
   * The ngOnInit function checks if the email in the pdfData object is empty and navigates to the home page if it is.
   */
  ngOnInit(): void {
    this.pdfData = this.pdfService.getPdfData();
    console.log(this.pdfData); // Verificar los datos obtenidos
    if (this.pdfData.email == '') {
      this.router.navigate(['/home']);
    }
  }

  /**
   * The function `generatePdf()` generates a PDF document with the provided data and opens it in a new tab.
   * @returns The function does not return anything.
   */
  generatePdf() {
    if (!this.pdfData) {
      console.error('No hay datos para generar el PDF');
      return;
    }
    this.pdfGenerated += 1;

    const simpleDocument = {
      content: [
        { text: 'Detalles del PDF', bold: true },
        { text: `Correo: ${this.pdfData.email}` },
        { text: `Numero de Celular: ${this.pdfData.unumber}` },
        { text: `Primer Nombre: ${this.pdfData.fname}` },
        { text: `Segundo Nombre: ${this.pdfData.mname}` },
        { text: `Primer Apellido: ${this.pdfData.lname1}` },
        { text: `Segundo Apellido: ${this.pdfData.lname2}` },
        { text: `Numero de Escala: ${this.pdfData.stopid}` },
        { text: `Cuidad de Origen: ${this.pdfData.sfromcity}` },
        { text: `Cuidad de Destino: ${this.pdfData.stocity}` },
        { text: `Fecha de partida: ${this.pdfData.sdate}` },
        { text: `Hora de salida: ${this.pdfData.departurehour}` },
        { text: `Numero de Vuelo: ${this.pdfData.fno}` },
        { text: `Id de Estudiante: ${this.pdfData.studentid}` },
        { text: `University: ${this.pdfData.university}` },
        { text: `Millas: ${this.pdfData.miles}` },
        { text: `Precio Final: ${this.pdfData.finalprice} USD` },
        { text: `Numero de Pasajero: ${this.pdfData.pno}` },
        { text: `Baggages: ${this.pdfData.baggages}` },
        { text: `Numero de Silla: ${this.pdfData.snumber}` },
        { text: `Precio de Baggage: ${this.pdfData.baggageprice} USD` },
      ],
    };

    pdfMake.createPdf(simpleDocument).open();
  }

  /**
   * The function redirects the user to the home page.
   */
  returnHome() {
    this.router.navigate(['/home']);
  }
}
