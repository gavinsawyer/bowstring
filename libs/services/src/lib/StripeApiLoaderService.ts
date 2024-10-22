import { isPlatformBrowser }               from "@angular/common";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { ENVIRONMENT }                     from "@standard/injection-tokens";
import { type Environment }                from "@standard/interfaces";
import { loadStripe, type Stripe }         from "@stripe/stripe-js";


@Injectable(
  {
    providedIn: "root",
  },
)
export class StripeApiLoaderService {

  private readonly environment: Environment         = inject<Environment>(ENVIRONMENT);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  private stripe?: Stripe;

  public async load(): Promise<Stripe | null> {
    return isPlatformBrowser(this.platformId) && !this.stripe ? loadStripe(
      this.environment.stripe.apiKey,
    ).then<Stripe | null>(
      (stripe: Stripe | null): Stripe | null => {
        if (stripe)
          this.stripe = stripe;

        return stripe;
      },
    ) : this.stripe || null;
  }

}
