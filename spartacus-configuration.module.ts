import { NgModule } from '@angular/core';
import { translationChunksConfig, translations } from "@spartacus/assets";
import { FeaturesConfig, I18nConfig, OccConfig, provideConfig, SiteContextConfig } from "@spartacus/core";
import { defaultCmsContentProviders, layoutConfig, mediaConfig } from "@spartacus/storefront";

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [provideConfig(layoutConfig), provideConfig(mediaConfig), ...defaultCmsContentProviders, provideConfig(<OccConfig>{
    backend: {
      occ: {
        baseUrl: 'https://alphacentauri.pt-reply.com/',
      }
    },
  }), provideConfig(<SiteContextConfig>{
    context: {
     	urlParameters: ['baseSite', 'language', 'currency'],
  	  baseSite: ['electronics-spa'],
      currency: [ 'PLN',
                  'USD'
                  'EUR',
                  'JPY',
                  'GBP',
                  'AUD',
                  'CAD',
                  'CHF',
                  'CNY',
                  'SEK',
                  'NZD',
                  'MXN',
                  'SGD',
                  'HKD',
                  'NOK',
                  'KRW',
                  'TRY',
                  'RUB',
                  'INR',
                  'BRL',
                  'ZAR']},
  }), provideConfig(<I18nConfig>{
    i18n: {
      resources: translations,
      chunks: translationChunksConfig,
      fallbackLang: 'en'
    },
  }), provideConfig(<FeaturesConfig>{
    features: {
      level: '2211.19'
    }
  })]
})
export class SpartacusConfigurationModule { }
