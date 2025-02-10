import { type StripeCustomerDocument, type StripePaymentMethodDocument, type StripeSetupIntentDocument }                                                         from "@standard/interfaces";
import { getApp }                                                                                                                                                from "firebase-admin/app";
import { type CollectionReference, type DocumentReference, FieldValue, type Firestore, getFirestore, type PartialWithFieldValue, type QuerySnapshot, Timestamp } from "firebase-admin/firestore";
import { HttpsError, type HttpsFunction, onRequest, type Request }                                                                                               from "firebase-functions/https";
import Stripe                                                                                                                                                    from "stripe";
import { Stripe_API_Key, Stripe_Webhook_Shared_Secret }                                                                                                          from "../../secrets";


function getStripeCustomerDocumentPartialWithFieldValue(
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
): PartialWithFieldValue<StripeCustomerDocument> {
  return {
    address:             address && (address.city || address.country || address.line1 || address.line2 || address.postal_code || address.state) ? ((
      {
        city,
        country,
        line1,
        line2,
        postal_code: postalCode,
        state,
      }: Stripe.Address,
    ): Exclude<StripeCustomerDocument["address"], undefined> => ({
      ...(city ? { city } : {}),
      ...(country ? { country } : {}),
      ...(line1 ? { line1 } : {}),
      ...(line2 ? { line2 } : {}),
      ...(postalCode ? { postalCode } : {}),
      ...(state ? { state } : {}),
    }))(address) : FieldValue.delete(),
    balance,
    created:             Timestamp.fromMillis(created * 1000),
    defaultSource:       typeof defaultSource === "string" ? defaultSource : defaultSource?.id || FieldValue.delete(),
    description:         description !== "" && description || FieldValue.delete(),
    email:               email !== "" && email || FieldValue.delete(),
    id,
    invoicePrefix:       invoicePrefix !== "" && invoicePrefix || FieldValue.delete(),
    invoiceSettings:     invoiceSettings.custom_fields?.length || invoiceSettings.default_payment_method || invoiceSettings.footer || (invoiceSettings.rendering_options && (invoiceSettings.rendering_options.amount_tax_display || invoiceSettings.rendering_options.template)) ? ((
      {
        custom_fields:          customFields,
        default_payment_method: defaultPaymentMethod,
        footer,
        rendering_options: renderingOptions,
      }: Stripe.Customer.InvoiceSettings,
    ): Exclude<StripeCustomerDocument["invoiceSettings"], undefined> => ({
      ...(customFields?.length ? { customFields } : {}),
      ...(defaultPaymentMethod ? {
        defaultPaymentMethod: typeof defaultPaymentMethod === "string" ? defaultPaymentMethod : defaultPaymentMethod.id,
      } : {}),
      ...(footer ? { footer } : {}),
      ...(renderingOptions && (renderingOptions.amount_tax_display || renderingOptions.template) ? {
        renderingOptions: ((
          {
            amount_tax_display: amountTaxDisplay,
            template,
          }: Stripe.Customer.InvoiceSettings.RenderingOptions,
        ): Exclude<Exclude<StripeCustomerDocument["invoiceSettings"], undefined>["renderingOptions"], undefined> => ({
          ...(amountTaxDisplay === "exclude_tax" || amountTaxDisplay === "include_inclusive_tax" ? { amountTaxDisplay } : {}),
          ...(template ? { template } : {}),
        }))(renderingOptions),
      } : {}),
    }))(invoiceSettings) : FieldValue.delete(),
    livemode,
    name:                name !== "" && name || FieldValue.delete(),
    nextInvoiceSequence: nextInvoiceSequence || FieldValue.delete(),
    phone:               phone !== "" && phone || FieldValue.delete(),
    preferredLocales:    preferredLocales?.length ? preferredLocales : FieldValue.delete(),
    shipping:            shipping && ((shipping.address && (shipping.address.city || shipping.address.country || shipping.address.line1 || shipping.address.line2 || shipping.address.postal_code || shipping.address.state)) || shipping.name || shipping.phone) ? ((
      {
        address,
        name,
        phone,
      }: Stripe.Customer.Shipping,
    ): Exclude<StripeCustomerDocument["shipping"], undefined> => ({
      ...(address && (address.city || address.country || address.line1 || address.line2 || address.postal_code || address.state) ? {
        address: ((
          {
            city,
            country,
            line1,
            line2,
            postal_code: postalCode,
            state,
          }: Stripe.Address,
        ): Exclude<Exclude<StripeCustomerDocument["shipping"], undefined>["address"], undefined> => ({
          ...(city ? { city } : {}),
          ...(country ? { country } : {}),
          ...(line1 ? { line1 } : {}),
          ...(line2 ? { line2 } : {}),
          ...(postalCode ? { postalCode } : {}),
          ...(state ? { state } : {}),
        }))(address),
      } : {}),
      ...(name ? { name } : {}),
      ...(phone ? { phone } : {}),
    }))(shipping) : FieldValue.delete(),
    taxExempt:           taxExempt || FieldValue.delete(),
    testClock:           typeof testClock === "string" ? testClock : testClock?.id || FieldValue.delete(),
  };
}
function getStripeSetupIntentDocumentPartialWithFieldValue(
  {
    attach_to_self:            attachToSelf,
    automatic_payment_methods: automaticPaymentMethods,
    cancellation_reason:       cancellationReason,
    client_secret:             clientSecret,
    created,
    customer,
    description,
    flow_directions: flowDirections,
    id,
    last_setup_error: lastSetupError,
    latest_attempt:   latestAttempt,
    livemode,
    mandate,
    next_action:                          nextAction,
    payment_method:                       paymentMethod,
    payment_method_configuration_details: paymentMethodConfigurationDetails,
    payment_method_options:               paymentMethodOptions,
    payment_method_types:                 paymentMethodTypes,
    single_use_mandate:                   singleUseMandate,
    status,
    usage,
  }: Stripe.SetupIntent,
  userId: string,
): PartialWithFieldValue<StripeSetupIntentDocument> {
  return {
    attachToSelf:                      typeof attachToSelf === "boolean" ? attachToSelf : FieldValue.delete(),
    automaticPaymentMethods:           automaticPaymentMethods && (automaticPaymentMethods.allow_redirects || automaticPaymentMethods.enabled) ? ((
      {
        allow_redirects: allowRedirects,
        enabled,
      }: Stripe.SetupIntent.AutomaticPaymentMethods,
    ): Exclude<StripeSetupIntentDocument["automaticPaymentMethods"], undefined> => ({
      ...(allowRedirects ? { allowRedirects } : {}),
      ...(typeof enabled === "boolean" ? { enabled } : {}),
    }))(automaticPaymentMethods) : FieldValue.delete(),
    cancellationReason:                cancellationReason || FieldValue.delete(),
    clientSecret:                      clientSecret !== "" && clientSecret || FieldValue.delete(),
    created:                           Timestamp.fromMillis(created * 1000),
    customer:                          typeof customer === "string" ? customer : customer?.id || FieldValue.delete(),
    description:                       description !== "" && description || FieldValue.delete(),
    flowDirections:                    flowDirections?.length ? flowDirections : FieldValue.delete(),
    id,
    lastSetupError:                    lastSetupError ? ((
      {
        advice_code: adviceCode,
        code,
        decline_code: declineCode,
        doc_url:      docUrl,
        message,
        network_advice_code:  networkAdviceCode,
        network_decline_code: networkDeclineCode,
        param,
        payment_method:      paymentMethod,
        payment_method_type: paymentMethodType,
        type,
      }: Stripe.SetupIntent.LastSetupError,
    ): Exclude<StripeSetupIntentDocument["lastSetupError"], undefined> => ({
      ...(adviceCode ? { adviceCode } : {}),
      ...(code ? { code } : {}),
      ...(declineCode ? { declineCode } : {}),
      ...(docUrl ? { docUrl } : {}),
      ...(message ? { message } : {}),
      ...(networkAdviceCode ? { networkAdviceCode } : {}),
      ...(networkDeclineCode ? { networkDeclineCode } : {}),
      ...(param ? { param } : {}),
      ...(paymentMethod ? {
        paymentMethod: ((
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
        ): Exclude<Exclude<StripeSetupIntentDocument["lastSetupError"], undefined>["paymentMethod"], undefined> => ({
          allowRedisplay,
          billingDetails: ((
            {
              address,
              email,
              name,
              phone,
            }: Stripe.PaymentMethod.BillingDetails,
          ): Exclude<Exclude<StripeSetupIntentDocument["lastSetupError"], undefined>["paymentMethod"], undefined>["billingDetails"] => ({
            ...(address && (address.city || address.country || address.line1 || address.line2 || address.postal_code || address.state) ? {
              address: ((
                {
                  city,
                  country,
                  line1,
                  line2,
                  postal_code: postalCode,
                  state,
                }: Stripe.Address,
              ): Exclude<Exclude<Exclude<StripeSetupIntentDocument["lastSetupError"], undefined>["paymentMethod"], undefined>["billingDetails"]["address"], undefined> => ({
                ...(city ? { city } : {}),
                ...(country ? { country } : {}),
                ...(line1 ? { line1 } : {}),
                ...(line2 ? { line2 } : {}),
                ...(postalCode ? { postalCode } : {}),
                ...(state ? { state } : {}),
              }))(address),
            } : {}),
            ...(email ? { email } : {}),
            ...(name ? { name } : {}),
            ...(phone ? { phone } : {}),
          }))(billingDetails),
          card:           card && ((
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
          ): Exclude<Exclude<Exclude<StripeSetupIntentDocument["lastSetupError"], undefined>["paymentMethod"], undefined>["card"], undefined> => ({
            brand,
            ...(checks && (checks.address_line1_check || checks.address_postal_code_check || checks.cvc_check) ? {
              checks: ((
                {
                  address_line1_check:       addressLine1Check,
                  address_postal_code_check: addressPostalCodeCheck,
                  cvc_check:                 cvcCheck,
                }: Stripe.PaymentMethod.Card.Checks,
              ): Exclude<Exclude<Exclude<Exclude<StripeSetupIntentDocument["lastSetupError"], undefined>["paymentMethod"], undefined>["card"], undefined>["checks"], undefined> => ({
                ...(addressLine1Check ? { addressLine1Check } : {}),
                ...(addressPostalCodeCheck ? { addressPostalCodeCheck } : {}),
                ...(cvcCheck ? { cvcCheck } : {}),
              }))(checks),
            } : {}),
            ...(country ? { country } : {}),
            ...(description ? { description } : {}),
            ...(displayBrand ? { displayBrand } : {}),
            expiryMonth,
            expiryYear,
            ...(fingerprint ? { fingerprint } : {}),
            funding,
            last4,
            ...(regulatedStatus ? { regulatedStatus } : {}),
            ...(threeDSecureUsage ? {
              threeDSecureUsage: ((
                {
                  supported,
                }: Stripe.PaymentMethod.Card.ThreeDSecureUsage,
              ): Exclude<Exclude<Exclude<Exclude<StripeSetupIntentDocument["lastSetupError"], undefined>["paymentMethod"], undefined>["card"], undefined>["threeDSecureUsage"], undefined> => ({
                supported,
              }))(threeDSecureUsage),
            } : {}),
            ...(wallet ? {
              wallet: ((
                {
                  dynamic_last4: dynamicLast4,
                  type,
                }: Stripe.PaymentMethod.Card.Wallet,
              ): Exclude<Exclude<Exclude<Exclude<StripeSetupIntentDocument["lastSetupError"], undefined>["paymentMethod"], undefined>["card"], undefined>["wallet"], undefined> => ({
                ...(dynamicLast4 ? { dynamicLast4 } : {}),
                type,
              }))(wallet),
            } : {}),
          }))(card),
          created:        Timestamp.fromMillis(created * 1000),
          ...(customer ? {
            customer: typeof customer === "string" ? customer : customer.id,
          } : {}),
          id,
          livemode,
          type,
        }))(paymentMethod),
      } : {}),
      paymentMethodType,
      type,
    }))(lastSetupError) : FieldValue.delete(),
    latestAttempt:                     typeof latestAttempt === "string" ? latestAttempt : latestAttempt?.id || FieldValue.delete(),
    livemode,
    mandate:                           typeof mandate === "string" ? mandate : mandate?.id || FieldValue.delete(),
    nextAction:                        nextAction ? ((
      {
        cashapp_handle_redirect_or_display_qr_code: cashappHandleRedirectOrDisplayQrCode,
        redirect_to_url:                            redirectToUrl,
        type,
        use_stripe_sdk:            useStripeSdk,
        verify_with_microdeposits: verifyWithMicrodeposits,
      }: Stripe.SetupIntent.NextAction,
    ): Exclude<StripeSetupIntentDocument["nextAction"], undefined> => ({
      ...(cashappHandleRedirectOrDisplayQrCode ? {
        cashappHandleRedirectOrDisplayQrCode: ((
          {
            hosted_instructions_url: hostedInstructionsUrl,
            mobile_auth_url:         mobileAuthUrl,
            qr_code:                 qrCode,
          }: Stripe.SetupIntent.NextAction.CashappHandleRedirectOrDisplayQrCode,
        ): Exclude<Exclude<StripeSetupIntentDocument["nextAction"], undefined>["cashappHandleRedirectOrDisplayQrCode"], undefined> => ({
          hostedInstructionsUrl,
          mobileAuthUrl,
          qrCode: ((
            {
              expires_at:    expiresAt,
              image_url_png: imageUrlPng,
              image_url_svg: imageUrlSvg,
            }: Stripe.SetupIntent.NextAction.CashappHandleRedirectOrDisplayQrCode.QrCode,
          ): Exclude<Exclude<StripeSetupIntentDocument["nextAction"], undefined>["cashappHandleRedirectOrDisplayQrCode"], undefined>["qrCode"] => ({
            expiresAt: Timestamp.fromMillis(expiresAt * 1000),
            imageUrlPng,
            imageUrlSvg,
          }))(qrCode),
        }))(cashappHandleRedirectOrDisplayQrCode),
      } : {}),
      ...(redirectToUrl && (redirectToUrl.return_url || redirectToUrl.url) ? {
        redirectToUrl: ((
          {
            return_url: returnUrl,
            url,
          }: Stripe.SetupIntent.NextAction.RedirectToUrl,
        ): Exclude<Exclude<StripeSetupIntentDocument["nextAction"], undefined>["redirectToUrl"], undefined> => ({
          ...(returnUrl ? { returnUrl } : {}),
          ...(url ? { url } : {}),
        }))(redirectToUrl),
      } : {}),
      type,
      useStripeSdk,
      ...(verifyWithMicrodeposits ? {
        verifyWithMicrodeposits: ((
          {
            arrival_date:            arrivalDate,
            hosted_verification_url: hostedVerificationUrl,
            microdeposit_type:       microdepositType,
          }: Stripe.SetupIntent.NextAction.VerifyWithMicrodeposits,
        ): Exclude<Exclude<StripeSetupIntentDocument["nextAction"], undefined>["verifyWithMicrodeposits"], undefined> => ({
          arrivalDate: Timestamp.fromMillis(arrivalDate * 1000),
          hostedVerificationUrl,
          ...(microdepositType ? { microdepositType } : {}),
        }))(verifyWithMicrodeposits),
      } : {}),
    }))(nextAction) : FieldValue.delete(),
    paymentMethod:                     typeof paymentMethod === "string" ? paymentMethod : paymentMethod?.id || FieldValue.delete(),
    paymentMethodConfigurationDetails: paymentMethodConfigurationDetails ? ((
      {
        id,
        parent,
      }: Stripe.SetupIntent.PaymentMethodConfigurationDetails,
    ): Exclude<StripeSetupIntentDocument["paymentMethodConfigurationDetails"], undefined> => ({
      id,
      ...(parent ? { parent } : {}),
    }))(paymentMethodConfigurationDetails) : FieldValue.delete(),
    paymentMethodOptions:              paymentMethodOptions ? ((
      {
        card,
      }: Stripe.SetupIntent.PaymentMethodOptions,
    ): Exclude<StripeSetupIntentDocument["paymentMethodOptions"], undefined> => ({
      ...(card ? {
        card: ((
          {
            mandate_options: mandateOptions,
            network,
            request_three_d_secure: requestThreeDSecure,
          }: Stripe.SetupIntent.PaymentMethodOptions.Card,
        ): Exclude<Exclude<StripeSetupIntentDocument["paymentMethodOptions"], undefined>["card"], undefined> => ({
          ...(mandateOptions ? {
            mandateOptions: ((
              {
                amount,
                amount_type: amountType,
                currency,
                description,
                end_date: endDate,
                interval,
                interval_count: intervalCount,
                reference,
                start_date:      startDate,
                supported_types: supportedTypes,
              }: Stripe.SetupIntent.PaymentMethodOptions.Card.MandateOptions,
            ): Exclude<Exclude<Exclude<StripeSetupIntentDocument["paymentMethodOptions"], undefined>["card"], undefined>["mandateOptions"], undefined> => ({
              ...(description ? { description } : {}),
              amount,
              amountType,
              currency,
              ...(endDate ? { endDate: Timestamp.fromMillis(endDate * 1000) } : {}),
              interval,
              ...(intervalCount ? { intervalCount } : {}),
              reference,
              startDate: Timestamp.fromMillis(startDate * 1000),
              ...(supportedTypes ? { supportedTypes } : {}),
            }))(mandateOptions),
          } : {}),
          ...(network ? { network } : {}),
          ...(requestThreeDSecure ? { requestThreeDSecure } : {}),
        }))(card),
      } : {}),
    }))(paymentMethodOptions) : FieldValue.delete(),
    paymentMethodTypes:                paymentMethodTypes?.length ? paymentMethodTypes : FieldValue.delete(),
    singleUseMandate:                  typeof singleUseMandate === "string" ? singleUseMandate : singleUseMandate?.id || FieldValue.delete(),
    status:                            status || FieldValue.delete(),
    usage:                             usage !== "" && usage || FieldValue.delete(),
    userId,
  };
}
function getStripePaymentMethodDocumentPartialWithFieldValue(
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
  userId: string,
): PartialWithFieldValue<StripePaymentMethodDocument> {
  return {
    allowRedisplay: allowRedisplay || FieldValue.delete(),
    billingDetails: ((
      {
        address,
        email,
        name,
        phone,
      }: Stripe.PaymentMethod.BillingDetails,
    ): Exclude<Exclude<StripeSetupIntentDocument["lastSetupError"], undefined>["paymentMethod"], undefined>["billingDetails"] => ({
      ...(address && (address.city || address.country || address.line1 || address.line2 || address.postal_code || address.state) ? {
        address: ((
          {
            city,
            country,
            line1,
            line2,
            postal_code: postalCode,
            state,
          }: Stripe.Address,
        ): Exclude<Exclude<Exclude<StripeSetupIntentDocument["lastSetupError"], undefined>["paymentMethod"], undefined>["billingDetails"]["address"], undefined> => ({
          ...(city ? { city } : {}),
          ...(country ? { country } : {}),
          ...(line1 ? { line1 } : {}),
          ...(line2 ? { line2 } : {}),
          ...(postalCode ? { postalCode } : {}),
          ...(state ? { state } : {}),
        }))(address),
      } : {}),
      ...(email ? { email } : {}),
      ...(name ? { name } : {}),
      ...(phone ? { phone } : {}),
    }))(billingDetails),
    card:           card ? ((
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
    ): Exclude<Exclude<Exclude<StripeSetupIntentDocument["lastSetupError"], undefined>["paymentMethod"], undefined>["card"], undefined> => ({
      brand,
      ...(checks && (checks.address_line1_check || checks.address_postal_code_check || checks.cvc_check) ? {
        checks: ((
          {
            address_line1_check:       addressLine1Check,
            address_postal_code_check: addressPostalCodeCheck,
            cvc_check:                 cvcCheck,
          }: Stripe.PaymentMethod.Card.Checks,
        ): Exclude<Exclude<Exclude<Exclude<StripeSetupIntentDocument["lastSetupError"], undefined>["paymentMethod"], undefined>["card"], undefined>["checks"], undefined> => ({
          ...(addressLine1Check ? { addressLine1Check } : {}),
          ...(addressPostalCodeCheck ? { addressPostalCodeCheck } : {}),
          ...(cvcCheck ? { cvcCheck } : {}),
        }))(checks),
      } : {}),
      ...(country ? { country } : {}),
      ...(description ? { description } : {}),
      ...(displayBrand ? { displayBrand } : {}),
      expiryMonth,
      expiryYear,
      ...(fingerprint ? { fingerprint } : {}),
      funding,
      last4,
      ...(regulatedStatus ? { regulatedStatus } : {}),
      ...(threeDSecureUsage ? {
        threeDSecureUsage: ((
          {
            supported,
          }: Stripe.PaymentMethod.Card.ThreeDSecureUsage,
        ): Exclude<Exclude<Exclude<Exclude<StripeSetupIntentDocument["lastSetupError"], undefined>["paymentMethod"], undefined>["card"], undefined>["threeDSecureUsage"], undefined> => ({
          supported,
        }))(threeDSecureUsage),
      } : {}),
      ...(wallet ? {
        wallet: ((
          {
            dynamic_last4: dynamicLast4,
            type,
          }: Stripe.PaymentMethod.Card.Wallet,
        ): Exclude<Exclude<Exclude<Exclude<StripeSetupIntentDocument["lastSetupError"], undefined>["paymentMethod"], undefined>["card"], undefined>["wallet"], undefined> => ({
          ...(dynamicLast4 ? { dynamicLast4 } : {}),
          type,
        }))(wallet),
      } : {}),
    }))(card) : FieldValue.delete(),
    created:        Timestamp.fromMillis(created * 1000),
    customer:       typeof customer === "string" ? customer : customer?.id || FieldValue.delete(),
    id,
    livemode,
    type,
    userId,
  };
}

