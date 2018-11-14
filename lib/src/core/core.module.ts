import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductApi } from './product.api';

export const COMPONENTS: any[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  static forFeature(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [ProductApi],
    };
  }
}
