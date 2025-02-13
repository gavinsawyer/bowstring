import { type StripeProductDocument }     from "@bowstring/interfaces";
import { Timestamp, type WithFieldValue } from "firebase-admin/firestore";
import type Stripe                        from "stripe";
import toDocumentPartial                  from "./toDocumentPartial";


function getStripeProductDocument(stripeProduct: Stripe.Product): StripeProductDocument;
function getStripeProductDocument(
  stripeProduct: Stripe.Product,
  withFieldValue?: boolean,
): WithFieldValue<StripeProductDocument>;
function getStripeProductDocument(
  {
    active,
    created,
    default_price: defaultPrice,
    description,
    id,
    images,
    livemode,
    marketing_features: marketingFeatures,
    name,
    package_dimensions: packageDimensions,
    shippable,
    statement_descriptor: statementDescriptor,
    tax_code:             taxCode,
    type,
    unit_label: unitLabel,
    updated,
    url,
  }: Stripe.Product,
  withFieldValue?: boolean,
): StripeProductDocument | WithFieldValue<StripeProductDocument> {
  return {
    active,
    created: Timestamp.fromMillis(created * 1000),
    ...toDocumentPartial(
      { defaultPrice },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { description },
      withFieldValue,
    ),
    id,
    ...toDocumentPartial(
      { images },
      withFieldValue,
    ),
    livemode,
    ...toDocumentPartial(
      { marketingFeatures },
      withFieldValue,
    ),
    name,
    ...toDocumentPartial(
      { packageDimensions },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { shippable },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { statementDescriptor },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { taxCode },
      withFieldValue,
    ),
    type,
    ...toDocumentPartial(
      { unitLabel },
      withFieldValue,
    ),
    ...toDocumentPartial(
      {
        updated: updated ? Timestamp.fromMillis(updated * 1000) : undefined,
      },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { url },
      withFieldValue,
    ),
  };
}

export default getStripeProductDocument;
