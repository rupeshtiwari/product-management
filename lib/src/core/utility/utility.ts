import * as _ from 'lodash';

import { ArrayIterator } from 'lodash';

export const getFirstElementinArray = _.head;

export const escape = _.escape;


export const isArray = _.isArray;

export const every = _.every;

export const sumBy = _.sumBy;

export const pick = _.pick;


export function stringify(
  value: any,
  replacer?: (key: string, value: any) => any,
  space?: string | number
): string {
  return JSON.stringify(value, replacer, space);
}

export function parse(
  text: string,
  reviver?: (key: any, value: any) => any
): any {
  return JSON.parse(text, reviver);
}

export function isNumber(value: string) {
  return !isNaN(Number(value));
}

export function convertToNumber(value: string) {
  return Number(value);
}

export function convertToNumberIfPossible(value: string): any {
  return isNumber(value) ? convertToNumber(value) : value;
}

export function isNullOrUndefined(a: any) {
  return a == null;
}

export function isDefinedAndNotNull(a: any) {
  return a != null;
}

export function isTruthy(a: boolean) {
  return a === true;
}
export function isEmpty(a: any) {
  return _.isEmpty(a);
}

export const decodeUriComponent = (uri: string): string =>
  decodeURIComponent(uri);

export function isEmptyString(a: string) {
  return _.isEmpty(a) || _.isEmpty(a.trim());
}

export function isUndefined(obj: any): boolean {
  return !isDefinedAndNotNull(obj);
}

export function isDefined(obj: any): boolean {
  return isDefinedAndNotNull(obj);
}

export function uniqueId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

