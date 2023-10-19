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
      weight: ['', Validators.required],
      colors: this.buildColors(),
    });
  }

  onSubmit() {
    console.log(this.baggageForm.value);
  }

  // helper function to build the form array of colors
  private buildColors() {
    const arr = this.getColors().map((color) => {
      return this.fb.control(false); // initialize each control as unchecked
    });
    return this.fb.array(arr);
  }

  getColors() {
    return Object.keys(Color);
  }
}
