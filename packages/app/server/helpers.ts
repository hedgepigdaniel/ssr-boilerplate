import { Falsy } from 'utility-types';

export const isTruthy = <Intended>(
  thing: Intended | Falsy,
): thing is Intended => Boolean(thing);
