import { type HttpsFunction, onRequest, type Request }  from "firebase-functions/https";
import Stripe                                           from "stripe";
import { Stripe_API_Key, Stripe_Webhook_Shared_Secret } from "../../secrets";


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
    } else {
      return new Stripe(Stripe_API_Key.value()).webhooks.constructEventAsync(
        request.rawBody,
        signature,
        Stripe_Webhook_Shared_Secret.value(),
      ).then<void, never>(
        (event: Stripe.Event): void => {
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
              return response.sendStatus(200).end() && void (0);
            case "charge.dispute.closed":
              return response.sendStatus(200).end() && void (0);
            case "charge.dispute.created":
              return response.sendStatus(200).end() && void (0);
            case "charge.dispute.funds_reinstated":
              return response.sendStatus(200).end() && void (0);
            case "charge.dispute.funds_withdrawn":
              return response.sendStatus(200).end() && void (0);
            case "charge.dispute.updated":
              return response.sendStatus(200).end() && void (0);
            case "charge.expired":
              return response.sendStatus(200).end() && void (0);
            case "charge.failed":
              return response.sendStatus(200).end() && void (0);
            case "charge.pending":
              return response.sendStatus(200).end() && void (0);
            case "charge.refund.updated":
              return response.sendStatus(200).end() && void (0);
            case "charge.refunded":
              return response.sendStatus(200).end() && void (0);
            case "charge.succeeded":
              return response.sendStatus(200).end() && void (0);
            case "charge.updated":
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
              return response.sendStatus(200).end() && void (0);
            case "coupon.deleted":
              return response.sendStatus(200).end() && void (0);
            case "coupon.updated":
              return response.sendStatus(200).end() && void (0);
            case "credit_note.created":
              return response.sendStatus(200).end() && void (0);
            case "credit_note.updated":
              return response.sendStatus(200).end() && void (0);
            case "credit_note.voided":
              return response.sendStatus(200).end() && void (0);
            case "customer.created":
              return response.sendStatus(200).end() && void (0);
            case "customer.deleted":
              return response.sendStatus(200).end() && void (0);
            case "customer.discount.created":
              return response.sendStatus(200).end() && void (0);
            case "customer.discount.deleted":
              return response.sendStatus(200).end() && void (0);
            case "customer.discount.updated":
              return response.sendStatus(200).end() && void (0);
            case "customer.source.created":
              return response.sendStatus(200).end() && void (0);
            case "customer.source.deleted":
              return response.sendStatus(200).end() && void (0);
            case "customer.source.expiring":
              return response.sendStatus(200).end() && void (0);
            case "customer.source.updated":
              return response.sendStatus(200).end() && void (0);
            case "customer.subscription.created":
              return response.sendStatus(200).end() && void (0);
            case "customer.subscription.deleted":
              return response.sendStatus(200).end() && void (0);
            case "customer.subscription.paused":
              return response.sendStatus(200).end() && void (0);
            case "customer.subscription.pending_update_applied":
              return response.sendStatus(200).end() && void (0);
            case "customer.subscription.pending_update_expired":
              return response.sendStatus(200).end() && void (0);
            case "customer.subscription.resumed":
              return response.sendStatus(200).end() && void (0);
            case "customer.subscription.trial_will_end":
              return response.sendStatus(200).end() && void (0);
            case "customer.subscription.updated":
              return response.sendStatus(200).end() && void (0);
            case "customer.tax_id.created":
              return response.sendStatus(200).end() && void (0);
            case "customer.tax_id.deleted":
              return response.sendStatus(200).end() && void (0);
            case "customer.tax_id.updated":
              return response.sendStatus(200).end() && void (0);
            case "customer.updated":
              return response.sendStatus(200).end() && void (0);
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
              return response.sendStatus(200).end() && void (0);
            case "identity.verification_session.created":
              return response.sendStatus(200).end() && void (0);
            case "identity.verification_session.processing":
              return response.sendStatus(200).end() && void (0);
            case "identity.verification_session.redacted":
              return response.sendStatus(200).end() && void (0);
            case "identity.verification_session.requires_input":
              return response.sendStatus(200).end() && void (0);
            case "identity.verification_session.verified":
              return response.sendStatus(200).end() && void (0);
            case "invoice.created":
              return response.sendStatus(200).end() && void (0);
            case "invoice.deleted":
              return response.sendStatus(200).end() && void (0);
            case "invoice.finalization_failed":
              return response.sendStatus(200).end() && void (0);
            case "invoice.finalized":
              return response.sendStatus(200).end() && void (0);
            case "invoice.marked_uncollectible":
              return response.sendStatus(200).end() && void (0);
            case "invoice.overdue":
              return response.sendStatus(200).end() && void (0);
            case "invoice.paid":
              return response.sendStatus(200).end() && void (0);
            case "invoice.payment_action_required":
              return response.sendStatus(200).end() && void (0);
            case "invoice.payment_failed":
              return response.sendStatus(200).end() && void (0);
            case "invoice.payment_succeeded":
              return response.sendStatus(200).end() && void (0);
            case "invoice.sent":
              return response.sendStatus(200).end() && void (0);
            case "invoice.upcoming":
              return response.sendStatus(200).end() && void (0);
            case "invoice.updated":
              return response.sendStatus(200).end() && void (0);
            case "invoice.voided":
              return response.sendStatus(200).end() && void (0);
            case "invoice.will_be_due":
              return response.sendStatus(200).end() && void (0);
            case "invoiceitem.created":
              return response.sendStatus(200).end() && void (0);
            case "invoiceitem.deleted":
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
              return response.sendStatus(200).end() && void (0);
            case "payment_intent.canceled":
              return response.sendStatus(200).end() && void (0);
            case "payment_intent.created":
              return response.sendStatus(200).end() && void (0);
            case "payment_intent.partially_funded":
              return response.sendStatus(200).end() && void (0);
            case "payment_intent.payment_failed":
              return response.sendStatus(200).end() && void (0);
            case "payment_intent.processing":
              return response.sendStatus(200).end() && void (0);
            case "payment_intent.requires_action":
              return response.sendStatus(200).end() && void (0);
            case "payment_intent.succeeded":
              return response.sendStatus(200).end() && void (0);
            case "payment_link.created":
              return response.sendStatus(200).end() && void (0);
            case "payment_link.updated":
              return response.sendStatus(200).end() && void (0);
            case "payment_method.attached":
              return response.sendStatus(200).end() && void (0);
            case "payment_method.automatically_updated":
              return response.sendStatus(200).end() && void (0);
            case "payment_method.detached":
              return response.sendStatus(200).end() && void (0);
            case "payment_method.updated":
              return response.sendStatus(200).end() && void (0);
            case "payout.canceled":
              return response.sendStatus(200).end() && void (0);
            case "payout.created":
              return response.sendStatus(200).end() && void (0);
            case "payout.failed":
              return response.sendStatus(200).end() && void (0);
            case "payout.paid":
              return response.sendStatus(200).end() && void (0);
            case "payout.reconciliation_completed":
              return response.sendStatus(200).end() && void (0);
            case "payout.updated":
              return response.sendStatus(200).end() && void (0);
            case "person.created":
              return response.sendStatus(200).end() && void (0);
            case "person.deleted":
              return response.sendStatus(200).end() && void (0);
            case "person.updated":
              return response.sendStatus(200).end() && void (0);
            case "plan.created":
              return response.sendStatus(200).end() && void (0);
            case "plan.deleted":
              return response.sendStatus(200).end() && void (0);
            case "plan.updated":
              return response.sendStatus(200).end() && void (0);
            case "price.created":
              return response.sendStatus(200).end() && void (0);
            case "price.deleted":
              return response.sendStatus(200).end() && void (0);
            case "price.updated":
              return response.sendStatus(200).end() && void (0);
            case "product.created":
              return response.sendStatus(200).end() && void (0);
            case "product.deleted":
              return response.sendStatus(200).end() && void (0);
            case "product.updated":
              return response.sendStatus(200).end() && void (0);
            case "promotion_code.created":
              return response.sendStatus(200).end() && void (0);
            case "promotion_code.updated":
              return response.sendStatus(200).end() && void (0);
            case "quote.accepted":
              return response.sendStatus(200).end() && void (0);
            case "quote.canceled":
              return response.sendStatus(200).end() && void (0);
            case "quote.created":
              return response.sendStatus(200).end() && void (0);
            case "quote.finalized":
              return response.sendStatus(200).end() && void (0);
            case "radar.early_fraud_warning.created":
              return response.sendStatus(200).end() && void (0);
            case "radar.early_fraud_warning.updated":
              return response.sendStatus(200).end() && void (0);
            case "refund.created":
              return response.sendStatus(200).end() && void (0);
            case "refund.failed":
              return response.sendStatus(200).end() && void (0);
            case "refund.updated":
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
              return response.sendStatus(200).end() && void (0);
            case "setup_intent.created":
              return response.sendStatus(200).end() && void (0);
            case "setup_intent.requires_action":
              return response.sendStatus(200).end() && void (0);
            case "setup_intent.setup_failed":
              return response.sendStatus(200).end() && void (0);
            case "setup_intent.succeeded":
              return response.sendStatus(200).end() && void (0);
            case "sigma.scheduled_query_run.created":
              return response.sendStatus(200).end() && void (0);
            case "source.canceled":
              return response.sendStatus(200).end() && void (0);
            case "source.chargeable":
              return response.sendStatus(200).end() && void (0);
            case "source.failed":
              return response.sendStatus(200).end() && void (0);
            case "source.mandate_notification":
              return response.sendStatus(200).end() && void (0);
            case "source.refund_attributes_required":
              return response.sendStatus(200).end() && void (0);
            case "source.transaction.created":
              return response.sendStatus(200).end() && void (0);
            case "source.transaction.updated":
              return response.sendStatus(200).end() && void (0);
            case "subscription_schedule.aborted":
              return response.sendStatus(200).end() && void (0);
            case "subscription_schedule.canceled":
              return response.sendStatus(200).end() && void (0);
            case "subscription_schedule.completed":
              return response.sendStatus(200).end() && void (0);
            case "subscription_schedule.created":
              return response.sendStatus(200).end() && void (0);
            case "subscription_schedule.expiring":
              return response.sendStatus(200).end() && void (0);
            case "subscription_schedule.released":
              return response.sendStatus(200).end() && void (0);
            case "subscription_schedule.updated":
              return response.sendStatus(200).end() && void (0);
            case "tax.settings.updated":
              return response.sendStatus(200).end() && void (0);
            case "tax_rate.created":
              return response.sendStatus(200).end() && void (0);
            case "tax_rate.updated":
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
              return response.sendStatus(200).end() && void (0);
            case "topup.created":
              return response.sendStatus(200).end() && void (0);
            case "topup.failed":
              return response.sendStatus(200).end() && void (0);
            case "topup.reversed":
              return response.sendStatus(200).end() && void (0);
            case "topup.succeeded":
              return response.sendStatus(200).end() && void (0);
            case "transfer.created":
              return response.sendStatus(200).end() && void (0);
            case "transfer.reversed":
              return response.sendStatus(200).end() && void (0);
            case "transfer.updated":
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
    }
  },
);
