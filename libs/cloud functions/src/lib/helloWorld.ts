import { type CallableRequest, HttpsError, onCall } from "firebase-functions/https";


// noinspection JSUnusedGlobalSymbols
export const helloWorld: CallableFunction = onCall<null, Promise<{ "helloWorld": string }>>(
  {
    enforceAppCheck: true,
  },
  async ({ auth: authData }: CallableRequest<null>): Promise<{ helloWorld: string }> => {
    if (!authData?.uid)
      throw new HttpsError(
        "unauthenticated",
        "You're not signed in.",
      );

    const userId: string = authData.uid;

    return {
      helloWorld: userId,
    };
  },
);
