export interface Promo {
  fno: number;
  image: string;
  dpercent: number;
  finaldate: string;
}

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
