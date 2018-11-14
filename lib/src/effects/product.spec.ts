import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';

import { Add, AddSuccess, AddError } from '../actions/product-actions';
import { ProductApi } from '../core/product.api';
import { generateMockProduct } from '../models/product';
import { ProductEffects } from './product';

export class TestActions extends
  Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('Effect Tests', () => {
  let productApi: ProductApi;
  let effects: ProductEffects;
  let actions$: TestActions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        {
          provide: ProductApi,
          useValue: { createProduct: jest.fn() }
        },
        {
          provide: Actions,
          useFactory: getActions
        },
      ]
    });
    effects = TestBed.get(ProductEffects);
    actions$ = TestBed.get(Actions);
    productApi = TestBed.get(ProductApi);
  });

  describe('addProduct$', () => {
    it('should return a AddProductSuccess action on success', () => {
      const product = generateMockProduct();
      const addAction = new Add(product);
      const addSuccessAction = new AddSuccess(product);

      actions$.stream = hot('-a---', { a: addAction });
      const response = cold('-a|', { a: product });
      const expectedAction = cold('--b', { b: addSuccessAction });
      productApi.createProduct = jest.fn(() => response);
      expect(effects.addProduct$).toBeObservable(expectedAction);
    });

    it('should return a AddError action on error', () => {
      const error = 'server error';
      const product = generateMockProduct();
      const addAction = new Add(product);
      const addErrorAction = new AddError(error);

      actions$.stream = hot('-a---', { a: addAction });
      const response = cold('-#|', {}, error);
      const expectedAction = cold('--b', { b: addErrorAction });
      productApi.createProduct = jest.fn(() => response);
      expect(effects.addProduct$).toBeObservable(expectedAction);
    });
  });
});
