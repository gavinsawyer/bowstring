import { type StripePaymentMethodDocument } from "@bowstring/interfaces";
import { Timestamp, type WithFieldValue }   from "firebase-admin/firestore";
import type Stripe                          from "stripe";
import toDocumentPartial                    from "./toDocumentPartial";


function getStripePaymentMethodDocument(
  stripePaymentMethod: Stripe.PaymentMethod,
  additionalFields: { userId: string },
): StripePaymentMethodDocument;
function getStripePaymentMethodDocument(
  stripePaymentMethod: Stripe.PaymentMethod,
  additionalFields: { userId: string },
  withFieldValue?: boolean,
): WithFieldValue<StripePaymentMethodDocument>;
function getStripePaymentMethodDocument(
  {
    allow_redisplay: allowRedisplay,
    billing_details: billingDetails,
    card,
    created,
    customer,
    id,
    livemode,
    type,
  }: Stripe.PaymentMethod,
  {
    userId,
  }: { userId: string },
  withFieldValue?: boolean,
): StripePaymentMethodDocument | WithFieldValue<StripePaymentMethodDocument> {
  return {
    ...toDocumentPartial(
      { allowRedisplay },
      withFieldValue,
    ),
    billingDetails: ((
      {
        address,
        email,
        name,
        phone,
      }: Stripe.PaymentMethod.BillingDetails,
    ): Exclude<StripePaymentMethodDocument["billingDetails"], undefined> => ({
      ...toDocumentPartial(
        {
          address: address && (address.city || address.country || address.line1 || address.line2 || address.postal_code || address.state) ? ((
            {
              city,
              country,
              line1,
              line2,
              postal_code: postalCode,
              state,
            }: Stripe.Address,
          ): Exclude<Exclude<StripePaymentMethodDocument["billingDetails"], undefined>["address"], undefined> => ({
            ...toDocumentPartial({ city }),
            ...toDocumentPartial({ country }),
            ...toDocumentPartial({ line1 }),
            ...toDocumentPartial({ line2 }),
            ...toDocumentPartial({ postalCode }),
            ...toDocumentPartial({ state }),
          }))(address) : undefined,
        },
      ),
      ...toDocumentPartial({ email }),
      ...toDocumentPartial({ name }),
      ...toDocumentPartial({ phone }),
    }))(billingDetails),
    ...toDocumentPartial(
      {
        card: card ? ((
          {
            brand,
            checks,
            country,
            description,
            display_brand: displayBrand,
            exp_month:     expiryMonth,
            exp_year:      expiryYear,
            fingerprint,
            funding,
            last4,
            regulated_status:     regulatedStatus,
            three_d_secure_usage: threeDSecureUsage,
            wallet,
          }: Stripe.PaymentMethod.Card,
        ): Exclude<StripePaymentMethodDocument["card"], undefined> => ({
          brand,
          ...toDocumentPartial(
            {
              checks: checks && (checks.address_line1_check || checks.address_postal_code_check || checks.cvc_check) ? ((
                {
                  address_line1_check:       addressLine1Check,
                  address_postal_code_check: addressPostalCodeCheck,
                  cvc_check:                 cvcCheck,
                }: Stripe.PaymentMethod.Card.Checks,
              ): Exclude<Exclude<StripePaymentMethodDocument["card"], undefined>["checks"], undefined> => ({
                ...toDocumentPartial({ addressLine1Check }),
                ...toDocumentPartial({ addressPostalCodeCheck }),
                ...toDocumentPartial({ cvcCheck }),
              }))(checks) : undefined,
            },
          ),
          ...toDocumentPartial({ country }),
          ...toDocumentPartial({ description }),
          ...toDocumentPartial({ displayBrand }),
          expiryMonth,
          expiryYear,
          ...toDocumentPartial({ fingerprint }),
          funding,
          last4,
          ...toDocumentPartial({ regulatedStatus }),
          ...toDocumentPartial(
            {
              threeDSecureUsage: threeDSecureUsage ? ((
                {
                  supported,
                }: Stripe.PaymentMethod.Card.ThreeDSecureUsage,
              ): Exclude<Exclude<StripePaymentMethodDocument["card"], undefined>["threeDSecureUsage"], undefined> => ({
                supported,
              }))(threeDSecureUsage) : undefined,
            },
          ),
          ...toDocumentPartial(
            {
              wallet: wallet ? ((
                {
                  dynamic_last4: dynamicLast4,
                  type,
                }: Stripe.PaymentMethod.Card.Wallet,
              ): Exclude<Exclude<StripePaymentMethodDocument["card"], undefined>["wallet"], undefined> => ({
                ...toDocumentPartial({ dynamicLast4 }),
                type,
              }))(wallet) : undefined,
            },
          ),
        }))(card) : undefined,
      },
      withFieldValue,
    ),
    created: Timestamp.fromMillis(created * 1000),
    ...toDocumentPartial(
      { customer },
      withFieldValue,
    ),
    id,
    livemode,
    type,
    ...{
      userId,
    },
  };
}

export default getStripePaymentMethodDocument;
