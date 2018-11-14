import { Component, OnInit } from '@angular/core';

// <div pmc-add-product></div>

@Component({
    selector: 'wa-product-container',
    template: `
  <pm-add-product-container></pm-add-product-container>
  `,
    styles: [],
})
export class ProductContainerComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
