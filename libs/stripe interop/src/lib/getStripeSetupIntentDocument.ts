import { type StripeSetupIntentDocument } from "@standard/interfaces";
import { Timestamp, type WithFieldValue } from "firebase-admin/firestore";
import type Stripe                        from "stripe";
import toDocumentPartial                  from "./toDocumentPartial";


function getStripeSetupIntentDocument(
  stripeSetupIntent: Stripe.SetupIntent,
  additionalFields: { userId: string },
): StripeSetupIntentDocument;
function getStripeSetupIntentDocument(
  stripeSetupIntent: Stripe.SetupIntent,
  additionalFields: { userId: string },
  withFieldValue?: boolean,
): WithFieldValue<StripeSetupIntentDocument>;
function getStripeSetupIntentDocument(
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
  {
    userId,
  }: { userId: string },
  withFieldValue?: boolean,
): StripeSetupIntentDocument | WithFieldValue<StripeSetupIntentDocument> {
  return {
    ...toDocumentPartial(
      { attachToSelf },
      withFieldValue,
    ),
    ...toDocumentPartial(
      {
        automaticPaymentMethods: automaticPaymentMethods && (automaticPaymentMethods.allow_redirects || automaticPaymentMethods.enabled) ? ((
          {
            allow_redirects: allowRedirects,
            enabled,
          }: Stripe.SetupIntent.AutomaticPaymentMethods,
        ): Exclude<StripeSetupIntentDocument["automaticPaymentMethods"], undefined> => ({
          ...toDocumentPartial({ allowRedirects }),
          ...toDocumentPartial({ enabled }),
        }))(automaticPaymentMethods) : undefined,
      },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { cancellationReason },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { clientSecret },
      withFieldValue,
    ),
    created: Timestamp.fromMillis(created * 1000),
    ...toDocumentPartial(
      { customer },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { description },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { flowDirections },
      withFieldValue,
    ),
    id,
    ...toDocumentPartial(
      {
        lastSetupError: lastSetupError ? ((
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
          ...toDocumentPartial({ adviceCode }),
          ...toDocumentPartial({ code }),
          ...toDocumentPartial({ declineCode }),
          ...toDocumentPartial({ docUrl }),
          ...toDocumentPartial({ message }),
          ...toDocumentPartial({ networkAdviceCode }),
          ...toDocumentPartial({ networkDeclineCode }),
          ...toDocumentPartial({ param }),
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
                    ...toDocumentPartial({ city }),
                    ...toDocumentPartial({ country }),
                    ...toDocumentPartial({ line1 }),
                    ...toDocumentPartial({ line2 }),
                    ...toDocumentPartial({ postalCode }),
                    ...toDocumentPartial({ state }),
                  }))(address),
                } : {}),
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
                  ): Exclude<Exclude<Exclude<StripeSetupIntentDocument["lastSetupError"], undefined>["paymentMethod"], undefined>["card"], undefined> => ({
                    brand,
                    ...toDocumentPartial(
                      {
                        checks: checks && (checks.address_line1_check || checks.address_postal_code_check || checks.cvc_check) ? ((
                          {
                            address_line1_check:       addressLine1Check,
                            address_postal_code_check: addressPostalCodeCheck,
                            cvc_check:                 cvcCheck,
                          }: Stripe.PaymentMethod.Card.Checks,
                        ): Exclude<Exclude<Exclude<Exclude<StripeSetupIntentDocument["lastSetupError"], undefined>["paymentMethod"], undefined>["card"], undefined>["checks"], undefined> => ({
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
                        ): Exclude<Exclude<Exclude<Exclude<StripeSetupIntentDocument["lastSetupError"], undefined>["paymentMethod"], undefined>["card"], undefined>["threeDSecureUsage"], undefined> => ({
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
                        ): Exclude<Exclude<Exclude<Exclude<StripeSetupIntentDocument["lastSetupError"], undefined>["paymentMethod"], undefined>["card"], undefined>["wallet"], undefined> => ({
                          ...toDocumentPartial({ dynamicLast4 }),
                          type,
                        }))(wallet) : undefined,
                      },
                    ),
                  }))(card) : undefined,
                },
              ),
              created: Timestamp.fromMillis(created * 1000),
              ...toDocumentPartial({ customer }),
              id,
              livemode,
              type,
            }))(paymentMethod),
          } : {}),
          paymentMethodType,
          type,
        }))(lastSetupError) : undefined,
      },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { latestAttempt },
      withFieldValue,
    ),
    livemode,
    ...toDocumentPartial(
      { mandate },
      withFieldValue,
    ),
    ...toDocumentPartial(
      {
        nextAction: nextAction ? ((
          {
            cashapp_handle_redirect_or_display_qr_code: cashappHandleRedirectOrDisplayQrCode,
            redirect_to_url:                            redirectToUrl,
            type,
            use_stripe_sdk:            useStripeSdk,
            verify_with_microdeposits: verifyWithMicrodeposits,
          }: Stripe.SetupIntent.NextAction,
        ): Exclude<StripeSetupIntentDocument["nextAction"], undefined> => ({
          ...toDocumentPartial(
            {
              cashappHandleRedirectOrDisplayQrCode: cashappHandleRedirectOrDisplayQrCode ? ((
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
              }))(cashappHandleRedirectOrDisplayQrCode) : undefined,
            },
          ),
          ...toDocumentPartial(
            {
              redirectToUrl: redirectToUrl && (redirectToUrl.return_url || redirectToUrl.url) ? ((
                {
                  return_url: returnUrl,
                  url,
                }: Stripe.SetupIntent.NextAction.RedirectToUrl,
              ): Exclude<Exclude<StripeSetupIntentDocument["nextAction"], undefined>["redirectToUrl"], undefined> => ({
                ...toDocumentPartial({ returnUrl }),
                ...toDocumentPartial({ url }),
              }))(redirectToUrl) : undefined,
            },
          ),
          type,
          useStripeSdk,
          ...toDocumentPartial(
            {
              verifyWithMicrodeposits: verifyWithMicrodeposits ? ((
                {
                  arrival_date:            arrivalDate,
                  hosted_verification_url: hostedVerificationUrl,
                  microdeposit_type:       microdepositType,
                }: Stripe.SetupIntent.NextAction.VerifyWithMicrodeposits,
              ): Exclude<Exclude<StripeSetupIntentDocument["nextAction"], undefined>["verifyWithMicrodeposits"], undefined> => ({
                arrivalDate: Timestamp.fromMillis(arrivalDate * 1000),
                hostedVerificationUrl,
                ...toDocumentPartial({ microdepositType }),
              }))(verifyWithMicrodeposits) : undefined,
            },
          ),
        }))(nextAction) : undefined,
      },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { paymentMethod },
      withFieldValue,
    ),
    ...toDocumentPartial(
      {
        paymentMethodConfigurationDetails: paymentMethodConfigurationDetails ? ((
          {
            id,
            parent,
          }: Stripe.SetupIntent.PaymentMethodConfigurationDetails,
        ): Exclude<StripeSetupIntentDocument["paymentMethodConfigurationDetails"], undefined> => ({
          id,
          ...toDocumentPartial({ parent }),
        }))(paymentMethodConfigurationDetails) : undefined,
      },
      withFieldValue,
    ),
    ...toDocumentPartial(
      {
        paymentMethodOptions: paymentMethodOptions ? ((
          {
            card,
          }: Stripe.SetupIntent.PaymentMethodOptions,
        ): Exclude<StripeSetupIntentDocument["paymentMethodOptions"], undefined> => ({
          ...toDocumentPartial(
            {
              card: card ? ((
                {
                  mandate_options: mandateOptions,
                  network,
                  request_three_d_secure: requestThreeDSecure,
                }: Stripe.SetupIntent.PaymentMethodOptions.Card,
              ): Exclude<Exclude<StripeSetupIntentDocument["paymentMethodOptions"], undefined>["card"], undefined> => ({
                ...toDocumentPartial(
                  {
                    mandateOptions: mandateOptions ? ((
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
                      ...toDocumentPartial({ description }),
                      amount,
                      amountType,
                      currency,
                      ...toDocumentPartial({ endDate: endDate ? Timestamp.fromMillis(endDate * 1000) : undefined }),
                      interval,
                      ...toDocumentPartial({ intervalCount }),
                      reference,
                      startDate: Timestamp.fromMillis(startDate * 1000),
                      ...toDocumentPartial({ supportedTypes }),
                    }))(mandateOptions) : undefined,
                  },
                ),
                ...toDocumentPartial({ network }),
                ...toDocumentPartial({ requestThreeDSecure }),
              }))(card) : undefined,
            },
          ),
        }))(paymentMethodOptions) : undefined,
      },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { paymentMethodTypes },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { singleUseMandate },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { status },
      withFieldValue,
    ),
    ...toDocumentPartial(
      { usage },
      withFieldValue,
    ),
    ...{
      userId,
    },
  };
}

export default getStripeSetupIntentDocument;
