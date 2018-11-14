import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '../../models/product';
import { adapter, State, isFormValid, isNameValid, isPriceValid, getForm, initialState, isLoading } from './../products';
import { MemoizedSelector } from '@ngrx/store/src/selector';
import { Dictionary, EntitySelectors } from '@ngrx/entity/src/models';

export interface ProductsState {
  products: State;
}

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getProductState: MemoizedSelector<
  any,
  ProductsState
  > = createFeatureSelector<ProductsState>('product-management-state');

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getProductEntitiesState: MemoizedSelector<
  any,
  State
  > = createSelector(getProductState, state => (state) ? state.products : initialState);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reducers boilerplate
 * in selecting records from the entity state.
 */
const entityFns = adapter.getSelectors(getProductEntitiesState);
export const {
    selectIds: getProductIds,
  selectAll: getAllProducts,
  selectTotal: getTotalProducts,
} = entityFns;

export const {
    selectEntities: getProductEntities,
}: EntitySelectors<Product, any> = entityFns;

export const isAddProductFormValid = createSelector(
  getProductEntitiesState,
  isFormValid);

export const isAddProductFormNameValid = createSelector(
  getProductEntitiesState,
  isNameValid);

export const isAddProductFormPriceValid = createSelector(
  getProductEntitiesState,
  isPriceValid);

export const addProductForm = createSelector(
  getProductEntitiesState,
  getForm);

export const isProductLoading = createSelector(
  getProductEntitiesState,
  isLoading);


