import { InjectionToken } from '@angular/core';

export class FeatureModuleConfig {
  constructor(public baseUrl: string) {}
}

export const FEATURE_MODULE_CONFIG = new InjectionToken<
  FeatureModuleConfig
>('@scci-branding/product-management Config');

export const INITIAL_OPTIONS = new InjectionToken<FeatureModuleConfig>(
  '@scci-branding/product-management Initial Options'
);

export function createConfig(
  _config: FeatureModuleConfig
): FeatureModuleConfig {
  const DEFAULT_SETTINGS: FeatureModuleConfig = {
    baseUrl: '',
  };
  const initialSettings = _config;
  const config = Object.assign({}, DEFAULT_SETTINGS, initialSettings);
  if (config.baseUrl == null) {
    throw new Error(
      `Product Management base url is required, got ${config.baseUrl}`
    );
  }
  return config;
}

export type FeatureModuleSettings =
  | Partial<FeatureModuleConfig>
  | (() => Partial<FeatureModuleConfig>);
