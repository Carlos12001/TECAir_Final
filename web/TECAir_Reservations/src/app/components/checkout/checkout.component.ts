import { Component } from '@angular/core';
import { PdfService, PDF } from '../../models/pdf.model';
import { userLogged } from '../../models/user-logged.model';
import { seeFlightSelected } from '../../models/see-flight.model';
import { searchStopSelected } from '../../models/search-stop.model';
import { stop } from '../../models/stop.model';
import { student } from '../../models/student.model';
import { Router } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CreatePassenger } from 'src/app/models/create-passenger.model';
import { baggagesIDSelected } from 'src/app/models/baggage.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  public pdfData: PDF;

  pno: number = 0;

  constructor(
    private router: Router,
    private pdfService: PdfService,
    private checkoutService: CheckoutService
  ) {
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

  setDataPdf(): void {
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
    if (userLogged.university) {
      this.pdfData.university = userLogged.university;
    }
    if (userLogged.miles) {
      this.pdfData.miles = userLogged.miles;
    }
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
    this.pdfData.pno = this.pno;
    this.pdfData.baggages = [];

    console.log('Modified PDF Data (onConfirm):', this.pdfData);

    // Enviamos el objeto pdfData al servicio
    this.pdfService.setPdfData(this.pdfData);
    this.router.navigate(['/generate-pdf']);
  }

  onConfirm(): void {
    this.checkoutService
      .postCreatePassenger(
        userLogged.email,
        seeFlightSelected.fnumber,
        seeFlightSelected.stopid
      )
      .subscribe({
        next: (data: CreatePassenger) => {
          console.log('Passenger created:', data);
          this.pno = data.pnumber;
          this.setDataPdf();
        },
        error: (error) => {
          console.error('Error fetching passengers:', error);
          this.setDataPdf();
        },
        complete: () => {
          console.log('Finished passengers fetched');
        },
      });
  }
}
