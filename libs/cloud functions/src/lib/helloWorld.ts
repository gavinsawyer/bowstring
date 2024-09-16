import { onCall } from "firebase-functions/https";


// noinspection JSUnusedGlobalSymbols
export const helloWorld: CallableFunction = onCall<null, string>(
  {
    enforceAppCheck: true,
  },
  (): string => "hello world",
);
