import { Add, AddError, AddSuccess } from '../actions/product-actions';
import { generateMockProduct, Product } from '../models/product';
import { isLoading, reducer } from './products';
import * as fromProducts from './products';

describe('CenterDetail', () => {
    let initialState: fromProducts.State;

    describe('Action', () => {
        const product = generateMockProduct();

        initialState = {
            loading: false,
            ids: [product.id],
            entities: {
                [product.id]: product
            },
            addProductForm: null
        };

        describe('undefined action', () => {
            it('should return the default state', () => {
                const result = reducer(undefined, {} as any);
                expect(result).toMatchSnapshot();
            });
        });

        describe('ADD', () => {
            const action = new Add(product);
            it('Should return the state with loading true', () => {
                const result = reducer(initialState, action);
                expect(result).toMatchSnapshot();
            });
        });

        describe('ADD_SUCCESS', () => {
            const action = new AddSuccess(product);
            it('Should return the state with loading false', () => {
                const result = reducer(initialState, action);
                expect(result).toMatchSnapshot();
            });
        });

        describe('ADD_ERROR', () => {
            const action = new AddError('error');
            it('Should return the state with loading false', () => {
                const result = reducer(initialState, action);
                expect(result).toMatchSnapshot();
            });
        });
    });

    describe('Query', () => {
        describe('isLoading', () => {
            it('should return loading status', () => {
                const result = isLoading(initialState);
                expect(result).toMatchSnapshot();
            });
        });

        describe('isFormValid', () => {
            it('should return false', () => {
                const product = {
                    name: '',
                    price: 0
                } as Product;

                initialState = {
                    loading: false,
                    ids: [product.id],
                    entities: {
                        [product.id]: product
                    },
                    addProductForm: product
                };
                const result = isLoading(initialState);
                expect(result).toMatchSnapshot();
            });

            it('should return true', () => {
                const product = generateMockProduct();

                initialState = {
                    loading: false,
                    ids: [product.id],
                    entities: {
                        [product.id]: product
                    },
                    addProductForm: product
                };
                const result = isLoading(initialState);
                expect(result).toMatchSnapshot();
            });
        });
    });
});
