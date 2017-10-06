import { AnyT } from '../definition.interface';

export function isUndef(value: AnyT): boolean {
  return typeof value === 'undefined';
}

export function isFn(value: AnyT): boolean {
  return typeof value === 'function';
}

export function isNumber(value: AnyT): boolean {
  return typeof value === 'number';
}

export const isPrimitive = (v: AnyT): boolean => {
  return typeof v === 'number'
      || typeof v === 'string'
      || typeof v === 'boolean';
};
