import { type StripeProductDocument } from "@standard/interfaces";
import type Stripe                    from "stripe";


function getStripeProductUpdateParamsMarketingFeatures(marketingFeatures: Exclude<StripeProductDocument["marketingFeatures"], undefined>): Stripe.ProductUpdateParams.MarketingFeature[] | undefined {
  const stripeProductUpdateParamsMarketingFeatures: Stripe.ProductUpdateParams.MarketingFeature[] = marketingFeatures?.filter<Stripe.ProductUpdateParams.MarketingFeature>(
    (marketingFeature: Stripe.Product.MarketingFeature): marketingFeature is { name: string } => "name" in marketingFeature,
  );

  return stripeProductUpdateParamsMarketingFeatures.length ? stripeProductUpdateParamsMarketingFeatures : undefined;
}
function getStripeProductUpdateParams(
  {
    active,
    defaultPrice: default_price,
    description,
    images,
    marketingFeatures: marketing_features,
    name,
    packageDimensions: package_dimensions,
    shippable,
    statementDescriptor: statement_descriptor,
    taxCode:             tax_code,
    unitLabel:           unit_label,
    url,
  }: StripeProductDocument,
): Stripe.ProductUpdateParams {
  return {
    ...(active ? { active } : {}),
    ...(default_price ? { default_price } : {}),
    description:        description || "",
    images:             images?.length ? images : "",
    marketing_features: marketing_features ? getStripeProductUpdateParamsMarketingFeatures(marketing_features) : "",
    ...(name ? { name } : {}),
    package_dimensions: package_dimensions ? ((
      {
        height,
        length,
        weight,
        width,
      }: Exclude<StripeProductDocument["packageDimensions"], undefined>,
    ): Stripe.ProductUpdateParams.PackageDimensions => ({
      height,
      length,
      weight,
      width,
    }))(package_dimensions) : "",
    ...(shippable ? { shippable } : {}),
    ...(statement_descriptor ? { statement_descriptor } : {}),
    tax_code:   tax_code || "",
    unit_label: unit_label || "",
    url:        url || "",
  };
}

export default getStripeProductUpdateParams;
