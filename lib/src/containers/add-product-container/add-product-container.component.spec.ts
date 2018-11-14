import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { Add, Load, ValidateAddProduct } from '../../actions/product-actions';
import { AddProductComponent } from '../../components/add-product/add-product.component';
import { MaterialModule } from '../../material';
import { generateMockProduct, Product } from '../../models/product';
import * as fromRoot from '../../reducers';
import * as fromProducts from '../../reducers';
import { AddProductContainerComponent } from './add-product-container.component';

declare var expect, spyOnProperty;

describe('Add Product Container', () => {
  let fixture: ComponentFixture<AddProductContainerComponent>;
  let component: AddProductContainerComponent;
  let store: Store<fromProducts.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'product-management-state': combineReducers(fromProducts.reducers)
        }),
        RouterTestingModule,
        MaterialModule,
        ReactiveFormsModule,
      ],
      declarations: [
        AddProductContainerComponent,
        AddProductComponent,
      ],
      providers: [
        FormBuilder,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(AddProductContainerComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  function resetSpy() {
    (store.dispatch as any).calls.reset();
  }

  afterEach(() => {
    resetSpy();
  });

  function updateForm(name, price) {
    component.form.controls['price'].setValue(price);
    component.form.controls['name'].setValue(name);
  }

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  it('should dispatch a products.Load on init', () => {
    const action = new Load();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('form value should update from form changes', () => {
    const expectedProduct = { name: 'apple', price: 200 } as Product;
    updateForm('apple', 200);
    expect(component.form.value).toEqual(expectedProduct);
  });

  describe('ValidateForm', () => {
    it('VALIDATE_FORM action is dispatched on form change', fakeAsync(() => {
      resetSpy();
      const product = { name: 'apple', price: 200 } as Product;
      updateForm(product.name, product.price);
      tick(4000);
      const validateAction = new ValidateAddProduct(product);
      expect(store.dispatch).toHaveBeenCalledWith(validateAction);
    }));

    describe('AddProduct', () => {
      it('ADD_PRODUCT action is dispatched on button click', () => {
        const product = generateMockProduct();
        const addProductAction = new Add(product);
        component.addProduct(product);
        expect(store.dispatch).toHaveBeenCalledWith(addProductAction);
      });
    });

    describe('update form$', () => {
      it('will patch the form', () => {
        const product = {
          name: 'apple',
          price: 100,
        } as Product;
        store.dispatch(new ValidateAddProduct(product));
        expect(component.form.value).toEqual(product);
      });
    });
  });
});
