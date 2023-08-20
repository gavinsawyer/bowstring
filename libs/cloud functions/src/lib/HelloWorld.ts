import { onCall } from "firebase-functions/v2/https";


// noinspection JSUnusedGlobalSymbols
export const HelloWorld: CallableFunction = onCall<null, string>(
  {
    enforceAppCheck: true,
  },
  (): string => "hello world",
);
