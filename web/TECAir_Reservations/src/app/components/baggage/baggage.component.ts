import { Component } from '@angular/core';

@Component({
  selector: 'app-baggage',
  templateUrl: './baggage.component.html',
  styleUrls: ['./baggage.component.css'],
})
export class BaggageComponent {
  colorOptions: string[] = [
    'rojo',
    'blanco',
    'azul',
    'negro',
    'verde',
    'amarillo',
    'gris',
    'cafe',
  ];

  goBack(): void {
    console.log('Cancel operation.');
  }

  postSuitCase(chosenColor: string, suitcaseWeight: string): void {
    const output = {
      Weight: suitcaseWeight,
      BaggageColor: [chosenColor],
    };
    console.log(output);
  }
}
