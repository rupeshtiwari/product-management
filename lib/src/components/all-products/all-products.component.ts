import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Product } from '../../models/product';

@Component({
  selector: 'pm-all-products',
  templateUrl: './all-products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
        .example-card {
            max-width: 400px;
          }
    `
  ]
})
export class AllProductsComponent {
  @Input() products: Product[];
  constructor() {
  }
}
