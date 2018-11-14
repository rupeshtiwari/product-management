import { State as RootState } from '@scci-branding/rootstate';

import { reducer as productReducer } from './products';
import { ProductsState } from './selectors';


export interface State extends RootState {
  products: ProductsState;
}

export const reducers: any = {
  products: productReducer,
};


export * from './selectors';
