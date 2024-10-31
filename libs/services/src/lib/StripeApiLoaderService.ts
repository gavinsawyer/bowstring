import { isPlatformBrowser }               from "@angular/common";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { ENVIRONMENT }                     from "@standard/injection-tokens";
import { type Environment }                from "@standard/interfaces";
import { type Stripe }                     from "@stripe/stripe-js";
import { loadStripe }                      from "@stripe/stripe-js/pure";


@Injectable(
  {
    providedIn: "root",
  },
)
export class StripeApiLoaderService {

  private readonly environment: Environment         = inject<Environment>(ENVIRONMENT);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  private stripe?: Stripe;
  private stripePromise?: Promise<Stripe | null>;

  public async load(): Promise<Stripe | null> {
    if (isPlatformBrowser(this.platformId))
      return this.stripe || this.stripePromise || ((): Promise<Stripe | null> => {
        this.stripePromise = loadStripe(
          this.environment.apis.stripe.apiKey,
        ).then<Stripe | null>(
          (stripe: Stripe | null): Stripe | null => {
            if (stripe)
              this.stripe = stripe;

            return stripe;
          },
        );

        return this.stripePromise;
      })();
    else
      return null;
  }

}
