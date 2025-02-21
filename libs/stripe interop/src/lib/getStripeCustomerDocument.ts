import { type StripeCustomerDocument }    from "@bowstring/interfaces";
import { Timestamp, type WithFieldValue } from "firebase-admin/firestore";
import type Stripe                        from "stripe";
import toDocumentPartial                  from "./toDocumentPartial";


function getStripeCustomerDocument(
  stripeCustomer: Stripe.Customer,
  additionalFields: { userId: string },
): StripeCustomerDocument;
function getStripeCustomerDocument(
  stripeCustomer: Stripe.Customer,
  additionalFields: { userId: string },
  withFieldValue?: boolean,
): WithFieldValue<StripeCustomerDocument>;
function getStripeCustomerDocument(
  {
    address,
    balance,
    created,
    default_source: defaultSource,
    description,
    email,
    id,
    invoice_prefix:   invoicePrefix,
    invoice_settings: invoiceSettings,
    livemode,
    name,
    next_invoice_sequence: nextInvoiceSequence,
    phone,
    preferred_locales: preferredLocales,
    shipping,
    tax_exempt: taxExempt,
    test_clock: testClock,
  }: Stripe.Customer,
  {
    userId,
  }: { userId: string },
  withFieldValue?: boolean,
): StripeCustomerDocument | WithFieldValue<StripeCustomerDocument> {
  return {
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
        ): Exclude<StripeCustomerDocument["address"], undefined> => ({
          ...toDocumentPartial({ city }),
          ...toDocumentPartial({ country }),
          ...toDocumentPartial({ line1 }),
          ...toDocumentPartial({ line2 }),
          ...toDocumentPartial({ postalCode }),
          ...toDocumentPartial({ state }),
        }))(address) : undefined,
      },
      withFieldValue,
    ),
    balance,
    created: Timestamp.fromMillis(created * 1000),
    ...toDocumentPartial(
      { defaultSource },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { description },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { email },
      withFieldValue,
    ),
    id,
    ...toDocumentPartial(
      { invoicePrefix },
      withFieldValue,
    ),
    ...toDocumentPartial(
      {
        invoiceSettings: invoiceSettings.custom_fields?.length || invoiceSettings.default_payment_method || invoiceSettings.footer || (invoiceSettings.rendering_options && (invoiceSettings.rendering_options.amount_tax_display || invoiceSettings.rendering_options.template)) ? ((
          {
            custom_fields:          customFields,
            default_payment_method: defaultPaymentMethod,
            footer,
            rendering_options: renderingOptions,
          }: Stripe.Customer.InvoiceSettings,
        ): Exclude<StripeCustomerDocument["invoiceSettings"], undefined> => ({
          ...toDocumentPartial({ customFields }),
          ...toDocumentPartial({ defaultPaymentMethod }),
          ...toDocumentPartial({ footer }),
          ...(renderingOptions && (renderingOptions.amount_tax_display || renderingOptions.template) ? {
            renderingOptions: ((
              {
                amount_tax_display: amountTaxDisplay,
                template,
              }: Stripe.Customer.InvoiceSettings.RenderingOptions,
            ): Exclude<Exclude<StripeCustomerDocument["invoiceSettings"], undefined>["renderingOptions"], undefined> => ({
              ...toDocumentPartial<"amountTaxDisplay", "exclude_tax" | "include_inclusive_tax">({ amountTaxDisplay: amountTaxDisplay === "exclude_tax" || amountTaxDisplay === "include_inclusive_tax" ? amountTaxDisplay : undefined }),
              ...toDocumentPartial({ template }),
            }))(renderingOptions),
          } : {}),
        }))(invoiceSettings) : undefined,
      },
      withFieldValue,
    ),
    livemode,
    ...toDocumentPartial(
      { name },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { nextInvoiceSequence },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { phone },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { preferredLocales },
      withFieldValue,
    ),
    ...toDocumentPartial(
      {
        shipping: shipping && ((shipping.address && (shipping.address.city || shipping.address.country || shipping.address.line1 || shipping.address.line2 || shipping.address.postal_code || shipping.address.state)) || shipping.name || shipping.phone) ? ((
          {
            address,
            name,
            phone,
          }: Stripe.Customer.Shipping,
        ): Exclude<StripeCustomerDocument["shipping"], undefined> => ({
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
              ): Exclude<Exclude<StripeCustomerDocument["shipping"], undefined>["address"], undefined> => ({
                ...toDocumentPartial({ city }),
                ...toDocumentPartial({ country }),
                ...toDocumentPartial({ line1 }),
                ...toDocumentPartial({ line2 }),
                ...toDocumentPartial({ postalCode }),
                ...toDocumentPartial({ state }),
              }))(address) : undefined,
            },
          ),
          ...toDocumentPartial({ name }),
          ...toDocumentPartial({ phone }),
        }))(shipping) : undefined,
      },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { taxExempt },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { testClock },
      withFieldValue,
    ),
    ...{
      userId,
    },
  };
}

export default getStripeCustomerDocument;
