import coinbaseCommerceNode                                                 from "coinbase-commerce-node";
import { type HttpsFunction, onRequest, type Request }                      from "firebase-functions/https";
import { CoinbaseCommerce_API_Key, CoinbaseCommerce_Webhook_Shared_Secret } from "../../secret params";


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
    const signature: string | undefined = request.header("x-cc-webhook-signature");

    if (!signature) {
      response.sendStatus(400).end();

      throw new Error("Something went wrong.");
    } else {
      return new Promise<coinbaseCommerceNode.resources.Event>(
        (
          resolve: (event: coinbaseCommerceNode.resources.Event) => void,
          reject: (reason?: unknown) => void,
        ): void => {
          try {
            resolve(
              coinbaseCommerceNode.Webhook.verifyEventBody(
                request.rawBody.toString(),
                signature,
                CoinbaseCommerce_Webhook_Shared_Secret.value(),
              ),
            );
          } catch (error: unknown) {
            reject(error);
          }
        },
      ).then<void, never>(
        (event: coinbaseCommerceNode.resources.Event): void => {
          switch (event.type) {
            case "charge:created":
              return response.sendStatus(200).end() && void (0);
            case "charge:confirmed":
              return response.sendStatus(200).end() && void (0);
            case "charge:failed":
              return response.sendStatus(200).end() && void (0);
            case "charge:delayed":
              return response.sendStatus(200).end() && void (0);
            case "charge:pending":
              return response.sendStatus(200).end() && void (0);
            case "charge:resolved":
              return response.sendStatus(200).end() && void (0);
            default:
              return response.sendStatus(400).end() && void (0);
          }
        },
        (error: unknown): never => {
          response.status(500).send(error).end();

          throw new Error("Something went wrong.");
        },
      );
    }
  },
);
