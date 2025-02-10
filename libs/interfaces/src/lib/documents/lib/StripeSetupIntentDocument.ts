import { type Timestamp as AdminTimestamp } from "firebase-admin/firestore";
import { type Timestamp }                   from "firebase/firestore";


export interface StripeSetupIntentDocument {
  "attachToSelf"?: boolean;
  "asyncDeleted"?: AdminTimestamp | Timestamp;
  "automaticPaymentMethods"?: {
    "allowRedirects"?: "always" | "never";
    "enabled"?: boolean;
  };
  "cancellationReason"?: "abandoned" | "duplicate" | "requested_by_customer";
  "clientSecret"?: string;
  "created"?: AdminTimestamp | Timestamp;
  "customer"?: string;
  "description"?: string;
  "flowDirections"?: ("inbound" | "outbound")[];
  "id"?: string;
  "lastSetupError"?: {
    "adviceCode"?: string;
    "code"?: "account_closed" | "account_country_invalid_address" | "account_error_country_change_requires_additional_steps" | "account_information_mismatch" | "account_invalid" | "account_number_invalid" | "acss_debit_session_incomplete" | "alipay_upgrade_required" | "amount_too_large" | "amount_too_small" | "api_key_expired" | "application_fees_not_allowed" | "authentication_required" | "balance_insufficient" | "balance_invalid_parameter" | "bank_account_bad_routing_numbers" | "bank_account_declined" | "bank_account_exists" | "bank_account_restricted" | "bank_account_unusable" | "bank_account_unverified" | "bank_account_verification_failed" | "billing_invalid_mandate" | "bitcoin_upgrade_required" | "capture_charge_authorization_expired" | "capture_unauthorized_payment" | "card_decline_rate_limit_exceeded" | "card_declined" | "cardholder_phone_number_required" | "charge_already_captured" | "charge_already_refunded" | "charge_disputed" | "charge_exceeds_source_limit" | "charge_exceeds_transaction_limit" | "charge_expired_for_capture" | "charge_invalid_parameter" | "charge_not_refundable" | "clearing_code_unsupported" | "country_code_invalid" | "country_unsupported" | "coupon_expired" | "customer_max_payment_methods" | "customer_max_subscriptions" | "customer_tax_location_invalid" | "debit_not_authorized" | "email_invalid" | "expired_card" | "financial_connections_account_inactive" | "financial_connections_no_successful_transaction_refresh" | "forwarding_api_inactive" | "forwarding_api_invalid_parameter" | "forwarding_api_upstream_connection_error" | "forwarding_api_upstream_connection_timeout" | "idempotency_key_in_use" | "incorrect_address" | "incorrect_cvc" | "incorrect_number" | "incorrect_zip" | "instant_payouts_config_disabled" | "instant_payouts_currency_disabled" | "instant_payouts_limit_exceeded" | "instant_payouts_unsupported" | "insufficient_funds" | "intent_invalid_state" | "intent_verification_method_missing" | "invalid_card_type" | "invalid_characters" | "invalid_charge_amount" | "invalid_cvc" | "invalid_expiry_month" | "invalid_expiry_year" | "invalid_mandate_reference_prefix_format" | "invalid_number" | "invalid_source_usage" | "invalid_tax_location" | "invoice_no_customer_line_items" | "invoice_no_payment_method_types" | "invoice_no_subscription_line_items" | "invoice_not_editable" | "invoice_on_behalf_of_not_editable" | "invoice_payment_intent_requires_action" | "invoice_upcoming_none" | "livemode_mismatch" | "lock_timeout" | "missing" | "no_account" | "not_allowed_on_standard_account" | "out_of_inventory" | "ownership_declaration_not_allowed" | "parameter_invalid_empty" | "parameter_invalid_integer" | "parameter_invalid_string_blank" | "parameter_invalid_string_empty" | "parameter_missing" | "parameter_unknown" | "parameters_exclusive" | "payment_intent_action_required" | "payment_intent_authentication_failure" | "payment_intent_incompatible_payment_method" | "payment_intent_invalid_parameter" | "payment_intent_konbini_rejected_confirmation_number" | "payment_intent_mandate_invalid" | "payment_intent_payment_attempt_expired" | "payment_intent_payment_attempt_failed" | "payment_intent_unexpected_state" | "payment_method_bank_account_already_verified" | "payment_method_bank_account_blocked" | "payment_method_billing_details_address_missing" | "payment_method_configuration_failures" | "payment_method_currency_mismatch" | "payment_method_customer_decline" | "payment_method_invalid_parameter" | "payment_method_invalid_parameter_testmode" | "payment_method_microdeposit_failed" | "payment_method_microdeposit_verification_amounts_invalid" | "payment_method_microdeposit_verification_amounts_mismatch" | "payment_method_microdeposit_verification_attempts_exceeded" | "payment_method_microdeposit_verification_descriptor_code_mismatch" | "payment_method_microdeposit_verification_timeout" | "payment_method_not_available" | "payment_method_provider_decline" | "payment_method_provider_timeout" | "payment_method_unactivated" | "payment_method_unexpected_state" | "payment_method_unsupported_type" | "payout_reconciliation_not_ready" | "payouts_limit_exceeded" | "payouts_not_allowed" | "platform_account_required" | "platform_api_key_expired" | "postal_code_invalid" | "processing_error" | "product_inactive" | "progressive_onboarding_limit_exceeded" | "rate_limit" | "refer_to_customer" | "refund_disputed_payment" | "resource_already_exists" | "resource_missing" | "return_intent_already_processed" | "routing_number_invalid" | "secret_key_required" | "sepa_unsupported_account" | "setup_attempt_failed" | "setup_intent_authentication_failure" | "setup_intent_invalid_parameter" | "setup_intent_mandate_invalid" | "setup_intent_setup_attempt_expired" | "setup_intent_unexpected_state" | "shipping_address_invalid" | "shipping_calculation_failed" | "sku_inactive" | "state_unsupported" | "status_transition_invalid" | "stripe_tax_inactive" | "tax_id_invalid" | "taxes_calculation_failed" | "terminal_location_country_unsupported" | "terminal_reader_busy" | "terminal_reader_hardware_fault" | "terminal_reader_invalid_location_for_activation" | "terminal_reader_invalid_location_for_payment" | "terminal_reader_offline" | "terminal_reader_timeout" | "testmode_charges_only" | "tls_version_unsupported" | "token_already_used" | "token_card_network_invalid" | "token_in_use" | "transfer_source_balance_parameters_mismatch" | "transfers_not_allowed" | "url_invalid";
    "declineCode"?: string;
    "docUrl"?: string;
    "message"?: string;
    "networkAdviceCode"?: string;
    "networkDeclineCode"?: string;
    "param"?: string;
    "paymentMethod"?: {
      "allowRedisplay"?: "always" | "limited" | "unspecified";
      "billingDetails": {
        "address"?: {
          "city"?: string;
          "country"?: string;
          "line1"?: string;
          "line2"?: string;
          "postalCode"?: string;
          "state"?: string;
        };
        "email"?: string;
        "name"?: string;
        "phone"?: string;
      };
      "card"?: {
        "brand": string;
        "checks"?: {
          "addressLine1Check"?: string;
          "addressPostalCodeCheck"?: string;
          "cvcCheck"?: string;
        };
        "country"?: string;
        "description"?: string;
        "displayBrand"?: string;
        "expiryMonth": number;
        "expiryYear": number;
        "fingerprint"?: string;
        "funding": string;
        "last4": string;
        "regulatedStatus"?: "regulated" | "unregulated";
        "threeDSecureUsage"?: {
          "supported": boolean;
        };
        "wallet"?: {
          "dynamicLast4"?: string;
          "type": "amex_express_checkout" | "apple_pay" | "google_pay" | "link" | "masterpass" | "samsung_pay" | "visa_checkout";
        };
      };
      "created": AdminTimestamp | Timestamp;
      "customer"?: string;
      "id": string;
      "livemode": boolean;
      "type": "acss_debit" | "affirm" | "afterpay_clearpay" | "alipay" | "alma" | "amazon_pay" | "au_becs_debit" | "bacs_debit" | "bancontact" | "blik" | "boleto" | "card" | "card_present" | "cashapp" | "customer_balance" | "eps" | "fpx" | "giropay" | "grabpay" | "ideal" | "interac_present" | "kakao_pay" | "klarna" | "konbini" | "kr_card" | "link" | "mobilepay" | "multibanco" | "naver_pay" | "oxxo" | "p24" | "pay_by_bank" | "payco" | "paynow" | "paypal" | "pix" | "promptpay" | "revolut_pay" | "samsung_pay" | "sepa_debit" | "sofort" | "swish" | "twint" | "us_bank_account" | "wechat_pay" | "zip";
    };
    "paymentMethodType"?: string;
    "type": "api_error" | "card_error" | "idempotency_error" | "invalid_request_error";
  };
  "latestAttempt"?: string;
  "livemode"?: boolean;
  "mandate"?: string;
  "nextAction"?: {
    "cashappHandleRedirectOrDisplayQrCode"?: {
      "hostedInstructionsUrl": string;
      "mobileAuthUrl": string;
      "qrCode": {
        "expiresAt": AdminTimestamp | Timestamp;
        "imageUrlPng": string;
        "imageUrlSvg": string;
      };
    };
    "redirectToUrl"?: {
      "returnUrl"?: string;
      "url"?: string;
    };
    "type": string;
    "useStripeSdk"?: object;
    "verifyWithMicrodeposits"?: {
      "arrivalDate": AdminTimestamp | Timestamp;
      "hostedVerificationUrl": string;
      "microdepositType"?: "amounts" | "descriptor_code";
    };
  };
  "paymentMethod"?: string;
  "paymentMethodConfigurationDetails"?: {
    "id": string;
    "parent"?: string;
  };
  "paymentMethodOptions"?: {
    "card"?: {
      "mandateOptions"?: {
        "amount": number;
        "amountType": "fixed" | "maximum";
        "currency": string;
        "description"?: string;
        "endDate"?: AdminTimestamp | Timestamp;
        "interval": "day" | "month" | "sporadic" | "week" | "year";
        "intervalCount"?: number;
        "reference": string;
        "startDate": AdminTimestamp | Timestamp;
        "supportedTypes"?: "india"[];
      };
      "network"?: "amex" | "cartes_bancaires" | "diners" | "discover" | "eftpos_au" | "girocard" | "interac" | "jcb" | "link" | "mastercard" | "unionpay" | "unknown" | "visa";
      "requestThreeDSecure"?: "any" | "automatic" | "challenge";
    };
  };
  "paymentMethodTypes"?: string[];
  "singleUseMandate"?: string;
  "status"?: "canceled" | "processing" | "requires_action" | "requires_confirmation" | "requires_payment_method" | "succeeded";
  "usage"?: string;
  "userId": string;
}
