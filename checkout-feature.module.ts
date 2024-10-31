import {NgModule} from '@angular/core';
import {checkoutTranslationChunksConfig, checkoutTranslations} from "@spartacus/checkout/base/assets";
import {CHECKOUT_FEATURE, CheckoutRootModule, CheckoutStepType} from "@spartacus/checkout/base/root";
import {CmsConfig, I18nConfig, provideConfig} from "@spartacus/core";
import {AdyenPaymentsModule} from "@adyen/adyen-spartacus";

export const translationOverwrites = {
  en: { // lang
    checkout: { // chunk
      checkoutProgress: { // keys (nested)
        deliveryModePaymentDetails: 'Delivery Mode Payment Details',
      },
    },
  },
};

@NgModule({
  declarations: [],
  imports: [
    AdyenPaymentsModule,
    CheckoutRootModule
  ],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [CHECKOUT_FEATURE]: {
          module: () =>
            import('@spartacus/checkout/base').then((m) => m.CheckoutModule),
        },
      }
    }),
    provideConfig({
      i18n: {resources: translationOverwrites},
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: checkoutTranslations,
        chunks: checkoutTranslationChunksConfig,
      },
      routing: {
        routes: {
          // Add a new route for the combined step
          checkoutAdyenPaymentDetails: {
            paths: ['checkout/adyen-payment-details'],
          },
        },
      },
      checkout: {
        steps: [
          {
            id: 'deliveryAddress',
            name: 'checkoutProgress.deliveryAddress',
            routeName: 'checkoutDeliveryAddress',
            type: [CheckoutStepType.DELIVERY_ADDRESS],
          },
          {
            id: 'deliveryMode',
            name: 'checkoutProgress.deliveryMode',
            routeName: 'checkoutDeliveryMode',
            type: [CheckoutStepType.DELIVERY_MODE],
          },
          {
            id: 'adyenPaymentDetails',
            name: 'checkoutProgress.paymentDetails',
            routeName: 'checkoutAdyenPaymentDetails',
            type: [CheckoutStepType.PAYMENT_DETAILS],
          },
        ],
      },
    })
  ]
})
export class CheckoutFeatureModule {
}
