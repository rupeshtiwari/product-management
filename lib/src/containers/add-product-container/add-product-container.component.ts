import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { debounceTime } from 'rxjs/operators';

import { Add, Load, ValidateAddProduct } from '../../actions/product-actions';
import { managedSubscriptions, ManageSubscriptions } from '../../core/utility/managed-subscriptions';
import { Product } from '../../models/product';
import {
  addProductForm,
  getAllProducts,
  isAddProductFormNameValid,
  isAddProductFormPriceValid,
  isAddProductFormValid,
  isProductLoading,
  State,
} from '../../reducers';

@Component({
  selector: 'pm-add-product-container',
  templateUrl: './add-product-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductContainerComponent implements OnInit, OnDestroy {
  allSubscriptions: ManageSubscriptions = managedSubscriptions();
  products$: Observable<Product[]>;
  isNameValid$: Observable<boolean>;
  isPriceValid$: Observable<boolean>;
  isFormValid$: Observable<boolean>;
  form$: Observable<Product>;
  form: FormGroup;
  formChanged$: Observable<Product>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<State>,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
    this.createObservables();
    this.subscribeObservables();
    this.store.dispatch(new Load());
  }

  private createObservables() {
    this.loading$ = this.store.pipe<boolean>(select(isProductLoading));
    this.products$ = this.store.pipe<Product[]>(select(getAllProducts));
    this.isFormValid$ = this.store.pipe<boolean>(select(isAddProductFormValid));
    this.form$ = this.store.pipe<Product>(select(addProductForm));
    this.isNameValid$ = this.store.pipe<boolean>(select(isAddProductFormNameValid));
    this.isPriceValid$ = this.store.pipe<boolean>(select(isAddProductFormPriceValid));
    this.formChanged$ = this.form.valueChanges.pipe<Product>(debounceTime(400));
  }

  subscribeObservables() {
    this.allSubscriptions.addRange(
      this.form$.subscribe(this.onUpdateForm.bind(this)),
      this.formChanged$.subscribe(this.validateForm.bind(this))
    );
  }

  private createForm() {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control('', []),
      price: this.formBuilder.control('', [])
    });
  }

  private onUpdateForm(product) {
    this.form.patchValue(product, { emitEvent: false });
  }

  private validateForm(product: Product) {
    this.store.dispatch(new ValidateAddProduct(product));
  }

  ngOnDestroy(): void {
    this.allSubscriptions.clear();
  }

  addProduct(product: Product): void {
    this.store.dispatch(new Add(product));
  }
}
