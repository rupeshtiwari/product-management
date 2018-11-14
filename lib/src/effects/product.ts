import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { ProductApi } from '../core/product.api';

import {
  Add,
  AddSuccess,
  AddError,
  LoadSuccess
} from '../actions/product-actions';

import { Product } from '../models/product';
import { ProductActionTypes } from '../actions/product-actions';
import { FeatureModuleConfig, FEATURE_MODULE_CONFIG } from '../config';
import {
  debounceTime,
  map,
  switchMap,
  skip,
  takeUntil,
  catchError,
} from 'rxjs/operators';

@Injectable()
export class ProductEffects {

  @Effect()
  addProduct$: Observable<Action> = this.actions$.pipe(
    ofType<Add>(ProductActionTypes.ADD),
    map(action => action.payload),
    switchMap(product => {
      return this.productApi
        .createProduct(product)
        .pipe(
        map((p: Product) => new AddSuccess(p)),
        catchError(err => of(new AddError(err))));
    })
  );

  @Effect()
  getAllProducts$: Observable<Action> = this.actions$.pipe(
    ofType<Add>(ProductActionTypes.LOAD),
    map(action => action.payload),
    switchMap(() => {
      return this.productApi
        .getAllProducts()
        .pipe(
        map(products => new LoadSuccess(products)),
        catchError(err => of(new AddError(err))));
    })
  );

  constructor(
    private actions$: Actions,
    private productApi: ProductApi
  ) {
  }
}
