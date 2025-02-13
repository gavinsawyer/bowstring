import { type StripePaymentMethodDocument }                                   from "@standard/interfaces";
import { getStripePaymentMethodUpdateParams }                                 from "@standard/stripe-interop";
import { type Change, type CloudFunction }                                    from "firebase-functions";
import { type FirestoreEvent, onDocumentUpdated, type QueryDocumentSnapshot } from "firebase-functions/firestore";
import { HttpsError }                                                         from "firebase-functions/https";
import Stripe                                                                 from "stripe";


// noinspection JSUnusedGlobalSymbols
export const onStripePaymentMethodDocumentUpdatedBlockingFunction: CloudFunction<FirestoreEvent<Change<QueryDocumentSnapshot> | undefined, { documentId: string }>> = onDocumentUpdated<"stripePaymentMethods/{documentId}">(
  "stripePaymentMethods/{documentId}",
  async (
    {
      data: queryDocumentSnapshotChange,
      id:   firestoreEventId,
    }: FirestoreEvent<Change<QueryDocumentSnapshot> | undefined, { documentId: string }>,
  ): Promise<object> => {
    if (!queryDocumentSnapshotChange)
      return {};

    const stripePaymentMethodDocument: StripePaymentMethodDocument = queryDocumentSnapshotChange.after.data() as StripePaymentMethodDocument;
    const stripePaymentMethodId: string | undefined                = stripePaymentMethodDocument.id;

    if (!stripePaymentMethodId)
      throw new HttpsError(
        "failed-precondition",
        "A value for `id` is missing from the stripe payment method document.",
      );

    if (!process.env["STRIPE_API_KEY"])
      throw new HttpsError(
        "failed-precondition",
        "A value for `STRIPE_API_KEY` is missing from the environment.",
      );

    const stripe: Stripe = new Stripe(process.env["STRIPE_API_KEY"]);

    return stripePaymentMethodDocument.asyncDeleted ? stripe.paymentMethods.detach(
      stripePaymentMethodId,
      undefined,
      {
        idempotencyKey: firestoreEventId,
      },
    ) : stripe.paymentMethods.update(
      stripePaymentMethodId,
      getStripePaymentMethodUpdateParams(stripePaymentMethodDocument),
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
