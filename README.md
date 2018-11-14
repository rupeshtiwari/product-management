# Working with multiple apps

This is an autonomous component for angular project with ngrx.
Below are the useful scripts and usages.

## Working in lib

### Running Tests in Single Time

```
npm run lib:test:sr
```

### Running Tests in Watch Mode

```
npm run lib:test
```

### Run tests in chrome

```
lib:test:chrome
```

## Angular Cli Scripts for LIB app

### Creating Module in Lib

```
 ng g m items --app=lib
```

### Creating Component in Lib

```
 ng g c containers\product-image-container --app=lib
```

### Consuming library Module

This module is a feature library therefore import in appmodule

```typescript
import { FeatureModuleModule } from '@scci-branding/product-management';

@NgModule({
  imports: [
    ...
    FeatureModuleModule.forFeature({ baseUrl: 'someurl' }),
  ],
  ...
})
export class AppModule { }
```

### Consuming library components

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  template: `
  <pm-add-product-container></pm-add-product-container>
  `,
})
export class HomeContainerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
```

## Working in example-app

### Start Example App

In order to start example app please run below cli command and navigate to `http://localhost:4221/` url.

```
npm run example:start
```

### Test Example App

```
npm run example:test
```

### Creating a module

Suppose I want to create products module in eample app. Here is the cli command:

```
ng g m products
```

### Creating a container component

suppose I have a feature module called as `products` and now I want to create an `add product container component` inside it. Here is the cli command for that:

```
ng g c products/containers/add-product-container
```

### Creating a component

```
ng g c products\components\product-image
```
