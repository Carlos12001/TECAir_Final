import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  Baggage,
  Color,
  SimpleBaggage,
  createBaggageExample,
} from 'src/app/models/baggage.model';
import { passengerCheckInSelected } from 'src/app/models/passengers-check-in.model';
import { pdf } from 'src/app/models/pdf.model';
import { BaggageCreateService } from 'src/app/services/baggage-create.service';

@Component({
  selector: 'app-baggage-create',
  templateUrl: './baggage-create.component.html',
  styleUrls: ['./baggage-create.component.css'],
})
export class BaggageCreateComponent {
  baggageForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private baggageCreateService: BaggageCreateService
  ) {}

  ngOnInit(): void {
    this.baggageForm = this.fb.group({
      suitcases: this.fb.array([this.createSuitcaseFormGroup()]),
    });
  }

  private createSuitcaseFormGroup(): FormGroup {
    return this.fb.group({
      weight: ['', Validators.required],
      colors: this.buildColors(),
      price: [0],
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
        weight: suitcase.weight.toString(),
        baggagecolor: colors,
        price: suitcase.price,
      };
    });
    createBaggageExample.pnumber = passengerCheckInSelected.pnumber;
    createBaggageExample.baggages = baggages;

    this.baggageCreateService.createBaggages(createBaggageExample).subscribe({
      next: (data: SimpleBaggage[]) => {
        const baggageNo: number[] = baggages
          .map((baggage) => baggage.bnumber)
          .filter((num): num is number => num !== undefined);

        this.nextPage(baggageNo);
      },
      error: (error) => {
        const baggageNo: number[] = baggages
          .map((baggage) => baggage.bnumber)
          .filter((num): num is number => num !== undefined);

        this.nextPage(baggageNo);
      },
      complete: () => {
        console.log('Finished Flights passengers');
      },
    });
  }

  nextPage(baggageNo: number[]): void {
    pdf.baggages = baggageNo;
    pdf.baggageprice = this.getTotalPrice();
    this.router.navigate(['/generate-pdf']);
  }

  // last maleta
  deleteLastBaggage() {
    const count = this.suitcasesFormArray.length;
    if (count > 0) {
      this.suitcasesFormArray.removeAt(count - 1);
    }
  }

  // precio
  getTotalPrice(): number {
    return this.suitcasesFormArray.controls.reduce((acc, formGroup) => {
      const priceControl = formGroup.get('price') as FormControl;
      if (priceControl) {
        acc += +priceControl.value;
      }
      return acc;
    }, 0);
  }
}
