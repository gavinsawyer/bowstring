import { type AccountDocument }                                  from "@standard/interfaces";
import { getApp }                                                from "firebase-admin/app";
import { type DocumentReference, FieldValue, getFirestore }      from "firebase-admin/firestore";
import { type AuthBlockingEvent, beforeUserCreated, HttpsError } from "firebase-functions/identity";


// noinspection JSUnusedGlobalSymbols
export const beforeUserCreatedBlockingFunction = beforeUserCreated(
  async (
    event: AuthBlockingEvent,
  ): Promise<object> => (getFirestore(getApp()).collection("accounts").doc(event.data.uid) as DocumentReference<AccountDocument>).set(
    {
      email:    FieldValue.delete(),
      name:     FieldValue.delete(),
      shipping: FieldValue.delete(),
    },
    {
      merge: true,
    },
  ).then<object, never>(
    (): object => ({}),
    (error: unknown): never => {
      console.error(error);

      throw new HttpsError(
        "unknown",
        "Unknown error",
      );
    },
  ),
);
