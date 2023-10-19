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

  // Helper function to create a form group for a suitcase
  private createSuitcaseFormGroup(): FormGroup {
    return this.fb.group({
      weight: ['', Validators.required],
      colors: this.buildColors(),
    });
  }

  // helper function to build the form array of colors
  private buildColors() {
    const arr = this.getColors().map(() => this.fb.control(false));
    return this.fb.array(arr);
  }

  getColors() {
    return Object.keys(Color);
  }

  // Getter for the suitcases form array
  get suitcasesFormArray(): FormArray {
    return this.baggageForm.get('suitcases') as FormArray;
  }

  // Add a new suitcase form group to the suitcases form array
  addBaggage() {
    this.suitcasesFormArray.push(this.createSuitcaseFormGroup());
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
      };
    });
    console.log('baggages', baggages);
  }
}
