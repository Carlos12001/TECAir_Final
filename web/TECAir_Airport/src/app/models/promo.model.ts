/* The code is defining an interface named `Promo`. An interface in TypeScript is a way to define the structure of an object. In this case, the `Promo` interface has four properties: */
export interface Promo {
  fno: number;
  image: string;
  dpercent: number;
  finaldate: string;
}

/* The code is creating an array named `promoExamples` that contains objects that conform to the `Promo` interface. Each object in the array represents a promotional item and has properties such as `fno` (promotion number), `image` (image URL), `dpercent` (discount percentage), and `finaldate` (expiration date). The array is initialized with two promotional items, each with their respective property values. */
const promoExamples: Promo[] = [
  {
    fno: 1,
    image: 'assets/img/promo1.png',
    dpercent: 0,
    finaldate: '2024-09-09',
  },
  {
    fno: 2,
    image: 'assets/img/promo2.png',
    dpercent: 0,
    finaldate: '2024-11-09',
  },
];

export { promoExamples };
