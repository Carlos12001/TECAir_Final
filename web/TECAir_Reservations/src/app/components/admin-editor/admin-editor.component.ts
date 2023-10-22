import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flight } from '../../models/flight.model';
import { FormControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-editor',
  templateUrl: './admin-editor.component.html',
  styleUrls: ['./admin-editor.component.css'],
})
export class AdminEditorComponent implements OnInit {
  selectedEntity: string = '';
  entities = [{ label: 'vuelos', value: 'flights' }];
  flights: Flight[] = [];
  selectedFlight: Flight | null = null;
  originalFlight: Flight | null = null;
  priceControl = new FormControl();

  ngOnInit() {
    if (this.selectedFlight) {
      this.priceControl.setValue(this.selectedFlight.price);
    }
  }

  sumitFlight() {}

  deleteFlight() {}

  submitFlight() {}

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
