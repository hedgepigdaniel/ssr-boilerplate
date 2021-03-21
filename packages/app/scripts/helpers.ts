import { Falsy } from 'utility-types';
import { resolve } from 'path';

export const isTruthy = <Intended>(
  thing: Intended | Falsy,
): thing is Intended => Boolean(thing);

export const resolveFromCwd = (p: string) => resolve(process.cwd(), p);
