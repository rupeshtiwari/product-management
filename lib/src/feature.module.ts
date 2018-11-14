import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import {
  createConfig,
  INITIAL_OPTIONS,
  FEATURE_MODULE_CONFIG,
  FeatureModuleSettings,
} from './config';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './effects/product';
import { CoreModule } from './core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddProductContainerComponent } from './containers/add-product-container/add-product-container.component';
import { AllProductsComponent } from './components/all-products/all-products.component';

export const COMPONENTS = [
  AllProductsComponent,
  AddProductComponent,
  AddProductContainerComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('product-management-state', reducers),
    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([ProductEffects]),
    CoreModule.forFeature()
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class FeatureModule {
  public static forFeature(
    settings: FeatureModuleSettings = {}
  ): ModuleWithProviders {
    return {
      ngModule: FeatureModule,
      providers: [
        {
          provide: INITIAL_OPTIONS,
          useValue: settings,
        },
        {
          provide: FEATURE_MODULE_CONFIG,
          deps: [INITIAL_OPTIONS],
          useFactory: createConfig,
        },
      ],
    };
  }
}