// noinspection JSUnusedGlobalSymbols
export const stripeWebhookEventFunction: HttpsFunction = onRequest(
  {
    ingressSettings: "ALLOW_ALL",
    invoker:         "public",
    secrets:         [
      Stripe_API_Key,
      Stripe_Webhook_Shared_Secret,
    ],
  },
  async (
    request: Request,
    response: NonNullable<Request["res"]>,
  ): Promise<void> => {
    const signature: string | undefined = request.header("stripe-signature");

    if (!signature) {
      response.sendStatus(400).end();

      throw new Error("Something went wrong");
    }

    const stripe: Stripe = new Stripe(Stripe_API_Key.value());

    return stripe.webhooks.constructEventAsync(
      request.rawBody,
      signature,
      Stripe_Webhook_Shared_Secret.value(),
    ).then<void, never>(
      async (event: Stripe.Event): Promise<void> => {
        const firestore: Firestore = getFirestore(getApp());

        switch (event.type) {
          case "account.application.authorized":
            return response.sendStatus(200).end() && void (0);
          case "account.application.deauthorized":
            return response.sendStatus(200).end() && void (0);
          case "account.external_account.created":
            return response.sendStatus(200).end() && void (0);
          case "account.external_account.deleted":
            return response.sendStatus(200).end() && void (0);
          case "account.external_account.updated":
            return response.sendStatus(200).end() && void (0);
          case "account.updated":
            return response.sendStatus(200).end() && void (0);
          case "application_fee.created":
            return response.sendStatus(200).end() && void (0);
          case "application_fee.refund.updated":
            return response.sendStatus(200).end() && void (0);
          case "application_fee.refunded":
            return response.sendStatus(200).end() && void (0);
          case "balance.available":
            return response.sendStatus(200).end() && void (0);
          case "billing.alert.triggered":
            return response.sendStatus(200).end() && void (0);
          case "billing_portal.configuration.created":
            return response.sendStatus(200).end() && void (0);
          case "billing_portal.configuration.updated":
            return response.sendStatus(200).end() && void (0);
          case "billing_portal.session.created":
            return response.sendStatus(200).end() && void (0);
          case "capability.updated":
            return response.sendStatus(200).end() && void (0);
          case "cash_balance.funds_available":
            return response.sendStatus(200).end() && void (0);
          case "charge.captured":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "charge.dispute.closed":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "charge.dispute.created":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "charge.dispute.funds_reinstated":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "charge.dispute.funds_withdrawn":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "charge.dispute.updated":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "charge.expired":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "charge.failed":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "charge.pending":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "charge.refund.updated":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "charge.refunded":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "charge.succeeded":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "charge.updated":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "checkout.session.async_payment_failed":
            return response.sendStatus(200).end() && void (0);
          case "checkout.session.async_payment_succeeded":
            return response.sendStatus(200).end() && void (0);
          case "checkout.session.completed":
            return response.sendStatus(200).end() && void (0);
          case "checkout.session.expired":
            return response.sendStatus(200).end() && void (0);
          case "climate.order.canceled":
            return response.sendStatus(200).end() && void (0);
          case "climate.order.created":
            return response.sendStatus(200).end() && void (0);
          case "climate.order.delayed":
            return response.sendStatus(200).end() && void (0);
          case "climate.order.delivered":
            return response.sendStatus(200).end() && void (0);
          case "climate.order.product_substituted":
            return response.sendStatus(200).end() && void (0);
          case "climate.product.created":
            return response.sendStatus(200).end() && void (0);
          case "climate.product.pricing_updated":
            return response.sendStatus(200).end() && void (0);
          case "coupon.created":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "coupon.deleted":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "coupon.updated":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "credit_note.created":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "credit_note.updated":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "credit_note.voided":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "customer.created":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return (firestore.collection("stripeCustomers").doc(event.data.object.metadata["documentId"]) as DocumentReference<StripeCustomerDocument, StripeCustomerDocument>).set(
              getStripeCustomerDocumentPartialWithFieldValue(event.data.object),
              {
                merge: true,
              },
            ).then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                console.error(error);

                throw new HttpsError(
                  "unknown",
                  "Something went wrong.",
                );
              },
            );
          case "customer.deleted":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return (firestore.collection("stripeCustomers").doc(event.data.object.metadata["documentId"]) as DocumentReference<StripeCustomerDocument, StripeCustomerDocument>).delete().then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                console.error(error);

                throw new HttpsError(
                  "unknown",
                  "Something went wrong.",
                );
              },
            );
          case "customer.discount.created":
            if (!event.data.object.coupon.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.coupon.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "customer.discount.deleted":
            if (!event.data.object.coupon.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.coupon.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "customer.discount.updated":
            if (!event.data.object.coupon.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.coupon.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "customer.source.created":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "customer.source.deleted":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "customer.source.expiring":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "customer.source.updated":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "customer.subscription.created":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "customer.subscription.deleted":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "customer.subscription.paused":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "customer.subscription.pending_update_applied":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "customer.subscription.pending_update_expired":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "customer.subscription.resumed":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "customer.subscription.trial_will_end":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "customer.subscription.updated":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "customer.tax_id.created":
            return response.sendStatus(200).end() && void (0);
          case "customer.tax_id.deleted":
            return response.sendStatus(200).end() && void (0);
          case "customer.tax_id.updated":
            return response.sendStatus(200).end() && void (0);
          case "customer.updated":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return (firestore.collection("stripeCustomers").doc(event.data.object.metadata["documentId"]) as DocumentReference<StripeCustomerDocument, StripeCustomerDocument>).update(getStripeCustomerDocumentPartialWithFieldValue(event.data.object)).then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                console.error(error);

                throw new HttpsError(
                  "unknown",
                  "Something went wrong.",
                );
              },
            );
          case "customer_cash_balance_transaction.created":
            return response.sendStatus(200).end() && void (0);
          case "entitlements.active_entitlement_summary.updated":
            return response.sendStatus(200).end() && void (0);
          case "file.created":
            return response.sendStatus(200).end() && void (0);
          case "financial_connections.account.created":
            return response.sendStatus(200).end() && void (0);
          case "financial_connections.account.deactivated":
            return response.sendStatus(200).end() && void (0);
          case "financial_connections.account.disconnected":
            return response.sendStatus(200).end() && void (0);
          case "financial_connections.account.reactivated":
            return response.sendStatus(200).end() && void (0);
          case "financial_connections.account.refreshed_balance":
            return response.sendStatus(200).end() && void (0);
          case "financial_connections.account.refreshed_ownership":
            return response.sendStatus(200).end() && void (0);
          case "financial_connections.account.refreshed_transactions":
            return response.sendStatus(200).end() && void (0);
          case "identity.verification_session.canceled":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "identity.verification_session.created":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "identity.verification_session.processing":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "identity.verification_session.redacted":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "identity.verification_session.requires_input":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "identity.verification_session.verified":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "invoice.created":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "invoice.deleted":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "invoice.finalization_failed":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "invoice.finalized":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "invoice.marked_uncollectible":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "invoice.overdue":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "invoice.paid":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "invoice.payment_action_required":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "invoice.payment_failed":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "invoice.payment_succeeded":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "invoice.sent":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "invoice.upcoming":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "invoice.updated":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "invoice.voided":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "invoice.will_be_due":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "invoiceitem.created":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "invoiceitem.deleted":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "issuing_authorization.created":
            return response.sendStatus(200).end() && void (0);
          case "issuing_authorization.request":
            return response.sendStatus(200).end() && void (0);
          case "issuing_authorization.updated":
            return response.sendStatus(200).end() && void (0);
          case "issuing_card.created":
            return response.sendStatus(200).end() && void (0);
          case "issuing_card.updated":
            return response.sendStatus(200).end() && void (0);
          case "issuing_cardholder.created":
            return response.sendStatus(200).end() && void (0);
          case "issuing_cardholder.updated":
            return response.sendStatus(200).end() && void (0);
          case "issuing_dispute.closed":
            return response.sendStatus(200).end() && void (0);
          case "issuing_dispute.created":
            return response.sendStatus(200).end() && void (0);
          case "issuing_dispute.funds_reinstated":
            return response.sendStatus(200).end() && void (0);
          case "issuing_dispute.funds_rescinded":
            return response.sendStatus(200).end() && void (0);
          case "issuing_dispute.submitted":
            return response.sendStatus(200).end() && void (0);
          case "issuing_dispute.updated":
            return response.sendStatus(200).end() && void (0);
          case "issuing_personalization_design.activated":
            return response.sendStatus(200).end() && void (0);
          case "issuing_personalization_design.deactivated":
            return response.sendStatus(200).end() && void (0);
          case "issuing_personalization_design.rejected":
            return response.sendStatus(200).end() && void (0);
          case "issuing_personalization_design.updated":
            return response.sendStatus(200).end() && void (0);
          case "issuing_token.created":
            return response.sendStatus(200).end() && void (0);
          case "issuing_token.updated":
            return response.sendStatus(200).end() && void (0);
          case "issuing_transaction.created":
            return response.sendStatus(200).end() && void (0);
          case "issuing_transaction.purchase_details_receipt_updated":
            return response.sendStatus(200).end() && void (0);
          case "issuing_transaction.updated":
            return response.sendStatus(200).end() && void (0);
          case "mandate.updated":
            return response.sendStatus(200).end() && void (0);
          case "payment_intent.amount_capturable_updated":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "payment_intent.canceled":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "payment_intent.created":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "payment_intent.partially_funded":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "payment_intent.payment_failed":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "payment_intent.processing":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "payment_intent.requires_action":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "payment_intent.succeeded":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "payment_link.created":
            return response.sendStatus(200).end() && void (0);
          case "payment_link.updated":
            return response.sendStatus(200).end() && void (0);
          case "payment_method.attached":
            return (firestore.collection("stripePaymentMethods") as CollectionReference<StripePaymentMethodDocument, StripePaymentMethodDocument>).where(
              "id",
              "==",
              event.data.object.id,
            ).get().then<void, never>(
              (stripePaymentMethodDocumentQuerySnapshot: QuerySnapshot<StripePaymentMethodDocument, StripePaymentMethodDocument>): void => {
                if (!stripePaymentMethodDocumentQuerySnapshot.docs.length)
                  return response.status(400).send("The stripe payment method document is missing.").end() && void (0);

                stripe.paymentMethods.update(
                  stripePaymentMethodDocumentQuerySnapshot.docs[0].data().id,
                  {
                    metadata: {
                      documentId: stripePaymentMethodDocumentQuerySnapshot.docs[0].id,
                      userId:     stripePaymentMethodDocumentQuerySnapshot.docs[0].data().userId,
                    },
                  },
                ).then<void, never>(
                  (): void => response.sendStatus(200).end() && void (0),
                  (error: unknown): never => {
                    response.status(500).send(error).end();

                    throw new Error("Something went wrong.");
                  },
                );
              },
              (error: unknown): never => {
                response.status(500).send(error).end();

                throw new Error("Something went wrong.");
              },
            );
          case "payment_method.automatically_updated":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            if (!event.data.object.metadata["userId"])
              return response.status(400).send("A value for `userId` is missing from the object's metadata.").end() && void (0);

            return (firestore.collection("stripePaymentMethods").doc(event.data.object.metadata["documentId"]) as DocumentReference<StripePaymentMethodDocument, StripePaymentMethodDocument>).update(
              getStripePaymentMethodDocumentPartialWithFieldValue(
                event.data.object,
                event.data.object.metadata["userId"],
              ),
            ).then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                console.error(error);

                throw new HttpsError(
                  "unknown",
                  "Something went wrong.",
                );
              },
            );
          case "payment_method.detached":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return (firestore.collection("stripePaymentMethods").doc(event.data.object.metadata["documentId"]) as DocumentReference<StripePaymentMethodDocument, StripePaymentMethodDocument>).delete().then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                console.error(error);

                throw new HttpsError(
                  "unknown",
                  "Something went wrong.",
                );
              },
            );
          case "payment_method.updated":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            if (!event.data.object.metadata["userId"])
              return response.status(400).send("A value for `userId` is missing from the object's metadata.").end() && void (0);

            return (firestore.collection("stripePaymentMethods").doc(event.data.object.metadata["documentId"]) as DocumentReference<StripePaymentMethodDocument, StripePaymentMethodDocument>).update(
              getStripePaymentMethodDocumentPartialWithFieldValue(
                event.data.object,
                event.data.object.metadata["userId"],
              ),
            ).then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                console.error(error);

                throw new HttpsError(
                  "unknown",
                  "Something went wrong.",
                );
              },
            );
          case "payout.canceled":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "payout.created":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "payout.failed":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "payout.paid":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "payout.reconciliation_completed":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "payout.updated":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "person.created":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "person.deleted":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "person.updated":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "plan.created":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "plan.deleted":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "plan.updated":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "price.created":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "price.deleted":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "price.updated":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "product.created":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "product.deleted":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "product.updated":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "promotion_code.created":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "promotion_code.updated":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "quote.accepted":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "quote.canceled":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "quote.created":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "quote.finalized":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "radar.early_fraud_warning.created":
            return response.sendStatus(200).end() && void (0);
          case "radar.early_fraud_warning.updated":
            return response.sendStatus(200).end() && void (0);
          case "refund.created":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "refund.failed":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "refund.updated":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "reporting.report_run.failed":
            return response.sendStatus(200).end() && void (0);
          case "reporting.report_run.succeeded":
            return response.sendStatus(200).end() && void (0);
          case "reporting.report_type.updated":
            return response.sendStatus(200).end() && void (0);
          case "review.closed":
            return response.sendStatus(200).end() && void (0);
          case "review.opened":
            return response.sendStatus(200).end() && void (0);
          case "setup_intent.canceled":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return (firestore.collection("stripeSetupIntents").doc(event.data.object.metadata["documentId"]) as DocumentReference<StripeSetupIntentDocument, StripeSetupIntentDocument>).delete().then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                console.error(error);

                throw new HttpsError(
                  "unknown",
                  "Something went wrong.",
                );
              },
            );
          case "setup_intent.created":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            if (!event.data.object.metadata["userId"])
              return response.status(400).send("A value for `userId` is missing from the object's metadata.").end() && void (0);

            return (firestore.collection("stripeSetupIntents").doc(event.data.object.metadata["documentId"]) as DocumentReference<StripeSetupIntentDocument, StripeSetupIntentDocument>).set(
              getStripeSetupIntentDocumentPartialWithFieldValue(
                event.data.object,
                event.data.object.metadata["userId"],
              ),
              {
                merge: true,
              },
            ).then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                console.error(error);

                throw new HttpsError(
                  "unknown",
                  "Something went wrong.",
                );
              },
            );
          case "setup_intent.requires_action":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            if (!event.data.object.metadata["userId"])
              return response.status(400).send("A value for `userId` is missing from the object's metadata.").end() && void (0);

            return (firestore.collection("stripeSetupIntents").doc(event.data.object.metadata["documentId"]) as DocumentReference<StripeSetupIntentDocument, StripeSetupIntentDocument>).update(
              getStripeSetupIntentDocumentPartialWithFieldValue(
                event.data.object,
                event.data.object.metadata["userId"],
              ),
            ).then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                console.error(error);

                throw new HttpsError(
                  "unknown",
                  "Something went wrong.",
                );
              },
            );
          case "setup_intent.setup_failed":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            if (!event.data.object.metadata["userId"])
              return response.status(400).send("A value for `userId` is missing from the object's metadata.").end() && void (0);

            return (firestore.collection("stripeSetupIntents").doc(event.data.object.metadata["documentId"]) as DocumentReference<StripeSetupIntentDocument, StripeSetupIntentDocument>).update(
              getStripeSetupIntentDocumentPartialWithFieldValue(
                event.data.object,
                event.data.object.metadata["userId"],
              ),
            ).then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                console.error(error);

                throw new HttpsError(
                  "unknown",
                  "Something went wrong.",
                );
              },
            );
          case "setup_intent.succeeded":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return (firestore.collection("stripeSetupIntents").doc(event.data.object.metadata["documentId"]) as DocumentReference<StripeSetupIntentDocument, StripeSetupIntentDocument>).delete().then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                console.error(error);

                throw new HttpsError(
                  "unknown",
                  "Something went wrong.",
                );
              },
            );
          case "sigma.scheduled_query_run.created":
            return response.sendStatus(200).end() && void (0);
          case "source.canceled":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "source.chargeable":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "source.failed":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "source.mandate_notification":
            if (!event.data.object.source.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.source.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "source.refund_attributes_required":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "source.transaction.created":
            return response.sendStatus(200).end() && void (0);
          case "source.transaction.updated":
            return response.sendStatus(200).end() && void (0);
          case "subscription_schedule.aborted":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "subscription_schedule.canceled":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "subscription_schedule.completed":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "subscription_schedule.created":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "subscription_schedule.expiring":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "subscription_schedule.released":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "subscription_schedule.updated":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "tax.settings.updated":
            return response.sendStatus(200).end() && void (0);
          case "tax_rate.created":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "tax_rate.updated":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "terminal.reader.action_failed":
            return response.sendStatus(200).end() && void (0);
          case "terminal.reader.action_succeeded":
            return response.sendStatus(200).end() && void (0);
          case "test_helpers.test_clock.advancing":
            return response.sendStatus(200).end() && void (0);
          case "test_helpers.test_clock.created":
            return response.sendStatus(200).end() && void (0);
          case "test_helpers.test_clock.deleted":
            return response.sendStatus(200).end() && void (0);
          case "test_helpers.test_clock.internal_failure":
            return response.sendStatus(200).end() && void (0);
          case "test_helpers.test_clock.ready":
            return response.sendStatus(200).end() && void (0);
          case "topup.canceled":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "topup.created":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "topup.failed":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "topup.reversed":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "topup.succeeded":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "transfer.created":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "transfer.reversed":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "transfer.updated":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return response.sendStatus(200).end() && void (0);
          case "treasury.credit_reversal.created":
            return response.sendStatus(200).end() && void (0);
          case "treasury.credit_reversal.posted":
            return response.sendStatus(200).end() && void (0);
          case "treasury.debit_reversal.completed":
            return response.sendStatus(200).end() && void (0);
          case "treasury.debit_reversal.created":
            return response.sendStatus(200).end() && void (0);
          case "treasury.debit_reversal.initial_credit_granted":
            return response.sendStatus(200).end() && void (0);
          case "treasury.financial_account.closed":
            return response.sendStatus(200).end() && void (0);
          case "treasury.financial_account.created":
            return response.sendStatus(200).end() && void (0);
          case "treasury.financial_account.features_status_updated":
            return response.sendStatus(200).end() && void (0);
          case "treasury.inbound_transfer.canceled":
            return response.sendStatus(200).end() && void (0);
          case "treasury.inbound_transfer.created":
            return response.sendStatus(200).end() && void (0);
          case "treasury.inbound_transfer.failed":
            return response.sendStatus(200).end() && void (0);
          case "treasury.inbound_transfer.succeeded":
            return response.sendStatus(200).end() && void (0);
          case "treasury.outbound_payment.canceled":
            return response.sendStatus(200).end() && void (0);
          case "treasury.outbound_payment.created":
            return response.sendStatus(200).end() && void (0);
          case "treasury.outbound_payment.expected_arrival_date_updated":
            return response.sendStatus(200).end() && void (0);
          case "treasury.outbound_payment.failed":
            return response.sendStatus(200).end() && void (0);
          case "treasury.outbound_payment.posted":
            return response.sendStatus(200).end() && void (0);
          case "treasury.outbound_payment.returned":
            return response.sendStatus(200).end() && void (0);
          case "treasury.outbound_payment.tracking_details_updated":
            return response.sendStatus(200).end() && void (0);
          case "treasury.outbound_transfer.canceled":
            return response.sendStatus(200).end() && void (0);
          case "treasury.outbound_transfer.created":
            return response.sendStatus(200).end() && void (0);
          case "treasury.outbound_transfer.expected_arrival_date_updated":
            return response.sendStatus(200).end() && void (0);
          case "treasury.outbound_transfer.failed":
            return response.sendStatus(200).end() && void (0);
          case "treasury.outbound_transfer.posted":
            return response.sendStatus(200).end() && void (0);
          case "treasury.outbound_transfer.returned":
            return response.sendStatus(200).end() && void (0);
          case "treasury.outbound_transfer.tracking_details_updated":
            return response.sendStatus(200).end() && void (0);
          case "treasury.received_credit.created":
            return response.sendStatus(200).end() && void (0);
          case "treasury.received_credit.failed":
            return response.sendStatus(200).end() && void (0);
          case "treasury.received_credit.succeeded":
            return response.sendStatus(200).end() && void (0);
          case "treasury.received_debit.created":
            return response.sendStatus(200).end() && void (0);
          default:
            return response.sendStatus(400).end() && void (0);
        }
      },
      (error: unknown): never => {
        response.status(500).send(error).end();

        throw new Error("Something went wrong.");
      },
    );
  },
);
