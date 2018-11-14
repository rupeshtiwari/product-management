import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ProductActions, ProductActionTypes } from '../actions/product-actions';
import { Product } from '../models/product';
import { createSelector } from '@ngrx/store';
import { MemoizedSelector } from '@ngrx/store/src/selector';
import { Dictionary, EntitySelectors } from '@ngrx/entity/src/models';

export interface State extends EntityState<Product> {
  loading: boolean;
  addProductForm: Product;
}

/**
 * createEntityAdapter creates many an object of helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product.id,
  sortComparer: false,
});

/** getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
  loading: false,
  addProductForm: {} as Product
});

export function reducer(state = initialState, action: ProductActions): State {
  switch (action.type) {
    case ProductActionTypes.VALIDATE_ADD_PRODUCT_FORM: {
      return {
        ...state,
        addProductForm: action.payload
      };
    }
    case ProductActionTypes.ADD: {
      return {
        ...state,
        loading: true
      };
    }
    case ProductActionTypes.ADD_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case ProductActionTypes.ADD_SUCCESS: {
      return {
        ...adapter.addOne(action.payload, state),
        loading: false
      };
    }
    case ProductActionTypes.LOAD_SUCCESS: {
      return {
        ...adapter.addMany(action.payload, state),
        loading: false
      };
    }
    default: {
      return state;
    }
  }
}

export const isLoading = (state: State) => state.loading;

export const getForm = (state: State) => state.addProductForm;

export const isNameValid: MemoizedSelector<State, any> = createSelector(
  getForm,
  (form: Product) => form.name != null
    && form.name.trim() !== ''
    && form.name.length > 3
    && form.name.length < 50);

export const isPriceValid = createSelector(
  getForm,
  (form: Product) => form.price != null
    && form.price > 0);

export const isFormValid = createSelector(
  isNameValid,
  isPriceValid,
  (isNameValidProp, isPriceValidProp) => isNameValidProp && isPriceValidProp
);

