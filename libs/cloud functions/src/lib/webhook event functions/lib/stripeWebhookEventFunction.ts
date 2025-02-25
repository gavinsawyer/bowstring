import { type StripeCustomerDocument, type StripePaymentMethodDocument, type StripePriceDocument, type StripeProductDocument, type StripeSetupIntentDocument } from "@bowstring/interfaces";
import { getStripeCustomerDocument, getStripePaymentMethodDocument, getStripePriceDocument, getStripeProductDocument, getStripeSetupIntentDocument }           from "@bowstring/stripe-interop";
import { getApp }                                                                                                                                              from "firebase-admin/app";
import { type CollectionReference, type DocumentReference, type Firestore, getFirestore, type QuerySnapshot }                                                  from "firebase-admin/firestore";
import { type HttpsFunction, onRequest, type Request }                                                                                                         from "firebase-functions/https";
import Stripe                                                                                                                                                  from "stripe";
import { Stripe_API_Key, Stripe_Webhook_Shared_Secret }                                                                                                        from "../../secret params";


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
          case "customer.created": {
            const collectionReference: CollectionReference<StripeCustomerDocument, StripeCustomerDocument> = firestore.collection("stripeCustomers") as CollectionReference<StripeCustomerDocument, StripeCustomerDocument>;

            if (!event.data.object.metadata["userId"])
              return response.status(400).send("A value for `userId` is missing from the object's metadata.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return collectionReference.add(
                getStripeCustomerDocument(
                  event.data.object,
                  {
                    userId: event.data.object.metadata["userId"],
                  },
                ),
              ).then<void, never>(
                ({ id: documentId }: DocumentReference<StripeCustomerDocument, StripeCustomerDocument>): Promise<void> => stripe.customers.update(
                  event.data.object.id,
                  {
                    metadata: {
                      documentId,
                    },
                  },
                ).then<void, never>(
                  (): void => response.sendStatus(200).end() && void (0),
                  (error: unknown): never => {
                    response.status(500).send("Something went wrong").end();

                    throw error;
                  },
                ),
                (error: unknown): never => {
                  response.status(500).send("Something went wrong").end();

                  throw error;
                },
              );

            return collectionReference.doc(event.data.object.metadata["documentId"]).set(
              getStripeCustomerDocument(
                event.data.object,
                {
                  userId: event.data.object.metadata["userId"],
                },
                true,
              ),
              {
                merge: true,
              },
            ).then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                response.status(500).send("Something went wrong").end();

                throw error;
              },
            );
          }
          case "customer.deleted":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return (firestore.collection("stripeCustomers").doc(event.data.object.metadata["documentId"]) as DocumentReference<StripeCustomerDocument, StripeCustomerDocument>).delete().then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                response.status(500).send("Something went wrong").end();

                throw error;
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

            if (!event.data.object.metadata["userId"])
              return response.status(400).send("A value for `userId` is missing from the object's metadata.").end() && void (0);

            return (firestore.collection("stripeCustomers").doc(event.data.object.metadata["documentId"]) as DocumentReference<StripeCustomerDocument, StripeCustomerDocument>).update(
              getStripeCustomerDocument(
                event.data.object,
                {
                  userId: event.data.object.metadata["userId"],
                },
                true,
              ),
            ).then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                response.status(500).send("Something went wrong").end();

                throw error;
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
          case "payment_method.attached": {
            const collectionReference: CollectionReference<StripePaymentMethodDocument, StripePaymentMethodDocument> = firestore.collection("stripePaymentMethods") as CollectionReference<StripePaymentMethodDocument, StripePaymentMethodDocument>;

            return collectionReference.where(
              "id",
              "==",
              event.data.object.id,
            ).get().then<void, never>(
              async (stripePaymentMethodDocumentQuerySnapshot: QuerySnapshot<StripePaymentMethodDocument, StripePaymentMethodDocument>): Promise<void> => {
                if (!stripePaymentMethodDocumentQuerySnapshot.docs.length) {
                  if (!event.data.object.metadata)
                    return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

                  if (!event.data.object.metadata["userId"])
                    return response.status(400).send("A value for `userId` is missing from the object's metadata.").end() && void (0);

                  return collectionReference.add(
                    getStripePaymentMethodDocument(
                      event.data.object,
                      {
                        userId: event.data.object.metadata["userId"],
                      },
                    ),
                  ).then<void, never>(
                    ({ id: documentId }: DocumentReference<StripePaymentMethodDocument, StripePaymentMethodDocument>): Promise<void> => stripe.customers.update(
                      event.data.object.id,
                      {
                        metadata: {
                          documentId,
                        },
                      },
                    ).then<void, never>(
                      (): void => response.sendStatus(200).end() && void (0),
                      (error: unknown): never => {
                        response.status(500).send("Something went wrong").end();

                        throw error;
                      },
                    ),
                    (error: unknown): never => {
                      response.status(500).send("Something went wrong").end();

                      throw error;
                    },
                  );
                }

                return stripe.paymentMethods.update(
                  event.data.object.id,
                  {
                    metadata: {
                      documentId: stripePaymentMethodDocumentQuerySnapshot.docs[0].id,
                      userId:     stripePaymentMethodDocumentQuerySnapshot.docs[0].data().userId,
                    },
                  },
                ).then<void, never>(
                  (): void => response.sendStatus(200).end() && void (0),
                  (error: unknown): never => {
                    response.status(500).send("Something went wrong").end();

                    throw error;
                  },
                );
              },
              (error: unknown): never => {
                response.status(500).send("Something went wrong").end();

                throw error;
              },
            );
          }
          case "payment_method.automatically_updated":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            if (!event.data.object.metadata["userId"])
              return response.status(400).send("A value for `userId` is missing from the object's metadata.").end() && void (0);

            return (firestore.collection("stripePaymentMethods").doc(event.data.object.metadata["documentId"]) as DocumentReference<StripePaymentMethodDocument, StripePaymentMethodDocument>).update(
              getStripePaymentMethodDocument(
                event.data.object,
                {
                  userId: event.data.object.metadata["userId"],
                },
                true,
              ),
            ).then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                response.status(500).send("Something went wrong").end();

                throw error;
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
                response.status(500).send("Something went wrong").end();

                throw error;
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
              getStripePaymentMethodDocument(
                event.data.object,
                {
                  userId: event.data.object.metadata["userId"],
                },
                true,
              ),
            ).then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                response.status(500).send("Something went wrong").end();

                throw error;
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
          case "price.created": {
            const collectionReference: CollectionReference<StripePriceDocument, StripePriceDocument> = firestore.collection("stripePrices") as CollectionReference<StripePriceDocument, StripePriceDocument>;

            if (!event.data.object.metadata["documentId"])
              return collectionReference.add(getStripePriceDocument(event.data.object)).then<void, never>(
                (stripePriceDocumentReference: DocumentReference<StripePriceDocument, StripePriceDocument>): Promise<void> => stripe.prices.update(
                  event.data.object.id,
                  {
                    metadata: {
                      documentId: stripePriceDocumentReference.id,
                    },
                  },
                ).then<void, never>(
                  (): void => response.sendStatus(200).end() && void (0),
                  (error: unknown): never => {
                    response.status(500).send("Something went wrong").end();

                    throw error;
                  },
                ),
                (error: unknown): never => {
                  response.status(500).send("Something went wrong").end();

                  throw error;
                },
              );

            return collectionReference.doc(event.data.object.metadata["documentId"]).set(
              getStripePriceDocument(
                event.data.object,
                true,
              ),
              {
                merge: true,
              },
            ).then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                response.status(500).send("Something went wrong").end();

                throw error;
              },
            );
          }
          case "price.deleted":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return (firestore.collection("stripePrices").doc(event.data.object.metadata["documentId"]) as DocumentReference<StripePriceDocument, StripePriceDocument>).delete().then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                response.status(500).send("Something went wrong").end();

                throw error;
              },
            );
          case "price.updated":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return (firestore.collection("stripePrices").doc(event.data.object.metadata["documentId"]) as DocumentReference<StripePriceDocument, StripePriceDocument>).update(
              getStripePriceDocument(
                event.data.object,
                true,
              ),
            ).then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                response.status(500).send("Something went wrong").end();

                throw error;
              },
            );
          case "product.created": {
            const collectionReference: CollectionReference<StripeProductDocument, StripeProductDocument> = firestore.collection("stripeProducts") as CollectionReference<StripeProductDocument, StripeProductDocument>;

            if (!event.data.object.metadata["path"])
              return response.status(400).send("A value for `path` is missing from the object's metadata.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return collectionReference.add(
                getStripeProductDocument(
                  event.data.object,
                  {
                    path: event.data.object.metadata["path"],
                  },
                ),
              ).then<void, never>(
                (stripeProductDocumentReference: DocumentReference<StripeProductDocument, StripeProductDocument>): Promise<void> => stripe.products.update(
                  event.data.object.id,
                  {
                    metadata: {
                      documentId: stripeProductDocumentReference.id,
                    },
                  },
                ).then<void, never>(
                  (): void => response.sendStatus(200).end() && void (0),
                  (error: unknown): never => {
                    response.status(500).send("Something went wrong").end();

                    throw error;
                  },
                ),
                (error: unknown): never => {
                  response.status(500).send("Something went wrong").end();

                  throw error;
                },
              );

            return collectionReference.doc(event.data.object.metadata["documentId"]).set(
              getStripeProductDocument(
                event.data.object,
                {
                  path: event.data.object.metadata["path"],
                },
                true,
              ),
              {
                merge: true,
              },
            ).then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                response.status(500).send("Something went wrong").end();

                throw error;
              },
            );
          }
          case "product.deleted":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            return (firestore.collection("stripeProducts").doc(event.data.object.metadata["documentId"]) as DocumentReference<StripeProductDocument, StripeProductDocument>).delete().then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                response.status(500).send("Something went wrong").end();

                throw error;
              },
            );
          case "product.updated":
            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            if (!event.data.object.metadata["path"])
              return response.status(400).send("A value for `path` is missing from the object's metadata.").end() && void (0);

            return (firestore.collection("stripeProducts").doc(event.data.object.metadata["documentId"]) as DocumentReference<StripeProductDocument, StripeProductDocument>).update(
              getStripeProductDocument(
                event.data.object,
                {
                  path: event.data.object.metadata["path"],
                },
                true,
              ),
            ).then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                response.status(500).send("Something went wrong").end();

                throw error;
              },
            );
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
                response.status(500).send("Something went wrong").end();

                throw error;
              },
            );
          case "setup_intent.created": {
            const collectionReference: CollectionReference<StripeSetupIntentDocument, StripeSetupIntentDocument> = firestore.collection("stripeSetupIntents") as CollectionReference<StripeSetupIntentDocument, StripeSetupIntentDocument>;

            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["userId"])
              return response.status(400).send("A value for `userId` is missing from the object's metadata.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return collectionReference.add(
                getStripeSetupIntentDocument(
                  event.data.object,
                  {
                    userId: event.data.object.metadata["userId"],
                  },
                ),
              ).then<void, never>(
                ({ id: documentId }: DocumentReference<StripeSetupIntentDocument, StripeSetupIntentDocument>): Promise<void> => stripe.setupIntents.update(
                  event.data.object.id,
                  {
                    metadata: {
                      documentId,
                    },
                  },
                ).then<void, never>(
                  (): void => response.sendStatus(200).end() && void (0),
                  (error: unknown): never => {
                    response.status(500).send("Something went wrong").end();

                    throw error;
                  },
                ),
                (error: unknown): never => {
                  response.status(500).send("Something went wrong").end();

                  throw error;
                },
              );

            return collectionReference.doc(event.data.object.metadata["documentId"]).set(
              getStripeSetupIntentDocument(
                event.data.object,
                {
                  userId: event.data.object.metadata["userId"],
                },
                true,
              ),
              {
                merge: true,
              },
            ).then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                response.status(500).send("Something went wrong").end();

                throw error;
              },
            );
          }
          case "setup_intent.requires_action":
            if (!event.data.object.metadata)
              return response.status(400).send("A value for `metadata` is missing from the object.").end() && void (0);

            if (!event.data.object.metadata["documentId"])
              return response.status(400).send("A value for `documentId` is missing from the object's metadata.").end() && void (0);

            if (!event.data.object.metadata["userId"])
              return response.status(400).send("A value for `userId` is missing from the object's metadata.").end() && void (0);

            return (firestore.collection("stripeSetupIntents").doc(event.data.object.metadata["documentId"]) as DocumentReference<StripeSetupIntentDocument, StripeSetupIntentDocument>).update(
              getStripeSetupIntentDocument(
                event.data.object,
                {
                  userId: event.data.object.metadata["userId"],
                },
                true,
              ),
            ).then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                response.status(500).send("Something went wrong").end();

                throw error;
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
              getStripeSetupIntentDocument(
                event.data.object,
                {
                  userId: event.data.object.metadata["userId"],
                },
                true,
              ),
            ).then<void, never>(
              (): void => response.sendStatus(200).end() && void (0),
              (error: unknown): never => {
                response.status(500).send("Something went wrong").end();

                throw error;
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
                response.status(500).send("Something went wrong").end();

                throw error;
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
