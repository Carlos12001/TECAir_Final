export interface Plane {
  planeid: string;
  capacity: number;
}

export const plane = {
  planeid: 'A0023',
  capacity: 24,
};

export const examplePlane: Plane[] = [
  {
    planeid: 'plane1',
    capacity: 24,
  },
  {
    planeid: 'plane2',
    capacity: 40,
  },
  {
    planeid: 'plane3',
    capacity: 32,
  },
];
