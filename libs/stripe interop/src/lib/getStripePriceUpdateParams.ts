import { type StripePriceDocument } from "@standard/interfaces";
import type Stripe                  from "stripe";


function getStripePriceUpdateParamsCurrencyOptions(
  {
    customUnitAmount: custom_unit_amount,
    taxBehavior:      tax_behavior,
    tiers,
    unitAmount:        unit_amount,
    unitAmountDecimal: unit_amount_decimal,
  }: Exclude<Exclude<StripePriceDocument["currencyOptions"], undefined>["eur" | "gbp" | "usd"], undefined>,
): Stripe.PriceUpdateParams.CurrencyOptions {
  return {
    custom_unit_amount,
    tax_behavior,
    tiers: tiers?.length ? tiers.map<Stripe.PriceUpdateParams.CurrencyOptions.Tier>(
      (
        {
          flatAmount:        flat_amount,
          flatAmountDecimal: flat_amount_decimal,
          unitAmount:        unit_amount,
          unitAmountDecimal: unit_amount_decimal,
          upTo:              up_to,
        }: Exclude<Exclude<Exclude<StripePriceDocument["currencyOptions"], undefined>["eur" | "gbp" | "usd"], undefined>["tiers"], undefined>[number],
      ): Stripe.PriceUpdateParams.CurrencyOptions.Tier => ({
        flat_amount,
        flat_amount_decimal,
        unit_amount,
        unit_amount_decimal,
        up_to: typeof up_to === "number" ? up_to : "inf",
      }),
    ) : undefined,
    unit_amount,
    unit_amount_decimal,
  };
}
function getStripePriceUpdateParams(
  {
    active,
    currencyOptions: currency_options,
    lookupKey:       lookup_key,
    nickname,
    taxBehavior: tax_behavior,
  }: StripePriceDocument,
): Stripe.PriceUpdateParams {
  return {
    active,
    currency_options: currency_options ? ((
      {
        eur,
        gbp,
        usd,
      }: Exclude<StripePriceDocument["currencyOptions"], undefined>,
    ): { [key: string]: Stripe.PriceUpdateParams.CurrencyOptions } => ({
      ...(eur ? {
        eur: getStripePriceUpdateParamsCurrencyOptions(eur),
      } : {}),
      ...(gbp ? {
        gbp: getStripePriceUpdateParamsCurrencyOptions(gbp),
      } : {}),
      ...(usd ? {
        usd: getStripePriceUpdateParamsCurrencyOptions(usd),
      } : {}),
    }))(currency_options) : "",
    lookup_key,
    nickname:         nickname || "",
    tax_behavior,
  };
}

export default getStripePriceUpdateParams;
