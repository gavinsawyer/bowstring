import { type StripeCustomerDocument } from "@bowstring/interfaces";
import type Stripe                     from "stripe";


function getStripeCustomerUpdateParams(
  {
    address,
    balance,
    defaultSource: default_source,
    description,
    email,
    invoicePrefix:   invoice_prefix,
    invoiceSettings: invoice_settings,
    name,
    nextInvoiceSequence: next_invoice_sequence,
    phone,
    preferredLocales: preferred_locales,
    shipping,
    taxExempt: tax_exempt,
  }: StripeCustomerDocument,
): Stripe.CustomerUpdateParams {
  return {
    address: address && (address.city || address.country || address.line1 || address.line2 || address.postalCode || address.state) ? ((
      {
        city,
        country,
        line1,
        line2,
        postalCode: postal_code,
        state,
      }: Exclude<StripeCustomerDocument["address"], undefined>,
    ): Stripe.AddressParam => ({
      city:        city || "",
      country:     country || "",
      line1:       line1 || "",
      line2:       line2 || "",
      postal_code: postal_code || "",
      state:       state || "",
    }))(address) : "",
    balance: typeof balance === "number" ? balance : 0,
    ...(default_source ? { default_source } : {}),
    description: description || "",
    email:       email || "",
    ...(invoice_prefix ? { invoice_prefix } : {}),
    invoice_settings:      invoice_settings && (invoice_settings.customFields || invoice_settings.defaultPaymentMethod || invoice_settings.footer || (invoice_settings.renderingOptions && (invoice_settings.renderingOptions.amountTaxDisplay || invoice_settings.renderingOptions.template))) ? ((
      {
        customFields:         custom_fields,
        defaultPaymentMethod: default_payment_method,
        footer,
        renderingOptions: rendering_options,
      }: Exclude<StripeCustomerDocument["invoiceSettings"], undefined>,
    ): Stripe.CustomerUpdateParams.InvoiceSettings => ({
      custom_fields:          custom_fields?.length ? custom_fields : "",
      default_payment_method: default_payment_method || "",
      footer:                 footer || "",
      rendering_options:      rendering_options && (rendering_options.amountTaxDisplay || rendering_options.template) ? ((
        {
          amountTaxDisplay: amount_tax_display,
          template,
        }: Exclude<Exclude<StripeCustomerDocument["invoiceSettings"], undefined>["renderingOptions"], undefined>,
      ): Stripe.CustomerUpdateParams.InvoiceSettings.RenderingOptions => ({
        amount_tax_display: amount_tax_display || "",
        template:           template || "",
      }))(rendering_options) : "",
    }))(invoice_settings) : {
      custom_fields:          "",
      default_payment_method: "",
      footer:                 "",
      rendering_options:      "",
    },
    name:                  name || "",
    next_invoice_sequence: typeof next_invoice_sequence === "number" ? next_invoice_sequence : 1,
    phone:                 phone || "",
    preferred_locales:     preferred_locales?.length ? preferred_locales : [],
    shipping:              shipping && ((shipping.address && (shipping.address.city || shipping.address.country || shipping.address.line1 || shipping.address.line2 || shipping.address.postalCode || shipping.address.state)) || shipping.name || shipping.phone) ? ((
      {
        address,
        name,
        phone,
      }: Exclude<StripeCustomerDocument["shipping"], undefined>,
    ): Stripe.CustomerUpdateParams.Shipping => ({
      address: address && (address.city || address.country || address.line1 || address.line2 || address.postalCode || address.state) ? ((
        {
          city,
          country,
          line1,
          line2,
          postalCode: postal_code,
          state,
        }: Exclude<Exclude<StripeCustomerDocument["shipping"], undefined>["address"], undefined>,
      ): Stripe.AddressParam => ({
        city:        city || "",
        country:     country || "",
        line1:       line1 || "",
        line2:       line2 || "",
        postal_code: postal_code || "",
        state:       state || "",
      }))(address) : {
        city:        "",
        country:     "",
        line1:       "",
        line2:       "",
        postal_code: "",
        state:       "",
      },
      name:    name || "",
      phone:   phone || "",
    }))(shipping) : "",
    tax_exempt:            tax_exempt || "",
  };
}

export default getStripeCustomerUpdateParams;
