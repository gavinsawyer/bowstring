import { HttpsFunction, onRequest, type Request } from "firebase-functions/https";


// noinspection JSUnusedGlobalSymbols
export const redirect: HttpsFunction = onRequest(
  {
    ingressSettings: "ALLOW_ALL",
    invoker:         "public",
  },
  async (
    request: Request,
    response: NonNullable<Request["res"]>,
  ): Promise<void> => response.redirect(`${ request.query["url"] }`),
);
