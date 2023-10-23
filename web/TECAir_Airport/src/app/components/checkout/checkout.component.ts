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
  /* `public pdfData: PDF;` is declaring a public property `pdfData` of type `PDF`. This property is used to store the data that will be used to generate a PDF document. */
  public pdfData: PDF;

  /* The line `fecha: string = '';` is declaring a public property `fecha` of type `string` and initializing it with an empty string. This property is used to store the value of the departure date and time for a flight. */
  fecha: string = '';
  /* The line `pno: number = 0;` is declaring a public property `pno` of type `number` and initializing it with the value `0`. This property is used to store the passenger number for a flight. */
  pno: number = 0;

  /**
   * The constructor initializes the private properties of the class and creates a new instance of the PDF class.
   * @param {Router} router - The `router` parameter is an instance of the `Router` class, which is used for navigating between different routes in an Angular application. It allows you to programmatically navigate to different views or components.
   * @param {PdfService} pdfService - The `pdfService` parameter is an instance of the `PdfService` class, which is responsible for generating and manipulating PDF documents. It likely contains methods for creating, saving, and modifying PDF files.
   * @param {CheckoutService} checkoutService - The `checkoutService` parameter is an instance of the `CheckoutService` class. It is used to handle the logic related to the checkout process, such as adding items to the cart, calculating the total price, and processing the payment.
   */
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

  /**
   * The function sets data for generating a PDF by modifying the pdfData object and then sends it to the pdfService.
   */
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
    this.pdfData.departurehour = this.fecha;
    this.pdfData.arrivalhour = this.fecha;
    this.pdfData.baggages = [];

    console.log('Modified PDF Data (onConfirm):', this.pdfData);

    // Enviamos el objeto pdfData al servicio
    this.pdfService.setPdfData(this.pdfData);
    this.router.navigate(['/generate-pdf']);
  }

  /**
   * The `onConfirm` function makes a POST request to create a passenger and then logs the response data, sets some variables, and calls the `setDataPdf` function.
   */
  onConfirm(): void {
    this.checkoutService
      .postCreatePassenger(
        userLogged.email,
        seeFlightSelected.fnumber,
        seeFlightSelected.stopid
      )
      .subscribe({
        next: (data: CreatePassenger[]) => {
          console.log('Passenger created:', data);

          this.pno = data[0].pnumber;
          this.fecha = data[0].departurehour;
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
