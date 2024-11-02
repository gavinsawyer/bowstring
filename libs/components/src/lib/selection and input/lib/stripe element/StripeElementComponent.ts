import { BreakpointObserver, type BreakpointState }                                                                  from "@angular/cdk/layout";
import { isPlatformBrowser, NgTemplateOutlet }                                                                       from "@angular/common";
import { Component, ElementRef, inject, Injector, PLATFORM_ID, signal, type Signal, viewChild, type WritableSignal } from "@angular/core";
import { toSignal }                                                                                                  from "@angular/core/rxjs-interop";
import { StripeApiLoaderService }                                                                                    from "@standard/services";
import { map }                                                                                                       from "rxjs";


@Component(
  {
    imports:    [
      NgTemplateOutlet,
    ],
    standalone: true,
    template:   "",
  },
)
export class StripeElementComponent {

  private readonly breakpointObserver: BreakpointObserver = inject<BreakpointObserver>(BreakpointObserver);
  private readonly platformId: NonNullable<unknown>       = inject<NonNullable<unknown>>(PLATFORM_ID);

  protected readonly colorScheme$: Signal<"dark" | "light" | undefined>     = isPlatformBrowser(this.platformId) ? toSignal<"dark" | "light">(
    this.breakpointObserver.observe("(prefers-color-scheme: dark)").pipe<"dark" | "light">(
      map<BreakpointState, "dark" | "light">(
        ({ matches }: BreakpointState): "dark" | "light" => matches ? "dark" : "light",
      ),
    ),
  ) : signal<undefined>(undefined);
  protected readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");
  protected readonly injector: Injector                                     = inject<Injector>(Injector);
  protected readonly stripeApiLoaderService: StripeApiLoaderService         = inject<StripeApiLoaderService>(StripeApiLoaderService);

  public readonly complete$: WritableSignal<boolean> = signal<false>(false);

  public resetStripeElement?(): void
  public submitStripeElement?(): void

}
