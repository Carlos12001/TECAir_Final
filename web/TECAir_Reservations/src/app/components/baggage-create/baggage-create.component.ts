import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { Baggage, Color } from 'src/app/models/baggage.model';

@Component({
  selector: 'app-baggage-create',
  templateUrl: './baggage-create.component.html',
  styleUrls: ['./baggage-create.component.css'],
})
export class BaggageCreateComponent {
  baggageForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.baggageForm = this.fb.group({
      suitcases: this.fb.array([this.createSuitcaseFormGroup()]), // initialize with one suitcase
    });
  }

  private createSuitcaseFormGroup(): FormGroup {
    return this.fb.group({
      weight: ['', Validators.required],
      colors: this.buildColors(),
      price: [0], // Añade un FormControl para el precio con un valor inicial de 0.
    });
  }

  private buildColors() {
    const arr = this.getColors().map(() => this.fb.control(false));
    return this.fb.array(arr);
  }

  getColors() {
    return Object.keys(Color);
  }

  get suitcasesFormArray(): FormArray {
    return this.baggageForm.get('suitcases') as FormArray;
  }

  addBaggage() {
    this.suitcasesFormArray.push(this.createSuitcaseFormGroup());
    this.updatePriceBasedOnCount();
  }

  updatePriceBasedOnCount() {
    const count = this.suitcasesFormArray.length;

    let price = 0;
    if (count === 1) {
      price = 0;
    } else if (count === 2) {
      price = 50;
    } else if (count >= 3) {
      price = 75;
    }

    // Ajustar el precio para el último grupo de maletas añadido.
    const lastFormGroup = this.suitcasesFormArray.at(
      this.suitcasesFormArray.length - 1
    ) as FormGroup;
    const priceControl = lastFormGroup.get('price');
    if (priceControl) {
      priceControl.setValue(price);
    }
  }

  onSubmit() {
    const formValue = this.baggageForm.value;

    const baggages: Baggage[] = formValue.suitcases.map((suitcase: any) => {
      const colors = this.getColors().filter(
        (color, index) => suitcase.colors[index]
      );
      return {
        Weight: suitcase.weight.toString(),
        BaggageColor: colors,
        Price: suitcase.price, // Asegúrate de que también estás recopilando el precio.
      };
    });
    console.log('baggages', baggages);
  }
}
