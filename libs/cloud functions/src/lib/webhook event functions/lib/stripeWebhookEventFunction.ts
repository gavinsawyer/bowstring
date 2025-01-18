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
    if (!request.headers["stripe-signature"])
      return response.sendStatus(400).end() && void (0);

    const stripe: Stripe = new Stripe(Stripe_API_Key.value());

    return stripe.webhooks.constructEventAsync(
      request.rawBody,
      request.headers["stripe-signature"],
      Stripe_Webhook_Shared_Secret.value(),
    ).then<void, never>(
      (event: Stripe.Event): void => {
        switch (event.type) {
          case "account.application.authorized": {
            const application: Stripe.Application = event.data.object;
            // Then define and call a function to handle the event account.application.authorized
            break;
          }
          case "account.application.deauthorized": {
            const application: Stripe.Application = event.data.object;
            // Then define and call a function to handle the event account.application.deauthorized
            break;
          }
          case "account.updated": {
            const account: Stripe.Account = event.data.object;
            // Then define and call a function to handle the event account.updated
            break;
          }
          case "account.external_account.created": {
            const externalAccount: Stripe.ExternalAccount = event.data.object;
            // Then define and call a function to handle the event account.external_account.created
            break;
          }
          case "account.external_account.deleted": {
            const externalAccount: Stripe.ExternalAccount = event.data.object;
            // Then define and call a function to handle the event account.external_account.deleted
            break;
          }
          case "account.external_account.updated": {
            const externalAccount: Stripe.ExternalAccount = event.data.object;
            // Then define and call a function to handle the event account.external_account.updated
            break;
          }
          case "application_fee.created": {
            const applicationFee: Stripe.ApplicationFee = event.data.object;
            // Then define and call a function to handle the event account.external_account.updated
            break;
          }
          case "application_fee.refund.updated": {
            const feeRefund: Stripe.FeeRefund = event.data.object;
            // Then define and call a function to handle the event account.external_account.updated
            break;
          }
          case "application_fee.refunded": {
            const applicationFee: Stripe.ApplicationFee = event.data.object;
            // Then define and call a function to handle the event account.external_account.updated
            break;
          }
          case "balance.available": {
            const balance: Stripe.Balance = event.data.object;
            // Then define and call a function to handle the event balance.available
            break;
          }
          case "billing.alert.triggered": {
            const alertTriggered: Stripe.Billing.AlertTriggered = event.data.object;
            // Then define and call a function to handle the event billing.alert.triggered
            break;
          }
          case "billing_portal.configuration.created": {
            const configuration: Stripe.BillingPortal.Configuration = event.data.object;
            // Then define and call a function to handle the event billing_portal.configuration.created
            break;
          }
          case "billing_portal.configuration.updated": {
            const configuration: Stripe.BillingPortal.Configuration = event.data.object;
            // Then define and call a function to handle the event billing_portal.configuration.updated
            break;
          }
          case "billing_portal.session.created": {
            const session: Stripe.BillingPortal.Session = event.data.object;
            // Then define and call a function to handle the event billing_portal.session.created
            break;
          }
          case "capability.updated": {
            const capability: Stripe.Capability = event.data.object;
            // Then define and call a function to handle the event capability.updated
            break;
          }
          case "cash_balance.funds_available": {
            const cashBalance: Stripe.CashBalance = event.data.object;
            // Then define and call a function to handle the event cash_balance.funds_available
            break;
          }
          case "charge.captured": {
            const charge: Stripe.Charge = event.data.object;
            // Then define and call a function to handle the event charge.captured
            break;
          }
          case "charge.expired": {
            const charge: Stripe.Charge = event.data.object;
            // Then define and call a function to handle the event charge.expired
            break;
          }
          case "charge.failed": {
            const charge: Stripe.Charge = event.data.object;
            // Then define and call a function to handle the event charge.failed
            break;
          }
          case "charge.pending": {
            const charge: Stripe.Charge = event.data.object;
            // Then define and call a function to handle the event charge.pending
            break;
          }
          case "charge.refunded": {
            const charge: Stripe.Charge = event.data.object;
            // Then define and call a function to handle the event charge.refunded
            break;
          }
          case "charge.succeeded": {
            const charge: Stripe.Charge = event.data.object;
            // Then define and call a function to handle the event charge.succeeded
            break;
          }
          case "charge.updated": {
            const charge: Stripe.Charge = event.data.object;
            // Then define and call a function to handle the event charge.updated
            break;
          }
          case "charge.dispute.closed": {
            const dispute: Stripe.Dispute = event.data.object;
            // Then define and call a function to handle the event charge.dispute.closed
            break;
          }
          case "charge.dispute.created": {
            const dispute: Stripe.Dispute = event.data.object;
            // Then define and call a function to handle the event charge.dispute.created
            break;
          }
          case "charge.dispute.funds_reinstated": {
            const dispute: Stripe.Dispute = event.data.object;
            // Then define and call a function to handle the event charge.dispute.funds_reinstated
            break;
          }
          case "charge.dispute.funds_withdrawn": {
            const dispute: Stripe.Dispute = event.data.object;
            // Then define and call a function to handle the event charge.dispute.funds_withdrawn
            break;
          }
          case "charge.dispute.updated": {
            const dispute: Stripe.Dispute = event.data.object;
            // Then define and call a function to handle the event charge.dispute.updated
            break;
          }
          case "charge.refund.updated": {
            const refund: Stripe.Refund = event.data.object;
            // Then define and call a function to handle the event charge.refund.updated
            break;
          }
          case "checkout.session.async_payment_failed": {
            const session: Stripe.Checkout.Session = event.data.object;
            // Then define and call a function to handle the event checkout.session.async_payment_failed
            break;
          }
          case "checkout.session.async_payment_succeeded": {
            const session: Stripe.Checkout.Session = event.data.object;
            // Then define and call a function to handle the event checkout.session.async_payment_succeeded
            break;
          }
          case "checkout.session.completed": {
            const session: Stripe.Checkout.Session = event.data.object;
            // Then define and call a function to handle the event checkout.session.completed
            break;
          }
          case "checkout.session.expired": {
            const session: Stripe.Checkout.Session = event.data.object;
            // Then define and call a function to handle the event checkout.session.expired
            break;
          }
          case "climate.order.canceled": {
            const order: Stripe.Climate.Order = event.data.object;
            // Then define and call a function to handle the event climate.order.canceled
            break;
          }
          case "climate.order.created": {
            const order: Stripe.Climate.Order = event.data.object;
            // Then define and call a function to handle the event climate.order.created
            break;
          }
          case "climate.order.delayed": {
            const order: Stripe.Climate.Order = event.data.object;
            // Then define and call a function to handle the event climate.order.delayed
            break;
          }
          case "climate.order.delivered": {
            const order: Stripe.Climate.Order = event.data.object;
            // Then define and call a function to handle the event climate.order.delivered
            break;
          }
          case "climate.order.product_substituted": {
            const order: Stripe.Climate.Order = event.data.object;
            // Then define and call a function to handle the event climate.order.product_substituted
            break;
          }
          case "climate.product.created": {
            const product: Stripe.Climate.Product = event.data.object;
            // Then define and call a function to handle the event climate.product.created
            break;
          }
          case "climate.product.pricing_updated": {
            const product: Stripe.Climate.Product = event.data.object;
            // Then define and call a function to handle the event climate.product.pricing_updated
            break;
          }
          case "coupon.created": {
            const coupon: Stripe.Coupon = event.data.object;
            // Then define and call a function to handle the event coupon.created
            break;
          }
          case "coupon.deleted": {
            const coupon: Stripe.Coupon = event.data.object;
            // Then define and call a function to handle the event coupon.deleted
            break;
          }
          case "coupon.updated": {
            const coupon: Stripe.Coupon = event.data.object;
            // Then define and call a function to handle the event coupon.updated
            break;
          }
          case "credit_note.created": {
            const creditNote: Stripe.CreditNote = event.data.object;
            // Then define and call a function to handle the event credit_note.created
            break;
          }
          case "credit_note.updated": {
            const creditNote: Stripe.CreditNote = event.data.object;
            // Then define and call a function to handle the event credit_note.updated
            break;
          }
          case "credit_note.voided": {
            const creditNote: Stripe.CreditNote = event.data.object;
            // Then define and call a function to handle the event credit_note.voided
            break;
          }
          case "customer.created": {
            const customer: Stripe.Customer = event.data.object;
            // Then define and call a function to handle the event customer.created
            break;
          }
          case "customer.deleted": {
            const customer: Stripe.Customer = event.data.object;
            // Then define and call a function to handle the event customer.deleted
            break;
          }
          case "customer.updated": {
            const customer: Stripe.Customer = event.data.object;
            // Then define and call a function to handle the event customer.updated
            break;
          }
          case "customer.discount.created": {
            const discount: Stripe.Discount = event.data.object;
            // Then define and call a function to handle the event customer.discount.created
            break;
          }
          case "customer.discount.deleted": {
            const discount: Stripe.Discount = event.data.object;
            // Then define and call a function to handle the event customer.discount.deleted
            break;
          }
          case "customer.discount.updated": {
            const discount: Stripe.Discount = event.data.object;
            // Then define and call a function to handle the event customer.discount.updated
            break;
          }
          case "customer.source.created": {
            const customerSource: Stripe.CustomerSource = event.data.object;
            // Then define and call a function to handle the event customer.source.created
            break;
          }
          case "customer.source.deleted": {
            const customerSource: Stripe.CustomerSource = event.data.object;
            // Then define and call a function to handle the event customer.source.deleted
            break;
          }
          case "customer.source.expiring": {
            const customerSource: Stripe.CustomerSource = event.data.object;
            // Then define and call a function to handle the event customer.source.expiring
            break;
          }
          case "customer.source.updated": {
            const customerSource: Stripe.CustomerSource = event.data.object;
            // Then define and call a function to handle the event customer.source.updated
            break;
          }
          case "customer.subscription.created": {
            const subscription: Stripe.Subscription = event.data.object;
            // Then define and call a function to handle the event customer.subscription.created
            break;
          }
          case "customer.subscription.deleted": {
            const subscription: Stripe.Subscription = event.data.object;
            // Then define and call a function to handle the event customer.subscription.deleted
            break;
          }
          case "customer.subscription.paused": {
            const subscription: Stripe.Subscription = event.data.object;
            // Then define and call a function to handle the event customer.subscription.paused
            break;
          }
          case "customer.subscription.pending_update_applied": {
            const subscription: Stripe.Subscription = event.data.object;
            // Then define and call a function to handle the event customer.subscription.pending_update_applied
            break;
          }
          case "customer.subscription.pending_update_expired": {
            const subscription: Stripe.Subscription = event.data.object;
            // Then define and call a function to handle the event customer.subscription.pending_update_expired
            break;
          }
          case "customer.subscription.resumed": {
            const subscription: Stripe.Subscription = event.data.object;
            // Then define and call a function to handle the event customer.subscription.resumed
            break;
          }
          case "customer.subscription.trial_will_end": {
            const subscription: Stripe.Subscription = event.data.object;
            // Then define and call a function to handle the event customer.subscription.trial_will_end
            break;
          }
          case "customer.subscription.updated": {
            const subscription: Stripe.Subscription = event.data.object;
            // Then define and call a function to handle the event customer.subscription.updated
            break;
          }
          case "customer.tax_id.created": {
            const taxId: Stripe.TaxId = event.data.object;
            // Then define and call a function to handle the event customer.tax_id.created
            break;
          }
          case "customer.tax_id.deleted": {
            const taxId: Stripe.TaxId = event.data.object;
            // Then define and call a function to handle the event customer.tax_id.deleted
            break;
          }
          case "customer.tax_id.updated": {
            const taxId: Stripe.TaxId = event.data.object;
            // Then define and call a function to handle the event customer.tax_id.updated
            break;
          }
          case "customer_cash_balance_transaction.created": {
            const customerCashBalanceTransaction: Stripe.CustomerCashBalanceTransaction = event.data.object;
            // Then define and call a function to handle the event customer_cash_balance_transaction.created
            break;
          }
          case "entitlements.active_entitlement_summary.updated": {
            const activeEntitlementSummary: Stripe.Entitlements.ActiveEntitlementSummary = event.data.object;
            // Then define and call a function to handle the event entitlements.active_entitlement_summary.updated
            break;
          }
          case "file.created": {
            const file: Stripe.File = event.data.object;
            // Then define and call a function to handle the event file.created
            break;
          }
          case "financial_connections.account.created": {
            const account: Stripe.FinancialConnections.Account = event.data.object;
            // Then define and call a function to handle the event financial_connections.account.created
            break;
          }
          case "financial_connections.account.deactivated": {
            const account: Stripe.FinancialConnections.Account = event.data.object;
            // Then define and call a function to handle the event financial_connections.account.deactivated
            break;
          }
          case "financial_connections.account.disconnected": {
            const account: Stripe.FinancialConnections.Account = event.data.object;
            // Then define and call a function to handle the event financial_connections.account.disconnected
            break;
          }
          case "financial_connections.account.reactivated": {
            const account: Stripe.FinancialConnections.Account = event.data.object;
            // Then define and call a function to handle the event financial_connections.account.reactivated
            break;
          }
          case "financial_connections.account.refreshed_balance": {
            const account: Stripe.FinancialConnections.Account = event.data.object;
            // Then define and call a function to handle the event financial_connections.account.refreshed_balance
            break;
          }
          case "financial_connections.account.refreshed_ownership": {
            const account: Stripe.FinancialConnections.Account = event.data.object;
            // Then define and call a function to handle the event financial_connections.account.refreshed_ownership
            break;
          }
          case "financial_connections.account.refreshed_transactions": {
            const account: Stripe.FinancialConnections.Account = event.data.object;
            // Then define and call a function to handle the event financial_connections.account.refreshed_transactions
            break;
          }
          case "identity.verification_session.canceled": {
            const verificationSession: Stripe.Identity.VerificationSession = event.data.object;
            // Then define and call a function to handle the event identity.verification_session.canceled
            break;
          }
          case "identity.verification_session.created": {
            const verificationSession: Stripe.Identity.VerificationSession = event.data.object;
            // Then define and call a function to handle the event identity.verification_session.created
            break;
          }
          case "identity.verification_session.processing": {
            const verificationSession: Stripe.Identity.VerificationSession = event.data.object;
            // Then define and call a function to handle the event identity.verification_session.processing
            break;
          }
          case "identity.verification_session.redacted": {
            const verificationSession: Stripe.Identity.VerificationSession = event.data.object;
            // Then define and call a function to handle the event identity.verification_session.processing
            break;
          }
          case "identity.verification_session.requires_input": {
            const verificationSession: Stripe.Identity.VerificationSession = event.data.object;
            // Then define and call a function to handle the event identity.verification_session.requires_input
            break;
          }
          case "identity.verification_session.verified": {
            const verificationSession: Stripe.Identity.VerificationSession = event.data.object;
            // Then define and call a function to handle the event identity.verification_session.verified
            break;
          }
          case "invoice.created": {
            const invoice: Stripe.Invoice = event.data.object;
            // Then define and call a function to handle the event invoice.created
            break;
          }
          case "invoice.deleted": {
            const invoice: Stripe.Invoice = event.data.object;
            // Then define and call a function to handle the event invoice.deleted
            break;
          }
          case "invoice.finalization_failed": {
            const invoice: Stripe.Invoice = event.data.object;
            // Then define and call a function to handle the event invoice.finalization_failed
            break;
          }
          case "invoice.finalized": {
            const invoice: Stripe.Invoice = event.data.object;
            // Then define and call a function to handle the event invoice.finalized
            break;
          }
          case "invoice.marked_uncollectible": {
            const invoice: Stripe.Invoice = event.data.object;
            // Then define and call a function to handle the event invoice.marked_uncollectible
            break;
          }
          case "invoice.overdue": {
            const invoice: Stripe.Invoice = event.data.object;
            // Then define and call a function to handle the event invoice.overdue
            break;
          }
          case "invoice.paid": {
            const invoice: Stripe.Invoice = event.data.object;
            // Then define and call a function to handle the event invoice.paid
            break;
          }
          case "invoice.payment_action_required": {
            const invoice: Stripe.Invoice = event.data.object;
            // Then define and call a function to handle the event invoice.payment_action_required
            break;
          }
          case "invoice.payment_failed": {
            const invoice: Stripe.Invoice = event.data.object;
            // Then define and call a function to handle the event invoice.payment_failed
            break;
          }
          case "invoice.payment_succeeded": {
            const invoice: Stripe.Invoice = event.data.object;
            // Then define and call a function to handle the event invoice.payment_succeeded
            break;
          }
          case "invoice.sent": {
            const invoice: Stripe.Invoice = event.data.object;
            // Then define and call a function to handle the event invoice.sent
            break;
          }
          case "invoice.upcoming": {
            const invoice: Stripe.Invoice = event.data.object;
            // Then define and call a function to handle the event invoice.upcoming
            break;
          }
          case "invoice.updated": {
            const invoice: Stripe.Invoice = event.data.object;
            // Then define and call a function to handle the event invoice.updated
            break;
          }
          case "invoice.voided": {
            const invoice: Stripe.Invoice = event.data.object;
            // Then define and call a function to handle the event invoice.voided
            break;
          }
          case "invoice.will_be_due": {
            const invoice: Stripe.Invoice = event.data.object;
            // Then define and call a function to handle the event invoice.will_be_due
            break;
          }
          case "invoiceitem.created": {
            const invoiceItem: Stripe.InvoiceItem = event.data.object;
            // Then define and call a function to handle the event invoiceitem.created
            break;
          }
          case "invoiceitem.deleted": {
            const invoiceItem: Stripe.InvoiceItem = event.data.object;
            // Then define and call a function to handle the event invoiceitem.deleted
            break;
          }
          case "issuing_authorization.created": {
            const authorization: Stripe.Issuing.Authorization = event.data.object;
            // Then define and call a function to handle the event issuing_authorization.created
            break;
          }
          case "issuing_authorization.request": {
            const authorization: Stripe.Issuing.Authorization = event.data.object;
            // Then define and call a function to handle the event issuing_authorization.created
            break;
          }
          case "issuing_authorization.updated": {
            const authorization: Stripe.Issuing.Authorization = event.data.object;
            // Then define and call a function to handle the event issuing_authorization.updated
            break;
          }
          case "issuing_card.created": {
            const card: Stripe.Issuing.Card = event.data.object;
            // Then define and call a function to handle the event issuing_card.created
            break;
          }
          case "issuing_card.updated": {
            const card: Stripe.Issuing.Card = event.data.object;
            // Then define and call a function to handle the event issuing_card.updated
            break;
          }
          case "issuing_cardholder.created": {
            const cardholder: Stripe.Issuing.Cardholder = event.data.object;
            // Then define and call a function to handle the event issuing_cardholder.created
            break;
          }
          case "issuing_cardholder.updated": {
            const cardholder: Stripe.Issuing.Cardholder = event.data.object;
            // Then define and call a function to handle the event issuing_cardholder.updated
            break;
          }
          case "issuing_dispute.closed": {
            const dispute: Stripe.Issuing.Dispute = event.data.object;
            // Then define and call a function to handle the event issuing_dispute.closed
            break;
          }
          case "issuing_dispute.created": {
            const dispute: Stripe.Issuing.Dispute = event.data.object;
            // Then define and call a function to handle the event issuing_dispute.created
            break;
          }
          case "issuing_dispute.funds_reinstated": {
            const dispute: Stripe.Issuing.Dispute = event.data.object;
            // Then define and call a function to handle the event issuing_dispute.funds_reinstated
            break;
          }
          case "issuing_dispute.funds_rescinded": {
            const dispute: Stripe.Issuing.Dispute = event.data.object;
            // Then define and call a function to handle the event issuing_dispute.funds_rescinded
            break;
          }
          case "issuing_dispute.submitted": {
            const dispute: Stripe.Issuing.Dispute = event.data.object;
            // Then define and call a function to handle the event issuing_dispute.submitted
            break;
          }
          case "issuing_dispute.updated": {
            const dispute: Stripe.Issuing.Dispute = event.data.object;
            // Then define and call a function to handle the event issuing_dispute.updated
            break;
          }
          case "issuing_personalization_design.activated": {
            const personalizationDesign: Stripe.Issuing.PersonalizationDesign = event.data.object;
            // Then define and call a function to handle the event issuing_personalization_design.activated
            break;
          }
          case "issuing_personalization_design.deactivated": {
            const personalizationDesign: Stripe.Issuing.PersonalizationDesign = event.data.object;
            // Then define and call a function to handle the event issuing_personalization_design.deactivated
            break;
          }
          case "issuing_personalization_design.rejected": {
            const personalizationDesign: Stripe.Issuing.PersonalizationDesign = event.data.object;
            // Then define and call a function to handle the event issuing_personalization_design.rejected
            break;
          }
          case "issuing_personalization_design.updated": {
            const personalizationDesign: Stripe.Issuing.PersonalizationDesign = event.data.object;
            // Then define and call a function to handle the event issuing_personalization_design.updated
            break;
          }
          case "issuing_token.created": {
            const token: Stripe.Issuing.Token = event.data.object;
            // Then define and call a function to handle the event issuing_token.created
            break;
          }
          case "issuing_token.updated": {
            const token: Stripe.Issuing.Token = event.data.object;
            // Then define and call a function to handle the event issuing_token.updated
            break;
          }
          case "issuing_transaction.created": {
            const transaction: Stripe.Issuing.Transaction = event.data.object;
            // Then define and call a function to handle the event issuing_transaction.created
            break;
          }
          case "issuing_transaction.purchase_details_receipt_updated": {
            const transaction: Stripe.Issuing.Transaction = event.data.object;
            // Then define and call a function to handle the event issuing_transaction.purchase_details_receipt_updated
            break;
          }
          case "issuing_transaction.updated": {
            const transaction: Stripe.Issuing.Transaction = event.data.object;
            // Then define and call a function to handle the event issuing_transaction.updated
            break;
          }
          case "mandate.updated": {
            const mandate: Stripe.Mandate = event.data.object;
            // Then define and call a function to handle the event mandate.updated
            break;
          }
          case "payment_intent.amount_capturable_updated": {
            const paymentIntent: Stripe.PaymentIntent = event.data.object;
            // Then define and call a function to handle the event payment_intent.amount_capturable_updated
            break;
          }
          case "payment_intent.canceled": {
            const paymentIntent: Stripe.PaymentIntent = event.data.object;
            // Then define and call a function to handle the event payment_intent.canceled
            break;
          }
          case "payment_intent.created": {
            const paymentIntent: Stripe.PaymentIntent = event.data.object;
            // Then define and call a function to handle the event payment_intent.created
            break;
          }
          case "payment_intent.partially_funded": {
            const paymentIntent: Stripe.PaymentIntent = event.data.object;
            // Then define and call a function to handle the event payment_intent.partially_funded
            break;
          }
          case "payment_intent.payment_failed": {
            const paymentIntent: Stripe.PaymentIntent = event.data.object;
            // Then define and call a function to handle the event payment_intent.payment_failed
            break;
          }
          case "payment_intent.processing": {
            const paymentIntent: Stripe.PaymentIntent = event.data.object;
            // Then define and call a function to handle the event payment_intent.processing
            break;
          }
          case "payment_intent.requires_action": {
            const paymentIntent: Stripe.PaymentIntent = event.data.object;
            // Then define and call a function to handle the event payment_intent.requires_action
            break;
          }
          case "payment_intent.succeeded": {
            const paymentIntent: Stripe.PaymentIntent = event.data.object;
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
          }
          case "payment_link.created": {
            const paymentLink: Stripe.PaymentLink = event.data.object;
            // Then define and call a function to handle the event payment_link.created
            break;
          }
          case "payment_link.updated": {
            const paymentLink: Stripe.PaymentLink = event.data.object;
            // Then define and call a function to handle the event payment_link.updated
            break;
          }
          case "payment_method.attached": {
            const paymentMethod: Stripe.PaymentMethod = event.data.object;
            // Then define and call a function to handle the event payment_method.attached
            break;
          }
          case "payment_method.automatically_updated": {
            const paymentMethod: Stripe.PaymentMethod = event.data.object;
            // Then define and call a function to handle the event payment_method.automatically_updated
            break;
          }
          case "payment_method.detached": {
            const paymentMethod: Stripe.PaymentMethod = event.data.object;
            // Then define and call a function to handle the event payment_method.detached
            break;
          }
          case "payment_method.updated": {
            const paymentMethod: Stripe.PaymentMethod = event.data.object;
            // Then define and call a function to handle the event payment_method.updated
            break;
          }
          case "payout.canceled": {
            const payout: Stripe.Payout = event.data.object;
            // Then define and call a function to handle the event payout.canceled
            break;
          }
          case "payout.created": {
            const payout: Stripe.Payout = event.data.object;
            // Then define and call a function to handle the event payout.created
            break;
          }
          case "payout.failed": {
            const payout: Stripe.Payout = event.data.object;
            // Then define and call a function to handle the event payout.failed
            break;
          }
          case "payout.paid": {
            const payout: Stripe.Payout = event.data.object;
            // Then define and call a function to handle the event payout.paid
            break;
          }
          case "payout.reconciliation_completed": {
            const payout: Stripe.Payout = event.data.object;
            // Then define and call a function to handle the event payout.reconciliation_completed
            break;
          }
          case "payout.updated": {
            const payout: Stripe.Payout = event.data.object;
            // Then define and call a function to handle the event payout.updated
            break;
          }
          case "person.created": {
            const person: Stripe.Person = event.data.object;
            // Then define and call a function to handle the event person.created
            break;
          }
          case "person.deleted": {
            const person: Stripe.Person = event.data.object;
            // Then define and call a function to handle the event person.deleted
            break;
          }
          case "person.updated": {
            const person: Stripe.Person = event.data.object;
            // Then define and call a function to handle the event person.updated
            break;
          }
          case "plan.created": {
            const plan: Stripe.Plan = event.data.object;
            // Then define and call a function to handle the event plan.created
            break;
          }
          case "plan.deleted": {
            const plan: Stripe.Plan = event.data.object;
            // Then define and call a function to handle the event plan.deleted
            break;
          }
          case "plan.updated": {
            const plan: Stripe.Plan = event.data.object;
            // Then define and call a function to handle the event plan.updated
            break;
          }
          case "price.created": {
            const price: Stripe.Price = event.data.object;
            // Then define and call a function to handle the event price.created
            break;
          }
          case "price.deleted": {
            const price: Stripe.Price = event.data.object;
            // Then define and call a function to handle the event price.deleted
            break;
          }
          case "price.updated": {
            const price: Stripe.Price = event.data.object;
            // Then define and call a function to handle the event price.updated
            break;
          }
          case "product.created": {
            const product: Stripe.Product = event.data.object;
            // Then define and call a function to handle the event product.created
            break;
          }
          case "product.deleted": {
            const product: Stripe.Product = event.data.object;
            // Then define and call a function to handle the event product.deleted
            break;
          }
          case "product.updated": {
            const product: Stripe.Product = event.data.object;
            // Then define and call a function to handle the event product.updated
            break;
          }
          case "promotion_code.created": {
            const promotionCode: Stripe.PromotionCode = event.data.object;
            // Then define and call a function to handle the event promotion_code.created
            break;
          }
          case "promotion_code.updated": {
            const promotionCode: Stripe.PromotionCode = event.data.object;
            // Then define and call a function to handle the event promotion_code.updated
            break;
          }
          case "quote.accepted": {
            const quote: Stripe.Quote = event.data.object;
            // Then define and call a function to handle the event quote.accepted
            break;
          }
          case "quote.canceled": {
            const quote: Stripe.Quote = event.data.object;
            // Then define and call a function to handle the event quote.canceled
            break;
          }
          case "quote.created": {
            const quote: Stripe.Quote = event.data.object;
            // Then define and call a function to handle the event quote.created
            break;
          }
          case "quote.finalized": {
            const quote: Stripe.Quote = event.data.object;
            // Then define and call a function to handle the event quote.finalized
            break;
          }
          case "radar.early_fraud_warning.created": {
            const earlyFraudWarning: Stripe.Radar.EarlyFraudWarning = event.data.object;
            // Then define and call a function to handle the event radar.early_fraud_warning.created
            break;
          }
          case "radar.early_fraud_warning.updated": {
            const earlyFraudWarning: Stripe.Radar.EarlyFraudWarning = event.data.object;
            // Then define and call a function to handle the event radar.early_fraud_warning.updated
            break;
          }
          case "refund.created": {
            const refund: Stripe.Refund = event.data.object;
            // Then define and call a function to handle the event refund.created
            break;
          }
          case "refund.failed": {
            const refund: Stripe.Refund = event.data.object;
            // Then define and call a function to handle the event refund.failed
            break;
          }
          case "refund.updated": {
            const refund: Stripe.Refund = event.data.object;
            // Then define and call a function to handle the event refund.updated
            break;
          }
          case "reporting.report_run.failed": {
            const reportRun: Stripe.Reporting.ReportRun = event.data.object;
            // Then define and call a function to handle the event reporting.report_run.failed
            break;
          }
          case "reporting.report_run.succeeded": {
            const reportRun: Stripe.Reporting.ReportRun = event.data.object;
            // Then define and call a function to handle the event reporting.report_run.succeeded
            break;
          }
          case "reporting.report_type.updated": {
            const reportType: Stripe.Reporting.ReportType = event.data.object;
            // Then define and call a function to handle the event reporting.report_run.succeeded
            break;
          }
          case "review.closed": {
            const review: Stripe.Review = event.data.object;
            // Then define and call a function to handle the event review.closed
            break;
          }
          case "review.opened": {
            const review: Stripe.Review = event.data.object;
            // Then define and call a function to handle the event review.opened
            break;
          }
          case "setup_intent.canceled": {
            const setupIntent: Stripe.SetupIntent = event.data.object;
            // Then define and call a function to handle the event setup_intent.canceled
            break;
          }
          case "setup_intent.created": {
            const setupIntent: Stripe.SetupIntent = event.data.object;
            // Then define and call a function to handle the event setup_intent.created
            break;
          }
          case "setup_intent.requires_action": {
            const setupIntent: Stripe.SetupIntent = event.data.object;
            // Then define and call a function to handle the event setup_intent.requires_action
            break;
          }
          case "setup_intent.setup_failed": {
            const setupIntent: Stripe.SetupIntent = event.data.object;
            // Then define and call a function to handle the event setup_intent.setup_failed
            break;
          }
          case "setup_intent.succeeded": {
            const setupIntent: Stripe.SetupIntent = event.data.object;
            // Then define and call a function to handle the event setup_intent.succeeded
            break;
          }
          case "sigma.scheduled_query_run.created": {
            const scheduledQueryRun: Stripe.Sigma.ScheduledQueryRun = event.data.object;
            // Then define and call a function to handle the event sigma.scheduled_query_run.created
            break;
          }
          case "source.canceled": {
            const source: Stripe.Source = event.data.object;
            // Then define and call a function to handle the event source.canceled
            break;
          }
          case "source.chargeable": {
            const source: Stripe.Source = event.data.object;
            // Then define and call a function to handle the event source.chargeable
            break;
          }
          case "source.failed": {
            const source: Stripe.Source = event.data.object;
            // Then define and call a function to handle the event source.failed
            break;
          }
          case "source.mandate_notification": {
            const sourceMandateNotification: Stripe.SourceMandateNotification = event.data.object;
            // Then define and call a function to handle the event source.mandate_notification
            break;
          }
          case "source.refund_attributes_required": {
            const source: Stripe.Source = event.data.object;
            // Then define and call a function to handle the event source.refund_attributes_required
            break;
          }
          case "source.transaction.created": {
            const sourceTransaction: Stripe.SourceTransaction = event.data.object;
            // Then define and call a function to handle the event source.transaction.created
            break;
          }
          case "source.transaction.updated": {
            const sourceTransaction: Stripe.SourceTransaction = event.data.object;
            // Then define and call a function to handle the event source.transaction.updated
            break;
          }
          case "subscription_schedule.aborted": {
            const subscriptionSchedule: Stripe.SubscriptionSchedule = event.data.object;
            // Then define and call a function to handle the event subscription_schedule.aborted
            break;
          }
          case "subscription_schedule.canceled": {
            const subscriptionSchedule: Stripe.SubscriptionSchedule = event.data.object;
            // Then define and call a function to handle the event subscription_schedule.canceled
            break;
          }
          case "subscription_schedule.completed": {
            const subscriptionSchedule: Stripe.SubscriptionSchedule = event.data.object;
            // Then define and call a function to handle the event subscription_schedule.completed
            break;
          }
          case "subscription_schedule.created": {
            const subscriptionSchedule: Stripe.SubscriptionSchedule = event.data.object;
            // Then define and call a function to handle the event subscription_schedule.created
            break;
          }
          case "subscription_schedule.expiring": {
            const subscriptionSchedule: Stripe.SubscriptionSchedule = event.data.object;
            // Then define and call a function to handle the event subscription_schedule.expiring
            break;
          }
          case "subscription_schedule.released": {
            const subscriptionSchedule: Stripe.SubscriptionSchedule = event.data.object;
            // Then define and call a function to handle the event subscription_schedule.released
            break;
          }
          case "subscription_schedule.updated": {
            const subscriptionSchedule: Stripe.SubscriptionSchedule = event.data.object;
            // Then define and call a function to handle the event subscription_schedule.updated
            break;
          }
          case "tax.settings.updated": {
            const settings: Stripe.Tax.Settings = event.data.object;
            // Then define and call a function to handle the event tax.settings.updated
            break;
          }
          case "tax_rate.created": {
            const taxRate: Stripe.TaxRate = event.data.object;
            // Then define and call a function to handle the event tax_rate.created
            break;
          }
          case "tax_rate.updated": {
            const taxRate: Stripe.TaxRate = event.data.object;
            // Then define and call a function to handle the event tax_rate.updated
            break;
          }
          case "terminal.reader.action_failed": {
            const reader: Stripe.Terminal.Reader = event.data.object;
            // Then define and call a function to handle the event terminal.reader.action_failed
            break;
          }
          case "terminal.reader.action_succeeded": {
            const reader: Stripe.Terminal.Reader = event.data.object;
            // Then define and call a function to handle the event terminal.reader.action_succeeded
            break;
          }
          case "test_helpers.test_clock.advancing": {
            const testClock: Stripe.TestHelpers.TestClock = event.data.object;
            // Then define and call a function to handle the event test_helpers.test_clock.advancing
            break;
          }
          case "test_helpers.test_clock.created": {
            const testClock: Stripe.TestHelpers.TestClock = event.data.object;
            // Then define and call a function to handle the event test_helpers.test_clock.created
            break;
          }
          case "test_helpers.test_clock.deleted": {
            const testClock: Stripe.TestHelpers.TestClock = event.data.object;
            // Then define and call a function to handle the event test_helpers.test_clock.deleted
            break;
          }
          case "test_helpers.test_clock.internal_failure": {
            const testClock: Stripe.TestHelpers.TestClock = event.data.object;
            // Then define and call a function to handle the event test_helpers.test_clock.internal_failure
            break;
          }
          case "test_helpers.test_clock.ready": {
            const testClock: Stripe.TestHelpers.TestClock = event.data.object;
            // Then define and call a function to handle the event test_helpers.test_clock.ready
            break;
          }
          case "topup.canceled": {
            const topup: Stripe.Topup = event.data.object;
            // Then define and call a function to handle the event topup.canceled
            break;
          }
          case "topup.created": {
            const topup: Stripe.Topup = event.data.object;
            // Then define and call a function to handle the event topup.created
            break;
          }
          case "topup.failed": {
            const topup: Stripe.Topup = event.data.object;
            // Then define and call a function to handle the event topup.failed
            break;
          }
          case "topup.reversed": {
            const topup: Stripe.Topup = event.data.object;
            // Then define and call a function to handle the event topup.reversed
            break;
          }
          case "topup.succeeded": {
            const topup: Stripe.Topup = event.data.object;
            // Then define and call a function to handle the event topup.succeeded
            break;
          }
          case "transfer.created": {
            const transfer: Stripe.Transfer = event.data.object;
            // Then define and call a function to handle the event transfer.created
            break;
          }
          case "transfer.reversed": {
            const transfer: Stripe.Transfer = event.data.object;
            // Then define and call a function to handle the event transfer.reversed
            break;
          }
          case "transfer.updated": {
            const transfer: Stripe.Transfer = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.credit_reversal.created": {
            const creditReversal: Stripe.Treasury.CreditReversal = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.credit_reversal.posted": {
            const creditReversal: Stripe.Treasury.CreditReversal = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.debit_reversal.completed": {
            const debitReversal: Stripe.Treasury.DebitReversal = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.debit_reversal.created": {
            const debitReversal: Stripe.Treasury.DebitReversal = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.debit_reversal.initial_credit_granted": {
            const debitReversal: Stripe.Treasury.DebitReversal = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.financial_account.closed": {
            const financialAccount: Stripe.Treasury.FinancialAccount = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.financial_account.created": {
            const financialAccount: Stripe.Treasury.FinancialAccount = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.financial_account.features_status_updated": {
            const financialAccount: Stripe.Treasury.FinancialAccount = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.inbound_transfer.canceled": {
            const inboundTransfer: Stripe.Treasury.InboundTransfer = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.inbound_transfer.created": {
            const inboundTransfer: Stripe.Treasury.InboundTransfer = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.inbound_transfer.failed": {
            const inboundTransfer: Stripe.Treasury.InboundTransfer = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.inbound_transfer.succeeded": {
            const inboundTransfer: Stripe.Treasury.InboundTransfer = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.outbound_payment.canceled": {
            const outboundPayment: Stripe.Treasury.OutboundPayment = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.outbound_payment.created": {
            const outboundPayment: Stripe.Treasury.OutboundPayment = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.outbound_payment.expected_arrival_date_updated": {
            const outboundPayment: Stripe.Treasury.OutboundPayment = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.outbound_payment.failed": {
            const outboundPayment: Stripe.Treasury.OutboundPayment = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.outbound_payment.posted": {
            const outboundPayment: Stripe.Treasury.OutboundPayment = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.outbound_payment.returned": {
            const outboundPayment: Stripe.Treasury.OutboundPayment = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.outbound_payment.tracking_details_updated": {
            const outboundPayment: Stripe.Treasury.OutboundPayment = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.outbound_transfer.canceled": {
            const outboundTransfer: Stripe.Treasury.OutboundTransfer = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.outbound_transfer.created": {
            const outboundTransfer: Stripe.Treasury.OutboundTransfer = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.outbound_transfer.expected_arrival_date_updated": {
            const outboundTransfer: Stripe.Treasury.OutboundTransfer = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.outbound_transfer.failed": {
            const outboundTransfer: Stripe.Treasury.OutboundTransfer = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.outbound_transfer.posted": {
            const outboundTransfer: Stripe.Treasury.OutboundTransfer = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.outbound_transfer.returned": {
            const outboundTransfer: Stripe.Treasury.OutboundTransfer = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.outbound_transfer.tracking_details_updated": {
            const outboundTransfer: Stripe.Treasury.OutboundTransfer = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.received_credit.created": {
            const receivedCredit: Stripe.Treasury.ReceivedCredit = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.received_credit.failed": {
            const receivedCredit: Stripe.Treasury.ReceivedCredit = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.received_credit.succeeded": {
            const receivedCredit: Stripe.Treasury.ReceivedCredit = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
          case "treasury.received_debit.created": {
            const receivedDebit: Stripe.Treasury.ReceivedDebit = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
          }
        }

        return response.sendStatus(200).end() && void (0);
      },
      (error: unknown): never => {
        response.status(500).send(error).end();

        throw new Error("Something went wrong.");
      },
    );
  },
);
