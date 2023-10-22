/*import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flight } from '../../models/flight.model';
import { FlightService } from '../../models/flight.model'; // Importando el supuesto servicio

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

  constructor(private router: Router, private flightService: FlightService) {}

  ngOnInit(): void {}

  deepCopy(obj: any): any {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    const copy: Record<string, any> = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        copy[key] = this.deepCopy(obj[key]);
      }
    }
    return copy;
  }

  clearData() {
    this.flights = [];
    this.selectedFlight = null;
    this.originalFlight = null;
  }

  trackByFunction(index: number, item: any): number {
    return index;
  }

  setSelectedEntity(entity: string) {
    this.clearData();
    this.selectedEntity = entity;
    if (entity === 'flights') {
      this.loadFlights();
    }
  }

  loadFlights() {
    this.flightService.getFlights().subscribe({
      next: (data: Flight[]) => {
        this.flights = data;
        console.log('Vuelos cargados exitosamente');
      },
      error: (err: any) => {
        console.error('Error al cargar los vuelos:', err);
      },
      complete: () => {
        console.log('La carga de los vuelos se ha completado.');
      },
    });
  }

  selectFlight(flight: Flight) {
    this.selectedFlight = this.deepCopy(flight);
    this.originalFlight = flight;
  }

  submitFlight() {
    if (this.selectedFlight) {
      this.flightService.updateFlight(this.selectedFlight).subscribe({
        next: (response: any) => {
          console.log('Vuelo actualizado exitosamente:', response);
          // Actualizaciones adicionales que quieras hacer tras actualizar el vuelo
        },
        error: (err: any) => {
          console.error('Error al actualizar el vuelo:', err);
        },
        complete: () => {
          console.log('Actualización de vuelo completada.');
        },
      });
    }
  }

  deleteFlight() {
    if (this.selectedFlight && this.selectedFlight.fnumber) {
      this.flightService.deleteFlight(this.selectedFlight.fnumber).subscribe({
        next: (response: any) => {
          console.log('Vuelo eliminado exitosamente:', response);
          this.loadFlights(); // Recargamos los vuelos tras eliminar uno
          this.selectedFlight = null;
        },
        error: (err: any) => {
          console.error('Error al eliminar el vuelo:', err);
        },
        complete: () => {
          console.log('Eliminación de vuelo completada.');
        },
      });
    }
  }

  addNewFlight() {
    this.originalFlight = null;
    this.selectedFlight = {
      fnumber: 0,
      ffrom: 0,
      fto: 0,
      price: 0,
      fdate: '',
      fstate: false,
      pid: '',
    };
  }
}
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flight } from '../../models/flight.model';
// Suponiendo que Airport es necesario en tu código, aunque no lo veo utilizado en el fragmento que has proporcionado.
import { Airport } from '../../models/airport.model';
// Asegúrate de que la ruta sea la correcta
import { FlightService } from '../../models/flight.model';

@Component({
  selector: 'app-admin-editor',
  templateUrl: './admin-editor.component.html',
  styleUrls: ['./admin-editor.component.css'],
})
export class AdminEditorComponent implements OnInit {
  // Variables que posiblemente necesites en base al HTML

  entities: any[] = [
    // Puedes rellenar esta parte con los datos de tus entidades
  ];
  selectedEntity: string = '';

  selectedFlight: Flight = {
    fnumber: 0,
    ffrom: 0,
    fto: 0,
    price: 0,
    fdate: '',
    fstate: false,
    pid: '',
  };

  constructor(private router: Router, private flightService: FlightService) {}

  ngOnInit(): void {
    // Aquí puedes cargar los datos iniciales si es necesario
  }

  setSelectedEntity(entityValue: string): void {
    this.selectedEntity = entityValue;
    // Cargar datos relacionados con la entidad si es necesario
  }

  submitFlight(): void {
    // Captura la información del formulario
    const flightData = {
      price: this.selectedFlight.price,
      departureDate: (
        document.getElementById('departureDate') as HTMLInputElement
      ).value,
      arrivalDate: (document.getElementById('arrivalDate') as HTMLInputElement)
        .value,
      dropdown1: (
        document.querySelector('.row select:nth-child(1)') as HTMLSelectElement
      ).value,
      dropdown2: (
        document.querySelector('.row select:nth-child(2)') as HTMLSelectElement
      ).value,
      dropdown3: (
        document.querySelector('.row select:nth-child(3)') as HTMLSelectElement
      ).value,
    };

    // Muestra la información en la consola
    console.log(flightData);

    // Implementa la lógica para enviar los datos del vuelo
    // Por ejemplo, usando el servicio 'flightService'
  }

  deleteFlight(): void {
    // Implementa la lógica para eliminar un vuelo
    // Por ejemplo, usando el servicio 'flightService'
  }
}
