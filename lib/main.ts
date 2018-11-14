import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FeatureModule } from './src/feature.module';

platformBrowserDynamic()
  .bootstrapModule(FeatureModule)
  .catch(err => console.log(err));
