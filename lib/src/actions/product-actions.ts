import { Action } from '@ngrx/store';
import { Product } from '../models/product';

export enum ProductActionTypes {
  ADD = '[@co-branding/product-management][Products] Add',
  ADD_SUCCESS = '[@co-branding/product-management][Products] Add Success',
  ADD_ERROR = '[@co-branding/product-management][Products] Add Error',
  VALIDATE_ADD_PRODUCT_FORM = '[@co-branding/product-management][Products] Validate Form',
  LOAD = '[@co-branding/product-management][Products] Load',
  LOAD_SUCCESS = '[@co-branding/product-management][Products] Load Success',
}

export class Add implements Action {
  readonly type = ProductActionTypes.ADD;
  constructor(public payload: Product) { }
}

export class ValidateAddProduct implements Action {
  readonly type = ProductActionTypes.VALIDATE_ADD_PRODUCT_FORM;
  constructor(public payload: Product) { }
}

export class AddSuccess implements Action {
  readonly type = ProductActionTypes.ADD_SUCCESS;
  constructor(public payload: Product) { }
}

export class AddError implements Action {
  readonly type = ProductActionTypes.ADD_ERROR;
  constructor(public payload: string) { }
}

export class Load implements Action {
  readonly type = ProductActionTypes.LOAD;
  constructor() { }
}

export class LoadSuccess implements Action {
  readonly type = ProductActionTypes.LOAD_SUCCESS;
  constructor(public payload: Product[]) { }
}

export type ProductActions = Add
  | ValidateAddProduct
  | AddError
  | Load
  | LoadSuccess
  | AddSuccess;

