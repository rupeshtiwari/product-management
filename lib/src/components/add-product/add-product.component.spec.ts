import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddProductComponent } from './add-product.component';
import { MaterialModule } from '../../material';

describe('Add Product Component', () => {
  let fixture: ComponentFixture<AddProductComponent>;
  let component: AddProductComponent;
  let formBuild: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
      ],
      declarations: [
        AddProductComponent,
      ],
      providers: [
        FormBuilder,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    formBuild = TestBed.get(FormBuilder);
    component.form = formBuild.group({
      'name': 'apple',
      'price': 400,
    });
    fixture.detectChanges();
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  function updateForm({ name, price }) {
    component.form.controls['price'].setValue(price);
    component.form.controls['name'].setValue(name);
  }

  it('should emit addProduct Event on click', () => {
    const clickEvent = new KeyboardEvent('click');
    const product = {
      name: 'BBC World', price: 50
    };
    updateForm(product);
    component.addProduct.subscribe(s => {
      expect(s).toEqual(product);
    });
    component.addProductClick(clickEvent);
  });

  it('isFormInValid', () => {
    component.isFormValid = false;
    expect(component.isFormInValid).toBe(true);
  });
});
