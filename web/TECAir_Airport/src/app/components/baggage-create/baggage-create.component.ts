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
  /* The line `baggageForm!: FormGroup;` is declaring a property named `baggageForm` of type `FormGroup`. The `!` symbol indicates that the property may be null or undefined at runtime, but it will be assigned a value before it is used. */
  baggageForm!: FormGroup;

  /**
   * The constructor function initializes private variables for FormBuilder, Router, and BaggageCreateService.
   * @param {FormBuilder} fb - The `fb` parameter is an instance of the `FormBuilder` class. It is used to create and manage forms in Angular applications.
   * @param {Router} router - The `router` parameter is an instance of the `Router` class, which is used for navigating between different routes in an Angular application. It allows you to programmatically navigate to different components or URLs.
   * @param {BaggageCreateService} baggageCreateService - The `baggageCreateService` parameter is an instance of the `BaggageCreateService` class. It is used to communicate with the backend API and perform operations related to creating baggage.
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private baggageCreateService: BaggageCreateService
  ) {}

  /**
   * The ngOnInit function initializes the baggageForm FormGroup with a single suitcase FormGroup.
   */
  ngOnInit(): void {
    this.baggageForm = this.fb.group({
      suitcases: this.fb.array([this.createSuitcaseFormGroup()]),
    });
  }

  /**
   * The function creates a form group for a suitcase with fields for weight, colors, and price.
   * @returns a FormGroup.
   */
  private createSuitcaseFormGroup(): FormGroup {
    return this.fb.group({
      weight: ['', Validators.required],
      colors: this.buildColors(),
      price: [0],
    });
  }

  /**
   * The function "buildColors" creates an array of form controls for each color in the "getColors" array.
   * @returns an instance of `FormArray` with each element initialized to `false`.
   */
  private buildColors() {
    const arr = this.getColors().map(() => this.fb.control(false));
    return this.fb.array(arr);
  }

  /**
   * The function returns an array of keys from the Color object.
   * @returns an array of keys from the Color object.
   */
  getColors() {
    return Object.keys(Color);
  }

  /**
   * The function returns the 'suitcases' FormArray from the 'baggageForm'.
   * @returns a FormArray.
   */
  get suitcasesFormArray(): FormArray {
    return this.baggageForm.get('suitcases') as FormArray;
  }

  /**
   * The addBaggage function adds a new suitcase form group to the suitcasesFormArray and updates the price based on the count of suitcases.
   */
  addBaggage() {
    this.suitcasesFormArray.push(this.createSuitcaseFormGroup());
    this.updatePriceBasedOnCount();
  }

  /**
   * The function updates the price of the last suitcase in a form array based on the count of suitcases.
   */
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

  /**
   * The onSubmit function creates baggage objects based on form input and sends them to a server for processing.
   */
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

  /**
   * The `nextPage` function sets the baggage numbers and total price, and navigates to the generate PDF page.
   * @param {number[]} baggageNo - An array of numbers representing baggage numbers.
   */
  nextPage(baggageNo: number[]): void {
    pdf.baggages = baggageNo;
    pdf.baggageprice = this.getTotalPrice();
    this.router.navigate(['/generate-pdf']);
  }

  // last maleta
  /**
   * The function `deleteLastBaggage()` removes the last item from an array called `suitcasesFormArray` if it is not empty.
   */
  deleteLastBaggage() {
    const count = this.suitcasesFormArray.length;
    if (count > 0) {
      this.suitcasesFormArray.removeAt(count - 1);
    }
  }

  // precio
  /**
   * The function `getTotalPrice` calculates the total price of all suitcases in a form array.
   * @returns a number, which is the total price calculated from the values of the 'price' form controls in the suitcasesFormArray.
   */
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
