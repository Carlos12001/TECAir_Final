import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flight } from '../../models/flight.model';
import { FormControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-editor',
  templateUrl: './admin-editor.component.html',
  styleUrls: ['./admin-editor.component.css'],
})

/* The AdminEditorComponent class is a TypeScript class that represents a component used for editing and managing flight data in an admin interface. */
export class AdminEditorComponent implements OnInit {
  /* The line `selectedEntity: string = '';` is declaring a variable `selectedEntity` of type `string` and initializing it with an empty string value. This variable is used to store the currently selected entity, which is used in the component to determine which entity's data to display or manipulate. */
  selectedEntity: string = '';
  /* The line `entities = [{ label: 'vuelos', value: 'flights' }];` is declaring a variable `entities` and initializing it with an array containing one object. This object has two properties: `label` and `value`. */
  entities = [{ label: 'vuelos', value: 'flights' }];
  /* The line `flights: Flight[] = [];` is declaring a variable `flights` and initializing it with an empty array. This variable is of type `Flight[]`, which means it is an array that can only contain elements of type `Flight`. */
  flights: Flight[] = [];
  /* The line `selectedFlight: Flight | null = null;` is declaring a variable `selectedFlight` of type `Flight | null` and initializing it with a value of `null`. */
  selectedFlight: Flight | null = null;
  /* The line `originalFlight: Flight | null = null;` is declaring a variable `originalFlight` of type `Flight | null` and initializing it with a value of `null`. This variable is used to store a copy of the original flight object before any modifications are made to it. It is used in the component to compare the modified flight object with the original flight object when submitting or updating the flight data. */
  originalFlight: Flight | null = null;
  /* The line `priceControl = new FormControl();` is creating a new instance of the `FormControl` class and assigning it to the variable `priceControl`. */
  priceControl = new FormControl();

  /**
   * The ngOnInit function sets the value of the priceControl to the price of the selectedFlight if it exists.
   */
  ngOnInit() {
    if (this.selectedFlight) {
      this.priceControl.setValue(this.selectedFlight.price);
    }
  }

  /**
   * The function "sumitFlight" is defined in TypeScript.
   */
  sumitFlight() {}

  /**
   * The deleteFlight function is used to delete a flight.
   */
  deleteFlight() {}

  /**
   * The function "submitFlight" is used to submit a flight.
   */
  submitFlight() {}

  /**
   * The function updates the price of a selected flight based on the value of an event target.
   * @param {any} event - The event parameter is an object that represents the event that triggered the function. It contains information about the event, such as the target element and its value.
   */
  updatePrice(event: any): void {
    if (this.selectedFlight) {
      this.selectedFlight.price = Number(event.target.value);
    }
  }
}

// constructor(private router: Router, private flightService: FlightService) {}

// ngOnInit(): void {}

// deepCopy(obj: any): any {
//   if (obj === null || typeof obj !== 'object') {
//     return obj;
//   }
//   const copy: Record<string, any> = Array.isArray(obj) ? [] : {};
//   for (const key in obj) {
//     if (Object.prototype.hasOwnProperty.call(obj, key)) {
//       copy[key] = this.deepCopy(obj[key]);
//     }
//   }
//   return copy;
// }

// clearData() {
//   this.flights = [];
//   this.selectedFlight = null;
//   this.originalFlight = null;
// }

// trackByFunction(index: number, item: any): number {
//   return index;
// }

// setSelectedEntity(entity: string) {
//   this.clearData();
//   this.selectedEntity = entity;
//   if (entity === 'flights') {
//     this.loadFlights();
//   }
// }

// loadFlights() {
//   this.flightService.getFlights().subscribe({
//     next: (data: Flight[]) => {
//       this.flights = data;
//       console.log('Vuelos cargados exitosamente');
//     },
//     error: (err: any) => {
//       console.error('Error al cargar los vuelos:', err);
//     },
//     complete: () => {
//       console.log('La carga de los vuelos se ha completado.');
//     },
//   });
// }

// selectFlight(flight: Flight) {
//   this.selectedFlight = this.deepCopy(flight);
//   this.originalFlight = flight;
// }

// submitFlight() {
//   if (this.selectedFlight) {
//     this.flightService.updateFlight(this.selectedFlight).subscribe({
//       next: (response: any) => {
//         console.log('Vuelo actualizado exitosamente:', response);
//         // Actualizaciones adicionales que quieras hacer tras actualizar el vuelo
//       },
//       error: (err: any) => {
//         console.error('Error al actualizar el vuelo:', err);
//       },
//       complete: () => {
//         console.log('Actualización de vuelo completada.');
//       },
//     });
//   }
// }

// deleteFlight() {
//   if (this.selectedFlight && this.selectedFlight.fnumber) {
//     this.flightService.deleteFlight(this.selectedFlight.fnumber).subscribe({
//       next: (response: any) => {
//         console.log('Vuelo eliminado exitosamente:', response);
//         this.loadFlights(); // Recargamos los vuelos tras eliminar uno
//         this.selectedFlight = null;
//       },
//       error: (err: any) => {
//         console.error('Error al eliminar el vuelo:', err);
//       },
//       complete: () => {
//         console.log('Eliminación de vuelo completada.');
//       },
//     });
//   }
// }

// addNewFlight() {
//   this.originalFlight = null;
//   this.selectedFlight = {
//     fnumber: 0,
//     ffrom: 0,
//     fto: 0,
//     price: 0,
//     fdate: '',
//     fstate: false,
//     pid: '',
//   };
// }
