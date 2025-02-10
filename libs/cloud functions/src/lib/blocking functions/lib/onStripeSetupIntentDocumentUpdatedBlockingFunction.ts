import { type StripeSetupIntentDocument }                                     from "@standard/interfaces";
import { type Change, type CloudFunction }                                    from "firebase-functions";
import { type FirestoreEvent, onDocumentUpdated, type QueryDocumentSnapshot } from "firebase-functions/firestore";
import { HttpsError }                                                         from "firebase-functions/https";
import Stripe                                                                 from "stripe";


function getStripeSetupIntentUpdateParams(
  {
    attachToSelf: attach_to_self,
    customer,
    description,
    flowDirections:       flow_directions,
    paymentMethod:        payment_method,
    paymentMethodOptions: payment_method_options,
    paymentMethodTypes:   payment_method_types,
  }: StripeSetupIntentDocument,
): Stripe.SetupIntentUpdateParams {
  return {
    attach_to_self:         typeof attach_to_self === "boolean" ? attach_to_self : undefined,
    customer,
    description,
    flow_directions:        flow_directions?.length ? flow_directions : undefined,
    payment_method,
    payment_method_options: payment_method_options && ((
      {
        card,
      }: Exclude<StripeSetupIntentDocument["paymentMethodOptions"], undefined>,
    ): Stripe.SetupIntentUpdateParams.PaymentMethodOptions => ({
      card: card && ((
        {
          mandateOptions: mandate_options,
          network,
          requestThreeDSecure: request_three_d_secure,
        }: Exclude<Exclude<StripeSetupIntentDocument["paymentMethodOptions"], undefined>["card"], undefined>,
      ): Stripe.SetupIntentUpdateParams.PaymentMethodOptions.Card => ({
        mandate_options: mandate_options && ((
          {
            amount,
            amountType: amount_type,
            currency,
            description,
            endDate: end_date,
            interval,
            intervalCount: interval_count,
            reference,
            startDate:      start_date,
            supportedTypes: supported_types,
          }: Exclude<Exclude<Exclude<StripeSetupIntentDocument["paymentMethodOptions"], undefined>["card"], undefined>["mandateOptions"], undefined>,
        ): Stripe.SetupIntentUpdateParams.PaymentMethodOptions.Card.MandateOptions => ({
          amount,
          amount_type,
          currency,
          description,
          end_date:   end_date?.seconds,
          interval,
          interval_count,
          reference,
          start_date: start_date.seconds,
          supported_types,
        }))(mandate_options),
        network,
        request_three_d_secure,
      }))(card),
    }))(payment_method_options),
    payment_method_types:   payment_method_types?.length ? payment_method_types : undefined,
  };
}

// noinspection JSUnusedGlobalSymbols
export const onStripeSetupIntentDocumentUpdatedBlockingFunction: CloudFunction<FirestoreEvent<Change<QueryDocumentSnapshot> | undefined, { documentId: string }>> = onDocumentUpdated<"stripeSetupIntents/{documentId}">(
  "stripeSetupIntents/{documentId}",
  async (
    {
      data: queryDocumentSnapshotChange,
      id:   firestoreEventId,
    }: FirestoreEvent<Change<QueryDocumentSnapshot> | undefined, { documentId: string }>,
  ): Promise<object> => {
    if (!queryDocumentSnapshotChange)
      return {};

    const queryDocumentSnapshotAfter: StripeSetupIntentDocument = queryDocumentSnapshotChange.after.data() as StripeSetupIntentDocument;
    const setupIntentId: string | undefined                     = queryDocumentSnapshotAfter.id;

    if (!setupIntentId)
      return {};

    if (!process.env["STRIPE_API_KEY"])
      throw new HttpsError(
        "failed-precondition",
        "A value for `STRIPE_API_KEY` is missing from the environment.",
      );

    const stripe: Stripe = new Stripe(process.env["STRIPE_API_KEY"]);

    return queryDocumentSnapshotAfter.asyncDeleted ? stripe.setupIntents.cancel(
      setupIntentId,
      undefined,
      {
        idempotencyKey: firestoreEventId,
      },
    ) : stripe.setupIntents.update(
      setupIntentId,
      getStripeSetupIntentUpdateParams(queryDocumentSnapshotAfter),
      {
        idempotencyKey: firestoreEventId,
      },
    ).then<object, never>(
      (): object => ({}),
      (error: unknown): never => {
        console.error(error);

        throw new HttpsError(
          "unknown",
          "Something went wrong.",
        );
      },
    );
  },
);
