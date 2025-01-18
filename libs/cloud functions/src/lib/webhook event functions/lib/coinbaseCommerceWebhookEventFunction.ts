import { type HttpsFunction, onRequest, type Request }                      from "firebase-functions/https";
import { CoinbaseCommerce_API_Key, CoinbaseCommerce_Webhook_Shared_Secret } from "../../secrets";


// noinspection JSUnusedGlobalSymbols
export const coinbaseCommerceWebhookEventFunction: HttpsFunction = onRequest(
  {
    ingressSettings: "ALLOW_ALL",
    invoker:         "public",
    secrets:         [
      CoinbaseCommerce_API_Key,
      CoinbaseCommerce_Webhook_Shared_Secret,
    ],
  },
  async (
    request: Request,
    response: NonNullable<Request["res"]>,
  ): Promise<void> => {
    if (!request.headers["cc-webhook-signature"])
      return response.sendStatus(400).end() && void (0);

    return response.sendStatus(200).end() && void (0);
  },
);
