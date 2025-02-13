// noinspection ES6RedundantNestingInTemplateLiteral

import { BreakpointObserver, type BreakpointState }                                                                                                                                from "@angular/cdk/layout";
import { isPlatformBrowser }                                                                                                                                                       from "@angular/common";
import { afterRender, ChangeDetectionStrategy, Component, effect, type ElementRef, inject, Injector, LOCALE_ID, PLATFORM_ID, signal, type Signal, viewChild, type WritableSignal } from "@angular/core";
import { toSignal }                                                                                                                                                                from "@angular/core/rxjs-interop";
import { type StripeCustomerDocument }                                                                                                                                             from "@bowstring/interfaces";
import { StripeApiLoaderService, StripeCustomersService }                                                                                                                          from "@bowstring/services";
import { type BaseStripeElementsOptions, type Stripe, type StripeElement, type StripeElementLocale, type StripeElements, type StripeError }                                        from "@stripe/stripe-js";
import { map }                                                                                                                                                                     from "rxjs";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    template:        "",

    standalone: true,
  },
)
export class StripeElementComponent {

  private readonly breakpointObserver: BreakpointObserver                 = inject<BreakpointObserver>(BreakpointObserver);
  private readonly platformId: NonNullable<unknown>                       = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly colorScheme$: Signal<"dark" | "light" | undefined>     = isPlatformBrowser(this.platformId) ? toSignal<"dark" | "light">(
    this.breakpointObserver.observe("(prefers-color-scheme: dark)").pipe<"dark" | "light">(
      map<BreakpointState, "dark" | "light">(
        ({ matches }: BreakpointState): "dark" | "light" => matches ? "dark" : "light",
      ),
    ),
  ) : signal<undefined>(undefined);
  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");
  private readonly injector: Injector                                     = inject<Injector>(Injector);
  private readonly localeId: string                                       = inject<string>(LOCALE_ID);
  private readonly stripeApiLoaderService: StripeApiLoaderService         = inject<StripeApiLoaderService>(StripeApiLoaderService);

  protected readonly stripeCustomersService: StripeCustomersService = inject<StripeCustomersService>(StripeCustomersService);

  public readonly complete$: WritableSignal<boolean> = signal<false>(false);

