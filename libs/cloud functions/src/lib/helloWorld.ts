import { type CallableRequest, HttpsError, onCall } from "firebase-functions/https";


// noinspection JSUnusedGlobalSymbols
export const helloWorld: CallableFunction = onCall<null, Promise<string>>(
  {
    enforceAppCheck: true,
  },
  async ({ auth: authData }: CallableRequest<null>): Promise<string> => {
    if (!authData?.uid)
      throw new HttpsError(
        "unauthenticated",
        "You're not signed in.",
      );

    return "hello world";
  },
);
