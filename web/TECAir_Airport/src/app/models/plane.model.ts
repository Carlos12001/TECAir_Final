/* The `export interface Plane` statement is defining an interface named `Plane`. An interface in TypeScript is a way to define the structure of an object. In this case, the `Plane` interface has two properties: `planeid` of type `string` and `capacity` of type `number`. */
export interface Plane {
  planeid: string;
  capacity: number;
}
/* The `export const plane` statement is creating a constant variable named `plane` and assigning it an object with two properties: `planeid` and `capacity`. The `planeid` property is set to the string value `'A0023'` and the `capacity` property is set to the number value `24`. */

export const plane = {
  planeid: 'A0023',
  capacity: 24,
};

/* The `export const examplePlane: Plane[]` statement is creating a constant variable named `examplePlane` and assigning it an array of objects. Each object in the array represents a plane and has two properties: `planeid` and `capacity`. The `planeid` property is a string that identifies the plane, and the `capacity` property is a number that represents the maximum number of passengers the plane can hold. */
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
