import { Component } from '@angular/core';
import { PdfService, PDF } from '../../models/pdf.model';
import { userLogged } from '../../models/user-logged.model';
import { seeFlightSelected } from '../../models/see-flight.model';
import { searchStopSelected } from '../../models/search-stop.model';
import { stop } from '../../models/stop.model';
import { student } from '../../models/student.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  public pdfData: PDF;

  constructor(private router: Router, private pdfService: PdfService) {
    this.pdfData = new PDF(
      '',
      '',
      '',
      '',
      '',
      '',
      0,
      '',
      '',
      '',
      '',
      '',
      0,
      '',
      '',
      0,
      '',
      0
    );
  }

  onConfirm(): void {
    // Modificamos el objeto pdfData con los datos
    this.pdfData.email = userLogged.email;
    this.pdfData.unumber = userLogged.unumber;
    this.pdfData.fname = userLogged.fname;
    this.pdfData.mname = userLogged.mname;
    this.pdfData.lname1 = userLogged.lname1;
    this.pdfData.lname2 = userLogged.lname2;

    this.pdfData.stopid = seeFlightSelected.stopid;
    this.pdfData.sfromcity = seeFlightSelected.sfromcity;
    this.pdfData.stocity = seeFlightSelected.stocity;

    this.pdfData.sdate = seeFlightSelected.fdate;
    this.pdfData.departurehour = stop.departurehour;
    this.pdfData.arrivalhour = stop.arrivalhour;
    this.pdfData.fno = seeFlightSelected.fnumber;

    this.pdfData.studentid = student.studentid;
    this.pdfData.university = userLogged.university;
    this.pdfData.miles = userLogged.miles;
    this.pdfData.uemail = student.uemail;
    if ('depercent' in seeFlightSelected && seeFlightSelected.depercent) {
      this.pdfData.finalprice =
        (1 - seeFlightSelected.depercent / 100) * seeFlightSelected.fprice;
      window.alert(
        'Encontramos un descuento del ' +
          seeFlightSelected.depercent +
          '% de ahorro.\n El precio regular es: ' +
          seeFlightSelected.fprice +
          ' USD \n El precio final con descuento es: ' +
          (1 - (seeFlightSelected.depercent || 0) / 100) *
            seeFlightSelected.fprice +
          ' USD'
      );
    } else {
      this.pdfData.finalprice = seeFlightSelected.fprice;
    }

    console.log('Modified PDF Data (onConfirm):', this.pdfData);

    // Enviamos el objeto pdfData al servicio
    this.pdfService.setPdfData(this.pdfData);
    this.router.navigate(['/generate-pdf']);
  }
}
