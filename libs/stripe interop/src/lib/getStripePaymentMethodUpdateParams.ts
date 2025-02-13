import { type StripePaymentMethodDocument } from "@standard/interfaces";
import type Stripe                          from "stripe";


function getStripePaymentMethodUpdateParams(
  {
    allowRedisplay: allow_redisplay,
    billingDetails: billing_details,
    card,
  }: StripePaymentMethodDocument,
): Stripe.PaymentMethodUpdateParams {
  return {
    allow_redisplay,
    billing_details: billing_details && ((
      {
        address,
        email,
        name,
        phone,
      }: Exclude<StripePaymentMethodDocument["billingDetails"], undefined>,
    ): Stripe.PaymentMethodUpdateParams.BillingDetails => ({
      address: address && (address.city || address.country || address.line1 || address.line2 || address.postalCode || address.state) ? ((
        {
          city,
          country,
          line1,
          line2,
          postalCode: postal_code,
          state,
        }: Exclude<Exclude<StripePaymentMethodDocument["billingDetails"], undefined>["address"], undefined>,
      ): Stripe.AddressParam => ({
        city:        city || "",
        country:     country || "",
        line1:       line1 || "",
        line2:       line2 || "",
        postal_code: postal_code || "",
        state:       state || "",
      }))(address) : "",
      email:   email || "",
      name:    name || "",
      phone:   phone || "",
    }))(billing_details),
    card:            card && ((
      {
        expiryMonth: exp_month,
        expiryYear:  exp_year,
        networks,
      }: Exclude<StripePaymentMethodDocument["card"], undefined>,
    ): Stripe.PaymentMethodUpdateParams.Card => ({
      exp_month,
      exp_year,
      networks: networks && ((
        {
          preferred,
        }: Exclude<Exclude<StripePaymentMethodDocument["card"], undefined>["networks"], undefined>,
      ): Stripe.PaymentMethodUpdateParams.Card.Networks => ({
        preferred: preferred !== "invalid_preference" ? preferred : "",
      }))(networks),
    }))(card),
  };
}

export default getStripePaymentMethodUpdateParams;
