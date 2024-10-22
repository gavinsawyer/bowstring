import { type AccountDocument }                                  from "@standard/interfaces";
import { getApp }                                                from "firebase-admin/app";
import { type DocumentReference, getFirestore }                  from "firebase-admin/firestore";
import { type AuthBlockingEvent, beforeUserCreated, HttpsError } from "firebase-functions/identity";


// noinspection JSUnusedGlobalSymbols
export const beforeUserCreatedBlockingFunction = beforeUserCreated(
  async ({ data: { uid: userId } }: AuthBlockingEvent): Promise<object> => (getFirestore(getApp()).collection("accounts").doc(userId) as DocumentReference<AccountDocument>).set(
    {},
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
