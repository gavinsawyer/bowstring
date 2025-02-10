import { beforeUserCreated } from "firebase-functions/identity";


// noinspection JSUnusedGlobalSymbols
export const beforeUserCreatedBlockingFunction = beforeUserCreated(
  async (): Promise<object> => ({}),
);
