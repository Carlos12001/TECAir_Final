import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flight, exampleFlight } from '../../models/flight.model';
import { FormControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-editor',
  templateUrl: './admin-editor.component.html',
  styleUrls: ['./admin-editor.component.css'],
})

/* The AdminEditorComponent class is a TypeScript class that represents a component used for editing and managing flight data in an admin interface. */
export class AdminEditorComponent implements OnInit {
  selectedEntity: string = '';

  entities = [
    { label: 'Vuelos', value: 'flies' },
    { label: 'Stop', value: 'stops' },
  ];

  flights: Flight[] = [];
  selectedFlight: Flight | null = exampleFlight[0];
  originalFlight: Flight | null = null;

  /**
   * The ngOnInit function sets the value of the priceControl to the price of the selectedFlight if it exists.
   */
  ngOnInit() {}

  clearData() {}

  setSelectedEntity(entity: string) {
    this.clearData();
    this.selectedEntity = entity;
    if (entity === 'flies') {
      this.loadFlies();
    }
  }

  // FLIES
  loadFlies() {}

  selectFlie(flie: Flight) {}
}
