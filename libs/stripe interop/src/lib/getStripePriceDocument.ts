import { type StripePriceDocument }       from "@bowstring/interfaces";
import { Timestamp, type WithFieldValue } from "firebase-admin/firestore";
import type Stripe                        from "stripe";
import toDocumentPartial                  from "./toDocumentPartial";


function getStripePriceDocument(stripePrice: Stripe.Price): StripePriceDocument;
function getStripePriceDocument(
  stripePrice: Stripe.Price,
  withFieldValue?: boolean,
): WithFieldValue<StripePriceDocument>;
function getStripePriceDocument(
  {
    active,
    billing_scheme: billingScheme,
    created,
    currency,
    currency_options:   currencyOptions,
    custom_unit_amount: customUnitAmount,
    id,
    livemode,
    lookup_key: lookupKey,
    nickname,
    product,
    recurring,
    tax_behavior: taxBehavior,
    tiers,
    tiers_mode:         tiersMode,
    transform_quantity: transformQuantity,
    type,
    unit_amount:         unitAmount,
    unit_amount_decimal: unitAmountDecimal,
  }: Stripe.Price,
  withFieldValue?: boolean,
): StripePriceDocument | WithFieldValue<StripePriceDocument> {
  return {
    active,
    billingScheme,
    created: Timestamp.fromMillis(created * 1000),
    currency,
    ...toDocumentPartial(
      {
        currencyOptions: currencyOptions ? Object.fromEntries<Exclude<StripePriceDocument["currencyOptions"], undefined>["eur" | "gbp" | "usd"]>(Object.entries<Stripe.Price.CurrencyOptions>(currencyOptions).map<[ string, Exclude<StripePriceDocument["currencyOptions"], undefined>["eur" | "gbp" | "usd"] ]>(
          (
            [
              key,
              currencyOptions,
            ]: [ string, Stripe.Price.CurrencyOptions ],
          ): [ string, Exclude<StripePriceDocument["currencyOptions"], undefined>["eur" | "gbp" | "usd"] ] => [
            key,
            ((
              {
                custom_unit_amount: customUnitAmount,
                tax_behavior:       taxBehavior,
                tiers,
                unit_amount:         unitAmount,
                unit_amount_decimal: unitAmountDecimal,
              }: Stripe.Price.CurrencyOptions,
            ): Exclude<StripePriceDocument["currencyOptions"], undefined>["eur" | "gbp" | "usd"] => ({
              ...toDocumentPartial(
                {
                  customUnitAmount: customUnitAmount && (customUnitAmount.maximum || customUnitAmount.minimum || customUnitAmount.preset) ? ((
                    {
                      maximum,
                      minimum,
                      preset,
                    }: Stripe.Price.CustomUnitAmount,
                  ): Exclude<Exclude<Exclude<StripePriceDocument["currencyOptions"], undefined>["eur" | "gbp" | "usd"], undefined>["customUnitAmount"], undefined> => ({
                    enabled: true,
                    ...toDocumentPartial({ maximum }),
                    ...toDocumentPartial({ minimum }),
                    ...toDocumentPartial({ preset }),
                  }))(customUnitAmount) : undefined,
                },
              ),
              ...toDocumentPartial({ taxBehavior }),
              ...(tiers?.length ? {
                tiers: tiers.map<Exclude<Exclude<Exclude<StripePriceDocument["currencyOptions"], undefined>["eur" | "gbp" | "usd"], undefined>["tiers"], undefined>[number]>(
                  (
                    {
                      flat_amount:         flatAmount,
                      flat_amount_decimal: flatAmountDecimal,
                      unit_amount:         unitAmount,
                      unit_amount_decimal: unitAmountDecimal,
                      up_to:               upTo,
                    }: Stripe.Price.Tier,
                  ): Exclude<Exclude<Exclude<StripePriceDocument["currencyOptions"], undefined>["eur" | "gbp" | "usd"], undefined>["tiers"], undefined>[number] => ({
                    ...toDocumentPartial({ flatAmount }),
                    ...toDocumentPartial({ flatAmountDecimal }),
                    ...toDocumentPartial({ unitAmount }),
                    ...toDocumentPartial({ unitAmountDecimal }),
                    ...toDocumentPartial({ upTo }),
                  }),
                ),
              } : {}),
              ...toDocumentPartial({ unitAmount }),
              ...toDocumentPartial({ unitAmountDecimal }),
            }))(currencyOptions),
          ],
        )) : undefined,
      },
      withFieldValue,
    ),
    ...toDocumentPartial(
      {
        customUnitAmount: customUnitAmount && (customUnitAmount.maximum || customUnitAmount.minimum || customUnitAmount.preset) ? ((
          {
            maximum,
            minimum,
            preset,
          }: Stripe.Price.CustomUnitAmount,
        ): Exclude<StripePriceDocument["customUnitAmount"], undefined> => ({
          ...toDocumentPartial({ maximum }),
          ...toDocumentPartial({ minimum }),
          ...toDocumentPartial({ preset }),
        }))(customUnitAmount) : undefined,
      },
      withFieldValue,
    ),
    id,
    livemode,
    ...toDocumentPartial(
      { lookupKey },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { nickname },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { product },
      withFieldValue,
    ),
    ...toDocumentPartial(
      {
        recurring: recurring ? ((
          {
            aggregate_usage: aggregateUsage,
            interval,
            interval_count: intervalCount,
            meter,
            trial_period_days: trialPeriodDays,
            usage_type:        usageType,
          }: Stripe.Price.Recurring,
        ): Exclude<StripePriceDocument["recurring"], undefined> => ({
          ...toDocumentPartial({ aggregateUsage }),
          interval,
          intervalCount,
          ...toDocumentPartial({ meter }),
          ...toDocumentPartial({ trialPeriodDays }),
          usageType,
        }))(recurring) : undefined,
      },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { taxBehavior },
      withFieldValue,
    ),
    ...toDocumentPartial(
      {
        tiers: tiers?.length ? tiers.map<Exclude<Exclude<Exclude<StripePriceDocument["currencyOptions"], undefined>["eur" | "gbp" | "usd"], undefined>["tiers"], undefined>[number]>(
          (
            {
              flat_amount:         flatAmount,
              flat_amount_decimal: flatAmountDecimal,
              unit_amount:         unitAmount,
              unit_amount_decimal: unitAmountDecimal,
              up_to:               upTo,
            }: Stripe.Price.Tier,
          ): Exclude<Exclude<Exclude<StripePriceDocument["currencyOptions"], undefined>["eur" | "gbp" | "usd"], undefined>["tiers"], undefined>[number] => ({
            ...toDocumentPartial({ flatAmount }),
            ...toDocumentPartial({ flatAmountDecimal }),
            ...toDocumentPartial({ unitAmount }),
            ...toDocumentPartial({ unitAmountDecimal }),
            ...toDocumentPartial({ upTo }),
          }),
        ) : undefined,
      },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { tiersMode },
      withFieldValue,
    ),
    ...toDocumentPartial(
      {
        transformQuantity: transformQuantity ? ((
          {
            divide_by: divideBy,
            round,
          }: Stripe.Price.TransformQuantity,
        ): Exclude<StripePriceDocument["transformQuantity"], undefined> => ({
          divideBy,
          round,
        }))(transformQuantity) : undefined,
      },
      withFieldValue,
    ),
    type,
    ...toDocumentPartial(
      { unitAmount },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { unitAmountDecimal },
      withFieldValue,
    ),
  };
}

export default getStripePriceDocument;
