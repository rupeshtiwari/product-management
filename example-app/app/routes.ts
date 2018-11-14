import { Routes } from '@angular/router';
import { HomeContainerComponent } from './home/containers/home-container.component';
import { ProductContainerComponent } from './home/containers/product-container.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeContainerComponent,
  },
  {
    path: 'add-product',
    component: ProductContainerComponent,
  },
];
  