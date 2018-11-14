import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from '../../models/product';

@Component({
  selector: 'pm-add-product',
  templateUrl: './add-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
    .example-container {
      display: flex;
      flex-direction: column;
    }
    .example-container > * {
      width: 100%;
    }
    `
  ]
})
export class AddProductComponent {
  @Output() addProduct = new EventEmitter<Product>();
  @Input() isFormValid: boolean;
  @Input() isNameValid: boolean;
  @Input() isPriceValid: boolean;
  @Input() form: FormGroup;

  constructor() { }

  get isFormInValid() {
    return !this.isFormValid;
  }

  addProductClick(event: KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.addProduct.emit(this.form.value);
  }
}