  protected getBaseStripeElementsOptions(): BaseStripeElementsOptions {
    return {
      appearance: {
        disableAnimations: true,
        rules:             {
          ".Block":               {
            backgroundColor: this.colorScheme$() === "dark" ? "rgba(15, 15, 15, 0.5)" : "rgba(240, 240, 240, 0.5)",
            border:          `0.5px solid ${ this.colorScheme$() === "dark" ? "rgba(62, 62, 62, 0.6)" : "rgba(193, 193, 193, 0.6)" }`,
            boxShadow:       `${ "rgba(0, 0, 0, 0.75)" } 0px 1.527864px 9.888544px -4.777088px`,
          },
          ".BlockDivider":        {
            backgroundColor: this.colorScheme$() === "dark" ? "rgba(153, 153, 153, 0.25)" : "rgba(102, 102, 102, 0.25)",
          },
          ".Input":               {
            backgroundColor: this.colorScheme$() === "dark" ? "black" : "white",
            border:          "none",
            boxShadow:       `${ "rgba(0, 0, 0, 0.75)" } 0px 1.527864px 9.888544px -4.777088px`,
            letterSpacing:   "-.0344418538em",
            outline:         "none",
            paddingBottom:   "6.11px",
            paddingLeft:     "9.89px",
            paddingRight:    "9.89px",
            paddingTop:      "6.11px",
            transition:      "box-shadow 200ms cubic-bezier(0.25, 0.175, 0.25, 1.75)",
          },
          ".Input--invalid":      {
            boxShadow: `${ "rgba(0, 0, 0, 0.75)" } 0px 1.527864px 9.888544px -4.777088px`,
          },
          ".Input::placeholder":  {
            color: "hsl(0, 0%, 50%)",
          },
          ".Input:focus":         {
            boxShadow: `${ "rgba(0, 0, 0, 0.75)" } 0px 2.206668px 14.281857px -5.455184px`,
          },
          ".Input:hover":         {
            boxShadow: `${ "rgba(0, 0, 0, 0.75)" } 0px 2.206668px 14.281857px -5.455184px`,
          },
          ".Label":               {
            color:         this.colorScheme$() === "dark" ? "rgba(251, 251, 251, 0.875)" : "rgba(4, 4, 4, 0.875)",
            fontSize:      "0.7861513778rem",
            letterSpacing: "-.0344418538em",
            marginBottom:  "3.77px",
          },
          ".Tab":                 {
            backgroundColor: this.colorScheme$() === "dark" ? "black" : "white",
            border:          "none",
            boxShadow:       `${ "rgba(0, 0, 0, 0.75)" } 0px 1.527864px 9.888544px -4.777088px`,
            outline:         "none",
            paddingBottom:   "6.11px",
            paddingLeft:     "9.89px",
            paddingRight:    "9.89px",
            paddingTop:      "6.11px",
            transition:      "box-shadow 200ms cubic-bezier(0.25, 0.175, 0.25, 1.75)",
          },
          ".Tab--selected":       {
            boxShadow: `${ "rgba(0, 0, 0, 0.75)" } 0px 0.944272px 6.111456px -2.334368px`,
          },
          ".Tab--selected:focus": {
            boxShadow: `${ "rgba(0, 0, 0, 0.75)" } 0px 2.206668px 14.281857px -5.455184px`,
          },
          ".Tab:active":          {
            boxShadow: `${ "rgba(0, 0, 0, 0.75)" } 0px 0.944272px 6.111456px -2.334368px`,
          },
          ".Tab:disabled":        {
            boxShadow: "none",
          },
          ".Tab:focus":           {
            boxShadow: `${ "rgba(0, 0, 0, 0.75)" } 0px 2.206668px 14.281857px -5.455184px`,
          },
          ".Tab:hover":           {
            boxShadow: `${ "rgba(0, 0, 0, 0.75)" } 0px 2.206668px 14.281857px -5.455184px`,
          },
          ".TabLabel":            {
            color:         this.colorScheme$() === "dark" ? "rgb(204, 204, 204)" : "rgb(36, 36, 36)",
            letterSpacing: "-.0344418538em",
          },
        },
        variables:         {
          borderRadius:         "8px",
          colorPrimary:         this.colorScheme$() === "dark" ? "rgb(251, 251, 251)" : "rgb(4, 4, 4)",
          colorText:            this.colorScheme$() === "dark" ? "white" : "black",
          fontFamily:           "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif",
          fontLineHeight:       "1.1458980338",
          logoColor:            this.colorScheme$() === "dark" ? "dark" : "light",
          tabIconColor:         this.colorScheme$() === "dark" ? "rgb(204, 204, 204)" : "rgb(36, 36, 36)",
          tabIconSelectedColor: this.colorScheme$() === "dark" ? "rgb(204, 204, 204)" : "rgb(36, 36, 36)",
        },
      },
      loader:     "never",
      locale:     this.localeId.substring(
        0,
        2,
      ) as StripeElementLocale,
    };
  }
  protected getStripeElement?(
    {
      stripeCustomerDocument,
      stripeElements,
    }: { "stripeCustomerDocument"?: StripeCustomerDocument, "stripeElements": StripeElements },
  ): StripeElement
  protected getStripeElements?(stripe: Stripe): StripeElements | undefined
  protected initializeStripeElement(): void {
    this.stripeApiLoaderService.load().then<void>(
      (stripe: Stripe | null): void => {
        if (stripe) {
          let stripeElements: StripeElements | undefined = this.getStripeElements?.(stripe);
          let stripeElement: StripeElement | undefined   = stripeElements && this.getStripeElement?.(
            {
              stripeElements: stripeElements,
            },
          );
          let mounted: boolean                           = false as const;

          this.resetStripeElement  = (): void => {
            stripeElements = this.getStripeElements?.(stripe);

            stripeElement?.destroy();

            stripeElement = stripeElements && this.getStripeElement?.(
              {
                stripeCustomerDocument: this.stripeCustomersService.stripeCustomerDocument$(),
                stripeElements:         stripeElements,
              },
            );

            if (mounted)
              stripeElement?.mount(this.htmlDivElementRef$().nativeElement);
          };
          this.submitStripeElement = async (): Promise<{ stripe: Stripe, stripeElements: StripeElements } | undefined> => stripeElements?.submit().then<{ stripe: Stripe, stripeElements: StripeElements } | undefined, never>(
            ({ error: stripeError }: { error?: StripeError }): { stripe: Stripe, stripeElements: StripeElements } | undefined => {
              if (stripeError) {
                console.error("Something went wrong.");

                throw stripeError;
              }

              return stripeElements && {
                stripe:         stripe,
                stripeElements: stripeElements,
              };
            },
          );

          effect(
            this.resetStripeElement,
            {
              injector: this.injector,
            },
          );

          afterRender(
            (): void => {
              if (stripeElement && !mounted) {
                stripeElement.mount(this.htmlDivElementRef$().nativeElement);

                mounted = true;
              }
            },
            {
              injector: this.injector,
            },
          );
        }
      },
    );
  }
  protected resetStripeElement?(): void
  protected submitStripeElement?(): Promise<{ "stripe": Stripe, "stripeElements": StripeElements } | undefined>

  public reset(): void {
    this.resetStripeElement?.();
  }

}
