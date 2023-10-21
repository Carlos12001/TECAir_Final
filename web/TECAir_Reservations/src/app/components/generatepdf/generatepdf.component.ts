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
  pdfData?: PDF; // Usamos ? para indicar que puede ser undefined.
  pdfGenerated: number = 0;
  constructor(private router: Router, private pdfService: PdfService) {
    (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit(): void {
    this.pdfData = this.pdfService.getPdfData();
    console.log(this.pdfData); // Verificar los datos obtenidos
    if (this.pdfData.email == '') {
      this.router.navigate(['/home']);
    }
  }

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
      ],
    };

    pdfMake.createPdf(simpleDocument).open();
  }

  returnHome() {
    this.router.navigate(['/home']);
  }
}
