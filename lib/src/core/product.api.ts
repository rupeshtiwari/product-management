import { Injectable, Inject } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { FEATURE_MODULE_CONFIG, FeatureModuleConfig } from '../config';
import { uniqueId } from './utility';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, delay } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class ProductApi {
  private httpPostOptions;
  private productApiUrl;

  constructor(
    @Inject(FEATURE_MODULE_CONFIG) private config: FeatureModuleConfig,
    private $http: HttpClient,
  ) {
    this.httpPostOptions = {
      headers: { 'Content-Type': 'application/json' },
    };
    this.productApiUrl = `${this.config.baseUrl}products`;
  }

  createProduct(product: Product): Observable<Product> {
    const productToSave = {
      ...product,
      id: uniqueId()
    };

    return this.$http.post<Product>(
      this.productApiUrl,
      productToSave,
      this.httpPostOptions
    ).pipe(
      delay(2000), // to simulate server call
      map(_ => productToSave),
      catchError(e => Observable.throw(e)),
    );
  }

  getAllProducts(): Observable<Product[]> {
    return this.$http.get<Product[]>(
      this.productApiUrl
    );
  }
}
