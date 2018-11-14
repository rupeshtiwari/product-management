import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AllProductsComponent } from './all-products.component';
import { MaterialModule } from '../../material';
import { generateMockProduct, generateProduct } from '../../models/product';
declare var expect;

describe('Add Product Component', () => {
  let fixture: ComponentFixture<AllProductsComponent>;
  let component: AllProductsComponent;
  let formBuild: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
      ],
      declarations: [
        AllProductsComponent,
      ],
      providers: [
        FormBuilder,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(AllProductsComponent);
    component = fixture.componentInstance;
    formBuild = TestBed.get(FormBuilder);
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });
});
